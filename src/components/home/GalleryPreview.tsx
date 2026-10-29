import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SectionHeading from "@/src/components/common/SectionHeading";
import { gallery } from "@/src/data/content";

export default function GalleryPreview() {
  const [first, second, third, fourth] = gallery;

  return (
    <section
      id="galeria"
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary-50/40"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="Galeria"
          title={
            <>
              Zobacz nasze <span className="text-primary-600">wnętrza</span>
            </>
          }
          description="Nowoczesne gabinety, przestronna sala ćwiczeń i komfortowa strefa masażu."
          className="mb-10"
        />

        <div className="grid md:grid-cols-3 gap-5">
          {/* Left large image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
            <Image
              src={first.src}
              alt={first.alt}
              fill
              placeholder="blur"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Middle column - two stacked images */}
          <div className="grid grid-rows-2 gap-5">
            {[second, third].map((image) => (
              <div
                key={image.alt}
                className="relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  placeholder="blur"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          {/* Right large image with CTA */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
            <Image
              src={fourth.src}
              alt={fourth.alt}
              fill
              placeholder="blur"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <Link
              href="/galeria"
              className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg"
            >
              Zobacz galerię
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
