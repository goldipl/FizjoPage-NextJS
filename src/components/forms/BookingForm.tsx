"use client";

import { useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CalendarPlus,
  Check,
  CircleCheckBig,
  Clock,
  LoaderCircle,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { getService, services } from "@/src/data/services";
import { getSpecialistsForService, getTeamMember } from "@/src/data/team";
import { siteConfig } from "@/src/data/site";
import {
  createBookingId,
  downloadIcs,
  fromDateKey,
  getBookableDays,
  getSlots,
  readBookings,
  saveBooking,
  toDateKey,
  type StoredBooking,
} from "@/src/lib/booking";
import {
  isDemoMode,
  isValidEmail,
  isValidPhone,
  submitForm,
  type FieldErrors,
} from "@/src/lib/forms";

const steps = ["Usługa", "Specjalista", "Termin", "Twoje dane"];

type DetailField = "name" | "phone" | "email" | "consent";

const emptyDetails = {
  name: "",
  phone: "",
  email: "",
  notes: "",
  firstVisit: true,
};

function formatLongDate(date: Date) {
  return date.toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function BookingForm() {
  const params = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);

  // Rendered only on the client (useSearchParams bails out of prerendering),
  // so reading the current date and localStorage here is safe.
  const [now] = useState(() => new Date());
  const [bookings, setBookings] = useState<StoredBooking[]>(() => readBookings());

  const initialService = getService(params.get("usluga") ?? "");
  const initialPrice =
    initialService?.prices.find((p) => p.id === params.get("wariant")) ??
    initialService?.prices[0];
  const initialSpecialist = getTeamMember(params.get("specjalista") ?? "");

  const [step, setStep] = useState(initialService ? 1 : 0);
  const [serviceSlug, setServiceSlug] = useState(initialService?.slug ?? "");
  const [priceId, setPriceId] = useState(initialPrice?.id ?? "");
  const [lockedSpecialist, setLockedSpecialist] = useState(
    initialSpecialist?.slug ?? "",
  );
  const [specialistSlug, setSpecialistSlug] = useState(
    initialSpecialist &&
      (!initialService || initialSpecialist.services.includes(initialService.slug))
      ? initialSpecialist.slug
      : "",
  );
  const [dateKey, setDateKey] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState(emptyDetails);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<DetailField>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<StoredBooking | null>(null);

  const service = getService(serviceSlug);
  const price = service?.prices.find((p) => p.id === priceId);
  const eligible = service ? getSpecialistsForService(service.slug) : [];
  const candidates = specialistSlug
    ? eligible.filter((s) => s.slug === specialistSlug)
    : eligible;
  const days = service ? getBookableDays(now, candidates) : [];
  const selectedDateKey = days.some((d) => toDateKey(d) === dateKey)
    ? dateKey
    : days[0]
      ? toDateKey(days[0])
      : "";
  const slots =
    price && selectedDateKey
      ? getSlots(fromDateKey(selectedDateKey), price.duration, candidates, now, bookings)
      : [];
  const selectedSlot = slots.find((s) => s.time === time && s.available.length > 0);
  const assignedSpecialist = specialistSlug
    ? getTeamMember(specialistSlug)
    : selectedSlot?.available[0];

  const lockedMember = getTeamMember(lockedSpecialist);
  const visibleServices = lockedMember
    ? services.filter((s) => lockedMember.services.includes(s.slug))
    : services;

  const goTo = (next: number) => {
    setStep(next);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseService = (slug: string) => {
    const next = getService(slug);
    if (!next) return;
    setServiceSlug(slug);
    setPriceId(next.prices[0].id);
    if (specialistSlug && !getSpecialistsForService(slug).some((s) => s.slug === specialistSlug)) {
      setSpecialistSlug("");
    }
    setTime("");
  };

  const chooseSpecialist = (slug: string) => {
    setSpecialistSlug(slug);
    setTime("");
  };

  const canContinue =
    (step === 0 && !!service && !!price) ||
    step === 1 ||
    (step === 2 && !!selectedSlot);

  const validate = () => {
    const next: FieldErrors<DetailField> = {};
    if (details.name.trim().length < 3) next.name = "Podaj imię i nazwisko.";
    if (!isValidPhone(details.phone))
      next.phone = "Podaj poprawny numer telefonu (9 cyfr).";
    if (!isValidEmail(details.email)) next.email = "Podaj poprawny adres e-mail.";
    if (!consent) next.consent = "Zgoda jest wymagana do realizacji rezerwacji.";
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (!service || !price || !selectedSlot || !assignedSpecialist) return;

    const booking: StoredBooking = {
      id: createBookingId(),
      serviceSlug: service.slug,
      priceId: price.id,
      specialistSlug: assignedSpecialist.slug,
      date: selectedDateKey,
      time: selectedSlot.time,
      duration: price.duration,
      createdAt: new Date().toISOString(),
    };

    setStatus("sending");
    try {
      await submitForm("rezerwacja", {
        bookingId: booking.id,
        service: `${service.name} – ${price.name}`,
        price: `${price.price} zł`,
        specialist: assignedSpecialist.name,
        date: selectedDateKey,
        time: selectedSlot.time,
        name: details.name,
        phone: details.phone,
        email: details.email,
        notes: details.notes,
        firstVisit: details.firstVisit ? "tak" : "nie",
      });
      saveBooking(booking);
      setBookings((prev) => [...prev, booking]);
      setDone(booking);
      setStatus("idle");
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setDone(null);
    setStep(0);
    setServiceSlug("");
    setPriceId("");
    setSpecialistSlug("");
    setLockedSpecialist("");
    setDateKey("");
    setTime("");
    setDetails(emptyDetails);
    setConsent(false);
  };

  if (done) {
    const doneService = getService(done.serviceSlug);
    const donePrice = doneService?.prices.find((p) => p.id === done.priceId);
    const doneSpecialist = getTeamMember(done.specialistSlug);

    return (
      <div ref={containerRef} className="scroll-mt-36 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CircleCheckBig size={40} />
        </div>
        <h2 className="text-3xl font-bold text-navy-900 mb-3">
          Wizyta zarezerwowana!
        </h2>
        <p className="text-gray-500 mb-8">
          Numer rezerwacji:{" "}
          <span className="font-mono font-semibold text-navy-900">{done.id}</span>
          <br />
          Potwierdzenie wyślemy na adres {details.email || "e-mail"} oraz SMS-em.
          {isDemoMode && (
            <span className="block text-xs text-gray-400 mt-2">
              (Tryb demonstracyjny – rezerwacja zapisana tylko w tej
              przeglądarce.)
            </span>
          )}
        </p>
        <div className="rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6 text-left mb-8 space-y-4">
          <SummaryRow icon={Check} label="Usługa" value={`${doneService?.name} – ${donePrice?.name}`} />
          <SummaryRow icon={UserRound} label="Specjalista" value={doneSpecialist ? `${doneSpecialist.title} ${doneSpecialist.name}` : "-"} />
          <SummaryRow
            icon={CalendarDays}
            label="Termin"
            value={`${formatLongDate(fromDateKey(done.date))}, godz. ${done.time}`}
          />
          <SummaryRow icon={Clock} label="Czas trwania" value={`${done.duration} min · ${donePrice?.price} zł`} />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() =>
              downloadIcs({
                id: done.id,
                title: `${doneService?.name} – ${siteConfig.name}`,
                description: `Specjalista: ${doneSpecialist?.name}. Nr rezerwacji: ${done.id}`,
                dateKey: done.date,
                time: done.time,
                duration: done.duration,
              })
            }
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            <CalendarPlus size={18} />
            Dodaj do kalendarza
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Zarezerwuj kolejną wizytę
          </button>
        </div>
        <Link href="/" className="inline-block mt-6 text-sm text-primary-600 hover:underline">
          Wróć na stronę główną
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="scroll-mt-36">
      {/* Progress */}
      <ol className="grid grid-cols-4 gap-2 mb-10">
        {steps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              disabled={index > step}
              onClick={() => goTo(index)}
              className="w-full text-left disabled:cursor-default group"
            >
              <span
                className={`block h-1.5 rounded-full mb-3 transition-colors ${
                  index <= step ? "bg-primary-600" : "bg-gray-200"
                }`}
              />
              <span
                className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${
                  index === step
                    ? "text-primary-700"
                    : index < step
                      ? "text-navy-900 group-hover:text-primary-600"
                      : "text-gray-400"
                }`}
              >
                <span
                  className={`hidden sm:flex w-6 h-6 rounded-full items-center justify-center text-xs ${
                    index < step
                      ? "bg-primary-600 text-white"
                      : index === step
                        ? "bg-primary-100 text-primary-700"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < step ? <Check size={14} /> : index + 1}
                </span>
                {label}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-8 lg:gap-12">
        <div className="min-w-0">
          {/* Step 1: service */}
          {step === 0 && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Wybierz usługę</h2>
              {lockedMember ? (
                <p className="flex flex-wrap items-center gap-2 text-gray-500 mb-6">
                  Usługi specjalisty:
                  <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 text-sm font-medium pl-3 pr-1.5 py-1 rounded-full">
                    {lockedMember.name}
                    <button
                      type="button"
                      onClick={() => setLockedSpecialist("")}
                      aria-label="Pokaż wszystkie usługi"
                      className="w-5 h-5 rounded-full hover:bg-primary-100 flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </span>
                </p>
              ) : (
                <p className="text-gray-500 mb-6">
                  Nie wiesz, co wybrać? Zacznij od konsultacji fizjoterapeutycznej.
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {visibleServices.map((item) => {
                  const Icon = item.icon;
                  const active = item.slug === serviceSlug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      onClick={() => chooseService(item.slug)}
                      aria-pressed={active}
                      className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
                        active
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-100 hover:border-primary-200"
                      }`}
                    >
                      <span
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          active ? "bg-primary-600 text-white" : "bg-primary-50 text-primary-600"
                        }`}
                      >
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block font-semibold text-navy-900">{item.name}</span>
                        <span className="block text-xs text-gray-500">{item.category}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {service && (
                <fieldset>
                  <legend className="font-semibold text-navy-900 mb-3">
                    Rodzaj wizyty
                  </legend>
                  <div className="space-y-3">
                    {service.prices.map((item) => (
                      <label
                        key={item.id}
                        className={`flex items-center gap-4 rounded-2xl border-2 p-4 cursor-pointer transition-colors ${
                          item.id === priceId
                            ? "border-primary-600 bg-primary-50"
                            : "border-gray-100 hover:border-primary-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="variant"
                          value={item.id}
                          checked={item.id === priceId}
                          onChange={() => {
                            setPriceId(item.id);
                            setTime("");
                          }}
                          className="w-4 h-4 accent-primary-600"
                        />
                        <span className="grow">
                          <span className="block font-medium text-navy-900">{item.name}</span>
                          <span className="block text-xs text-gray-500">
                            {item.duration} min
                            {item.note && <span className="text-emerald-600"> · {item.note}</span>}
                          </span>
                        </span>
                        <span className="font-bold text-primary-600 whitespace-nowrap">
                          {item.price} zł
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>
          )}

          {/* Step 2: specialist */}
          {step === 1 && service && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Wybierz specjalistę</h2>
              <p className="text-gray-500 mb-6">
                Wybierz konkretną osobę lub pozwól nam dobrać najszybszy wolny termin.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => chooseSpecialist("")}
                  aria-pressed={specialistSlug === ""}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                    specialistSlug === ""
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-100 hover:border-primary-200"
                  }`}
                >
                  <span className="w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0">
                    <Users size={24} />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy-900">Dowolny specjalista</span>
                    <span className="block text-xs text-gray-500">Najwięcej wolnych terminów</span>
                  </span>
                </button>
                {eligible.map((member) => (
                  <button
                    key={member.slug}
                    type="button"
                    onClick={() => chooseSpecialist(member.slug)}
                    aria-pressed={specialistSlug === member.slug}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                      specialistSlug === member.slug
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-100 hover:border-primary-200"
                    }`}
                  >
                    <span className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={member.image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </span>
                    <span>
                      <span className="block text-xs text-gray-400">{member.title}</span>
                      <span className="block font-semibold text-navy-900">{member.name}</span>
                      <span className="block text-xs text-gray-500">{member.role}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: date & time */}
          {step === 2 && service && price && (
            <div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Wybierz termin</h2>
              <p className="text-gray-500 mb-6">
                Wizyta trwa {price.duration} min. Terminy dostępne na najbliższe 4 tygodnie.
              </p>

              {days.length === 0 ? (
                <p className="rounded-2xl bg-amber-50 text-amber-800 p-5">
                  Brak dostępnych dni. Zadzwoń do nas: {siteConfig.phone}.
                </p>
              ) : (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 mb-6 snap-x">
                    {days.map((day) => {
                      const key = toDateKey(day);
                      const active = key === selectedDateKey;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setDateKey(key);
                            setTime("");
                          }}
                          aria-pressed={active}
                          className={`snap-start shrink-0 w-[4.5rem] rounded-2xl border-2 py-3 text-center transition-colors ${
                            active
                              ? "border-primary-600 bg-primary-600 text-white"
                              : "border-gray-100 hover:border-primary-200"
                          }`}
                        >
                          <span className={`block text-xs ${active ? "text-primary-100" : "text-gray-400"}`}>
                            {day.toLocaleDateString("pl-PL", { weekday: "short" })}
                          </span>
                          <span className="block text-xl font-bold">{day.getDate()}</span>
                          <span className={`block text-xs ${active ? "text-primary-100" : "text-gray-500"}`}>
                            {day.toLocaleDateString("pl-PL", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="font-semibold text-navy-900 mb-3 first-letter:uppercase">
                    {formatLongDate(fromDateKey(selectedDateKey))}
                  </p>
                  {slots.every((slot) => slot.available.length === 0) ? (
                    <p className="rounded-2xl bg-gray-50 text-gray-500 p-5 text-sm">
                      Brak wolnych godzin tego dnia – wybierz inny dzień.
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {slots.map((slot) => {
                        const free = slot.available.length > 0;
                        const active = slot.time === time && free;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={!free}
                            onClick={() => setTime(slot.time)}
                            aria-pressed={active}
                            className={`rounded-xl border-2 py-2.5 text-sm font-medium transition-colors ${
                              active
                                ? "border-primary-600 bg-primary-600 text-white"
                                : free
                                  ? "border-gray-100 text-navy-900 hover:border-primary-300"
                                  : "border-transparent bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Step 4: details */}
          {step === 3 && (
            <form id="booking-details" onSubmit={onSubmit} noValidate>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Twoje dane</h2>
              <p className="text-gray-500 mb-6">
                Potrzebujemy ich, aby potwierdzić wizytę i w razie potrzeby się z Tobą skontaktować.
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label htmlFor="b-name" className="form-label">Imię i nazwisko *</label>
                  <input
                    id="b-name"
                    className="form-input"
                    autoComplete="name"
                    value={details.name}
                    onChange={(e) => {
                      setDetails({ ...details, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="b-phone" className="form-label">Telefon *</label>
                  <input
                    id="b-phone"
                    type="tel"
                    className="form-input"
                    autoComplete="tel"
                    placeholder="np. 600 000 000"
                    value={details.phone}
                    onChange={(e) => {
                      setDetails({ ...details, phone: e.target.value });
                      setErrors({ ...errors, phone: undefined });
                    }}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="b-email" className="form-label">E-mail *</label>
                  <input
                    id="b-email"
                    type="email"
                    className="form-input"
                    autoComplete="email"
                    value={details.email}
                    onChange={(e) => {
                      setDetails({ ...details, email: e.target.value });
                      setErrors({ ...errors, email: undefined });
                    }}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="b-notes" className="form-label">
                    Opisz krótko dolegliwości (opcjonalnie)
                  </label>
                  <textarea
                    id="b-notes"
                    rows={4}
                    className="form-input resize-y"
                    value={details.notes}
                    onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                  />
                </div>
                <label className="sm:col-span-2 flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={details.firstVisit}
                    onChange={(e) => setDetails({ ...details, firstVisit: e.target.checked })}
                    className="w-4 h-4 accent-primary-600"
                  />
                  To moja pierwsza wizyta w {siteConfig.name}
                </label>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors({ ...errors, consent: undefined });
                      }}
                      className="mt-0.5 w-4 h-4 accent-primary-600 shrink-0"
                      aria-invalid={!!errors.consent}
                    />
                    <span>
                      Wyrażam zgodę na przetwarzanie moich danych osobowych, w tym
                      danych o stanie zdrowia, w celu realizacji rezerwacji i
                      udzielenia świadczenia, zgodnie z{" "}
                      <Link href="/polityka-prywatnosci" className="text-primary-600 underline">
                        polityką prywatności
                      </Link>
                      . *
                    </span>
                  </label>
                  {errors.consent && <p className="form-error">{errors.consent}</p>}
                </div>
              </div>
              {status === "error" && (
                <p className="mt-5 rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3">
                  Nie udało się wysłać rezerwacji. Spróbuj ponownie lub zadzwoń: {siteConfig.phone}.
                </p>
              )}
            </form>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-semibold"
              >
                <ArrowLeft size={18} />
                Wstecz
              </button>
            ) : (
              <span />
            )}
            {step < 3 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => goTo(step + 1)}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Dalej
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                form="booking-details"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-70 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                {status === "sending" ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Check size={18} />
                )}
                {status === "sending" ? "Rezerwuję..." : "Potwierdzam rezerwację"}
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-36 self-start rounded-3xl bg-gray-50 p-6">
          <h2 className="font-bold text-navy-900 mb-5">Podsumowanie</h2>
          <div className="space-y-4">
            <SummaryRow
              icon={Check}
              label="Usługa"
              value={service ? `${service.name}${price ? ` – ${price.name}` : ""}` : "Nie wybrano"}
            />
            <SummaryRow
              icon={UserRound}
              label="Specjalista"
              value={
                specialistSlug
                  ? (getTeamMember(specialistSlug)?.name ?? "-")
                  : assignedSpecialist && step >= 2
                    ? `${assignedSpecialist.name} (przydzielony)`
                    : "Dowolny specjalista"
              }
            />
            <SummaryRow
              icon={CalendarDays}
              label="Termin"
              value={
                selectedSlot
                  ? `${formatLongDate(fromDateKey(selectedDateKey))}, ${selectedSlot.time}`
                  : "Nie wybrano"
              }
            />
            {price && (
              <SummaryRow icon={Clock} label="Czas trwania" value={`${price.duration} min`} />
            )}
          </div>
          {price && (
            <div className="flex items-center justify-between border-t border-gray-200 mt-5 pt-5">
              <span className="text-gray-500">Do zapłaty na miejscu</span>
              <span className="text-2xl font-bold text-primary-600">{price.price} zł</span>
            </div>
          )}
          <p className="text-xs text-gray-400 mt-5">
            Wizytę możesz bezpłatnie odwołać do 24 h przed terminem.
          </p>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Check;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-8 h-8 rounded-lg bg-white text-primary-600 flex items-center justify-center shrink-0 shadow-sm">
        <Icon size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-navy-900 first-letter:uppercase">{value}</p>
      </div>
    </div>
  );
}
