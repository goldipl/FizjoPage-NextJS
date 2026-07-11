"use client";

import { useRef } from "react";
import Image from "next/image";
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
import IgaDrewinImg from "@/public/img/our-team/iga-drewin.jpg";
import MarcinDrewinImg from "@/public/img/our-team/marcin-drewin.jpg";
import NataliaKowalikImg from "@/public/img/our-team/natalia-kowalik.jpg";
import PatrycjaSzczodraImg from "@/public/img/our-team/patrycja-szczodra.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const highlights = [
  { icon: Sparkles, label: "Fachowe, indywidualne podejście" },
  { icon: Clock, label: "Dogodne godziny otwarcia" },
  { icon: Timer, label: "Krótkie terminy realizacji" },
  { icon: Wallet, label: "Przystępne ceny" },
];

const team = [
  {
    name: "Iga Augustyniak-Drewin",
    role: "Mgr Fizjoterapii",
    image: IgaDrewinImg,
  },
  {
    name: "Marcin Drewin",
    role: "Mgr fizjoterapii",
    image: MarcinDrewinImg,
  },
  {
    name: "Natalia Kowalik",
    role: "Mgr fizjoterapii",
    image: NataliaKowalikImg,
  },
  {
    name: "Patrycja Szczodra",
    role: "Mgr fizjoterapii",
    image: PatrycjaSzczodraImg,
  },
  {
    name: "Natalia Kowalik",
    role: "Mgr fizjoterapii",
    image: NataliaKowalikImg,
  },
  {
    name: "Patrycja Szczodra",
    role: "Mgr fizjoterapii",
    image: PatrycjaSzczodraImg,
  },
  {
    name: "Natalia Kowalik",
    role: "Mgr fizjoterapii",
    image: NataliaKowalikImg,
  },
  {
    name: "Patrycja Szczodra",
    role: "Mgr fizjoterapii",
    image: PatrycjaSzczodraImg,
  },
];

export default function Team() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="kadra" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12">
          {/* Left column */}
          <div>
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

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Poprzedni specjalista"
                className="w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Następny specjalista"
                className="w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
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
              slidesPerView={2.2}
              pagination={{ clickable: true, el: ".team-pagination" }}
              breakpoints={{
                640: { slidesPerView: 2.3 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
              }}
              className="!pb-2 w-full"
            >
              {team.map((member, index) => (
                <SwiperSlide key={`${member.name}-${index}`} className="h-auto">
                  <div className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 transition-shadow">
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 45vw, 22vw"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-navy-900 text-sm leading-snug mb-0.5">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-xs mb-3">
                        {member.role}
                      </p>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1 text-primary-600 text-xs font-semibold hover:text-primary-700"
                      >
                        Czytaj więcej
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Fade/shadow overlay signaling more content */}
            <div className="pointer-events-none absolute top-0 right-0 bottom-8 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="team-pagination flex justify-center gap-2 mt-8 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-primary-300 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet-active]:bg-primary-600 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all" />
          </div>
        </div>
      </div>
    </section>
  );
}
