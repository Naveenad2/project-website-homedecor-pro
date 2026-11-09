"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import WhatsAppIcon from "./WhatsAppIcon";
import { DEFAULT_WA_MESSAGE, SITE, waLink } from "@/lib/site";

/** Message mentions the page the visitor is reading, so the team has context. */
function messageForPage(pathname: string): string {
  if (pathname === "/" || typeof document === "undefined") return DEFAULT_WA_MESSAGE;
  const title = document.title.split("|")[0].trim();
  return title ? `Hi Precise Homes! I'm looking at "${title}" on your website and would like more details.` : DEFAULT_WA_MESSAGE;
}

/** Plain floating WhatsApp button — +91 98951 05012. */
export default function WhatsAppFloat() {
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);
  const refreshHref = () => {
    if (linkRef.current) linkRef.current.href = waLink(messageForPage(pathname));
  };

  return (
    <a
      ref={linkRef}
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={refreshHref}
      onFocus={refreshHref}
      aria-label={`Chat with ${SITE.name} on WhatsApp (${SITE.phoneDisplay})`}
      className="fixed z-[90] right-4 sm:right-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-105"
      style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
