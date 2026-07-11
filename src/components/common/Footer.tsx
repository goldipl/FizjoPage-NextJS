import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

const menuLinks = ["Strona Główna", "O Nas", "Usługi", "Kontakt"];

const hours = [
  { day: "Pon - Pt", time: "8:00 - 18:00" },
  { day: "Sobota", time: "9:00 - 14:00" },
  { day: "Niedziela", time: "Zamknięte" },
];

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-navy-950 text-white">
      <div className="container-custom py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & description */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect
                    x="20"
                    y="0"
                    width="60"
                    height="100"
                    rx="16"
                    fill="white"
                  />
                  <rect
                    x="0"
                    y="20"
                    width="100"
                    height="60"
                    rx="16"
                    fill="white"
                  />
                  <circle cx="50" cy="30" r="10" fill="#0a1f3d" />
                  <path
                    d="M25 60 Q40 45 50 50 Q65 58 80 40"
                    stroke="#0a1f3d"
                    strokeWidth="9"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-[9px] tracking-widest text-primary-200 font-semibold uppercase">
                  Centrum Medyczne
                </div>
                <div className="text-lg font-bold tracking-wide">
                  FIZJOMEDICA
                </div>
              </div>
            </a>
            <p className="text-primary-100/70 text-sm leading-relaxed">
              Profesjonalna rehabilitacja i fizjoterapia dla całej rodziny.
            </p>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Adres
            </h4>
            <div className="flex items-start gap-2.5 mb-3 text-primary-100/70 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>ul. Przykładowa 123, 00-900 Miasto</span>
            </div>
            <div className="flex items-center gap-2.5 mb-3 text-primary-100/70 text-sm">
              <Phone size={16} className="shrink-0" />
              <span>+48 600 123 456</span>
            </div>
            <div className="flex items-center gap-2.5 text-primary-100/70 text-sm">
              <Mail size={16} className="shrink-0" />
              <span>kontakt@fizjomedica.pl</span>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Menu
            </h4>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-100/70 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Godziny Otwarcia
            </h4>
            <ul className="space-y-2.5">
              {hours.map(({ day, time }) => (
                <li
                  key={day}
                  className="flex justify-between text-sm text-primary-100/70 gap-4"
                >
                  <span>{day}</span>
                  <span className="text-white/90">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-100/50">
          <span>
            © {new Date().getFullYear()} FizjoMedica. Wszelkie prawa
            zastrzeżone.
          </span>
          <span>
            Projekt i wykonanie strony{" "}
            <Link
              className="text-white"
              href="https://mgodlewskidev.pl/"
              target="_blank"
            >
              mgodlewskidev.pl
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
