import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

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
    <>
      <section className="relative isolate overflow-hidden bg-navy-950">
        <Image
          src={heroImg}
          alt="Fizjoterapeuta podczas terapii nadgarstka pacjentki"
          fill
          priority
          placeholder="blur"
          className="object-cover object-[70%_center] -z-20"
          sizes="100vw"
        />
        {/* Gradient keeps the text readable while the photo stays visible on the right. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/10 lg:via-navy-950/70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/30" />

        <div className="container-custom pt-16 pb-32 sm:pt-24 lg:pt-32 lg:pb-44">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Wolne terminy już od jutra
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold !leading-[1.12] text-white mb-6">
              Profesjonalna{" "}
              <span className="text-primary-300">Rehabilitacja</span> i
              Fizjoterapia
            </h1>
            <p className="text-primary-100/85 text-lg max-w-xl mb-9">
              Witamy w {siteConfig.name}. Skuteczna pomoc w powrocie do zdrowia
              i pełnej sprawności – fizjoterapeuci, lekarze i diagnostyka pod
              jednym dachem.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/rezerwacja"
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-7 py-4 rounded-xl transition-colors shadow-lg shadow-primary-900/40"
              >
                <CalendarCheck size={18} />
                Umów się na wizytę
              </Link>
              <Link
                href="/uslugi"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                Zobacz usługi
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-9">
              <Stars rating={5} size={18} />
              <p className="text-sm text-primary-100/80">
                <span className="font-semibold text-white">
                  {ratingSummary.average.toLocaleString("pl-PL")}/5
                </span>{" "}
                na podstawie {ratingSummary.count} opinii pacjentów
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature bar overlapping the bottom edge of the hero */}
      <div className="container-custom relative z-10 -mt-16 lg:-mt-20">
        <div className="bg-white rounded-2xl shadow-xl shadow-navy-950/10 border border-gray-50 px-6 py-6 md:px-10">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <span className="text-gray-700 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
