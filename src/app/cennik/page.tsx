import type { Metadata } from "next";
import Link from "next/link";
import { Banknote, Clock, CreditCard, FileText, Smartphone } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import SectionHeading from "@/src/components/common/SectionHeading";
import FaqList from "@/src/components/common/FaqList";
import CtaBanner from "@/src/components/common/CtaBanner";
import { faq } from "@/src/data/content";
import { serviceCategories, services } from "@/src/data/services";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Aktualny cennik usług: fizjoterapia, terapia manualna, masaż, konsultacje ortopedyczne, USG, trening medyczny i pilates.",
};

function categoryId(category: string) {
  return category
    .toLowerCase()
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

const payments = [
  { icon: Banknote, label: "Gotówka" },
  { icon: CreditCard, label: "Karta płatnicza" },
  { icon: Smartphone, label: "BLIK" },
  { icon: FileText, label: "Faktura VAT" },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        title="Cennik"
        description="Przejrzyste ceny bez ukrytych kosztów. Przy pakietach wizyt oszczędzasz nawet 160 zł."
        breadcrumbs={[{ label: "Cennik" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom grid lg:grid-cols-[220px_1fr] gap-10">
          <nav aria-label="Kategorie cennika" className="hidden lg:block">
            <ul className="sticky top-36 space-y-1">
              {serviceCategories.map((category) => (
                <li key={category}>
                  <a
                    href={`#${categoryId(category)}`}
                    className="block px-4 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {serviceCategories.map((category) => (
              <div key={category} id={categoryId(category)} className="scroll-mt-36">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">
                  {category}
                </h2>
                <div className="space-y-6">
                  {services
                    .filter((service) => service.category === category)
                    .map((service) => (
                      <div
                        key={service.slug}
                        className="rounded-2xl border border-gray-100 overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 px-6 py-4">
                          <h3 className="font-semibold text-navy-900">
                            {service.name}
                          </h3>
                          <Link
                            href={`/uslugi/${service.slug}`}
                            className="text-sm text-primary-600 font-medium hover:underline"
                          >
                            Opis usługi
                          </Link>
                        </div>
                        <table className="w-full text-sm">
                          <caption className="sr-only">
                            Cennik – {service.name}
                          </caption>
                          <thead className="sr-only">
                            <tr>
                              <th>Usługa</th>
                              <th>Czas</th>
                              <th>Cena</th>
                              <th>Rezerwacja</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {service.prices.map((price) => (
                              <tr key={price.id}>
                                <td className="px-6 py-4">
                                  <p className="text-gray-700">{price.name}</p>
                                  {price.note && (
                                    <p className="text-xs text-emerald-600 mt-0.5">
                                      {price.note}
                                    </p>
                                  )}
                                </td>
                                <td className="px-2 py-4 text-gray-400 whitespace-nowrap hidden sm:table-cell">
                                  <span className="inline-flex items-center gap-1">
                                    <Clock size={13} />
                                    {price.duration} min
                                  </span>
                                </td>
                                <td className="px-2 py-4 text-right font-bold text-navy-900 whitespace-nowrap">
                                  {price.price} zł
                                </td>
                                <td className="px-6 py-4 text-right w-0">
                                  <Link
                                    href={`/rezerwacja?usluga=${service.slug}&wariant=${price.id}`}
                                    className="inline-flex bg-primary-50 hover:bg-primary-600 text-primary-700 hover:text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap"
                                  >
                                    Umów
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <div className="rounded-2xl bg-primary-50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-navy-900 mb-4">
                Formy płatności
              </h2>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {payments.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Icon size={18} className="text-primary-600" />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Usługi medyczne są zwolnione z podatku VAT. Cennik obowiązuje
                od 1 września 2026 r.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-custom grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeading
            eyebrow="FAQ"
            title="Pytania o płatności i wizyty"
          />
          <FaqList items={faq.slice(2, 6)} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
