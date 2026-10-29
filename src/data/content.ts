import type { StaticImageData } from "next/image";

import recepcjaImg from "@/public/img/gallery/recepcja.webp";
import gabinetImg from "@/public/img/gallery/gabinet-zabiegowy.webp";
import salaRehabImg from "@/public/img/gallery/sala-rehabilitacyjna.webp";
import pracowniaImg from "@/public/img/gallery/pracownia-diagnostyczna.webp";
import strefaMasazuImg from "@/public/img/gallery/strefa-masazu.webp";
import kamienieImg from "@/public/img/gallery/masaz-goracymi-kamieniami.webp";
import salaCwiczenImg from "@/public/img/gallery/sala-cwiczen.webp";
import strefaTreninguImg from "@/public/img/gallery/strefa-treningu.webp";
import zajeciaImg from "@/public/img/gallery/zajecia-grupowe.webp";

export type Review = {
  name: string;
  service: string;
  text: string;
  rating: number;
  date: string;
};

export const reviews: Review[] = [
  {
    name: "Anna K.",
    service: "Fizjoterapia",
    text: "Świetna opieka, profesjonalne podejście i naprawdę widoczne efekty już po kilku wizytach. Polecam każdemu, kto szuka dobrego fizjoterapeuty.",
    rating: 5,
    date: "wrzesień 2026",
  },
  {
    name: "Piotr N.",
    service: "Terapia manualna",
    text: "Bardzo miła i fachowa obsługa. Terapeuta dokładnie wytłumaczył, na czym polega problem i jak będziemy nad nim pracować.",
    rating: 5,
    date: "sierpień 2026",
  },
  {
    name: "Katarzyna W.",
    service: "Pilates medyczny",
    text: "Dogodne godziny, krótki czas oczekiwania na wizytę i bardzo indywidualne podejście. Po trzech miesiącach zajęć kręgosłup przestał boleć.",
    rating: 5,
    date: "sierpień 2026",
  },
  {
    name: "Tomasz Z.",
    service: "Rehabilitacja sportowa",
    text: "Po rekonstrukcji ACL trafiłem tutaj i to była najlepsza decyzja. Testy przed powrotem do piłki dały mi pewność, że kolano jest gotowe.",
    rating: 5,
    date: "lipiec 2026",
  },
  {
    name: "Magdalena S.",
    service: "Konsultacja ortopedyczna",
    text: "Lekarz poświęcił mi dużo czasu, od razu zrobił USG i wszystko wyjaśnił. Skierowanie na fizjoterapię w tym samym miejscu – ogromna wygoda.",
    rating: 5,
    date: "czerwiec 2026",
  },
  {
    name: "Krzysztof L.",
    service: "Masaż leczniczy",
    text: "Masaż sportowy na najwyższym poziomie. Regularnie przychodzę po zawodach i regeneracja jest dużo szybsza.",
    rating: 4,
    date: "czerwiec 2026",
  },
];

export const ratingSummary = {
  average: 4.9,
  count: 487,
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Czy potrzebuję skierowania na wizytę?",
    answer:
      "Nie. Wszystkie wizyty są prywatne i nie wymagają skierowania. Jeśli masz wyniki badań (RTG, MRI, USG) lub dokumentację z leczenia – zabierz je ze sobą.",
  },
  {
    question: "Jak przygotować się do pierwszej wizyty?",
    answer:
      "Załóż wygodny strój, który pozwala odsłonić bolące miejsce (np. spodenki, top sportowy). Przyjdź 10 minut wcześniej, aby wypełnić krótki formularz.",
  },
  {
    question: "Ile wizyt będę potrzebować?",
    answer:
      "To zależy od problemu. Przy ostrych dolegliwościach poprawę zwykle widać po 2–3 wizytach. Po pierwszym spotkaniu terapeuta przedstawi plan leczenia z szacowaną liczbą wizyt.",
  },
  {
    question: "Jak mogę odwołać lub przełożyć wizytę?",
    answer:
      "Zadzwoń lub napisz do nas najpóźniej 24 godziny przed wizytą. Wizyty odwołane później mogą zostać obciążone opłatą w wysokości 50% ceny.",
  },
  {
    question: "Jakie formy płatności akceptujecie?",
    answer:
      "Gotówka, karty płatnicze, BLIK oraz przelew (przy pakietach). Na życzenie wystawiamy fakturę.",
  },
  {
    question: "Czy przyjmujecie dzieci?",
    answer:
      "Tak. Prowadzimy terapię wad postawy oraz rehabilitację dzieci od 6. roku życia. Dziecko musi przyjść pod opieką rodzica lub opiekuna prawnego.",
  },
];

export const stats = [
  { value: "14+", label: "lat doświadczenia" },
  { value: "25 000+", label: "przeprowadzonych wizyt" },
  { value: "8", label: "specjalistów" },
  { value: "4,9/5", label: "średnia ocen pacjentów" },
];

export type GalleryCategory = "Wnętrza" | "Zabiegi" | "Sala ćwiczeń";

export type GalleryImage = {
  src: StaticImageData;
  alt: string;
  category: GalleryCategory;
};

export const galleryCategories: GalleryCategory[] = [
  "Wnętrza",
  "Zabiegi",
  "Sala ćwiczeń",
];

export const gallery: GalleryImage[] = [
  { src: recepcjaImg, alt: "Recepcja i poczekalnia", category: "Wnętrza" },
  { src: salaCwiczenImg, alt: "Zajęcia pilates medycznego", category: "Sala ćwiczeń" },
  { src: strefaMasazuImg, alt: "Strefa masażu", category: "Zabiegi" },
  { src: gabinetImg, alt: "Gabinet zabiegowy", category: "Wnętrza" },
  { src: strefaTreninguImg, alt: "Strefa treningu funkcjonalnego", category: "Sala ćwiczeń" },
  { src: kamienieImg, alt: "Masaż gorącymi kamieniami", category: "Zabiegi" },
  { src: pracowniaImg, alt: "Pracownia diagnostyczna", category: "Wnętrza" },
  { src: zajeciaImg, alt: "Zajęcia grupowe", category: "Sala ćwiczeń" },
  { src: salaRehabImg, alt: "Sala rehabilitacyjna", category: "Wnętrza" },
];
