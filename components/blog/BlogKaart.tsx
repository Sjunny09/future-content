import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatDate, type BlogPost } from "@/lib/blog";

export default function BlogKaart({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full bg-[#F3ECE0] rounded-2xl border border-[#E4D8C6] overflow-hidden hover:border-[#B45F38] hover:shadow-md transition-all"
    >
      {/* Featured image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#B45F38] text-[#F3ECE0] text-[10px] font-semibold uppercase tracking-wider">
          {post.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs text-[#6E6151]">{formatDate(post.date)}</span>
          <div className="flex items-center gap-1 text-xs text-[#6E6151]">
            <Clock size={11} />
            {post.readTime}
          </div>
        </div>
        <h2
          className="text-base font-bold text-[#2A2218] mb-2 leading-snug group-hover:text-[#B45F38] transition-colors"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {post.title}
        </h2>
        <p className="text-sm text-[#6E6151] leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45F38] group-hover:gap-2 transition-all">
          Lees meer <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
