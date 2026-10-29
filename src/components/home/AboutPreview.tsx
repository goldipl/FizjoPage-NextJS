import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheckBig } from "lucide-react";

import SectionHeading from "@/src/components/common/SectionHeading";
import { stats } from "@/src/data/content";
import aboutImg from "@/public/img/pages/o-nas.webp";

const points = [
  "Lekarze i fizjoterapeuci współpracujący przy jednym pacjencie",
  "Diagnostyka USG na miejscu – bez skierowania",
  "Indywidualny plan terapii i ćwiczenia do domu",
  "Wizyty bez kolejek, także w sobotę",
];

export function StatsGrid({ dark = false }: { dark?: boolean }) {
  return (
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex flex-col-reverse rounded-2xl p-6 text-center ${
            dark ? "bg-white/5 border border-white/10" : "bg-primary-50"
          }`}
        >
          <dt
            className={`text-sm ${dark ? "text-primary-100/70" : "text-gray-500"}`}
          >
            {stat.label}
          </dt>
          <dd
            className={`text-3xl sm:text-4xl font-bold mb-1 ${
              dark ? "text-white" : "text-primary-600"
            }`}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary-50/50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="relative">
            <div className="relative aspect-[10/11] max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden">
              <Image
                src={aboutImg}
                alt="Specjaliści analizujący wyniki badań"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-6 right-0 sm:right-10 lg:right-0 xl:right-10 bg-navy-900 text-white rounded-2xl px-6 py-5 shadow-xl">
              <p className="text-4xl font-bold">14+</p>
              <p className="text-sm text-primary-100/80">lat doświadczenia</p>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="O nas"
              title={
                <>
                  Leczymy przyczynę,{" "}
                  <span className="text-primary-600">nie tylko objawy</span>
                </>
              }
              description="FizjoWebsite to nowoczesne centrum medyczne, w którym lekarze i fizjoterapeuci tworzą jeden zespół. Dzięki temu diagnoza, terapia i kontrola postępów odbywają się w jednym miejscu."
              className="mb-8"
            />
            <ul className="space-y-4 mb-8">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CircleCheckBig
                    size={20}
                    className="text-primary-600 shrink-0 mt-0.5"
                  />
                  <span className="text-gray-600">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/o-nas"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Poznaj nas
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <StatsGrid />
      </div>
    </section>
  );
}
