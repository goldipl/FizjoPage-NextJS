"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Anna Kowalska",
    text: "Świetna opieka, profesjonalne podejście i naprawdę widoczne efekty już po kilku wizytach. Polecam każdemu, kto szuka dobrego fizjoterapeuty.",
    rating: 5,
  },
  {
    name: "Piotr Nowak",
    text: "Bardzo miła i fachowa obsługa. Terapeuta dokładnie wytłumaczył na czym polega problem i jak będziemy nad nim pracować.",
    rating: 5,
  },
  {
    name: "Katarzyna Wiśniewska",
    text: "Dogodne godziny, krótki czas oczekiwania na wizytę i bardzo indywidualne podejście do pacjenta. Jestem bardzo zadowolona.",
    rating: 5,
  },
  {
    name: "Tomasz Zieliński",
    text: "Po kontuzji kolana trafiłem tutaj i mogę śmiało powiedzieć, że to była najlepsza decyzja. Wracam do pełnej sprawności.",
    rating: 5,
  },
];

export default function Reviews() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section id="opinie" className="py-20 lg:py-28 bg-gray-50">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Opinie <span className="text-primary-600">Pacjentów</span>
            </h2>
            <p className="text-gray-500 max-w-md">
              Zobacz, co mówią o nas nasi pacjenci
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Poprzednia opinia"
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Następna opinia"
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-primary-300 hover:bg-primary-50 flex items-center justify-center transition-colors"
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
            <SwiperSlide key={review.name} className="h-auto">
              <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 p-6">
                <Quote size={28} className="text-primary-200 mb-4" />

                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                  {review.text}
                </p>

                <p className="font-semibold text-navy-900 text-sm">
                  {review.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="reviews-pagination flex justify-center gap-2 mt-8 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet]:cursor-pointer [&_.swiper-pagination-bullet-active]:bg-primary-600 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet]:transition-all" />
      </div>
    </section>
  );
}
