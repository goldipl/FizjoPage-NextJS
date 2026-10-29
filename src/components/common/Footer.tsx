import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import Logo from "./Logo";
import { footerLinks } from "@/src/data/navigation";
import { services } from "@/src/data/services";
import { fullAddress, openingHoursSummary, siteConfig } from "@/src/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-custom py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
          {/* Logo & contact */}
          <div>
            <Logo variant="light" className="mb-5" />
            <p className="text-primary-100/70 text-sm leading-relaxed mb-6 max-w-xs">
              Profesjonalna rehabilitacja, fizjoterapia i diagnostyka narządu
              ruchu dla całej rodziny.
            </p>
            <ul className="space-y-3 text-sm text-primary-100/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{fullAddress}</span>
              </li>
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Usługi
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="text-primary-100/70 hover:text-white text-sm transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Na skróty
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-100/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-primary-100 mb-4 text-sm tracking-wide uppercase">
              Godziny Otwarcia
            </h4>
            <ul className="space-y-2.5">
              {openingHoursSummary.map(({ day, time }) => (
                <li
                  key={day}
                  className="flex justify-between text-sm text-primary-100/70 gap-4"
                >
                  <span>{day}</span>
                  <span className="text-white/90">{time}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/rezerwacja"
              className="inline-flex mt-6 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors"
            >
              Zarezerwuj wizytę
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-primary-100/50 text-center">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Wszelkie prawa
            zastrzeżone.
          </span>
          <Link
            href="/polityka-prywatnosci"
            className="hover:text-white transition-colors"
          >
            Polityka prywatności
          </Link>
          <span>
            Projekt i wykonanie strony{" "}
            <a
              className="text-white"
              href="https://mgodlewskidev.pl/"
              target="_blank"
              rel="noopener noreferrer"
            >
              mgodlewskidev.pl
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
