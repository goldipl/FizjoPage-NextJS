import Image from "next/image";
import { Sparkles, ShieldCheck, UserCheck, ArrowRight } from "lucide-react";

const features = [
  { icon: Sparkles, label: "Nowoczesny sprzęt" },
  { icon: ShieldCheck, label: "Doświadczeni specjaliści" },
  { icon: UserCheck, label: "Indywidualne podejście" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-primary-50/60 to-white">
      <div className="container-custom relative pt-14 pb-24 lg:pt-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <div className="relative z-10 text-center lg:text-left">
            <p className="text-gray-500 text-lg mb-3">Witamy w FizjoMedica</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold !leading-[1.15] text-navy-900 mb-6">
              Profesjonalna Rehabilitacja i Fizjoterapia
            </h1>
            <p className="text-gray-500 text-lg max-w-md mx-auto lg:mx-0 mb-8">
              Skuteczna pomoc w powrocie do zdrowia i pełnej sprawności.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href="#rezerwacja"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-primary-200"
              >
                Umów się na wizytę
                <ArrowRight size={18} />
              </a>
              <a
                href="#uslugi"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Zobacz usługi
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* Right column - image with watermark shape */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -right-10 -top-10 w-[420px] h-[420px] opacity-[0.15] pointer-events-none hidden sm:block">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect
                  x="20"
                  y="0"
                  width="60"
                  height="100"
                  rx="16"
                  fill="#2680e8"
                />
                <rect
                  x="0"
                  y="20"
                  width="100"
                  height="60"
                  rx="16"
                  fill="#2680e8"
                />
                <circle cx="50" cy="30" r="10" fill="white" />
                <path
                  d="M25 60 Q40 45 50 50 Q65 58 80 40"
                  stroke="white"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=900&q=80"
                alt="Fizjoterapeuta pomagający pacjentce"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </div>
        </div>

        {/* Feature bar */}
        <div className="relative z-10 mt-16 bg-white rounded-2xl shadow-lg shadow-gray-200/60 border border-gray-50 px-6 py-6 md:px-10">
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-start"
              >
                <div className="w-11 h-11 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary-600" />
                </div>
                <span className="text-gray-700 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
