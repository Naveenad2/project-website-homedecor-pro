import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type PostMeta, formatPostDate, postHref } from "@/lib/blog";

function Meta({ post }: { post: PostMeta }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9.5px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
      <span className="text-[#ff6b72]">{post.category}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20" />
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-white/20" />
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

/** Article card — the whole card is one link (title link stretched over it). */
export function PostCard({ post, as: Heading = "h3" }: { post: PostMeta; as?: "h2" | "h3" }) {
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.025] transition-colors duration-300 hover:border-white/[0.18] hover:bg-white/[0.04]">
      <div className="relative aspect-[1200/630] overflow-hidden bg-[#0b1118]">
        <img
          src={post.cover}
          alt={post.coverAlt}
          loading="lazy"
          decoding="async"
          width={1200}
          height={630}
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Meta post={post} />
        <Heading className="mt-3 text-white text-[18px] md:text-[20px] font-bold leading-snug tracking-tight">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {post.title}
          </Link>
        </Heading>
        <p className="mt-2.5 text-white/55 text-[13.5px] md:text-[14px] leading-relaxed line-clamp-3">{post.description}</p>
        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 group-hover:text-white transition-colors">
          Read article <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </article>
  );
}

/** Large lead card for the newest article on /blog. */
export function FeaturedPostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative isolate grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.03] transition-colors duration-300 hover:border-white/[0.2]">
      <div className="relative lg:col-span-7 aspect-[1200/630] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-[#0b1118]">
        <img
          src={post.cover}
          alt={post.coverAlt}
          fetchPriority="high"
          decoding="async"
          width={1200}
          height={630}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[#D72731] px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-white">Latest</span>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center p-6 md:p-9 lg:p-10">
        <Meta post={post} />
        <h2 className="mt-4 text-white text-[clamp(1.5rem,3vw,2.3rem)] font-bold leading-[1.1] tracking-tight">
          <Link href={postHref(post.slug)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-white/60 text-[15px] leading-relaxed">{post.description}</p>
        <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/80 group-hover:border-white/40 group-hover:text-white transition-colors">
          Read the guide <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </article>
  );
}

/** Responsive grid of article cards. */
export function PostGrid({ posts, as }: { posts: PostMeta[]; as?: "h2" | "h3" }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {posts.map((p) => (
        <PostCard key={p.slug} post={p} as={as} />
      ))}
    </div>
  );
}
