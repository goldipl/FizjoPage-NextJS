import type { Metadata } from "next";

import PageHeader from "@/src/components/common/PageHeader";
import CtaBanner from "@/src/components/common/CtaBanner";
import TeamCard from "@/src/components/cards/TeamCard";
import { team } from "@/src/data/team";

export const metadata: Metadata = {
  title: "Nasz zespół",
  description:
    "Fizjoterapeuci, lekarze specjaliści i masażyści – poznaj zespół centrum medycznego FizjoWebsite.",
};

export default function TeamPage() {
  const doctors = team.filter((m) => m.title.startsWith("lek."));
  const therapists = team.filter((m) => !m.title.startsWith("lek."));

  return (
    <>
      <PageHeader
        title="Nasz zespół"
        description="Doświadczeni specjaliści, którzy na co dzień współpracują, aby zapewnić Ci najlepszą opiekę."
        breadcrumbs={[{ label: "Zespół" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom space-y-16">
          {[
            { title: "Fizjoterapeuci i masażyści", members: therapists },
            { title: "Lekarze specjaliści", members: doctors },
          ].map((group) => (
            <div key={group.title}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-navy-900 shrink-0">
                  {group.title}
                </h2>
                <div className="h-px bg-gray-200 grow" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {group.members.map((member) => (
                  <TeamCard key={member.slug} member={member} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Nie wiesz, do kogo się zapisać?"
        description="Zadzwoń do recepcji – na podstawie krótkiej rozmowy dobierzemy specjalistę do Twojego problemu."
      />
    </>
  );
}
