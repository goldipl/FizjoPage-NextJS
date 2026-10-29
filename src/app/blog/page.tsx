import type { Metadata } from "next";

import PageHeader from "@/src/components/common/PageHeader";
import CtaBanner from "@/src/components/common/CtaBanner";
import PostCard from "@/src/components/cards/PostCard";
import { posts } from "@/src/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Porady fizjoterapeutów i lekarzy: ból kręgosłupa, powrót do sportu po kontuzji, ćwiczenia i profilaktyka.",
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blog i porady"
        description="Praktyczna wiedza o zdrowiu narządu ruchu – pisana przez naszych specjalistów."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="py-16 lg:py-24">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
