import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { formatDate, type Post } from "@/src/data/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 transition-shadow"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          placeholder="blur"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-white/95 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col grow p-6">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {post.readingTime} min czytania
          </span>
        </div>
        <h3 className="font-semibold text-navy-900 text-lg leading-snug mb-2 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
      </div>
    </Link>
  );
}
