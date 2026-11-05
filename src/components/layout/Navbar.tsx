"use client";

import { useState } from "react";
import Link from "next/link";
import { Syne } from "next/font/google";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, ArrowRight, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "../ui/WhatsAppIcon";
import { SITE, telLink, waLink } from "@/lib/site";
import { useScrollLock } from "@/lib/client-utils";

const CONTACT_MESSAGE = "Hi Precise Homes! I'd like to talk to your team about my project.";

// --- Synchronized Font (matches Hero exactly) ---
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const EASE = [0.22, 1, 0.36, 1] as const;

// --- Navigation Data ---
type NavLink = { name: string; href: string; dropdown?: { label: string; href: string; desc: string }[] };
const NAV_LINKS: NavLink[] = [
  { name: "HOME", href: "/" },
  {
    name: "PRODUCTS",
    href: "/products",
    dropdown: [
      { label: "Windows & Doors", href: "/products#windows-doors", desc: "uPVC, aluminium & automatic doors" },
      { label: "Glass", href: "/products#glass", desc: "Toughened, laminated, showers & rails" },
      { label: "Cladding & HPL", href: "/products#cladding", desc: "Fundermax HPL & iCLAD stone" },
      { label: "Walls & Surfaces", href: "/products#walls-surfaces", desc: "Novelio, Forms+Surfaces, LG Hausys" },
      { label: "All Products", href: "/products", desc: "Browse the full range" },
    ],
  },
  { name: "FILMS", href: "/films" },
  { name: "CATALOGUES", href: "/catalogues" },
  {
    name: "BRANDS",
    href: "/#brands",
    dropdown: [
      { label: "Saint Gobain", href: "/saint-gobain", desc: "Premium Glass Solutions" },
      { label: "Fundermax", href: "/fundermax", desc: "HPL Facade Cladding" },
      { label: "LG Hausys", href: "/lg-hausys", desc: "Interior Surface Films" },
    ],
  },
  { name: "ABOUT", href: "/#about" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    url: "https://instagram.com/precisehomeautocare?igshid=MGNiNDI5ZTU=",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/precisehomeauto",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com/@precisehomeautocare",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

// --- Desktop Dropdown ---
function DropdownMenu({ items }: { items: NonNullable<NavLink["dropdown"]> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.28, ease: EASE }}
      className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 z-50 origin-top"
    >
      {/* Arrow notch */}
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#0d1420] border-t border-l border-white/10 rotate-45" />

      <div className="bg-[#0d1420] border border-white/10 rounded-xl overflow-hidden shadow-[0_24px_60px_-8px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-1.5 mt-1">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.06, duration: 0.3, ease: EASE }}
          >
          <Link
            href={item.href}
            className="group flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-[#D72731] transition-colors duration-200">
                {item.label}
              </span>
              <span className="text-white/30 text-[9px] tracking-wide font-medium">
                {item.desc}
              </span>
            </div>
            <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[#D72731] group-hover:border-[#D72731] transition-all duration-300">
              <ArrowRight className="w-3 h-3 text-white" />
            </div>
          </Link>
          </motion.div>
        ))}
        {/* Bottom brand strip */}
        <div className="mt-1 pt-2 px-4 pb-2 border-t border-white/[0.06] flex items-center gap-2">
          <div className="w-4 h-[1.5px] bg-[#D72731]" />
          <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em]">
            Precise Home
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// --- Animated Hamburger Icon ---
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-end gap-[5px] w-5 h-5">
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0, width: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        className="block h-[1.5px] bg-white rounded-full w-full origin-center"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, width: open ? "100%" : "60%" }}
        transition={{ duration: 0.25, ease: EASE }}
        className="block h-[1.5px] bg-white rounded-full"
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0, width: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        className="block h-[1.5px] bg-white rounded-full w-4/5 origin-center"
      />
    </div>
  );
}

