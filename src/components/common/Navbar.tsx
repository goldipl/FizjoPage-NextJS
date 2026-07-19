"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/img/logo/fizjomedica2.png";

type NavLink = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
  cta?: boolean;
};

const navData: NavItem[] = [
  {
    label: "Strona Główna",
    href: "#",
  },
  {
    label: "O Nas",
    children: [
      { label: "O Firmie", href: "#o-firmie" },
      { label: "Nasza Kadra", href: "#kadra" },
      { label: "Galeria", href: "#galeria" },
      { label: "Opinie", href: "#opinie" },
    ],
  },
  {
    label: "Usługi",
    children: [
      { label: "Fizjoterapia", href: "#fizjoterapia" },
      { label: "Rehabilitacja", href: "#rehabilitacja" },
      { label: "Masaż Leczniczy", href: "#masaz" },
      { label: "Terapia Manualna", href: "#terapia-manualna" },
    ],
  },
  {
    label: "Cennik",
    href: "/cennik",
  },
  {
    label: "Kontakt",
    href: "#kontakt",
  },
];

const ctaLink = {
  label: "Zarezerwuj Wizytę",
  href: "#rezerwacja",
};

function DesktopDropdown({
  label,
  links,
}: {
  label: string;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const leave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 text-[15px] font-medium text-gray-700 hover:text-primary-600 transition-colors py-2"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          size={16}
          className={open ? "rotate-180 transition" : "transition"}
        />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-56 transition ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border py-2">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-primary-50"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  links,
}: {
  label: string;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full flex justify-between py-3.5 text-gray-700 font-medium"
        onClick={() => setOpen(!open)}
      >
        {label}

        <ChevronDown
          size={18}
          className={open ? "rotate-180 transition" : "transition"}
        />
      </button>

      <div
        className={`overflow-hidden transition-all ${
          open ? "max-h-60 pb-2" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block py-2 pl-4 text-sm text-gray-500"
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="container-custom flex items-center justify-between h-20 !px-2">
        <a href="#">
          <Image
            src={logo}
            alt="FizjoMedica Logo"
            width={200}
            height={64}
            className="h-16 object-contain"
          />
        </a>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-8">
          {navData.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.label}
                label={item.label}
                links={item.children}
              />
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-[15px] font-medium text-gray-700 hover:text-primary-600"
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <a
            href={ctaLink.href}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl"
          >
            {ctaLink.label}
          </a>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile */}
      <div
        className={`lg:hidden overflow-hidden transition ${
          mobileOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="container-custom pb-4">
          {navData.map((item) =>
            item.children ? (
              <MobileAccordion
                key={item.label}
                label={item.label}
                links={item.children}
              />
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="block py-3.5 border-b text-gray-700 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ),
          )}

          <a
            href={ctaLink.href}
            className="block text-center mt-6 bg-primary-600 text-white py-3.5 rounded-xl"
            onClick={() => setMobileOpen(false)}
          >
            {ctaLink.label}
          </a>
        </div>
      </div>
    </header>
  );
}
