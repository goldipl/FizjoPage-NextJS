import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LogoMark } from "@/src/components/common/Logo";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-primary-50 to-white">
      <div className="container-custom text-center max-w-xl">
        <LogoMark className="w-20 h-20 mx-auto mb-8 opacity-90" />
        <p className="text-primary-600 font-bold text-6xl mb-4">404</p>
        <h1 className="text-3xl font-bold text-navy-900 mb-3">
          Nie znaleźliśmy tej strony
        </h1>
        <p className="text-gray-500 mb-8">
          Strona mogła zostać przeniesiona lub adres jest niepoprawny.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Strona główna
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-7 py-3.5 rounded-xl transition-colors"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </section>
  );
}
