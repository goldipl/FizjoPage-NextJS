"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CircleCheckBig, LoaderCircle, Send } from "lucide-react";

import {
  isDemoMode,
  isValidEmail,
  isValidPhone,
  submitForm,
  type FieldErrors,
} from "@/src/lib/forms";

type Field = "name" | "email" | "phone" | "subject" | "message" | "consent";

const subjects = [
  "Pytanie o usługę",
  "Pytanie o cennik",
  "Zmiana lub odwołanie wizyty",
  "Współpraca",
  "Inne",
];

const initial = {
  name: "",
  email: "",
  phone: "",
  subject: subjects[0],
  message: "",
};

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<Field>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const update = (field: keyof typeof initial, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next: FieldErrors<Field> = {};
    if (values.name.trim().length < 2) next.name = "Podaj imię i nazwisko.";
    if (!isValidEmail(values.email)) next.email = "Podaj poprawny adres e-mail.";
    if (values.phone && !isValidPhone(values.phone))
      next.phone = "Podaj poprawny numer telefonu (9 cyfr).";
    if (values.message.trim().length < 10)
      next.message = "Wiadomość powinna mieć co najmniej 10 znaków.";
    if (!consent) next.consent = "Zgoda jest wymagana, abyśmy mogli odpowiedzieć.";
    return next;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      await submitForm("kontakt", values);
      setStatus("sent");
      setValues(initial);
      setConsent(false);
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 text-center">
        <CircleCheckBig className="mx-auto text-emerald-600 mb-4" size={48} />
        <h3 className="text-xl font-bold text-navy-900 mb-2">
          Dziękujemy za wiadomość!
        </h3>
        <p className="text-gray-600 mb-6">
          Odpowiemy najszybciej, jak to możliwe – zwykle w ciągu jednego dnia
          roboczego.
          {isDemoMode && (
            <span className="block text-xs text-gray-400 mt-2">
              (Tryb demonstracyjny – wiadomość nie została faktycznie wysłana.)
            </span>
          )}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-primary-600 font-semibold hover:underline"
        >
          Wyślij kolejną wiadomość
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid sm:grid-cols-2 gap-5">
      <div>
        <label htmlFor="name" className="form-label">
          Imię i nazwisko *
        </label>
        <input
          id="name"
          className="form-input"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className="form-error">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="form-label">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          autoComplete="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className="form-error">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="form-label">
          Telefon
        </label>
        <input
          id="phone"
          type="tel"
          className="form-input"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && <p id="phone-error" className="form-error">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="form-label">
          Temat
        </label>
        <select
          id="subject"
          className="form-input"
          value={values.subject}
          onChange={(e) => update("subject", e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className="form-label">
          Wiadomość *
        </label>
        <textarea
          id="message"
          rows={5}
          className="form-input resize-y"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="form-error">{errors.message}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            className="mt-0.5 w-4 h-4 accent-primary-600 shrink-0"
            aria-invalid={!!errors.consent}
          />
          <span>
            Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
            udzielenia odpowiedzi na wiadomość, zgodnie z{" "}
            <Link href="/polityka-prywatnosci" className="text-primary-600 underline">
              polityką prywatności
            </Link>
            . *
          </span>
        </label>
        {errors.consent && <p className="form-error">{errors.consent}</p>}
      </div>

      {status === "error" && (
        <p className="sm:col-span-2 rounded-xl bg-red-50 text-red-700 text-sm px-4 py-3">
          Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń do nas.
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-primary-600 hover:bg-primary-700 disabled:opacity-70 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          {status === "sending" ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
          {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
        </button>
      </div>
    </form>
  );
}
