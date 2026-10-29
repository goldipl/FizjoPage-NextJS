import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Clock, Mail, MapPin, Phone } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import ContactForm from "@/src/components/forms/ContactForm";
import { fullAddress, openingHoursSummary, siteConfig } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description: `Skontaktuj się z ${siteConfig.name}: ${fullAddress}, tel. ${siteConfig.phone}.`,
};

const { lat, lng } = siteConfig.map;
const bbox = [lng - 0.008, lat - 0.004, lng + 0.008, lat + 0.004].join(",");
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`;

export default function ContactPage() {
  const cards = [
    {
      icon: Phone,
      title: "Telefon",
      value: siteConfig.phone,
      href: siteConfig.phoneHref,
    },
    {
      icon: Mail,
      title: "E-mail",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    { icon: MapPin, title: "Adres", value: fullAddress, href: mapLink },
  ];

  return (
    <>
      <PageHeader
        title="Kontakt"
        description="Masz pytanie? Zadzwoń, napisz lub odwiedź nas osobiście – recepcja chętnie pomoże."
        breadcrumbs={[{ label: "Kontakt" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {cards.map(({ icon: Icon, title, value, href }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-gray-200/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">{title}</p>
                  <p className="font-semibold text-navy-900 break-words">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
                Napisz do nas
              </h2>
              <p className="text-gray-500 mb-8">
                Odpowiadamy zwykle w ciągu jednego dnia roboczego. Chcesz od
                razu umówić wizytę?{" "}
                <Link href="/rezerwacja" className="text-primary-600 font-semibold hover:underline">
                  Skorzystaj z rezerwacji online
                </Link>
                .
              </p>
              <ContactForm />
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-navy-950 text-white p-7">
                <h2 className="flex items-center gap-2 font-semibold text-lg mb-5">
                  <Clock size={20} className="text-primary-300" />
                  Godziny otwarcia
                </h2>
                <ul className="space-y-3">
                  {openingHoursSummary.map(({ day, time }) => (
                    <li
                      key={day}
                      className="flex justify-between gap-4 text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="text-primary-100/70">{day}</span>
                      <span className="font-medium">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl bg-primary-50 p-7">
                <h2 className="flex items-center gap-2 font-semibold text-lg text-navy-900 mb-3">
                  <Car size={20} className="text-primary-600" />
                  Dojazd i parking
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Bezpłatny parking dla pacjentów przed budynkiem. Przystanek
                  tramwajowy i autobusowy w odległości 3 minut pieszo. Wejście
                  bez barier architektonicznych, winda na każde piętro.
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Wyznacz trasę
                  <ArrowRight size={16} />
                </a>
              </div>
              <div className="text-sm text-gray-500 px-2">
                <p className="font-semibold text-navy-900">{siteConfig.name} Sp. z o.o.</p>
                <p>{fullAddress}</p>
                <p>NIP: {siteConfig.nip}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="h-[420px] bg-gray-100">
        <iframe
          title={`Mapa dojazdu – ${siteConfig.name}`}
          src={mapSrc}
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </>
  );
}
