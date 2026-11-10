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
  const pathname = usePathname();
  const close = () => setMobileOpen(false);

  // Close whenever the route changes (covers back/forward navigation too).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    // Lock page scroll; html + body are both needed for iOS Safari.
    const html = document.documentElement;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setMobileOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={`relative z-10 border-b transition-colors ${
          mobileOpen ? "bg-white" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
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
            className="lg:hidden -mr-2 p-2 rounded-lg text-navy-900 hover:bg-gray-100 transition-colors"
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile: overlays the page below the header instead of growing it. */}
      <div
        id="mobile-menu"
        inert={!mobileOpen}
        className={`lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7.25rem)] transition-[opacity,visibility] duration-300 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-navy-950/40 backdrop-blur-[2px]"
          onClick={close}
        />
        <div
          className={`relative max-h-full overflow-y-auto overscroll-contain bg-white shadow-xl shadow-navy-950/10 transition-transform duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <nav className="container-custom pt-2 pb-6" aria-label="Menu mobilne">
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
