"use client";

import { useEffect, useState } from "react";

import { openingHours, openingHoursSummary } from "@/src/data/site";

// Maps Date.getDay() (0 = Sunday) to a row of openingHoursSummary.
const summaryRowByDay = [3, 0, 0, 0, 0, 1, 2];

type Status = { open: boolean; label: string; row: number };

function getStatus(now: Date): Status {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = openingHours[day].range;
  const row = summaryRowByDay[day];

  if (today && hour >= today[0] && hour < today[1]) {
    return { open: true, label: `Otwarte do ${today[1]}:00`, row };
  }
  if (today && hour < today[0]) {
    return { open: false, label: `Otwieramy dziś o ${today[0]}:00`, row };
  }
  for (let i = 1; i <= 7; i++) {
    const next = openingHours[(day + i) % 7];
    if (next.range) {
      const when = i === 1 ? "jutro" : next.day.toLowerCase();
      return { open: false, label: `Otwieramy ${when} o ${next.range[0]}:00`, row };
    }
  }
  return { open: false, label: "Zamknięte", row };
}

export default function OpeningHoursStatus() {
  // Computed after mount so the static HTML never disagrees with the visitor's clock.
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(getStatus(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <p
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-4 transition-opacity ${
          status
            ? status.open
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
            : "opacity-0"
        }`}
        aria-live="polite"
      >
        <span
          className={`relative flex h-2 w-2 rounded-full ${
            status?.open ? "bg-emerald-500" : "bg-amber-500"
          }`}
        >
          {status?.open && (
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60 motion-reduce:hidden" />
          )}
        </span>
        {status?.label ?? "Sprawdzam…"}
      </p>

      <ul className="text-sm space-y-1">
        {openingHoursSummary.map(({ day, time }, i) => {
          const isToday = status?.row === i;
          const closed = time === "Zamknięte";
          return (
            <li
              key={day}
              className={`flex justify-between gap-4 rounded-lg px-3 py-2 -mx-3 ${
                isToday ? "bg-primary-50" : ""
              }`}
            >
              <span className={isToday ? "font-semibold text-navy-900" : "text-gray-600"}>
                {day}
                {isToday && (
                  <span className="ml-2 text-[11px] font-semibold uppercase tracking-wide text-primary-600">
                    dziś
                  </span>
                )}
              </span>
              <span
                className={`tabular-nums ${
                  closed ? "text-gray-400" : "font-semibold text-navy-900"
                }`}
              >
                {time}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
