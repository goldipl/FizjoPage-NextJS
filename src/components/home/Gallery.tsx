import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="py-20 lg:py-28 bg-gradient-to-b from-white to-primary-50/40"
    >
      <div className="container-custom">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
            Galeria
          </h2>
          <p className="text-gray-500 max-w-sm">
            Poznaj naszych wykwalifikowanych specjalistów
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Left large image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
              alt="Poczekalnia FizjoMedica"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* Middle column - two stacked images */}
          <div className="grid grid-rows-2 gap-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=700&q=80"
                alt="Budynek centrum medycznego"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=700&q=80"
                alt="Wnętrze centrum medycznego"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Right large image with CTA */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-full min-h-[280px]">
            <Image
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
              alt="Recepcja FizjoMedica"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <a
              href="#"
              className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-colors shadow-lg"
            >
              Zobacz galerię
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
