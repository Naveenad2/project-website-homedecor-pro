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
    q: "What is the difference between toughened glass and laminated glass?",
    a: "Toughened glass is heat-treated to be about four to five times stronger than ordinary glass and breaks into small blunt pieces. Laminated glass bonds panes with an interlayer so it stays in place when broken and also reduces noise and UV. Railings and skylights often use toughened-laminated glass for both benefits.",
    link: { href: "/products/toughened-glass", label: "Toughened glass" },
  },
  {
    q: "Fundermax HPL or iCLAD sintered stone — which cladding is right for my façade?",
    a: "Fundermax Max Compact Exterior is a high-pressure laminate with 132 wood, stone and solid décors — warm, light and versatile. iCLAD is a 6 mm sintered stone panel in large formats for a stone or concrete look on ventilated façades. We can show both side by side and suggest the best fit.",
    link: { href: "/products/fundermax-hpl-cladding", label: "Fundermax HPL cladding" },
  },
  {
    q: "How do I get a quotation quickly?",
    a: `WhatsApp or call ${SITE.phoneDisplay} with your plan, window sizes or a few photos. We will share an estimate and arrange a free site visit anywhere in Kerala.`,
  },
];
