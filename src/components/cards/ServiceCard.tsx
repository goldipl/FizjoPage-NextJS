import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getLowestPrice, type Service } from "@/src/data/services";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Link
      href={`/uslugi/${service.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={service.image}
            alt={service.name}
            fill
            placeholder="blur"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        {/* Outside the clipped image wrapper so the badge can overlap the card body. */}
        <div className="absolute left-4 -bottom-6 z-10 w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 ring-4 ring-white">
          <Icon size={22} />
        </div>
      </div>
      <div className="flex flex-col grow p-5 pt-10">
        <h3 className="font-semibold text-navy-900 text-lg mb-2">
          {service.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-5 grow">
          {service.short}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            od{" "}
            <span className="font-semibold text-navy-900">
              {getLowestPrice(service)} zł
            </span>
          </span>
          <span className="inline-flex items-center gap-1 text-primary-600 font-semibold group-hover:gap-2 transition-all">
            Szczegóły
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
