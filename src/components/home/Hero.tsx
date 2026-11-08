import Link from "next/link";
import {
  CalendarCheck,
  Facebook,
  HeartPulse,
  Instagram,
  Mail,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import HeroSlider from "@/src/components/home/HeroSlider";
import { openingHoursSummary, siteConfig } from "@/src/data/site";

const features = [
  {
    icon: Stethoscope,
    title: "Doświadczeni specjaliści",
    text: "Twoje zdrowie jest najważniejsze – powierz je zespołowi z wieloletnią praktyką.",
  },
  {
    icon: HeartPulse,
    title: "Spersonalizowane leczenie",
    text: "Dokładna diagnoza i terapia dobrana indywidualnie do Twoich potrzeb.",
  },
  {
    icon: ShieldCheck,
    title: "Jakość i bezpieczeństwo",
    text: "Nowoczesny sprzęt i sprawdzone metody to gwarancja profesjonalnego leczenia.",
  },
  {
    icon: CalendarCheck,
    title: "Dogodne terminy wizyt",
    text: "Gabinet czynny 6 dni w tygodniu, wolne terminy często już od następnego dnia.",
  },
];

export default function Hero() {
  return (
    <>
      <h1 className="sr-only">
        {siteConfig.name} – {siteConfig.tagline}: fizjoterapia i rehabilitacja
      </h1>

      <HeroSlider />

      <div className="bg-gray-50 pb-4">
        {/* Info card overlapping the bottom edge of the slider */}
        <div className="container-custom relative z-10 -mt-24 lg:-mt-28">
          <div className="max-w-6xl mx-auto bg-white shadow-xl shadow-navy-950/10 overflow-hidden">
            <div className="grid md:grid-cols-3 gap-10 md:gap-8 px-6 py-8 sm:px-10 lg:py-10">
              <div>
                <h3 className="text-2xl font-normal text-primary-600 mb-5">
                  Godziny pracy
                </h3>
                <ul className="text-sm">
                  {openingHoursSummary.map(({ day, time }) => (
                    <li
                      key={day}
                      className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium text-navy-900">{day}</span>
                      <span className="text-primary-600 font-medium">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center gap-5 md:border-x md:border-gray-100">
                <div className="flex gap-3">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 rounded-xl border-2 border-primary-500 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-colors"
                  >
                    <Facebook size={22} />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-xl border-2 border-primary-500 text-primary-600 flex items-center justify-center hover:bg-primary-600 hover:border-primary-600 hover:text-white transition-colors"
                  >
                    <Instagram size={22} />
                  </a>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/cennik"
                    className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-2.5 transition-colors"
                  >
                    Cennik
                  </Link>
                  <Link
                    href="/rezerwacja"
                    className="border border-primary-500 text-primary-600 hover:bg-primary-50 text-sm font-semibold px-6 py-2.5 transition-colors"
                  >
                    Rezerwacja online
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-normal text-primary-600 mb-5">
                  Rejestracja
                </h3>
                <a
                  href={siteConfig.phoneHref}
                  className="group flex items-center gap-4"
                >
                  <PhoneCall
                    size={26}
                    strokeWidth={1.5}
                    className="text-primary-500 shrink-0"
                  />
                  <span className="text-3xl lg:text-[2rem] font-light text-navy-900 group-hover:text-primary-600 transition-colors whitespace-nowrap">
                    {siteConfig.phone}
                  </span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-4 flex items-center gap-4 text-sm text-gray-500 hover:text-primary-600 transition-colors"
                >
                  <Mail size={20} strokeWidth={1.5} className="text-primary-500 shrink-0 ml-[3px]" />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Tri-colour accent bar */}
            <div className="grid grid-cols-3 h-1.5" aria-hidden="true">
              <span className="bg-primary-300" />
              <span className="bg-primary-500" />
              <span className="bg-primary-700" />
            </div>
          </div>
        </div>

        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-16 lg:py-20">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon size={44} strokeWidth={1.25} className="text-primary-500 mb-5" />
                <h3 className="text-lg font-medium text-navy-900 mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
