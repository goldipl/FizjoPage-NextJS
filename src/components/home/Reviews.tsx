"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import ReviewCard, { Stars } from "@/src/components/cards/ReviewCard";
import { ratingSummary, reviews } from "@/src/data/content";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="opinie" className="py-20 lg:py-28 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-primary-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Opinie
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Opinie <span className="text-primary-600">Pacjentów</span>
            </h2>
            <div className="flex items-center gap-3">
              <Stars rating={5} />
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-navy-900">
                  {ratingSummary.average.toLocaleString("pl-PL")}/5
                </span>{" "}
                · {ratingSummary.count} opinii
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Poprzednia opinia"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Następna opinia"
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          pagination={{ clickable: true, el: ".reviews-pagination" }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="!pb-2"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.name} className="!h-auto">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="reviews-pagination swiper-bullets" />
      </div>
    </section>
  );
}
