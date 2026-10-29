import type { StaticImageData } from "next/image";

import kregoslupImg from "@/public/img/blog/bol-kregoslupa.webp";
import bieganieImg from "@/public/img/blog/powrot-do-biegania.webp";
import kiedyImg from "@/public/img/blog/kiedy-do-fizjoterapeuty.webp";
import wizytaImg from "@/public/img/blog/pierwsza-wizyta.webp";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: string;
  author: string;
  image: StaticImageData;
  content: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "bol-kregoslupa-przy-pracy-biurowej",
    title: "Ból kręgosłupa przy pracy biurowej – 6 prostych zmian",
    excerpt:
      "Siedzisz przy biurku po 8 godzin dziennie? Zobacz, jak drobne zmiany w ustawieniu stanowiska i nawykach mogą zmniejszyć ból pleców.",
    date: "2026-10-14",
    readingTime: 5,
    category: "Kręgosłup",
    author: "karolina-wojcik",
    image: kregoslupImg,
    content: [
      { type: "p", text: "Ból odcinka lędźwiowego i szyjnego to jedna z najczęstszych dolegliwości, z jakimi zgłaszają się do nas pacjenci pracujący przy komputerze. Dobra wiadomość jest taka, że w wielu przypadkach można mu skutecznie zapobiegać." },
      { type: "h2", text: "1. Ustaw monitor na wysokości oczu" },
      { type: "p", text: "Górna krawędź ekranu powinna znajdować się mniej więcej na wysokości wzroku, a monitor – w odległości wyciągniętej ręki. Pochylanie głowy do przodu znacząco zwiększa obciążenie kręgosłupa szyjnego." },
      { type: "h2", text: "2. Zadbaj o podparcie lędźwi" },
      { type: "p", text: "Krzesło powinno podpierać naturalną krzywiznę odcinka lędźwiowego. Jeśli nie ma regulacji, wystarczy mała poduszka lub zwinięty ręcznik." },
      { type: "h2", text: "3. Ruszaj się co 30–45 minut" },
      { type: "p", text: "Najlepsza pozycja to… następna pozycja. Wstań, przejdź się po biurze, zrób kilka skłonów lub krążeń ramion. Ustaw przypomnienie w telefonie." },
      { type: "h2", text: "4. Ćwiczenia na co dzień" },
      { type: "ul", items: ["Koci grzbiet – 10 powtórzeń", "Wyprost w leżeniu przodem – 10 powtórzeń", "Rozciąganie mięśni piersiowych w drzwiach – 3 × 30 sekund", "Ściąganie łopatek – 15 powtórzeń"] },
      { type: "tip", text: "Jeśli ból promieniuje do nogi, towarzyszy mu drętwienie lub osłabienie siły – nie czekaj. Umów się na konsultację fizjoterapeutyczną." },
      { type: "h2", text: "5. Pamiętaj o aktywności po pracy" },
      { type: "p", text: "Spacer, pływanie, rower czy pilates medyczny to świetna przeciwwaga dla wielogodzinnego siedzenia. Wystarczy 150 minut umiarkowanej aktywności tygodniowo." },
      { type: "h2", text: "6. Śpij na wygodnym materacu" },
      { type: "p", text: "Regeneracja w nocy ma ogromne znaczenie. Zbyt miękki lub zbyt twardy materac może nasilać poranne bóle pleców." },
    ],
  },
  {
    slug: "powrot-do-biegania-po-kontuzji",
    title: "Powrót do biegania po kontuzji – jak zrobić to bezpiecznie?",
    excerpt:
      "Za szybki powrót do treningów to najczęstsza przyczyna nawrotu urazu. Podpowiadamy, na co zwrócić uwagę i kiedy jesteś gotowy.",
    date: "2026-09-28",
    readingTime: 6,
    category: "Sport",
    author: "tomasz-lewandowski",
    image: bieganieImg,
    content: [
      { type: "p", text: "Każdy biegacz, który przeszedł kontuzję, zna to uczucie – ból minął, więc czas wracać na trasę. Niestety brak bólu nie oznacza, że tkanki są gotowe na pełne obciążenia." },
      { type: "h2", text: "Kryteria powrotu do biegania" },
      { type: "ul", items: ["Brak bólu w codziennych aktywnościach i podczas szybkiego marszu", "Pełny zakres ruchu w stawie", "Siła kończyny co najmniej 90% w porównaniu ze zdrową stroną", "Możliwość wykonania 20 jednonożnych przysiadów bez bólu", "Kilkadziesiąt podskoków na jednej nodze bez dolegliwości"] },
      { type: "h2", text: "Zacznij od marszobiegu" },
      { type: "p", text: "Pierwsze treningi powinny łączyć bieg z marszem, np. 1 minuta biegu i 2 minuty marszu, powtórzone 6–8 razy. Z tygodnia na tydzień wydłużaj odcinki biegowe." },
      { type: "tip", text: "Stosuj zasadę 10%: tygodniowy kilometraż zwiększaj o nie więcej niż 10% w stosunku do poprzedniego tygodnia." },
      { type: "h2", text: "Nie zapominaj o treningu siłowym" },
      { type: "p", text: "Silne mięśnie pośladkowe, czworogłowe i łydki to najlepsza ochrona przed nawrotem urazu. Dwa krótkie treningi siłowe tygodniowo robią ogromną różnicę." },
      { type: "h2", text: "Testy funkcjonalne" },
      { type: "p", text: "W naszym centrum wykonujemy testy powrotu do sportu, które obiektywnie oceniają siłę, stabilność i kontrolę ruchu. Dzięki nim wiesz, czy możesz bezpiecznie zwiększać obciążenia." },
    ],
  },
  {
    slug: "kiedy-isc-do-fizjoterapeuty",
    title: "Kiedy iść do fizjoterapeuty? 7 sygnałów, których nie warto ignorować",
    excerpt:
      "Wielu pacjentów trafia do nas zbyt późno. Sprawdź, jakie objawy powinny skłonić Cię do wizyty u specjalisty.",
    date: "2026-09-10",
    readingTime: 4,
    category: "Poradnik",
    author: "pawel-sikora",
    image: kiedyImg,
    content: [
      { type: "p", text: "Fizjoterapeuta to nie tylko specjalista od rehabilitacji po urazach. Coraz częściej to pierwsza osoba, do której warto się zgłosić z bólem narządu ruchu." },
      { type: "h2", text: "Sygnały ostrzegawcze" },
      { type: "ul", items: ["Ból utrzymujący się dłużej niż 2 tygodnie", "Ból nasilający się w nocy lub rano", "Ograniczenie ruchomości stawu", "Drętwienie lub mrowienie kończyn", "Nawracające bóle głowy połączone z napięciem karku", "Uczucie niestabilności stawu (np. „uciekające” kolano)", "Ból po wysiłku, który nie mija po odpoczynku"] },
      { type: "h2", text: "Fizjoterapeuta czy lekarz?" },
      { type: "p", text: "W wielu przypadkach fizjoterapeuta może rozpocząć leczenie od razu. Jeśli podczas badania zauważy objawy wymagające diagnostyki lekarskiej, skieruje Cię do ortopedy – w naszym centrum przyjmuje on w tym samym budynku." },
      { type: "tip", text: "Nagły, silny ból po urazie, obrzęk i brak możliwości obciążenia kończyny to wskazanie do pilnej konsultacji lekarskiej." },
    ],
  },
  {
    slug: "jak-przygotowac-sie-do-pierwszej-wizyty",
    title: "Jak przygotować się do pierwszej wizyty w centrum rehabilitacji?",
    excerpt:
      "Co zabrać, w co się ubrać i czego się spodziewać? Krótki przewodnik dla pacjentów, którzy odwiedzają nas po raz pierwszy.",
    date: "2026-08-22",
    readingTime: 3,
    category: "Poradnik",
    author: "julia-mazur",
    image: wizytaImg,
    content: [
      { type: "p", text: "Pierwsza wizyta to przede wszystkim rozmowa i badanie. Dzięki dobremu przygotowaniu wykorzystamy ten czas maksymalnie efektywnie." },
      { type: "h2", text: "Co zabrać ze sobą?" },
      { type: "ul", items: ["Wyniki badań obrazowych (RTG, MRI, USG) – opisy i płyty", "Karty informacyjne ze szpitala, jeśli przechodziłeś operację", "Listę przyjmowanych leków", "Wygodny strój sportowy"] },
      { type: "h2", text: "Jak wygląda wizyta?" },
      { type: "p", text: "Fizjoterapeuta przeprowadzi wywiad, zbada postawę, zakres ruchu i siłę mięśni. Następnie rozpocznie terapię i przedstawi plan dalszego leczenia wraz z ćwiczeniami do domu." },
      { type: "tip", text: "Zapisz wcześniej pytania, które chcesz zadać – w stresie łatwo o nich zapomnieć." },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
