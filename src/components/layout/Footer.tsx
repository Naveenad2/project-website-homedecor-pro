"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { MapPin, Phone, Mail, ChevronRight, Plus } from "lucide-react";
import { SpriteIcon } from "../ui/IconSprite";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { REVIEW_PATH, SITE, telLink, waLink } from "@/lib/site";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const E = [0.22, 1, 0.36, 1] as const;

/* ── Raw SVG social icons (avoid lucide export errors) ─── */
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.5 5.9 3.5 5 4.7 5h14.6c1.2 0 2.2.9 2.2 2.1v9.8c0 1.2-1 2.1-2.2 2.1H4.7c-1.2 0-2.2-.9-2.2-2.1V7.1z"/>
    <path d="M9.7 15.5l6-3.5-6-3.5v7z"/>
  </svg>
);

const NAV = [
  { label: "Home",         href: "/" },
  { label: "All Products", href: "/products" },
  { label: "Project Films",href: "/films" },
  { label: "Blog & Guides",href: "/blog" },
  { label: "Catalogues",   href: "/catalogues" },
  { label: "Saint Gobain", href: "/saint-gobain" },
  { label: "Fundermax",    href: "/fundermax" },
  { label: "LG Hausys",    href: "/lg-hausys" },
  { label: "About Us",     href: "/#about" },
  { label: "FAQ",          href: "/#faq" },
  { label: "Contact",      href: "/contact" },
];

