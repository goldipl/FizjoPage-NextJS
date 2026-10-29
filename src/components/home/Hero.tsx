import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

import { LogoMark } from "@/src/components/common/Logo";
import { Stars } from "@/src/components/cards/ReviewCard";
import { ratingSummary } from "@/src/data/content";
import { siteConfig } from "@/src/data/site";
import heroImg from "@/public/img/pages/hero.webp";

const features = [
  { icon: Sparkles, label: "Nowoczesny sprzęt" },
  { icon: ShieldCheck, label: "Doświadczeni specjaliści" },
  { icon: UserCheck, label: "Indywidualne podejście" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-primary-50/60 to-white">
      <div className="container-custom relative pt-14 pb-20 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="relative z-10 text-center lg:text-left">
            <p className="inline-flex items-center gap-2 bg-white border border-primary-100 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Wolne terminy już od jutra
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold !leading-[1.15] text-navy-900 mb-6">
              Profesjonalna{" "}
              <span className="text-primary-600">Rehabilitacja</span> i
              Fizjoterapia
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto lg:mx-0 mb-8">
              Witamy w {siteConfig.name}. Skuteczna pomoc w powrocie do zdrowia
              i pełnej sprawności – fizjoterapeuci, lekarze i diagnostyka pod
              jednym dachem.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                href="/rezerwacja"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-primary-200"
              >
                Umów się na wizytę
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/uslugi"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Zobacz usługi
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start mt-8">
              <Stars rating={5} size={18} />
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-navy-900">
                  {ratingSummary.average.toLocaleString("pl-PL")}/5
                </span>{" "}
                na podstawie {ratingSummary.count} opinii
              </p>
            </div>
          </div>

          {/* Right column - image with watermark shape */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -right-10 -top-10 w-[420px] h-[420px] opacity-[0.15] pointer-events-none hidden sm:block">
              <LogoMark className="w-full h-full" />
            </div>
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary-900/10">
              <Image
                src={heroImg}
                alt="Lekarka rozmawiająca z pacjentką w gabinecie"
                fill
                priority
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
            <div className="absolute -bottom-6 left-0 sm:left-6 lg:-left-6 bg-white rounded-2xl shadow-xl shadow-gray-300/40 px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                <CalendarCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900">
                  Rezerwacja online 24/7
                </p>
                <p className="text-xs text-gray-500">Potwierdzenie od razu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div className="relative z-10 mt-16 bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-50 px-6 py-6 md:px-10">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-start"
              >
                <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <span className="text-gray-700 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
