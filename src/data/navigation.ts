import { services } from "./services";

export type NavLink = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const navData: NavItem[] = [
  { label: "Strona Główna", href: "/" },
  {
    label: "O Nas",
    href: "/o-nas",
    children: [
      { label: "O Centrum", href: "/o-nas" },
      { label: "Nasz Zespół", href: "/zespol" },
      { label: "Galeria", href: "/galeria" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "Usługi",
    href: "/uslugi",
    children: [
      ...services.map((service) => ({
        label: service.name,
        href: `/uslugi/${service.slug}`,
      })),
      { label: "Wszystkie usługi", href: "/uslugi" },
    ],
  },
  { label: "Cennik", href: "/cennik" },
  { label: "Kontakt", href: "/kontakt" },
];

export const ctaLink: NavLink = {
  label: "Zarezerwuj Wizytę",
  href: "/rezerwacja",
};

export const footerLinks: NavLink[] = [
  { label: "O Centrum", href: "/o-nas" },
  { label: "Nasz Zespół", href: "/zespol" },
  { label: "Cennik", href: "/cennik" },
  { label: "Galeria", href: "/galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Rezerwacja online", href: "/rezerwacja" },
];
