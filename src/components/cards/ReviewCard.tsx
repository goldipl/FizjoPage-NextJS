import { Quote, Star } from "lucide-react";

import type { Review } from "@/src/data/content";

export function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} na 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <Stars rating={review.rating} />
        <Quote size={28} className="text-primary-200" />
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
        {review.text}
      </p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm flex items-center justify-center">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-navy-900 text-sm">{review.name}</p>
          <p className="text-gray-400 text-xs">
            {review.service} · {review.date}
          </p>
        </div>
      </div>
    </div>
  );
}
