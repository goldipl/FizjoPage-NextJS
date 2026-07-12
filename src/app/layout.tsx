import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/src/css/globals.css";

export const metadata: Metadata = {
  title: "FizjoMedica - Centrum Medyczne | Rehabilitacja i Fizjoterapia",
  description:
    "Profesjonalna rehabilitacja i fizjoterapia. Skuteczna pomoc w powrocie do zdrowia i pełnej sprawności.",
  robots: {
    index: false,
    follow: false,
    noimageindex: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl">
      <body className="bg-white text-gray-800 antialiased">{children}</body>
    </html>
  );
}
