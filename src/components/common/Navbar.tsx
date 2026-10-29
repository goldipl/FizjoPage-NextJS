"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Clock, Mail, Menu, Phone, X } from "lucide-react";

import Logo from "./Logo";
import { ctaLink, navData, type NavLink } from "@/src/data/navigation";
import { siteConfig } from "@/src/data/site";

function normalize(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

function useIsActive() {
  const pathname = normalize(usePathname() ?? "/");

  return (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopDropdown({
  label,
  href,
  links,
}: {
  label: string;
  href: string;
  links: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = useIsActive();

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
    <div
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        className={`flex items-center gap-1 text-[15px] font-medium transition-colors py-2 ${
          isActive(href) ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          size={16}
          className={open ? "rotate-180 transition" : "transition"}
        />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64 transition ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none invisible"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border py-2">
          {links.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-5 py-2.5 text-sm hover:bg-primary-50 transition-colors ${
                isActive(item.href) && item.href !== href
                  ? "text-primary-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  links,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        className="w-full flex justify-between py-3.5 text-gray-700 font-medium"
        aria-expanded={open}
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
          open ? "max-h-[32rem] pb-2" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="block py-2 pl-4 text-sm text-gray-500 hover:text-primary-600"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="hidden md:block bg-navy-950 text-primary-100/80 text-xs">
      <div className="container-custom flex items-center justify-between h-9">
        <div className="flex items-center gap-6">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone size={13} />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail size={13} />
            {siteConfig.email}
          </a>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} />
          Pon–Czw 8:00–20:00 · Pt 8:00–18:00 · Sob 9:00–14:00
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = useIsActive();
  const close = () => setMobileOpen(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div className="bg-white/95 backdrop-blur-sm border-b">
        <div className="container-custom flex items-center justify-between h-20">
          <Logo />

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Menu główne">
            {navData.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  links={item.children}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:block">
            <Link
              href={ctaLink.href}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-primary-200"
            >
              {ctaLink.label}
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-navy-900"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile */}
        <div
          className={`lg:hidden transition-all ${
            mobileOpen
              ? "max-h-[calc(100dvh-5rem)] overflow-y-auto"
              : "max-h-0 overflow-hidden"
          }`}
        >
          <nav className="container-custom pb-6" aria-label="Menu mobilne">
            {navData.map((item) =>
              item.children ? (
                <MobileAccordion
                  key={item.label}
                  label={item.label}
                  links={item.children}
                  onNavigate={close}
                />
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block py-3.5 border-b font-medium ${
                    isActive(item.href) ? "text-primary-600" : "text-gray-700"
                  }`}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ),
            )}

            <Link
              href={ctaLink.href}
              className="block text-center mt-6 bg-primary-600 text-white font-semibold py-3.5 rounded-xl"
              onClick={close}
            >
              {ctaLink.label}
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="flex items-center justify-center gap-2 mt-3 border border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl"
            >
              <Phone size={18} />
              {siteConfig.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
