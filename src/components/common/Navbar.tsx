"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/img/logo/fizjomedica2.png";

type NavLink = {
  label: string;
  href: string;
};

type DropdownProps = {
  label: string;
  links: NavLink[];
};

const oNasLinks: NavLink[] = [
  { label: "O Firmie", href: "#o-firmie" },
  { label: "Nasza Kadra", href: "#kadra" },
  { label: "Galeria", href: "#galeria" },
  { label: "Opinie", href: "#opinie" },
];

const uslugiLinks: NavLink[] = [
  { label: "Fizjoterapia", href: "#fizjoterapia" },
  { label: "Rehabilitacja", href: "#rehabilitacja" },
  { label: "Masaż Leczniczy", href: "#masaz" },
  { label: "Terapia Manualna", href: "#terapia-manualna" },
];

function DesktopDropdown({ label, links }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-primary-600 transition-colors py-2"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-56 transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ label, links }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        className="w-full flex items-center justify-between py-3.5 text-left text-gray-700 font-medium"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {label}

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 pb-2" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block py-2 pl-4 text-sm text-gray-500 hover:text-primary-600"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-custom flex items-center justify-between h-20 !px-2">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <Image
            src={logo}
            alt="FizjoMedica Logo"
            width={200}
            height={64}
            className="h-16 lg:h-auto object-contain"
          />
        </a>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#"
            className="text-[15px] font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            Strona Główna
          </a>

          <DesktopDropdown label="O Nas" links={oNasLinks} />

          <DesktopDropdown label="Usługi" links={uslugiLinks} />

          <a
            href="#kontakt"
            className="text-[15px] font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            Kontakt
          </a>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <a
            href="#rezerwacja"
            className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-primary-200"
          >
            Zarezerwuj Wizytę
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Otwórz menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden relative bg-white transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0 h-auto" : "translate-x-full h-0"
        }`}
      >
        <div className="container-custom pb-4">
          <a
            href="#"
            className="block py-3.5 border-b border-gray-100 text-gray-700 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Strona Główna
          </a>

          <MobileAccordion label="O Nas" links={oNasLinks} />

          <MobileAccordion label="Usługi" links={uslugiLinks} />

          <a
            href="/cennik"
            className="block py-3.5 border-b border-gray-100 text-gray-700 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Cennik
          </a>

          <a
            href="#kontakt"
            className="block py-3.5 border-b border-gray-100 text-gray-700 font-medium"
            onClick={() => setMobileOpen(false)}
          >
            Kontakt
          </a>

          <a
            href="#rezerwacja"
            className="block text-center mt-6 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Zarezerwuj Wizytę
          </a>
        </div>
      </div>
    </header>
  );
}
