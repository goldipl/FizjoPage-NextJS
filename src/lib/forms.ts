// The site is a static export (GitHub Pages), so forms are sent to an external
// form backend (e.g. Formspree, Getform, Basin) configured at build time.
// Without NEXT_PUBLIC_FORM_ENDPOINT the submission is simulated (demo mode).
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export const isDemoMode = !endpoint;

export async function submitForm(
  formType: "kontakt" | "rezerwacja",
  data: Record<string, string>,
) {
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ formType, ...data }),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`);
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Polish numbers: 9 digits, optionally prefixed with +48 / 0048, spaces or dashes allowed.
const phonePattern = /^(?:\+48|0048)?\d{9}$/;

export function isValidEmail(value: string) {
  return emailPattern.test(value.trim());
}

export function isValidPhone(value: string) {
  return phonePattern.test(value.replace(/[\s-]/g, ""));
}

export type FieldErrors<T extends string> = Partial<Record<T, string>>;
