import type { ReactNode } from "react";
import Link from "next/link";
import {
  type LucideIcon,
  ArrowRight,
  CalendarCheck,
  Clock,
  Facebook,
  HeartPulse,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import HeroSlider from "@/src/components/home/HeroSlider";
import OpeningHoursStatus from "@/src/components/home/OpeningHoursStatus";
import { fullAddress, siteConfig } from "@/src/data/site";

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

function CardHeading({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
        <Icon size={20} />
      </span>
      <h2 className="text-lg font-semibold text-navy-900">{children}</h2>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <h1 className="sr-only">
        {siteConfig.name} – {siteConfig.tagline}: fizjoterapia i rehabilitacja
      </h1>

      <HeroSlider />

      <div className="bg-gray-50">
        {/* Info card overlapping the bottom edge of the slider */}
        <div className="container-custom relative z-10 -mt-24 lg:-mt-28">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl shadow-navy-950/10 ring-1 ring-navy-950/5 overflow-hidden grid md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr]">
            {/* Opening hours */}
            <div className="p-7 sm:p-9">
              <CardHeading icon={Clock}>Godziny otwarcia</CardHeading>
              <OpeningHoursStatus />
            </div>

            {/* Contact */}
            <div className="p-7 sm:p-9 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col">
              <CardHeading icon={Phone}>Rejestracja</CardHeading>
              <p className="text-sm text-gray-500 mb-2">Zadzwoń i umów wizytę</p>
              <a
                href={siteConfig.phoneHref}
                className="text-2xl sm:text-[1.75rem] font-bold text-navy-900 hover:text-primary-600 transition-colors whitespace-nowrap tabular-nums"
              >
                {siteConfig.phone}
              </a>

              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 hover:text-primary-600 transition-colors"
                  >
                    <Mail size={17} className="text-primary-500 shrink-0" />
                    {siteConfig.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="text-primary-500 shrink-0 mt-0.5" />
                  {fullAddress}
                </li>
              </ul>
            </div>

            {/* Online booking — the primary action */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 text-white p-7 sm:p-9 md:col-span-2 lg:col-span-1 flex flex-col">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-6 bottom-[-5rem] w-40 h-40 rounded-full bg-white/5"
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <CalendarCheck size={20} />
                  </span>
                  <h2 className="text-lg font-semibold">Rezerwacja online</h2>
                </div>
                <p className="text-primary-100 text-sm leading-relaxed mb-6">
                  Wybierz specjalistę i dogodny termin – zajmie Ci to mniej
                  niż minutę, bez dzwonienia.
                </p>

                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 mb-7">
                  <Link
                    href="/rezerwacja"
                    className="group flex-1 inline-flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-5 py-3.5 rounded-xl shadow-lg shadow-navy-950/20 transition-colors"
                  >
                    Umów wizytę
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/cennik"
                    className="flex-1 inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/25 font-semibold px-5 py-3.5 rounded-xl transition-colors"
                  >
                    Cennik
                  </Link>
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between gap-4 border-t border-white/15">
                  <span className="text-sm text-primary-100">Obserwuj nas</span>
                  <div className="flex gap-2">
                    <a
                      href={siteConfig.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-primary-700 flex items-center justify-center transition-colors"
                    >
                      <Facebook size={16} />
                    </a>
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-primary-700 flex items-center justify-center transition-colors"
                    >
                      <Instagram size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why us */}
        <div className="container-custom">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5 py-16 lg:py-20">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl p-6 ring-1 ring-gray-100 hover:ring-primary-100 hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
