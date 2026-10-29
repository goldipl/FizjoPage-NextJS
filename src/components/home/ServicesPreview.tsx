import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SectionHeading from "@/src/components/common/SectionHeading";
import ServiceCard from "@/src/components/cards/ServiceCard";
import { services } from "@/src/data/services";

export default function ServicesPreview() {
  return (
    <section id="uslugi" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Usługi"
            title={
              <>
                W czym możemy <span className="text-primary-600">pomóc?</span>
              </>
            }
            description="Od pierwszej konsultacji, przez diagnostykę, aż po pełny powrót do sprawności – wszystko w jednym miejscu."
          />
          <Link
            href="/uslugi"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all shrink-0"
          >
            Wszystkie usługi
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
