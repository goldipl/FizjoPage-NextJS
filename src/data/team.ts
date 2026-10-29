import type { StaticImageData } from "next/image";

import karolinaImg from "@/public/img/team/karolina-wojcik.webp";
import tomaszImg from "@/public/img/team/tomasz-lewandowski.webp";
import ewaImg from "@/public/img/team/ewa-zawadzka.webp";
import michalImg from "@/public/img/team/michal-kaczmarek.webp";
import aleksandraImg from "@/public/img/team/aleksandra-nowicka.webp";
import pawelImg from "@/public/img/team/pawel-sikora.webp";
import juliaImg from "@/public/img/team/julia-mazur.webp";
import bartoszImg from "@/public/img/team/bartosz-pietrzak.webp";

// All people listed here are fictional; photos are stock images (Unsplash License).
export type TeamMember = {
  slug: string;
  name: string;
  title: string;
  role: string;
  image: StaticImageData;
  experience: number;
  specializations: string[];
  bio: string[];
  education: string[];
  languages: string[];
  services: string[];
  // Days of week (Date.getDay()) when the specialist accepts patients.
  workDays: number[];
};

export const team: TeamMember[] = [
  {
    slug: "karolina-wojcik",
    name: "Karolina Wójcik",
    title: "mgr fizjoterapii",
    role: "Fizjoterapeutka, kierownik zespołu",
    image: karolinaImg,
    experience: 14,
    specializations: ["Terapia manualna", "Kręgosłup", "Staw skroniowo-żuchwowy"],
    bio: [
      "Od początku istnienia FizjoWebsite koordynuje pracę zespołu fizjoterapeutów. Specjalizuje się w leczeniu bólów kręgosłupa i zaburzeń stawu skroniowo-żuchwowego.",
      "W pracy stawia na dokładną diagnostykę i edukację pacjenta – wierzy, że świadomy pacjent szybciej wraca do zdrowia.",
    ],
    education: [
      "Fizjoterapia – Akademia Wychowania Fizycznego",
      "Terapia manualna wg koncepcji Maitland",
      "Terapia stawu skroniowo-żuchwowego",
      "Kinesiology Taping",
    ],
    languages: ["polski", "angielski"],
    services: ["fizjoterapia", "terapia-manualna"],
    workDays: [1, 2, 3, 4, 5],
  },
  {
    slug: "tomasz-lewandowski",
    name: "Tomasz Lewandowski",
    title: "mgr fizjoterapii",
    role: "Fizjoterapeuta sportowy",
    image: tomaszImg,
    experience: 9,
    specializations: ["Rehabilitacja sportowa", "Rekonstrukcja ACL", "Testy funkcjonalne"],
    bio: [
      "Współpracuje z klubami sportowymi i biegaczami amatorami. Prowadzi pacjentów od pierwszych dni po urazie aż po pełny powrót do rywalizacji.",
      "Prywatnie maratończyk i triathlonista – doskonale rozumie, jak ważny jest dla sportowca szybki i bezpieczny powrót do treningów.",
    ],
    education: [
      "Fizjoterapia – Uniwersytet Medyczny",
      "Fizjoterapia w sporcie – studia podyplomowe",
      "Functional Movement Screen (FMS)",
    ],
    languages: ["polski", "angielski"],
    services: ["rehabilitacja-sportowa", "fizjoterapia", "trening-medyczny"],
    workDays: [1, 2, 3, 4, 6],
  },
  {
    slug: "ewa-zawadzka",
    name: "Ewa Zawadzka",
    title: "lek. med.",
    role: "Specjalista ortopedii i traumatologii",
    image: ewaImg,
    experience: 18,
    specializations: ["Ortopedia", "Iniekcje dostawowe", "Urazy sportowe"],
    bio: [
      "Lekarz specjalista ortopedii i traumatologii narządu ruchu. Zajmuje się diagnostyką i leczeniem urazów oraz chorób zwyrodnieniowych stawów.",
      "Wykonuje iniekcje dostawowe pod kontrolą USG. Ściśle współpracuje z zespołem fizjoterapeutów, planując wspólnie leczenie pacjentów.",
    ],
    education: [
      "Wydział Lekarski – Uniwersytet Medyczny",
      "Specjalizacja z ortopedii i traumatologii narządu ruchu",
      "Ultrasonografia narządu ruchu",
    ],
    languages: ["polski", "angielski", "niemiecki"],
    services: ["konsultacja-ortopedyczna", "diagnostyka-usg"],
    workDays: [2, 4],
  },
  {
    slug: "michal-kaczmarek",
    name: "Michał Kaczmarek",
    title: "mgr fizjoterapii",
    role: "Fizjoterapeuta, trener medyczny",
    image: michalImg,
    experience: 7,
    specializations: ["Trening medyczny", "Seniorzy", "Rehabilitacja pooperacyjna"],
    bio: [
      "Łączy fizjoterapię z treningiem siłowym. Pomaga pacjentom po zabiegach operacyjnych odbudować siłę i pewność ruchu.",
      "Prowadzi także treningi dla seniorów, skupione na równowadze, profilaktyce upadków i sprawności w codziennym życiu.",
    ],
    education: [
      "Fizjoterapia – Akademia Wychowania Fizycznego",
      "Trener przygotowania motorycznego",
      "PNF – Proprioceptive Neuromuscular Facilitation",
    ],
    languages: ["polski"],
    services: ["trening-medyczny", "fizjoterapia"],
    workDays: [1, 3, 5, 6],
  },
  {
    slug: "aleksandra-nowicka",
    name: "Aleksandra Nowicka",
    title: "lek. med.",
    role: "Specjalista rehabilitacji medycznej",
    image: aleksandraImg,
    experience: 12,
    specializations: ["Rehabilitacja medyczna", "USG narządu ruchu", "Bóle przewlekłe"],
    bio: [
      "Lekarz specjalista rehabilitacji medycznej. Wykonuje badania USG narządu ruchu i kwalifikuje pacjentów do terapii.",
      "Szczególnie interesuje się leczeniem bólu przewlekłego i łączeniem metod farmakologicznych z fizjoterapią.",
    ],
    education: [
      "Wydział Lekarski – Uniwersytet Medyczny",
      "Specjalizacja z rehabilitacji medycznej",
      "Certyfikat USG narządu ruchu",
    ],
    languages: ["polski", "angielski"],
    services: ["diagnostyka-usg", "konsultacja-ortopedyczna"],
    workDays: [1, 3, 5],
  },
  {
    slug: "pawel-sikora",
    name: "Paweł Sikora",
    title: "dr n. o zdr.",
    role: "Fizjoterapeuta, terapeuta manualny",
    image: pawelImg,
    experience: 16,
    specializations: ["Terapia manualna", "Neurodynamika", "Bóle głowy"],
    bio: [
      "Doktor nauk o zdrowiu i wykładowca fizjoterapii. Specjalizuje się w terapii manualnej i neurodynamice.",
      "Pracuje z pacjentami z przewlekłymi bólami kręgosłupa szyjnego i bólami głowy, a także szkoli młodszych fizjoterapeutów.",
    ],
    education: [
      "Doktorat z nauk o zdrowiu",
      "Terapia manualna wg koncepcji Mulligan",
      "Neurodynamika kliniczna",
    ],
    languages: ["polski", "angielski"],
    services: ["terapia-manualna", "fizjoterapia"],
    workDays: [2, 3, 4],
  },
  {
    slug: "julia-mazur",
    name: "Julia Mazur",
    title: "mgr fizjoterapii",
    role: "Fizjoterapeutka, instruktorka pilates",
    image: juliaImg,
    experience: 6,
    specializations: ["Pilates medyczny", "Wady postawy", "Fizjoterapia kobiet"],
    bio: [
      "Prowadzi zajęcia pilates medycznego oraz terapię wad postawy u dzieci i dorosłych.",
      "Zajmuje się również fizjoterapią kobiet w ciąży i po porodzie, pomagając wrócić do aktywności bezpiecznie i bez bólu.",
    ],
    education: [
      "Fizjoterapia – Uniwersytet Medyczny",
      "Instruktor pilates (Polestar)",
      "Fizjoterapia uroginekologiczna",
    ],
    languages: ["polski", "angielski", "hiszpański"],
    services: ["pilates-medyczny", "fizjoterapia", "trening-medyczny"],
    workDays: [1, 2, 4, 5, 6],
  },
  {
    slug: "bartosz-pietrzak",
    name: "Bartosz Pietrzak",
    title: "masażysta dyplomowany",
    role: "Masażysta",
    image: bartoszImg,
    experience: 10,
    specializations: ["Masaż sportowy", "Masaż tkanek głębokich", "Drenaż limfatyczny"],
    bio: [
      "Dyplomowany masażysta z wieloletnim doświadczeniem w pracy ze sportowcami.",
      "Wykonuje masaż klasyczny, sportowy, tkanek głębokich i drenaż limfatyczny. Ceniony za precyzję i spokojną atmosferę zabiegów.",
    ],
    education: [
      "Technik masażysta",
      "Masaż sportowy i powięziowy",
      "Drenaż limfatyczny metodą Vodder",
    ],
    languages: ["polski", "angielski"],
    services: ["masaz-leczniczy"],
    workDays: [1, 2, 3, 4, 5, 6],
  },
];

export function getTeamMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

export function getSpecialistsForService(serviceSlug: string) {
  return team.filter((member) => member.services.includes(serviceSlug));
}
