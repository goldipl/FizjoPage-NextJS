"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import {
  gallery,
  galleryCategories,
  type GalleryCategory,
} from "@/src/data/content";

type Filter = GalleryCategory | "Wszystkie";

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("Wszystkie");
  const [current, setCurrent] = useState<number | null>(null);

  const images =
    filter === "Wszystkie"
      ? gallery
      : gallery.filter((image) => image.category === filter);

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback(
    (delta: number) =>
      setCurrent((index) =>
        index === null ? null : (index + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (current === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close, step]);

  const active = current === null ? null : images[current];

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Filtruj zdjęcia">
        {(["Wszystkie", ...galleryCategories] as Filter[]).map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              filter === item
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((image, index) => (
          <button
            key={image.alt}
            onClick={() => setCurrent(index)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 text-left"
            aria-label={`Powiększ zdjęcie: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              placeholder="blur"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              <span>
                <span className="block text-xs text-primary-200">{image.category}</span>
                <span className="font-semibold">{image.alt}</span>
              </span>
              <ZoomIn size={22} />
            </span>
          </button>
        ))}
      </div>

      {active && current !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] bg-navy-950/95 flex items-center justify-center p-4 sm:p-10"
          onClick={close}
        >
          <button
            onClick={close}
            autoFocus
            aria-label="Zamknij"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <X size={24} />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Poprzednie zdjęcie"
            className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          <figure
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[78vh] mx-auto">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <figcaption className="text-center text-white mt-4">
              {active.alt}
              <span className="text-primary-200/70 text-sm ml-3">
                {current + 1} / {images.length}
              </span>
            </figcaption>
          </figure>
          <button
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Następne zdjęcie"
            className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
