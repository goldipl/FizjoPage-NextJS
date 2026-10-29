import type { Metadata } from "next";
import Image from "next/image";
import { Award, Eye, HeartHandshake, Lightbulb, Target, Users } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import SectionHeading from "@/src/components/common/SectionHeading";
import CtaBanner from "@/src/components/common/CtaBanner";
import TeamCard from "@/src/components/cards/TeamCard";
import { StatsGrid } from "@/src/components/home/AboutPreview";
import { siteConfig } from "@/src/data/site";
import { team } from "@/src/data/team";
import aboutImg from "@/public/img/pages/o-nas.webp";
import careImg from "@/public/img/pages/opieka.webp";

export const metadata: Metadata = {
  title: "O nas",
  description: `Poznaj ${siteConfig.name} – centrum medyczne, w którym lekarze i fizjoterapeuci tworzą jeden zespół.`,
};

const values = [
  {
    icon: HeartHandshake,
    title: "Pacjent w centrum",
    text: "Słuchamy, tłumaczymy i wspólnie podejmujemy decyzje o leczeniu.",
  },
  {
    icon: Lightbulb,
    title: "Wiedza oparta na dowodach",
    text: "Stosujemy metody o potwierdzonej skuteczności i stale się szkolimy.",
  },
  {
    icon: Users,
    title: "Praca zespołowa",
    text: "Lekarze i fizjoterapeuci konsultują przypadki i wspólnie planują terapię.",
  },
  {
    icon: Award,
    title: "Najwyższa jakość",
    text: "Nowoczesny sprzęt, komfortowe gabinety i rzetelna dokumentacja.",
  },
];

const timeline = [
  { year: "2012", text: "Otwarcie pierwszego gabinetu fizjoterapii z dwoma terapeutami." },
  { year: "2015", text: "Przeprowadzka do obecnej siedziby i otwarcie sali ćwiczeń." },
  { year: "2018", text: "Dołączenie lekarzy specjalistów i uruchomienie pracowni USG." },
  { year: "2022", text: "Start zajęć pilates medycznego i treningu medycznego." },
  { year: "2026", text: "Rezerwacja online i ponad 25 000 przeprowadzonych wizyt." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Centrum, w którym leczymy przyczynę, nie tylko objawy"
        description={`Od ${siteConfig.foundedYear} roku pomagamy pacjentom wrócić do zdrowia i pełnej sprawności.`}
        breadcrumbs={[{ label: "O nas" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Nasza historia"
              title="Z pasji do ruchu i ludzi"
              className="mb-6"
            />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                {siteConfig.name} powstało z prostej idei: pacjent nie powinien
                krążyć między gabinetami, by dowiedzieć się, co mu dolega i jak
                to leczyć. Dlatego pod jednym dachem połączyliśmy fizjoterapię,
                konsultacje lekarskie i diagnostykę obrazową.
              </p>
              <p>
                Dziś nasz zespół to ośmiu specjalistów – fizjoterapeutów,
                lekarzy i masażystów – którzy codziennie wymieniają się wiedzą i
                wspólnie prowadzą pacjentów. Każdy plan leczenia jest
                indywidualny, a jego postępy regularnie oceniamy.
              </p>
              <p>
                Pracujemy z osobami w każdym wieku: od dzieci z wadami postawy,
                przez sportowców po kontuzjach, aż po seniorów, którym pomagamy
                zachować sprawność i samodzielność.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mt-10">
              <Image
                src={aboutImg}
                alt="Zespół specjalistów podczas konsultacji"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src={careImg}
                alt="Troskliwa opieka nad pacjentem"
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 45vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-navy-950">
        <div className="container-custom">
          <StatsGrid dark />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="rounded-2xl bg-primary-50 p-8">
              <Target className="text-primary-600 mb-4" size={32} />
              <h3 className="text-xl font-bold text-navy-900 mb-2">Misja</h3>
              <p className="text-gray-600 leading-relaxed">
                Skutecznie i z szacunkiem pomagać pacjentom odzyskać sprawność,
                łącząc wiedzę lekarzy i fizjoterapeutów w jednym, spójnym
                procesie leczenia.
              </p>
            </div>
            <div className="rounded-2xl bg-navy-900 text-white p-8">
              <Eye className="text-primary-300 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Wizja</h3>
              <p className="text-primary-100/80 leading-relaxed">
                Być pierwszym wyborem w regionie dla osób, które chcą świadomie
                dbać o zdrowie narządu ruchu – od profilaktyki po rehabilitację.
              </p>
            </div>
          </div>

          <SectionHeading
            eyebrow="Wartości"
            title="Czym się kierujemy"
            align="center"
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:shadow-gray-200/60 transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom max-w-4xl">
          <SectionHeading
            eyebrow="Historia"
            title="Jak się rozwijaliśmy"
            align="center"
            className="mb-12"
          />
          <ol className="relative border-l-2 border-primary-200 ml-3 space-y-8">
            {timeline.map((item) => (
              <li key={item.year} className="pl-8 relative">
                <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-primary-600 ring-4 ring-primary-100" />
                <p className="text-primary-600 font-bold text-lg">{item.year}</p>
                <p className="text-gray-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Zespół"
            title="Poznaj naszych specjalistów"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.slice(0, 4).map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
