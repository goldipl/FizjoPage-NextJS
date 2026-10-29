import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { TeamMember } from "@/src/data/team";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Link
      href={`/zespol/${member.slug}`}
      className="group block h-full rounded-2xl border border-gray-100 overflow-hidden bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-shadow"
    >
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.title} ${member.name}`}
          fill
          placeholder="blur"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
        />
      </div>
      <div className="p-4 text-center">
        <p className="text-gray-400 text-xs mb-0.5">{member.title}</p>
        <h3 className="font-semibold text-navy-900 text-sm sm:text-base leading-snug mb-0.5">
          {member.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3">{member.role}</p>
        <span className="inline-flex items-center gap-1 text-primary-600 text-xs font-semibold group-hover:gap-2 transition-all">
          Zobacz profil
          <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
