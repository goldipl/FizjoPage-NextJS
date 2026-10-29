"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {
  Sparkles,
  Clock,
  Timer,
  Wallet,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import TeamCard from "@/src/components/cards/TeamCard";
import { team } from "@/src/data/team";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const highlights = [
  { icon: Sparkles, label: "Fachowe, indywidualne podejście" },
  { icon: Clock, label: "Dogodne godziny otwarcia" },
  { icon: Timer, label: "Krótkie terminy realizacji" },
  { icon: Wallet, label: "Przystępne ceny" },
];

export default function Team() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="kadra" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12">
          {/* Left column */}
          <div>
            <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Zespół
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Nasza <span className="text-primary-600">Kadra</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Poznaj naszych wykwalifikowanych specjalistów
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-primary-600" />
                  </div>
                  <span className="text-gray-600">{label}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Poprzedni specjalista"
                className="hidden sm:flex w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Następny specjalista"
                className="hidden sm:flex w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 items-center justify-center transition-colors"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
              <Link
                href="/zespol"
                className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm sm:ml-3 hover:gap-2.5 transition-all"
              >
                Cały zespół
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Team slider */}
          <div className="relative min-w-0">
            <Swiper
              modules={[Navigation, Pagination]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={20}
              slidesPerView={1.6}
              pagination={{ clickable: true, el: ".team-pagination" }}
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1280: { slidesPerView: 4.2 },
              }}
              className="!pb-2 w-full"
            >
              {team.map((member) => (
                <SwiperSlide key={member.slug} className="!h-auto">
                  <TeamCard member={member} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Fade/shadow overlay signaling more content */}
            <div className="pointer-events-none absolute top-0 right-0 bottom-8 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="team-pagination swiper-bullets" />
          </div>
        </div>
      </div>
    </section>
  );
}
