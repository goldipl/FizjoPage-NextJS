import type { StaticImageData } from "next/image";
import {
  Activity,
  Bone,
  Dumbbell,
  Flower2,
  Hand,
  HeartPulse,
  PersonStanding,
  ScanLine,
  type LucideIcon,
} from "lucide-react";

import fizjoterapiaImg from "@/public/img/services/fizjoterapia.webp";
import terapiaManualnaImg from "@/public/img/services/terapia-manualna.webp";
import masazImg from "@/public/img/services/masaz-leczniczy.webp";
import sportowaImg from "@/public/img/services/rehabilitacja-sportowa.webp";
import treningImg from "@/public/img/services/trening-medyczny.webp";
import ortopedaImg from "@/public/img/services/konsultacja-ortopedyczna.webp";
import usgImg from "@/public/img/services/diagnostyka-usg.webp";
import pilatesImg from "@/public/img/services/pilates-medyczny.webp";

export type PriceItem = {
  id: string;
  name: string;
  // Duration in minutes; used to build booking slots.
  duration: number;
  price: number;
  note?: string;
};

export type ServiceCategory =
  | "Fizjoterapia"
  | "Masaż"
  | "Konsultacje lekarskie"
  | "Diagnostyka"
  | "Zajęcia ruchowe";

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  short: string;
  intro: string;
  description: string[];
  indications: string[];
  benefits: string[];
  steps: { title: string; text: string }[];
  prices: PriceItem[];
  icon: LucideIcon;
  image: StaticImageData;
};

