"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { DEFAULT_WA_MESSAGE, SITE, waLink } from "@/lib/site";
import { safeSession } from "@/lib/client-utils";
import { jakarta } from "@/lib/fonts";

const GREETING_KEY = "ph-wa-greeting-dismissed";

/** Message mentions the page the visitor is reading, so the team has context. */
function messageForPage(pathname: string): string {
  if (pathname === "/" || typeof document === "undefined") return DEFAULT_WA_MESSAGE;
  const title = document.title.split("|")[0].trim();
  return title ? `Hi Precise Homes! I'm looking at "${title}" on your website and would like more details.` : DEFAULT_WA_MESSAGE;
}

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [greeting, setGreeting] = useState(false);

  // Show a gentle greeting once per session, after the visitor has had time to look around.
  useEffect(() => {
    if (safeSession(GREETING_KEY)) return;
    const t = window.setTimeout(() => setGreeting(true), 15000);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setGreeting(false);
    safeSession(GREETING_KEY, "1");
  };

  // Refresh the pre-filled message right before the click navigates.
  const refreshHref = () => {
    if (linkRef.current) linkRef.current.href = waLink(messageForPage(pathname));
  };

  return (
    <div
      className={`fixed z-[90] right-4 sm:right-6 flex flex-col items-end gap-3 pointer-events-none ${jakarta.className}`}
      style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <AnimatePresence>
        {greeting && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative w-[min(290px,calc(100vw-2rem))] rounded-2xl bg-white text-[#0f1b26] shadow-[0_18px_50px_rgba(0,0,0,0.35)] p-4 pr-9"
            role="status"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss message"
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center text-[#5b6b7a] hover:bg-black/5"
            >
              <X className="w-4 h-4" />
            </button>
            <p className="text-[13px] font-semibold leading-snug">Hi there 👋</p>
            <p className="text-[12.5px] leading-relaxed text-[#46596b] mt-1">
              Need help choosing windows, glass or cladding? Chat with our Kochi team on WhatsApp — we reply fast.
            </p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismiss}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#1ebe5b] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" /> Start chat
            </a>
            <span className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 bg-white" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        ref={linkRef}
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        onPointerDown={refreshHref}
        onFocus={refreshHref}
        onClick={() => safeSession(GREETING_KEY, "1")}
        aria-label={`Chat with ${SITE.name} on WhatsApp (${SITE.phoneDisplay})`}
        className="group pointer-events-auto relative flex items-center gap-0 rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_14px_38px_rgba(37,211,102,0.6)] transition-shadow duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[wa-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" aria-hidden="true" />
        <span className="relative flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px]">
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8" />
        </span>
        <span className="relative hidden md:block max-w-0 overflow-hidden whitespace-nowrap text-[13px] font-bold transition-all duration-500 ease-out group-hover:max-w-[180px] group-hover:pr-5 group-focus-visible:max-w-[180px] group-focus-visible:pr-5">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
