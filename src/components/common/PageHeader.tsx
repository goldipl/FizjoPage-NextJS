import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { LogoMark } from "./Logo";

type Crumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
};

export default function PageHeader({
  title,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      <div className="absolute -right-16 -top-16 w-72 h-72 opacity-[0.08] pointer-events-none hidden sm:block">
        <LogoMark className="w-full h-full" />
      </div>
      <div className="container-custom relative py-14 lg:py-20">
        <nav aria-label="Ścieżka nawigacji" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary-600 transition-colors">
                Strona Główna
              </Link>
            </li>
            {breadcrumbs.map((crumb) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-gray-400" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-navy-900 font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 mb-4 max-w-3xl !leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-gray-500 text-lg max-w-2xl">{description}</p>
        )}
      </div>
    </section>
  );
}
