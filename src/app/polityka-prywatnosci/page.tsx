import type { Metadata } from "next";

import PageHeader from "@/src/components/common/PageHeader";
import { fullAddress, siteConfig } from "@/src/data/site";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Zasady przetwarzania danych osobowych w ${siteConfig.name}.`,
};

const sections = [
  {
    title: "1. Administrator danych",
    body: [
      `Administratorem danych osobowych jest ${siteConfig.name} Sp. z o.o. z siedzibą: ${fullAddress}, NIP: ${siteConfig.nip}. Kontakt w sprawach danych osobowych: ${siteConfig.email}, tel. ${siteConfig.phone}.`,
    ],
  },
  {
    title: "2. Cele i podstawy przetwarzania",
    body: [
      "Dane przetwarzamy w celu: rezerwacji i realizacji wizyt oraz prowadzenia dokumentacji medycznej (art. 6 ust. 1 lit. c i art. 9 ust. 2 lit. h RODO), udzielenia odpowiedzi na wiadomości przesłane formularzem kontaktowym (art. 6 ust. 1 lit. a i f RODO), a także dochodzenia ewentualnych roszczeń (art. 6 ust. 1 lit. f RODO).",
    ],
  },
  {
    title: "3. Okres przechowywania",
    body: [
      "Dokumentację medyczną przechowujemy przez okres wymagany przepisami prawa (co do zasady 20 lat). Dane z formularza kontaktowego – do czasu zakończenia korespondencji, nie dłużej niż 12 miesięcy.",
    ],
  },
  {
    title: "4. Odbiorcy danych",
    body: [
      "Dane mogą być przekazywane wyłącznie podmiotom wspierającym nas w świadczeniu usług (dostawcy systemów IT, hostingu i poczty) na podstawie umów powierzenia, a także podmiotom uprawnionym na podstawie przepisów prawa.",
    ],
  },
  {
    title: "5. Twoje prawa",
    body: [
      "Masz prawo dostępu do danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania, prawo do przenoszenia danych, wniesienia sprzeciwu oraz cofnięcia zgody w dowolnym momencie. Przysługuje Ci również prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych.",
    ],
  },
  {
    title: "6. Pliki cookies i pamięć przeglądarki",
    body: [
      "Strona nie wykorzystuje cookies marketingowych ani analitycznych. W pamięci przeglądarki (localStorage) zapisujemy jedynie informacje o dokonanych rezerwacjach, aby nie proponować zajętych terminów. Możesz je usunąć, czyszcząc dane witryny w ustawieniach przeglądarki.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Polityka prywatności"
        description="Dbamy o bezpieczeństwo Twoich danych osobowych i medycznych."
        breadcrumbs={[{ label: "Polityka prywatności" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-custom max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-navy-900 mb-3">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
          <p className="text-sm text-gray-400 border-t border-gray-100 pt-6">
            Ostatnia aktualizacja: 1 września 2026 r.
          </p>
        </div>
      </section>
    </>
  );
}
