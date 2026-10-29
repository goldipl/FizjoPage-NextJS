import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Hero from "@/src/components/home/Hero";
import ServicesPreview from "@/src/components/home/ServicesPreview";
import AboutPreview from "@/src/components/home/AboutPreview";
import Process from "@/src/components/home/Process";
import Team from "@/src/components/home/Team";
import Reviews from "@/src/components/home/Reviews";
import GalleryPreview from "@/src/components/home/GalleryPreview";
import SectionHeading from "@/src/components/common/SectionHeading";
import FaqList from "@/src/components/common/FaqList";
import CtaBanner from "@/src/components/common/CtaBanner";
import PostCard from "@/src/components/cards/PostCard";
import { faq } from "@/src/data/content";
import { posts } from "@/src/data/posts";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <AboutPreview />
      <Process />
      <Team />
      <Reviews />
      <GalleryPreview />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Najczęściej zadawane{" "}
                  <span className="text-primary-600">pytania</span>
                </>
              }
              description="Nie znalazłeś odpowiedzi? Zadzwoń lub napisz – chętnie pomożemy."
              className="mb-6"
            />
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
            >
              Skontaktuj się z nami
              <ArrowRight size={18} />
            </Link>
          </div>
          <FaqList items={faq.slice(0, 5)} />
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Blog"
              title={
                <>
                  Porady <span className="text-primary-600">specjalistów</span>
                </>
              }
              description="Praktyczna wiedza o zdrowiu narządu ruchu od naszego zespołu."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all shrink-0"
            >
              Wszystkie artykuły
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
