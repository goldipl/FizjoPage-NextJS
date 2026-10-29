import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheckBig, Clock, Phone } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import SectionHeading from "@/src/components/common/SectionHeading";
import FaqList from "@/src/components/common/FaqList";
import CtaBanner from "@/src/components/common/CtaBanner";
import ServiceCard from "@/src/components/cards/ServiceCard";
import TeamCard from "@/src/components/cards/TeamCard";
import { faq } from "@/src/data/content";
import { getService, services } from "@/src/data/services";
import { siteConfig } from "@/src/data/site";
import { getSpecialistsForService } from "@/src/data/team";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.intro,
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const specialists = getSpecialistsForService(service.slug);
  const related = services
    .filter((s) => s.slug !== service.slug)
    .sort((a, b) => Number(b.category === service.category) - Number(a.category === service.category))
    .slice(0, 4);
  const Icon = service.icon;

  return (
    <>
      <PageHeader
        title={service.name}
        description={service.intro}
        breadcrumbs={[{ label: "Usługi", href: "/uslugi" }, { label: service.name }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-custom grid lg:grid-cols-[1fr_380px] gap-12">
          <div>
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10">
              <Image
                src={service.image}
                alt={service.name}
                fill
                priority
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-12">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="rounded-2xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">
                  Wskazania
                </h2>
                <ul className="space-y-3">
                  {service.indications.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-primary-50 p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-4">
                  Korzyści
                </h2>
                <ul className="space-y-3">
                  {service.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                      <CircleCheckBig size={18} className="text-primary-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-navy-900 mb-6">
              Jak wygląda wizyta?
            </h2>
            <ol className="grid sm:grid-cols-2 gap-5">
              {service.steps.map((step, index) => (
                <li key={step.title} className="flex gap-4 rounded-2xl border border-gray-100 p-5">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-36 self-start space-y-6">
            <div className="rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-bold text-navy-900">Cennik</h2>
              </div>
              <ul className="divide-y divide-gray-100 mb-6">
                {service.prices.map((price) => (
                  <li key={price.id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-navy-900">{price.name}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        {price.duration} min
                        {price.note && (
                          <span className="text-emerald-600 ml-1">· {price.note}</span>
                        )}
                      </p>
                    </div>
                    <p className="font-bold text-primary-600 whitespace-nowrap">
                      {price.price} zł
                    </p>
                  </li>
                ))}
              </ul>
              <Link
                href={`/rezerwacja?usluga=${service.slug}`}
                className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl transition-colors mb-3"
              >
                Zarezerwuj wizytę
                <ArrowRight size={18} />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold py-3.5 rounded-xl transition-colors"
              >
                <Phone size={18} />
                {siteConfig.phone}
              </a>
            </div>
            <Link
              href="/cennik"
              className="block text-center text-sm text-primary-600 font-semibold hover:underline"
            >
              Zobacz pełny cennik
            </Link>
          </aside>
        </div>
      </section>

      {specialists.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Specjaliści"
              title="Kto wykonuje tę usługę?"
              className="mb-10"
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {specialists.map((member) => (
                <TeamCard key={member.slug} member={member} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-20">
        <div className="container-custom grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeading eyebrow="FAQ" title="Masz pytania?" description="Odpowiedzi na najczęstsze pytania pacjentów." />
          <FaqList items={faq.slice(0, 4)} />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <SectionHeading eyebrow="Zobacz także" title="Inne usługi" className="mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner href={`/rezerwacja?usluga=${service.slug}`} />
    </>
  );
}
