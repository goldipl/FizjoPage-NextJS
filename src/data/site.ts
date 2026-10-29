export const siteConfig = {
  name: "FizjoWebsite",
  tagline: "Centrum Medyczne",
  description:
    "Centrum medyczne FizjoWebsite – fizjoterapia, rehabilitacja, terapia manualna, masaż leczniczy, konsultacje ortopedyczne i diagnostyka USG.",
  phone: "+48 123 456 789",
  phoneHref: "tel:+48123456789",
  email: "kontakt@fizjowebsite.pl",
  address: {
    street: "ul. Przykładowa 12",
    postalCode: "00-950",
    city: "Warszawa",
  },
  map: {
    lat: 52.2297,
    lng: 21.0122,
  },
  nip: "000-000-00-00",
  foundedYear: 2012,
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export type OpeningHours = {
  day: string;
  short: string;
  time: string;
  // [openHour, closeHour] or null when closed – used by the booking calendar.
  range: [number, number] | null;
};

// Index matches Date.getDay(): 0 = Sunday.
export const openingHours: OpeningHours[] = [
  { day: "Niedziela", short: "Nd", time: "Zamknięte", range: null },
  { day: "Poniedziałek", short: "Pn", time: "8:00 – 20:00", range: [8, 20] },
  { day: "Wtorek", short: "Wt", time: "8:00 – 20:00", range: [8, 20] },
  { day: "Środa", short: "Śr", time: "8:00 – 20:00", range: [8, 20] },
  { day: "Czwartek", short: "Cz", time: "8:00 – 20:00", range: [8, 20] },
  { day: "Piątek", short: "Pt", time: "8:00 – 18:00", range: [8, 18] },
  { day: "Sobota", short: "Sb", time: "9:00 – 14:00", range: [9, 14] },
];

export const openingHoursSummary = [
  { day: "Pon – Czw", time: "8:00 – 20:00" },
  { day: "Piątek", time: "8:00 – 18:00" },
  { day: "Sobota", time: "9:00 – 14:00" },
  { day: "Niedziela", time: "Zamknięte" },
];

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}`;
