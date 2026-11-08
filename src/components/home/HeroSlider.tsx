"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";

import heroImg from "@/public/img/pages/hero.webp";
import receptionImg from "@/public/img/gallery/recepcja.webp";
import rehabImg from "@/public/img/gallery/sala-rehabilitacyjna.webp";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type Slide = {
  image: StaticImageData;
  alt: string;
  position: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
};

const slides: Slide[] = [
  {
    image: receptionImg,
    alt: "Recepcja centrum medycznego",
    position: "object-center",
    title: "Zadbaj o zdrowie",
    subtitle: "całej rodziny",
    cta: { label: "Usługi", href: "/uslugi" },
  },
  {
    image: heroImg,
    alt: "Fizjoterapeuta podczas terapii nadgarstka pacjentki",
    position: "object-[70%_center]",
    title: "Wróć do sprawności",
    subtitle: "z pomocą specjalistów",
    cta: { label: "Umów wizytę", href: "/rezerwacja" },
  },
  {
    image: rehabImg,
    alt: "Nowoczesna sala rehabilitacyjna",
    position: "object-center",
    title: "Nowoczesna rehabilitacja",
    subtitle: "w komfortowych warunkach",
    cta: { label: "Galeria", href: "/galeria" },
  },
];

export default function HeroSlider() {
  return (
    <section
      aria-roledescription="karuzela"
      aria-label="Najważniejsze informacje"
      className="hero-slider relative bg-navy-950"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        a11y={{
          prevSlideMessage: "Poprzedni slajd",
          nextSlideMessage: "Następny slajd",
          paginationBulletMessage: "Przejdź do slajdu {{index}}",
        }}
        className="h-[560px] sm:h-[620px] lg:h-[720px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.title} className="relative overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              placeholder="blur"
              sizes="100vw"
              className={`hero-zoom object-cover ${slide.position}`}
            />
            {/* Overlays keep the headline readable on any photo. */}
            <div className="absolute inset-0 bg-navy-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

            <div className="container-custom relative h-full flex items-center justify-center pb-24 lg:pb-28">
              <div className="hero-copy max-w-4xl text-center">
                <h2 className="text-white font-bold tracking-tight !leading-[1.05] text-5xl sm:text-6xl lg:text-7xl drop-shadow-[0_2px_12px_rgba(10,31,61,0.45)]">
                  {slide.title}
                </h2>
                <div className="mt-3 flex flex-col items-center gap-8">
                  <p className="text-white font-light text-3xl sm:text-4xl lg:text-5xl drop-shadow-[0_2px_12px_rgba(10,31,61,0.45)]">
                    {slide.subtitle}
                  </p>
                  <Link
                    href={slide.cta.href}
                    className="bg-white text-primary-700 hover:bg-primary-600 hover:text-white text-sm font-semibold uppercase tracking-[0.15em] px-8 py-4 shadow-lg shadow-navy-950/20 transition-colors"
                  >
                    {slide.cta.label}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-pagination absolute inset-x-0 bottom-28 lg:bottom-32 z-10 flex justify-center gap-2.5" />
    </section>
  );
}
