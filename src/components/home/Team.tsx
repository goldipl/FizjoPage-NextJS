import Image from 'next/image'
import { Sparkles, Clock, Timer, Wallet, ArrowRight } from 'lucide-react'

const highlights = [
  { icon: Sparkles, label: 'Fachowe, indywidualne podejście' },
  { icon: Clock, label: 'Dogodne godziny otwarcia' },
  { icon: Timer, label: 'Krótkie terminy realizacji' },
  { icon: Wallet, label: 'Przystępne ceny' },
]

const team = [
  {
    name: 'Izabela Augustyniak-Drewin',
    role: 'Mgr Fizjoterapii',
    image:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
  {
    name: 'Marcin Drewin',
    role: 'Mgr fizjoterapii',
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80',
  },
  {
    name: 'Kinga Towarek',
    role: 'rejestratorka medyczna',
    image:
      'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&q=80',
  },
  {
    name: 'Dr Wiesław Gólicki',
    role: 'Specjalista ortopedii, traumatolog',
    image:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
  },
]

export default function Team() {
  return (
    <section id="kadra" className="py-20 lg:py-28 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[minmax(0,340px)_1fr] gap-12">
          {/* Left column */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-3">
              Nasza <span className="text-primary-600">Kadra</span>
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Poznaj naszych wykwalifikowanych specjalistów
            </p>

            <ul className="space-y-4 mb-8">
              {highlights.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-primary-600" />
                  </div>
                  <span className="text-gray-600">{label}</span>
                </li>
              ))}
            </ul>

            <a
              href="#opinie"
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-primary-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Zobacz wszystkie opinie
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Team grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {team.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 transition-shadow"
              >
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 45vw, 22vw"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-navy-900 text-sm leading-snug mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">{member.role}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-primary-600 text-xs font-semibold hover:text-primary-700"
                  >
                    Czytaj więcej
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
