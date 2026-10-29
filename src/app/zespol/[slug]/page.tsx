import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  CalendarDays,
  GraduationCap,
  Languages,
} from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import SectionHeading from "@/src/components/common/SectionHeading";
import TeamCard from "@/src/components/cards/TeamCard";
import { services } from "@/src/data/services";
import { openingHours } from "@/src/data/site";
import { getTeamMember, team } from "@/src/data/team";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const member = getTeamMember((await params).slug);
  if (!member) return {};

  return {
    title: `${member.name} – ${member.role}`,
    description: member.bio[0],
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const member = getTeamMember((await params).slug);
  if (!member) notFound();

  const memberServices = services.filter((s) => member.services.includes(s.slug));
  const others = team.filter((m) => m.slug !== member.slug).slice(0, 4);
  const workDays = openingHours.filter((_, day) => member.workDays.includes(day));

  return (
    <>
      <PageHeader
        title={member.name}
        description={`${member.title} · ${member.role}`}
        breadcrumbs={[{ label: "Zespół", href: "/zespol" }, { label: member.name }]}
      />

      <section className="py-16 lg:py-20">
        <div className="container-custom grid lg:grid-cols-[380px_1fr] gap-12">
          <div className="lg:sticky lg:top-36 self-start">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 max-w-sm mx-auto lg:max-w-none">
              <Image
                src={member.image}
                alt={`${member.title} ${member.name}`}
                fill
                priority
                placeholder="blur"
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
            </div>
            <Link
              href={`/rezerwacja?specjalista=${member.slug}`}
              className="flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Umów wizytę
              <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {member.specializations.map((item) => (
                <span
                  key={item}
                  className="bg-primary-50 text-primary-700 text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
              {member.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-2xl bg-gray-50 p-5">
                <Award className="text-primary-600 mb-2" size={22} />
                <p className="text-2xl font-bold text-navy-900">
                  {member.experience} lat
                </p>
                <p className="text-sm text-gray-500">doświadczenia</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-5">
                <Languages className="text-primary-600 mb-2" size={22} />
                <p className="font-semibold text-navy-900 capitalize">
                  {member.languages.join(", ")}
                </p>
                <p className="text-sm text-gray-500">języki</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-5">
                <CalendarDays className="text-primary-600 mb-2" size={22} />
                <p className="font-semibold text-navy-900">
                  {workDays.map((d) => d.short).join(", ")}
                </p>
                <p className="text-sm text-gray-500">dni przyjęć</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
              <GraduationCap className="text-primary-600" size={24} />
              Wykształcenie i kursy
            </h2>
            <ul className="space-y-3 mb-10">
              {member.education.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold text-navy-900 mb-4">
              Usługi specjalisty
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {memberServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.slug}
                    href={`/uslugi/${service.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-gray-100 p-4 hover:border-primary-200 hover:bg-primary-50/50 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-600 text-white flex items-center justify-center shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-navy-900 grow">
                      {service.name}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-primary-600 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <SectionHeading eyebrow="Zespół" title="Pozostali specjaliści" className="mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {others.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
