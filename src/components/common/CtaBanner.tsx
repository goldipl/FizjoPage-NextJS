import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { siteConfig } from "@/src/data/site";
import { LogoMark } from "./Logo";

type CtaBannerProps = {
  title?: string;
  description?: string;
  href?: string;
};

export default function CtaBanner({
  title = "Nie czekaj, aż ból sam minie",
  description = "Zarezerwuj wizytę online w mniej niż 2 minuty lub zadzwoń – pomożemy dobrać specjalistę i termin.",
  href = "/rezerwacja",
}: CtaBannerProps) {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-navy-900 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-10 -bottom-16 w-72 h-72 opacity-10 pointer-events-none">
            <LogoMark className="w-full h-full" fill="white" accent="#1e6bd6" />
          </div>
          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {title}
              </h2>
              <p className="text-primary-100 max-w-xl">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={href}
                className="flex items-center justify-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                Umów wizytę
                <ArrowRight size={18} />
              </Link>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-7 py-3.5 rounded-xl transition-colors"
              >
                <Phone size={18} />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