export const services: Service[] = [
  {
    slug: "fizjoterapia",
    name: "Fizjoterapia",
    category: "Fizjoterapia",
    short:
      "Kompleksowa diagnostyka funkcjonalna i terapia bólu narządu ruchu dopasowana do Twoich potrzeb.",
    intro:
      "Indywidualna terapia oparta na dokładnej diagnostyce funkcjonalnej. Szukamy przyczyny bólu, a nie tylko łagodzimy objawy.",
    description: [
      "Każda wizyta rozpoczyna się od szczegółowego wywiadu i badania funkcjonalnego. Oceniamy postawę, zakres ruchu, siłę mięśniową i wzorce ruchowe, aby znaleźć rzeczywiste źródło dolegliwości.",
      "Na tej podstawie fizjoterapeuta dobiera techniki pracy – od terapii tkanek miękkich, przez mobilizacje stawowe, po ćwiczenia korekcyjne. Otrzymujesz także zestaw ćwiczeń do samodzielnego wykonywania w domu.",
    ],
    indications: [
      "Bóle kręgosłupa szyjnego, piersiowego i lędźwiowego",
      "Dyskopatie i rwa kulszowa",
      "Bóle stawów barkowych, kolanowych i biodrowych",
      "Stany po urazach i złamaniach",
      "Rehabilitacja pooperacyjna (endoprotezy, rekonstrukcje więzadeł)",
      "Wady postawy u dzieci i dorosłych",
    ],
    benefits: [
      "Zmniejszenie bólu i napięcia mięśniowego",
      "Poprawa zakresu ruchu i sprawności",
      "Plan terapii rozpisany na kolejne tygodnie",
      "Program ćwiczeń domowych",
    ],
    steps: [
      { title: "Wywiad", text: "Rozmawiamy o objawach, historii urazów i Twoich celach." },
      { title: "Badanie", text: "Testy funkcjonalne, ocena postawy i zakresu ruchu." },
      { title: "Terapia", text: "Praca manualna i ćwiczenia dobrane do diagnozy." },
      { title: "Zalecenia", text: "Plan dalszego leczenia i ćwiczenia do domu." },
    ],
    prices: [
      { id: "fizjo-konsultacja", name: "Konsultacja fizjoterapeutyczna z terapią", duration: 60, price: 220 },
      { id: "fizjo-wizyta", name: "Wizyta kontrolna", duration: 45, price: 180 },
      { id: "fizjo-pakiet", name: "Pakiet 5 wizyt (45 min)", duration: 45, price: 800, note: "Oszczędzasz 100 zł" },
    ],
    icon: Activity,
    image: fizjoterapiaImg,
  },
  {
    slug: "terapia-manualna",
    name: "Terapia manualna",
    category: "Fizjoterapia",
    short:
      "Specjalistyczne techniki mobilizacji stawów i tkanek miękkich przywracające prawidłową ruchomość.",
    intro:
      "Precyzyjne techniki manualne, które przywracają prawidłową ruchomość stawów, zmniejszają ból i odciążają przeciążone struktury.",
    description: [
      "Terapia manualna to metoda leczenia zaburzeń układu ruchu za pomocą rąk terapeuty. Wykorzystujemy uznane koncepcje, takie jak Maitland, Mulligan czy terapia powięziowa.",
      "Zabiegi są bezpieczne i dobrane do stanu pacjenta. Terapeuta na bieżąco kontroluje reakcję tkanek, dzięki czemu terapia jest skuteczna i komfortowa.",
    ],
    indications: [
      "Ograniczenie ruchomości stawów",
      "Bóle głowy pochodzenia szyjnego",
      "Zaburzenia stawu skroniowo-żuchwowego",
      "Przewlekłe napięcia mięśniowe",
      "Zespoły bólowe kręgosłupa",
    ],
    benefits: [
      "Szybka ulga w bólu",
      "Zwiększenie zakresu ruchu",
      "Poprawa krążenia i odżywienia tkanek",
      "Rozluźnienie napiętych struktur",
    ],
    steps: [
      { title: "Ocena", text: "Badanie ruchomości stawów i napięcia tkanek." },
      { title: "Mobilizacje", text: "Delikatne techniki przywracające ruch w stawach." },
      { title: "Tkanki miękkie", text: "Praca z powięzią, mięśniami i punktami spustowymi." },
      { title: "Reedukacja", text: "Ćwiczenia utrwalające efekt terapii." },
    ],
    prices: [
      { id: "manualna-50", name: "Terapia manualna", duration: 50, price: 230 },
      { id: "manualna-ssz", name: "Terapia stawu skroniowo-żuchwowego", duration: 50, price: 250 },
    ],
    icon: Hand,
    image: terapiaManualnaImg,
  },
  {
    slug: "masaz-leczniczy",
    name: "Masaż leczniczy",
    category: "Masaż",
    short:
      "Masaż klasyczny, sportowy i tkanek głębokich – rozluźnienie, regeneracja i redukcja bólu.",
    intro:
      "Masaż prowadzony przez dyplomowanych masażystów i fizjoterapeutów. Rozluźnia, przyspiesza regenerację i wspiera proces leczenia.",
    description: [
      "Oferujemy masaż klasyczny, sportowy, tkanek głębokich oraz drenaż limfatyczny. Rodzaj i intensywność masażu dobieramy do Twoich potrzeb oraz stanu zdrowia.",
      "Masaż leczniczy świetnie uzupełnia fizjoterapię – przygotowuje tkanki do pracy, zmniejsza napięcie i przyspiesza powrót do formy po wysiłku lub urazie.",
    ],
    indications: [
      "Napięcia mięśniowe i bóle przeciążeniowe",
      "Regeneracja po treningu i zawodach",
      "Obrzęki limfatyczne",
      "Stres i problemy ze snem",
    ],
    benefits: [
      "Rozluźnienie i redukcja napięcia",
      "Szybsza regeneracja mięśni",
      "Poprawa krążenia krwi i limfy",
      "Lepsze samopoczucie",
    ],
    steps: [
      { title: "Rozmowa", text: "Ustalamy cel masażu i przeciwwskazania." },
      { title: "Dobór techniki", text: "Klasyczny, sportowy, głęboki lub drenaż." },
      { title: "Masaż", text: "Komfortowe warunki i dopasowana intensywność." },
      { title: "Wskazówki", text: "Zalecenia dotyczące regeneracji po zabiegu." },
    ],
    prices: [
      { id: "masaz-30", name: "Masaż częściowy (plecy lub kończyny)", duration: 30, price: 130 },
      { id: "masaz-60", name: "Masaż leczniczy całościowy", duration: 60, price: 220 },
      { id: "masaz-sportowy", name: "Masaż sportowy", duration: 60, price: 230 },
      { id: "drenaz", name: "Drenaż limfatyczny", duration: 60, price: 220 },
    ],
    icon: HeartPulse,
    image: masazImg,
  },
  {
    slug: "rehabilitacja-sportowa",
    name: "Rehabilitacja sportowa",
    category: "Fizjoterapia",
    short:
      "Powrót do sportu po kontuzji, profilaktyka urazów i poprawa wyników treningowych.",
    intro:
      "Prowadzimy sportowców amatorów i zawodowców od momentu urazu aż po bezpieczny powrót do pełnych obciążeń treningowych.",
    description: [
      "Rehabilitacja sportowa łączy terapię manualną z ćwiczeniami funkcjonalnymi i stopniowym zwiększaniem obciążeń. Plan uwzględnia specyfikę Twojej dyscypliny.",
      "Przed powrotem do sportu wykonujemy testy funkcjonalne, które obiektywnie pokazują, czy jesteś gotowy na pełne obciążenia – to najlepsza ochrona przed nawrotem kontuzji.",
    ],
    indications: [
      "Skręcenia stawu skokowego i kolanowego",
      "Stany po rekonstrukcji ACL",
      "Kolano biegacza, łokieć tenisisty",
      "Naderwania mięśni i ścięgien",
      "Przeciążenia i zespoły bólowe u sportowców",
    ],
    benefits: [
      "Bezpieczny powrót do treningów",
      "Testy gotowości do sportu",
      "Mniejsze ryzyko nawrotu urazu",
      "Lepsza technika i wydolność",
    ],
    steps: [
      { title: "Diagnoza", text: "Ocena urazu i testy funkcjonalne." },
      { title: "Faza leczenia", text: "Redukcja bólu i obrzęku, odbudowa zakresu ruchu." },
      { title: "Odbudowa", text: "Trening siły, stabilizacji i propriocepcji." },
      { title: "Powrót do sportu", text: "Testy gotowości i stopniowe obciążenia." },
    ],
    prices: [
      { id: "sport-wizyta", name: "Wizyta rehabilitacji sportowej", duration: 60, price: 240 },
      { id: "sport-testy", name: "Testy funkcjonalne powrotu do sportu", duration: 90, price: 350 },
    ],
    icon: Dumbbell,
    image: sportowaImg,
  },
  {
    slug: "trening-medyczny",
    name: "Trening medyczny",
    category: "Zajęcia ruchowe",
    short:
      "Indywidualny trening pod okiem fizjoterapeuty – siła, stabilizacja i świadomość ciała.",
    intro:
      "Ćwiczenia dobrane do stanu zdrowia, prowadzone przez fizjoterapeutę. Idealne po zakończonej terapii lub przy przewlekłych dolegliwościach.",
    description: [
      "Trening medyczny to most między rehabilitacją a zwykłym treningiem. Uczymy prawidłowych wzorców ruchowych i stopniowo budujemy siłę oraz wytrzymałość.",
      "Każdy trening jest planowany indywidualnie i modyfikowany na bieżąco w zależności od Twoich postępów i samopoczucia.",
    ],
    indications: [
      "Przewlekłe bóle kręgosłupa",
      "Osłabienie mięśni po okresie bezruchu",
      "Utrwalenie efektów fizjoterapii",
      "Seniorzy – poprawa równowagi i sprawności",
    ],
    benefits: [
      "Silniejsze mięśnie posturalne",
      "Lepsza stabilizacja stawów",
      "Mniejsze ryzyko nawrotu bólu",
      "Bezpieczny trening pod kontrolą specjalisty",
    ],
    steps: [
      { title: "Ocena", text: "Testy siły, mobilności i wzorców ruchowych." },
      { title: "Plan", text: "Program treningowy na kolejne tygodnie." },
      { title: "Trening", text: "Ćwiczenia z korektą techniki na bieżąco." },
      { title: "Postęp", text: "Regularna ocena i progresja obciążeń." },
    ],
    prices: [
      { id: "trening-60", name: "Trening indywidualny", duration: 60, price: 200 },
      { id: "trening-pakiet", name: "Pakiet 8 treningów", duration: 60, price: 1440, note: "Oszczędzasz 160 zł" },
    ],
    icon: PersonStanding,
    image: treningImg,
  },
  {
    slug: "pilates-medyczny",
    name: "Pilates medyczny",
    category: "Zajęcia ruchowe",
    short:
      "Zajęcia w małych grupach prowadzone przez fizjoterapeutę – zdrowy kręgosłup i lepsza postawa.",
    intro:
      "Zajęcia grupowe do 6 osób, prowadzone przez fizjoterapeutę. Wzmacniają mięśnie głębokie i uczą prawidłowej postawy.",
    description: [
      "Pilates medyczny to bezpieczna forma aktywności dla osób z dolegliwościami kręgosłupa oraz dla tych, którzy chcą im zapobiegać. Ćwiczenia są modyfikowane indywidualnie dla każdego uczestnika.",
      "Małe grupy pozwalają prowadzącemu kontrolować technikę każdej osoby. Zajęcia odbywają się w przestronnej, klimatyzowanej sali ćwiczeń.",
    ],
    indications: [
      "Profilaktyka bólów kręgosłupa",
      "Wady postawy",
      "Okres po zakończonej rehabilitacji",
      "Praca siedząca",
    ],
    benefits: [
      "Wzmocnienie mięśni głębokich",
      "Lepsza postawa i oddech",
      "Większa elastyczność",
      "Grupy do 6 osób",
    ],
    steps: [
      { title: "Zapis", text: "Wybierz termin zajęć i zarezerwuj miejsce." },
      { title: "Krótki wywiad", text: "Prowadzący pyta o dolegliwości i przeciwwskazania." },
      { title: "Zajęcia", text: "55 minut ćwiczeń z indywidualną korektą." },
      { title: "Regularność", text: "Najlepsze efekty przy 1–2 zajęciach tygodniowo." },
    ],
    prices: [
      { id: "pilates-1", name: "Pojedyncze wejście", duration: 55, price: 70 },
      { id: "pilates-8", name: "Karnet 8 wejść (ważny 2 miesiące)", duration: 55, price: 480 },
    ],
    icon: Flower2,
    image: pilatesImg,
  },
  {
    slug: "konsultacja-ortopedyczna",
    name: "Konsultacja ortopedyczna",
    category: "Konsultacje lekarskie",
    short:
      "Wizyta u lekarza ortopedy – diagnoza, zalecenia, skierowania i iniekcje dostawowe.",
    intro:
      "Lekarz ortopeda postawi diagnozę, zinterpretuje badania obrazowe i zaplanuje leczenie we współpracy z naszymi fizjoterapeutami.",
    description: [
      "Konsultacja obejmuje wywiad, badanie przedmiotowe oraz analizę dotychczasowej dokumentacji (RTG, MRI, USG). W razie potrzeby lekarz wykona badanie USG w trakcie wizyty.",
      "Dzięki współpracy lekarzy i fizjoterapeutów pod jednym dachem leczenie jest spójne, a droga od diagnozy do terapii – krótka.",
    ],
    indications: [
      "Urazy stawów i więzadeł",
      "Przewlekłe bóle stawów",
      "Choroba zwyrodnieniowa",
      "Kwalifikacja do zabiegów operacyjnych",
      "Kontrola po leczeniu operacyjnym",
    ],
    benefits: [
      "Diagnoza lekarza specjalisty",
      "Interpretacja badań obrazowych",
      "E-recepty, e-skierowania i L4",
      "Iniekcje dostawowe (np. kwas hialuronowy, osocze)",
    ],
    steps: [
      { title: "Dokumentacja", text: "Zabierz wyniki badań, jeśli je posiadasz." },
      { title: "Badanie", text: "Wywiad i badanie przedmiotowe." },
      { title: "Diagnoza", text: "Omówienie rozpoznania i opcji leczenia." },
      { title: "Plan leczenia", text: "Zalecenia, skierowania, ewentualnie terapia." },
    ],
    prices: [
      { id: "ortopeda", name: "Konsultacja ortopedyczna", duration: 30, price: 300 },
      { id: "ortopeda-kontrola", name: "Wizyta kontrolna (do 30 dni)", duration: 20, price: 200 },
      { id: "iniekcja", name: "Iniekcja dostawowa pod kontrolą USG", duration: 30, price: 350, note: "Cena bez kosztu preparatu" },
    ],
    icon: Bone,
    image: ortopedaImg,
  },
  {
    slug: "diagnostyka-usg",
    name: "Diagnostyka USG",
    category: "Diagnostyka",
    short:
      "Badania USG narządu ruchu – stawy, mięśnie, ścięgna. Opis wyniku od ręki.",
    intro:
      "Szybkie i bezbolesne badanie USG narządu ruchu wykonywane przez lekarza. Wynik z opisem otrzymujesz od razu po badaniu.",
    description: [
      "Ultrasonografia pozwala ocenić stawy, mięśnie, ścięgna, więzadła i kaletki w czasie rzeczywistym – także w ruchu. To jedno z najlepszych narzędzi do diagnostyki urazów sportowych.",
      "Badanie wykonujemy na nowoczesnym aparacie z głowicami wysokiej rozdzielczości. Nie wymaga specjalnego przygotowania.",
    ],
    indications: [
      "Urazy mięśni i ścięgien",
      "Bóle barku, łokcia, nadgarstka",
      "Bóle kolana i stawu skokowego",
      "Kontrola procesu gojenia",
    ],
    benefits: [
      "Wynik z opisem od ręki",
      "Badanie dynamiczne – w ruchu",
      "Bezbolesne i bezpieczne",
      "Bez skierowania",
    ],
    steps: [
      { title: "Rejestracja", text: "Zarezerwuj termin – skierowanie nie jest wymagane." },
      { title: "Badanie", text: "Lekarz ocenia wybrany obszar, także w ruchu." },
      { title: "Opis", text: "Omówienie wyniku i opis badania od ręki." },
      { title: "Dalsze kroki", text: "W razie potrzeby kierujemy do terapii." },
    ],
    prices: [
      { id: "usg-1", name: "USG jednego stawu", duration: 30, price: 250 },
      { id: "usg-2", name: "USG dwóch stawów", duration: 45, price: 400 },
    ],
    icon: ScanLine,
    image: usgImg,
  },
];

export const serviceCategories: ServiceCategory[] = [
  "Fizjoterapia",
  "Masaż",
  "Zajęcia ruchowe",
  "Konsultacje lekarskie",
  "Diagnostyka",
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getLowestPrice(service: Service) {
  return Math.min(...service.prices.map((item) => item.price));
}
