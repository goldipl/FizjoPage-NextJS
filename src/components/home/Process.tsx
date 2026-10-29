import { CalendarCheck, ClipboardList, HeartHandshake, Smile } from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Rezerwacja",
    text: "Wybierz usługę, specjalistę i termin online lub zadzwoń do recepcji.",
  },
  {
    icon: ClipboardList,
    title: "Diagnoza",
    text: "Szczegółowy wywiad i badanie funkcjonalne podczas pierwszej wizyty.",
  },
  {
    icon: HeartHandshake,
    title: "Terapia",
    text: "Indywidualny plan leczenia realizowany przez doświadczonego specjalistę.",
  },
  {
    icon: Smile,
    title: "Powrót do formy",
    text: "Ćwiczenia do domu i kontrola postępów aż do pełnej sprawności.",
  },
];

export default function Process() {
  return (
    <section className="py-20 lg:py-28 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_20%,#60b8fa_0,transparent_40%),radial-gradient(circle_at_80%_80%,#3b9bf4_0,transparent_40%)]" />
      <div className="container-custom relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-primary-300 font-semibold text-sm tracking-wider uppercase mb-3">
            Jak działamy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Twoja droga do zdrowia w 4 krokach
          </h2>
          <p className="text-primary-100/70">
            Prosty i przejrzysty proces – od pierwszego kontaktu do pełnej
            sprawności.
          </p>
        </div>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <span className="absolute top-5 right-6 text-5xl font-bold text-white/10">
                0{index + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center mb-5">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-primary-100/70 text-sm leading-relaxed">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