const PRODUCTS = [
  { label: "Saint-Gobain uPVC Windows", href: "/products/saint-gobain-upvc-windows" },
  { label: "System Aluminium Windows",  href: "/products/system-aluminium-windows" },
  { label: "Toughened & Laminated Glass", href: "/products/toughened-glass" },
  { label: "Shower Partitions",         href: "/products/shower-partitions" },
  { label: "Glass Handrails",           href: "/products/glass-handrails" },
  { label: "Lacquered Glass",           href: "/products/lacquered-glass" },
  { label: "Fundermax HPL Cladding",    href: "/products/fundermax-hpl-cladding" },
  { label: "iCLAD Façade Cladding",     href: "/products/iclad-cladding" },
  { label: "Novelio Wall Coverings",    href: "/products/novelio-wall-coverings" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/precisehomeautocare?igshid=MGNiNDI5ZTU=", Icon: InstagramIcon, color: "#D72731" },
  { label: "Facebook",  href: "https://www.facebook.com/precisehomeauto",                        Icon: FacebookIcon,  color: "#02589F" },
  { label: "YouTube",   href: "https://www.youtube.com/@precisehomeautocare",                    Icon: YoutubeIcon,   color: "#D72731" },
];

/* ── Simple reveal (no client-only initial) ──────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay, ease: E }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Business structured data now lives once in app/layout.tsx */}

      <footer className={`relative w-full bg-[#03070b] overflow-hidden ${jakarta.className}`}>

        {/* ════════════════════════════════════════════════
            AMBIENT BACKGROUND
        ════════════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-[15%] w-[700px] h-[700px] rounded-full bg-[#02589F]/[0.07] blur-[200px]" />
          <div className="absolute bottom-0 right-[5%] w-[600px] h-[600px] rounded-full bg-[#D72731]/[0.05] blur-[180px]" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "36px 36px" }}
          />
          {/* Noise grain */}
          <div
            className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          />
        </div>

        {/* ════════════════════════════════════════════════
            PRE-FOOTER CTA BAND
        ════════════════════════════════════════════════ */}
        {/* <div className="relative z-10 border-b border-white/[0.07]">
          <div className="max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

              <div className="max-w-xl">
                <Reveal className="flex items-center gap-4 mb-5">
                  <div className="w-6 h-[2px] bg-[#D72731]" />
                  <span className="text-[#D72731] text-[10px] font-bold uppercase tracking-[0.4em]">
                    Ready to Begin?
                  </span>
                </Reveal>
                <div className="overflow-hidden mb-1">
                  <motion.h3
                    initial={{ y: "105%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.05, ease: E }}
                    className={`${syne.className} text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold text-white leading-[0.96] tracking-tight`}
                  >
                    Transform Your Home
                  </motion.h3>
                </div>
                <div className="overflow-hidden">
                  <motion.h3
                    initial={{ y: "105%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.05, delay: 0.08, ease: E }}
                    className={`${syne.className} text-[clamp(1.8rem,4.5vw,3.2rem)] font-extrabold leading-[0.96] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#02589F] to-[#00aaff]`}
                  >
                    With Precise Homes.
                  </motion.h3>
                </div>
              </div>

              <Reveal delay={0.15} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="group flex items-center gap-3 bg-[#D72731] rounded-full pl-6 pr-2 py-2 hover:bg-[#b81e28] transition-colors duration-300 shadow-[0_0_28px_rgba(215,39,49,0.3)]"
                >
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Start Project</span>
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-400">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
                <a
                  href={telLink}
                  className="group flex items-center gap-2.5 border border-white/[0.1] rounded-full px-5 py-3 hover:border-white/[0.22] transition-all duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-white/40 group-hover:text-white/65 transition-colors" />
                  <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.18em] group-hover:text-white/75 transition-colors">
                    Call Now
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </div> */}

        {/* ════════════════════════════════════════════════
            MAIN FOOTER BODY
        ════════════════════════════════════════════════ */}
        <div className="relative z-10 max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16 xl:px-20 pt-14 md:pt-18">

          {/* ── 4-column grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 md:mb-16">

            {/* COL A — Brand (col-span-4) */}
            <Reveal className="sm:col-span-2 lg:col-span-4 flex flex-col gap-7">

              {/* Logo */}
              <Link href="/" aria-label="Precise Homes" className="block w-max">
                <div className="relative h-12 w-40 md:h-14 md:w-48">
                  <img
                    src="/logo-nav.webp"
                    alt="Precise Homes"
                    width={360}
                    height={229}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-contain object-left"
                  />
                </div>
              </Link>

              <p className="text-white/40 text-[13px] md:text-[14px] leading-[1.9] font-medium max-w-xs">
                Kerala&apos;s premier authorized dealer for Saint Gobain, Fundermax &amp; LG Hausys —
                delivering expert home care solutions from design to installation across Ernakulam &amp; beyond.
              </p>

              {/* Brand chips */}
              <div className="flex flex-wrap gap-2">
                {["Saint Gobain", "Fundermax", "LG Hausys"].map(b => (
                  <span
                    key={b}
                    className="text-[9px] font-bold uppercase tracking-wider text-[#60b4ff] border border-[#02589F]/30 bg-[#02589F]/10 px-3 py-1.5 rounded-full"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* Rating mini */}
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 w-fit">
                <div className="flex gap-0.5">
                  {[0,1,2,3,4].map(i => <SpriteIcon key={i} id="ph-star" className="w-3 h-3 text-[#D72731]" />)}
                </div>
                <div className="w-px h-4 bg-white/10" />
                <span className={`${syne.className} text-white text-sm font-extrabold`}>4.9</span>
                <span className="text-white/30 text-[10px] font-semibold">/ 49 reviews</span>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, href, Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group w-10 h-10 rounded-full border border-white/[0.1] flex items-center justify-center transition-all duration-300 hover:scale-110"
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${color}55`;
                      el.style.backgroundColor = `${color}18`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "";
                      el.style.backgroundColor = "";
                    }}
                  >
                    <Icon className="w-[15px] h-[15px] text-white/45 group-hover:text-white/90 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* COL B — Navigation (col-span-2) */}
            <Reveal delay={0.07} className="lg:col-span-2 lg:col-start-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1.5px] bg-[#02589F]" />
                <span className="text-[#02589F] text-[10px] font-bold uppercase tracking-[0.3em]">Navigation</span>
              </div>
              <ul className="flex flex-col gap-3">
                {NAV.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-white/40 text-[13px] font-medium hover:text-white/75 transition-colors duration-300"
                    >
                      <ChevronRight className="w-3 h-3 text-[#D72731] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* COL C — Products (col-span-3) */}
            <Reveal delay={0.12} className="lg:col-span-3 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1.5px] bg-[#02589F]" />
                <span className="text-[#02589F] text-[10px] font-bold uppercase tracking-[0.3em]">Products</span>
              </div>
              <ul className="flex flex-col gap-3">
                {PRODUCTS.map(p => (
                  <li key={p.href}>
                    <Link href={p.href} className="group flex items-center gap-2.5 text-white/40 text-[13px] font-medium hover:text-white/80 transition-colors duration-300">
                      <span className="w-1 h-1 rounded-full bg-white/15 shrink-0 group-hover:bg-[#D72731] transition-colors" />
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* COL D — Contact (col-span-3) */}
            <Reveal delay={0.17} className="sm:col-span-2 lg:col-span-3 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-[1.5px] bg-[#02589F]" />
                <span className="text-[#02589F] text-[10px] font-bold uppercase tracking-[0.3em]">Headquarters</span>
              </div>

              <address className="not-italic flex flex-col gap-5">
                <a
                  href="https://maps.google.com/?q=Precise+Homes+Padivattom+Kochi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 hover:text-white/70 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-[#02589F]/15 group-hover:border-[#02589F]/35 transition-all duration-300 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-white/35 group-hover:text-[#60b4ff] transition-colors" />
                  </div>
                  <span className="text-white/40 text-[12px] md:text-[13px] leading-[1.8] font-medium group-hover:text-white/60 transition-colors">
                    Building No: 42/3405,<br />
                    Civil Line Road, Padivattom,<br />
                    Kochi, Ernakulam — 682024<br />
                    <span className="text-white/25">Near Azeezia Supermarket</span>
                  </span>
                </a>

                <a
                  href={telLink}
                  className="group flex items-center gap-3.5 hover:text-white/70 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-[#02589F]/15 group-hover:border-[#02589F]/35 transition-all duration-300">
                    <Phone className="w-3.5 h-3.5 text-white/35 group-hover:text-[#60b4ff] transition-colors" />
                  </div>
                  <span className="text-white/40 text-[13px] font-semibold tracking-wide group-hover:text-white/65 transition-colors">
                    +91 98951 05012
                  </span>
                </a>

                <a
                  href="mailto:precisehomeauto@gmail.com"
                  className="group flex items-center gap-3.5 hover:text-white/70 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center shrink-0 group-hover:bg-[#02589F]/15 group-hover:border-[#02589F]/35 transition-all duration-300">
                    <Mail className="w-3.5 h-3.5 text-white/35 group-hover:text-[#60b4ff] transition-colors" />
                  </div>
                  <span className="text-white/40 text-[13px] font-semibold tracking-wide group-hover:text-white/65 transition-colors">
                    {SITE.email}
                  </span>
                </a>

                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-white shadow-[0_8px_24px_rgba(37,211,102,0.3)] hover:bg-[#1ebe5b] transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span className="text-[12px] font-bold tracking-wide">WhatsApp {SITE.phoneDisplay}</span>
                </a>

                {/* /review redirects to the Google review form (same link as the NFC card) */}
                <a
                  href={REVIEW_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-fit items-center gap-2.5 text-white/40 text-[12.5px] font-semibold hover:text-white/75 transition-colors"
                >
                  <span aria-hidden="true" className="tracking-[0.12em] text-[#FBBC04]">★★★★★</span>
                  Review us on Google
                </a>
              </address>
            </Reveal>
          </div>

          {/* ── Divider with brand strip ── */}
          <div className="border-t border-white/[0.07] pt-8 pb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.22em] text-center sm:text-left">
                © {year} Precise Homes. All Rights Reserved.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {[
                  { label: "Catalogues", href: "/catalogues" },
                  { label: "Sitemap", href: "/sitemap.xml" },
                ].map(({ label, href }, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-white/10" />}
                    <Link href={href} className="text-white/20 text-[10px] font-bold uppercase tracking-[0.18em] hover:text-white/45 transition-colors">
                      {label}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ── Massive wordmark ── */}
          <div className="-mx-5 md:-mx-10 lg:-mx-16 xl:-mx-20 overflow-hidden relative">
            {/* Corner marks */}
            <Plus className="absolute top-2 left-4 md:left-8 text-white/[0.06] w-4 h-4" />
            <Plus className="absolute top-2 right-4 md:right-8 text-white/[0.06] w-4 h-4" />

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: E }}
              aria-hidden="true"
              className={`${syne.className} select-none pointer-events-none text-center leading-[0.78] tracking-tighter uppercase`}
              style={{
                fontSize: "clamp(3.5rem, 18vw, 18rem)",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 60%, transparent 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PRECISE.
            </motion.h2>
          </div>
        </div>
      </footer>
    </>
  );
}