// --- Main Navbar ---
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Lock page scroll while the full-screen mobile menu is open
  useScrollLock(menuOpen);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ================================================================
          NAVBAR HEADER
      ================================================================ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${syneFont.className}`}
      >
        {/* Backdrop: only visible when scrolled or menu open */}
        <motion.div
          animate={{
            opacity: scrolled || menuOpen ? 1 : 0,
            backdropFilter: scrolled || menuOpen ? "blur(24px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-[#03070b]/90 border-b border-white/[0.07]"
          style={{ pointerEvents: "none" }}
        />

        {/* Tall gradient for initial transparent state — blends into hero */}
        <motion.div
          animate={{ opacity: scrolled || menuOpen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-b from-[#03070b]/80 via-[#03070b]/30 to-transparent pointer-events-none"
        />

        {/* ------- TOP INFO BAR (desktop only, hides on scroll) ------- */}
        <motion.div
          animate={{
            height: scrolled ? 0 : 38,
            opacity: scrolled ? 0 : 1,
          }}
          transition={{ duration: 0.45, ease: EASE }}
          className="relative z-10 overflow-hidden border-b border-white/[0.06] hidden md:block"
        >
          <div className="max-w-[1920px] mx-auto px-8 md:px-12 lg:px-24 h-full flex items-center justify-between">
            {/* Location */}
            <div className="flex items-center gap-2.5">
              <MapPin className="w-3 h-3 text-[#D72731] shrink-0" />
              <span className="text-white/50 text-[9px] font-bold uppercase tracking-[0.3em]">
                Padivattom, Ernakulam
              </span>
            </div>

            {/* Right: phone / email / socials */}
            <div className="flex items-center gap-7">
              <a
                href={telLink}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group"
              >
                <Phone className="w-3 h-3 text-[#D72731]" />
                <span className="text-[9px] font-bold tracking-[0.15em]">+91 98951 05012</span>
              </a>
              <a
                href="mailto:precisehomeauto@gmail.com"
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-3 h-3 text-[#02589F]" />
                <span className="text-[9px] font-bold tracking-[0.1em] uppercase">
                  precisehomeauto@gmail.com
                </span>
              </a>

              {/* Divider + Socials */}
              <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                {SOCIAL_LINKS.map(({ label, url, icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="text-white/30 hover:text-[#D72731] transition-colors duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ------- MAIN NAV BAR ------- */}
        <div className={`relative z-10 w-full transition-all duration-500 ${scrolled ? "py-3 md:py-4" : "py-5 md:py-6"}`}>
          <div className="max-w-[1920px] mx-auto px-5 sm:px-8 md:px-12 lg:px-24 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" aria-label="Precise Homes — home" className="relative z-50 flex items-center transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/logo-nav.webp"
                alt="Precise Homes"
                width={360}
                height={229}
                className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-8 md:h-9" : "h-9 md:h-11"}`}
              />
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    onFocus={() => link.dropdown && setActiveDropdown(link.name)}
                    className="group flex items-center gap-1 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 hover:text-white transition-colors duration-300 py-3"
                  >
                    {link.name}
                    {link.dropdown && (
                      <motion.div
                        animate={{ rotate: activeDropdown === link.name ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <ChevronDown className="w-3 h-3 text-current ml-0.5" />
                      </motion.div>
                    )}
                    {/* Underline reveal */}
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#D72731] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out" />
                  </Link>

                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.name && (
                      <DropdownMenu items={link.dropdown} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3 md:gap-4 relative z-50">
              {/* CTA — Contact Us opens WhatsApp chat with the team */}
              <motion.a
                href={waLink(CONTACT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Contact us on WhatsApp ${SITE.phoneDisplay}`}
                className="hidden md:flex items-center gap-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] hover:border-white/25 pl-5 pr-1.5 py-1.5 rounded-full backdrop-blur-md transition-all duration-400 group"
              >
                <span className="text-white text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.25em]">
                  Contact Us
                </span>
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-[0_0_16px_rgba(37,211,102,0.45)]">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.a>

              {/* Hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.92 }}
                aria-label="Toggle menu"
                className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] hover:bg-white/10 hover:border-white/25 flex items-center justify-center transition-all duration-300 focus:outline-none"
              >
                <HamburgerIcon open={menuOpen} />
              </motion.button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ================================================================
          FULLSCREEN OVERLAY MENU
      ================================================================ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-[#03070b]/60 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Panel — slides in from right on mobile, full-screen on all */}
            <motion.div
              key="menu-panel"
              initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className={`fixed inset-0 z-[45] flex flex-col bg-[#06090f] overflow-y-auto ${syneFont.className}`}
            >
              {/* Subtle radial glow */}
              <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-[#02589F]/5 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-[#D72731]/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Film grain */}
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Grid line texture */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                  backgroundSize: "80px 80px",
                }}
              />

              {/* Inner content */}
              <div className="relative z-10 flex flex-col h-full min-h-screen max-w-[1920px] mx-auto w-full px-5 sm:px-10 md:px-16 lg:px-24 pt-28 md:pt-36 pb-10">

                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
                  className="flex items-center gap-4 mb-8 md:mb-10"
                >
                  <div className="w-8 h-[1.5px] bg-[#D72731]" />
                  <span className="text-[#D72731] text-[8px] font-bold uppercase tracking-[0.5em]">
                    Navigation
                  </span>
                </motion.div>

                {/* Nav Links — massive typographic stack */}
                <nav className="flex flex-col flex-grow">
                  {NAV_LINKS.map((link, i) => (
                    <div key={link.name} className="overflow-hidden border-b border-white/[0.06]">
                      {/* Main link row */}
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.75, ease: EASE }}
                      >
                        <Link
                          href={link.href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between py-4 md:py-5"
                        >
                          <div className="flex items-baseline gap-4 md:gap-6">
                            {/* Index */}
                            <span className="text-white/15 text-[9px] font-bold tabular-nums tracking-widest w-5">
                              0{i + 1}
                            </span>
                            {/* Label */}
                            <span className="text-[9vw] sm:text-[7vw] md:text-[5.5vw] lg:text-[4.5vw] font-bold uppercase tracking-tighter text-white group-hover:text-[#D72731] transition-colors duration-300 leading-none">
                              {link.name}
                            </span>
                          </div>

                          {link.dropdown ? (
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/20 group-hover:text-[#D72731] transition-colors shrink-0" />
                          ) : (
                            <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#D72731] group-hover:border-[#D72731] transition-all duration-400">
                              <ArrowUpRight className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </Link>
                      </motion.div>

                      {/* Sub-items (always visible inside menu) */}
                      {link.dropdown && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                          className="flex flex-wrap gap-3 pb-4 pl-8 md:pl-12"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={closeMenu}
                              className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-[#D72731]/10 hover:border-[#D72731]/30 transition-all duration-300"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#D72731] shrink-0" />
                              <span className="text-white/60 group-hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] transition-colors">
                                {item.label}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Footer info strip */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.7, ease: EASE }}
                  className="mt-8 md:mt-10 pt-6 border-t border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {/* Contact details */}
                  <div className="flex flex-col gap-3">
                    <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em] mb-1">Get in Touch</span>
                    <a href={telLink} className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors group">
                      <Phone className="w-3.5 h-3.5 text-[#D72731]" />
                      <span className="text-[10px] font-bold tracking-[0.15em]">+91 98951 05012</span>
                    </a>
                    <a href="mailto:precisehomeauto@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5 text-[#02589F]" />
                      <span className="text-[10px] font-bold tracking-[0.1em] uppercase">precisehomeauto@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-2.5 text-white/30">
                      <MapPin className="w-3.5 h-3.5 text-[#D72731]" />
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Padivattom, Ernakulam</span>
                    </div>
                  </div>

                  {/* Socials + CTA */}
                  <div className="flex flex-col justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <span className="text-white/20 text-[8px] font-bold uppercase tracking-[0.4em] mb-1">Follow Us</span>
                      <div className="flex items-center gap-5">
                        {SOCIAL_LINKS.map(({ label, url, icon }) => (
                          <a
                            key={label}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={label}
                            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-[#D72731] hover:bg-[#D72731]/10 hover:border-[#D72731]/30 transition-all duration-300"
                          >
                            {icon}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* CTA — Contact on WhatsApp */}
                    <a
                      href={waLink(CONTACT_MESSAGE)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="group relative overflow-hidden rounded-full bg-[#25D366] pl-6 pr-2 py-2 flex items-center gap-4 transition-all duration-500 hover:bg-[#1ebe5b] shadow-[0_10px_30px_rgba(37,211,102,0.35)] w-fit"
                      aria-label={`Contact Precise Homes on WhatsApp ${SITE.phoneDisplay}`}
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span className="text-white text-[10px] font-bold uppercase tracking-[0.22em]">
                        Contact on WhatsApp
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </a>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}