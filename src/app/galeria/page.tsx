import type { Metadata } from "next";

import PageHeader from "@/src/components/common/PageHeader";
import CtaBanner from "@/src/components/common/CtaBanner";
import GalleryGrid from "@/src/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Galeria",
  description:
    "Zobacz wnętrza centrum medycznego FizjoWebsite: gabinety, salę ćwiczeń i strefę masażu.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Galeria"
        description="Nowoczesne gabinety, przestronna sala ćwiczeń i komfortowa strefa masażu – zobacz, gdzie będziesz wracać do formy."
        breadcrumbs={[{ label: "Galeria" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <GalleryGrid />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
