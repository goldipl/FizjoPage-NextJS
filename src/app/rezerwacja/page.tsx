import type { Metadata } from "next";
import { Suspense } from "react";
import { LoaderCircle, Phone } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import BookingForm from "@/src/components/forms/BookingForm";
import { siteConfig } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Rezerwacja online",
  description:
    "Zarezerwuj wizytę online: wybierz usługę, specjalistę i dogodny termin w mniej niż 2 minuty.",
};

function Loading() {
  return (
    <div className="flex items-center justify-center gap-3 py-24 text-gray-400">
      <LoaderCircle className="animate-spin" size={24} />
      Ładowanie kalendarza...
    </div>
  );
}

export default function BookingPage() {
  return (
    <>
      <PageHeader
        title="Rezerwacja online"
        description="Wybierz usługę, specjalistę i termin – rezerwacja zajmie mniej niż 2 minuty."
        breadcrumbs={[{ label: "Rezerwacja" }]}
      />

      <section className="py-12 lg:py-16">
        <div className="container-custom">
          <Suspense fallback={<Loading />}>
            <BookingForm />
          </Suspense>

          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gray-500 text-center mt-12">
            <Phone size={16} className="text-primary-600" />
            Wolisz zarezerwować telefonicznie? Zadzwoń:
            <a href={siteConfig.phoneHref} className="font-semibold text-navy-900 hover:text-primary-600 whitespace-nowrap">
              {siteConfig.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
