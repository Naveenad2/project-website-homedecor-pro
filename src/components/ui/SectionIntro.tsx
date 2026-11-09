import type { ReactNode } from "react";

/** Kicker + two-tone headline + supporting copy, matching the site's existing section style. */
export default function SectionIntro({
  id,
  kicker,
  title,
  accent,
  children,
  as: Heading = "h2",
  aside,
}: {
  id?: string;
  kicker: string;
  title: string;
  accent?: string;
  children?: ReactNode;
  as?: "h1" | "h2";
  aside?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
      <div className="lg:col-span-7">
        <div className="flex items-center gap-4">
          <span className="h-[2px] w-8 bg-[#D72731]" />
          <span className="text-[#ff6b72] text-[10px] font-bold uppercase tracking-[0.35em]">{kicker}</span>
        </div>
        <Heading id={id} className="mt-5 text-[clamp(1.9rem,4.2vw,3.4rem)] font-bold leading-[1] tracking-tighter text-white">
          {title}
          {accent && <span className="block text-[#02589F] brightness-[1.35] saturate-[1.6]">{accent}</span>}
        </Heading>
      </div>
      <div className="lg:col-span-5">
        {children && <div className="text-white/55 text-[14px] md:text-[15px] leading-relaxed font-medium">{children}</div>}
        {aside}
      </div>
    </div>
  );
}
