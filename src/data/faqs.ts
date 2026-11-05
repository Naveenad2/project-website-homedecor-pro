import { SITE } from "@/lib/site";

export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export const HOME_FAQS: Faq[] = [
  {
    q: "Where is the Precise Homes experience centre in Kochi?",
    a: `We are at ${SITE.address.street}, ${SITE.address.locality} ${SITE.address.postalCode} (${SITE.address.landmark}). The centre displays Saint-Gobain uPVC windows, glass samples, shower cubicles, handrails and cladding. We are open ${SITE.hours.label}.`,
    link: { href: SITE.mapsUrl, label: "Get directions" },
  },
  {
    q: "Are you an authorised Saint-Gobain dealer in Kochi?",
    a: "Yes. Precise Homes is an authorised Saint-Gobain dealer in Kochi for windows and glass, and also supplies Fundermax HPL, iCLAD sintered stone cladding, Novelio wall coverings, Dimore and Vitrum system aluminium, Forms+Surfaces and LG Hausys products.",
  },
  {
    q: "Do you install uPVC windows in Cochin and across Kerala?",
    a: "Yes. We supply and install Saint-Gobain uPVC windows throughout Kochi (Cochin) and Ernakulam, and across Kerala — our project films show homes in Kaloor, Kollam, Fort Kochi and Edappally.",
    link: { href: "/products/saint-gobain-upvc-windows", label: "Saint-Gobain uPVC windows" },
  },
  {
    q: "uPVC, Saint-Gobain aluminium or system aluminium — which windows should I choose?",
    a: "uPVC insulates best against heat and noise and suits most rooms. Aluminium and system aluminium (such as Dimore and Vitrum Slimline) are stronger and slimmer, ideal for very large sliding doors and minimal frames. Many homes combine them — we advise room by room after a free site visit.",
    link: { href: "/products/system-aluminium-windows", label: "System aluminium windows" },
  },
  {
    q: "What is the difference between toughened glass and laminated glass?",
    a: "Toughened glass is heat-treated to be about four to five times stronger than ordinary glass and breaks into small blunt pieces. Laminated glass bonds panes with an interlayer so it stays in place when broken and also reduces noise and UV. Railings and skylights often use toughened-laminated glass for both benefits.",
    link: { href: "/products/toughened-glass", label: "Toughened glass" },
  },
  {
    q: "Do you make shower partitions and glass handrails to measure?",
    a: "Yes. Shower partitions, Saint-Gobain shower cubicles and frameless glass handrails are measured on site and made to fit, using toughened or toughened-laminated safety glass and quality hardware.",
    link: { href: "/products/shower-partitions", label: "Shower partitions" },
  },
  {
    q: "Fundermax HPL or iCLAD sintered stone — which cladding is right for my façade?",
    a: "Fundermax Max Compact Exterior is a high-pressure laminate with 132 wood, stone and solid décors — warm, light and versatile. iCLAD is a 6 mm sintered stone panel in large formats for a stone or concrete look on ventilated façades. We can show both side by side and suggest the best fit.",
    link: { href: "/products/fundermax-hpl-cladding", label: "Fundermax HPL cladding" },
  },
  {
    q: "What is lacquered glass, and where is it used?",
    a: "Lacquered glass (sometimes spelt 'lackered glass') is coloured, back-painted glass. Its glossy, wipe-clean surface is popular for kitchen shutters, backsplashes, wardrobes and feature walls.",
    link: { href: "/products/lacquered-glass", label: "Lacquered glass" },
  },
  {
    q: "Can I download your brochures and catalogues?",
    a: "Yes — preview or download the iCLAD, Fundermax, Dimore, Vitrum, Saint-Gobain automatic door, Novelio and Forms+Surfaces catalogues in the brochure library, or ask us to send them on WhatsApp.",
    link: { href: "/catalogues", label: "Brochure library" },
  },
  {
    q: "How do I get a quotation quickly?",
    a: `WhatsApp or call ${SITE.phoneDisplay} with your plan, window sizes or a few photos. We will share an estimate and arrange a free site visit anywhere in Kerala.`,
  },
];
