import type { Metadata } from "next";

import PageHeader from "@/src/components/common/PageHeader";
import CtaBanner from "@/src/components/common/CtaBanner";
import ServiceCard from "@/src/components/cards/ServiceCard";
import Process from "@/src/components/home/Process";
import { serviceCategories, services } from "@/src/data/services";

export const metadata: Metadata = {
  title: "Usługi",
  description:
    "Fizjoterapia, terapia manualna, masaż leczniczy, rehabilitacja sportowa, trening medyczny, pilates, konsultacje ortopedyczne i USG.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Nasze usługi"
        description="Kompleksowa opieka nad narządem ruchu – od diagnostyki, przez terapię, aż po trening i profilaktykę."
        breadcrumbs={[{ label: "Usługi" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom space-y-16">
          {serviceCategories.map((category) => {
            const items = services.filter((s) => s.category === category);
            if (items.length === 0) return null;

            return (
              <div key={category}>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-navy-900 shrink-0">
                    {category}
                  </h2>
                  <div className="h-px bg-gray-200 grow" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {items.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Process />
      <CtaBanner />
    </>
  );
}
