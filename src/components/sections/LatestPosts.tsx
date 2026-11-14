import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { PostGrid } from "@/components/blog/PostCard";
import { getAllPosts } from "@/lib/blog";
import { syne } from "@/lib/fonts";

/** Homepage strip of the newest guides — fresh, crawlable links into the blog. */
export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (!posts.length) return null;
  return (
    <section id="guides" aria-labelledby="guides-title" className={`relative w-full bg-[#03070b] py-20 md:py-24 ${syne.className}`}>
      <div className="relative mx-auto max-w-[1920px] px-5 md:px-10 lg:px-16 xl:px-20">
        <SectionIntro id="guides-title" kicker="Journal // Guides" title="Read before" accent="you renovate.">
          <p>Honest advice on windows, glass and cladding for Kerala&apos;s rain, heat and humidity — from the team that installs them.</p>
        </SectionIntro>
        <div className="mt-10">
          <PostGrid posts={posts} />
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/75 hover:text-white hover:border-white/35 transition-colors"
          >
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
