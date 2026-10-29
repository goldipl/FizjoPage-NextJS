import { openingHours, siteConfig, fullAddress } from "@/src/data/site";
import type { TeamMember } from "@/src/data/team";

export const BOOKING_DAYS_AHEAD = 28;
const SLOT_STEP_MINUTES = 30;
// Minimum time between "now" and the first bookable slot today.
const MIN_LEAD_MINUTES = 90;
const STORAGE_KEY = "fizjowebsite-bookings";

export type StoredBooking = {
  id: string;
  serviceSlug: string;
  priceId: string;
  specialistSlug: string;
  date: string;
  time: string;
  duration: number;
  createdAt: string;
};

export function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

function parseTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// Small deterministic hash so "occupied" slots look realistic but stay stable between renders.
function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 100;
}

export function readBookings(): StoredBooking[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: StoredBooking) {
  try {
    const all = [...readBookings(), booking];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // Storage may be unavailable (private mode) – the booking itself is still sent.
  }
}

function overlaps(startA: number, durA: number, startB: number, durB: number) {
  return startA < startB + durB && startB < startA + durA;
}

function isSpecialistFree(
  specialist: TeamMember,
  dateKey: string,
  start: number,
  duration: number,
  bookings: StoredBooking[],
) {
  if (hash(`${specialist.slug}|${dateKey}|${start}`) < 35) return false;

  return !bookings.some(
    (b) =>
      b.specialistSlug === specialist.slug &&
      b.date === dateKey &&
      overlaps(parseTime(b.time), b.duration, start, duration),
  );
}

export function getBookableDays(today: Date, specialists: TeamMember[]) {
  const days: Date[] = [];

  for (let offset = 0; offset < BOOKING_DAYS_AHEAD; offset++) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const weekday = date.getDay();
    if (!openingHours[weekday].range) continue;
    if (!specialists.some((s) => s.workDays.includes(weekday))) continue;
    days.push(date);
  }

  return days;
}

export type Slot = {
  time: string;
  // Specialists free at this time – the first one is assigned for "any specialist".
  available: TeamMember[];
};

export function getSlots(
  date: Date,
  duration: number,
  specialists: TeamMember[],
  now: Date,
  bookings: StoredBooking[],
): Slot[] {
  const hours = openingHours[date.getDay()].range;
  if (!hours) return [];

  const dateKey = toDateKey(date);
  const isToday = dateKey === toDateKey(now);
  const earliest = isToday
    ? now.getHours() * 60 + now.getMinutes() + MIN_LEAD_MINUTES
    : 0;
  const working = specialists.filter((s) => s.workDays.includes(date.getDay()));
  const slots: Slot[] = [];

  for (
    let start = hours[0] * 60;
    start + duration <= hours[1] * 60;
    start += SLOT_STEP_MINUTES
  ) {
    if (start < earliest) continue;

    slots.push({
      time: formatTime(start),
      available: working.filter((s) =>
        isSpecialistFree(s, dateKey, start, duration, bookings),
      ),
    });
  }

  return slots;
}

export function createBookingId() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FW-${Date.now().toString(36).slice(-4).toUpperCase()}${random}`;
}

function icsDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}

export function downloadIcs({
  id,
  title,
  description,
  dateKey,
  time,
  duration,
}: {
  id: string;
  title: string;
  description: string;
  dateKey: string;
  time: string;
  duration: number;
}) {
  const start = fromDateKey(dateKey);
  start.setMinutes(parseTime(time));
  const end = new Date(start.getTime() + duration * 60_000);

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${siteConfig.name}//Rezerwacja//PL`,
    "BEGIN:VEVENT",
    `UID:${id}@fizjowebsite.pl`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(start)}`,
    `DTEND:${icsDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${siteConfig.name}\\, ${fullAddress.replace(/,/g, "\\,")}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Przypomnienie o wizycie",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `wizyta-${id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
