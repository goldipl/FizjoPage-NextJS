import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Lightbulb } from "lucide-react";

import PageHeader from "@/src/components/common/PageHeader";
import CtaBanner from "@/src/components/common/CtaBanner";
import PostCard from "@/src/components/cards/PostCard";
import { formatDate, getPost, posts, type PostBlock } from "@/src/data/posts";
import { getTeamMember } from "@/src/data/team";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl font-bold text-navy-900 mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-2 my-6">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div className="flex gap-4 rounded-2xl bg-primary-50 border border-primary-100 p-5 my-8">
          <Lightbulb className="text-primary-600 shrink-0" size={22} />
          <p className="text-navy-900">{block.text}</p>
        </div>
      );
    default:
      return <p className="mb-4">{block.text}</p>;
  }
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const author = getTeamMember(post.author);
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={post.title}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: post.category }]}
      />

      <article className="py-12 lg:py-16">
        <div className="container-custom max-w-4xl">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 text-sm text-gray-500">
            {author && (
              <Link
                href={`/zespol/${author.slug}`}
                className="flex items-center gap-3 hover:text-primary-600 transition-colors"
              >
                <span className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </span>
                <span>
                  <span className="block font-semibold text-navy-900">
                    {author.name}
                  </span>
                  <span className="block text-xs">{author.role}</span>
                </span>
              </Link>
            )}
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {post.readingTime} min czytania
            </span>
          </div>

          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-10">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              placeholder="blur"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>

          <div className="text-gray-600 text-lg leading-relaxed">
            <p className="text-xl text-navy-900 font-medium mb-6">
              {post.excerpt}
            </p>
            {post.content.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all"
            >
              <ArrowLeft size={18} />
              Wszystkie artykuły
            </Link>
            <p className="text-xs text-gray-400 max-w-md">
              Artykuł ma charakter informacyjny i nie zastępuje konsultacji ze
              specjalistą.
            </p>
          </div>
        </div>
      </article>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-8">
            Przeczytaj także
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {more.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
