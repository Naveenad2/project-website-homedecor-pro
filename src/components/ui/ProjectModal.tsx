"use client";

// ─────────────────────────────────────────────────────────────────────────────
// components/ui/ProjectModal.tsx
// White theme · Mobile responsive · Self-contained · No external API
// ─────────────────────────────────────────────────────────────────────────────

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { Syne } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Phone,
  Mail,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTACT = {
  phone: "+919895105012",
  whatsapp: "https://wa.me/919895105012",
  email: "info@precisehomes.in",
  emailSubject: "Project Enquiry — Precise Homes",
  address: "Civil Line Road, Padivattom, Kochi 682024",
  hours: "Mon – Sat · 9 AM – 6 PM",
};

// ─────────────────────────────────────────────────────────────────────────────
// KNOWLEDGE BASE — no pricing details
// ─────────────────────────────────────────────────────────────────────────────
interface KBEntry {
  keywords: string[];
  response: string;
}

const KB: KBEntry[] = [
  // Greetings
  {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hai", "helo", "howdy", "greetings"],
    response: "Hello! Welcome to Precise Homes 👋\n\nWe are Ernakulam's premier home care agency — authorized dealer for Saint-Gobain Glass, Fundermax Cladding, and LG Hausys Surfaces.\n\nHow can I help you today? You can ask me about our products, services, or how to get in touch with our team.",
  },

  // About
  {
    keywords: ["about", "who are you", "company", "precise homes", "about you", "what do you do", "your company", "tell me about", "overview"],
    response: "About Precise Homes:\n\nWe are Ernakulam's premier home care agency with 12+ years of experience and 500+ successfully delivered projects across Kerala.\n\n✅ 98% client satisfaction rate\n✅ Authorized dealer for top global brands\n✅ Turnkey design-to-installation service\n✅ Free site visit & consultation\n\nWe serve all of Kerala — Ernakulam, Kochi, Thrissur, Palakkad, Kozhikode and beyond.\n\n📍 Civil Line Road, Padivattom, Kochi 682024\n📞 +919895105012",
  },

  // Saint-Gobain general
  {
    keywords: ["saint gobain", "saint-gobain", "saintgobain", "glass solution", "glass facade", "glass partition", "structural glaz", "glass products", "glass work", "glazing", "glass door", "glass wall", "glass railing", "skylight", "shower glass"],
    response: "Saint-Gobain Glass Solutions — Authorized Dealer\n\nWe offer the complete range of Saint-Gobain glass products:\n\n🪟 Glass Facades & Curtain Walling\nFull-height external glass systems for offices, hotels, and showrooms.\n\n🪟 Structural Glazing\nFrameless glass systems held by structural silicone or spider fittings.\n\n🪟 Tempered Safety Glass\n4× stronger than regular glass — shatters safely into small pebbles.\n\n🪟 Laminated Safety Glass\nHolds together when broken — ideal for skylights and overhead glass.\n\n🪟 Double Glazed Units (DGU)\nTwo-pane insulated glass for thermal and acoustic performance.\n\n🪟 Solar Control Glass\nBlocks up to 60% solar heat — significantly reduces AC load.\n\n🪟 Acoustic Glass\nReduces noise by 30–50 dB — ideal for offices, hospitals, hotels.\n\n🪟 Fire-Rated Glass\nEI30 / EI60 certified for fire-compartment walls.\n\n🪟 Decorative Glass\nFrosted, acid-etched, and digitally printed options.\n\n🪟 Glass Partitions, Balustrades, Shower Enclosures & Skylights\n\nContact us for a free consultation and site visit!",
  },

  // Fundermax general
  {
    keywords: ["fundermax", "cladding", "exterior panel", "hpl panel", "facade panel", "wall panel", "exterior wall", "building facade", "compact panel", "phenolic", "hpl", "wall cladding", "exterior cladding", "interior cladding"],
    response: "Fundermax Cladding — Authorized Dealer\n\nFundermax is an Austrian brand producing HPL (High Pressure Laminate) panels — considered among the finest facade materials in the world.\n\n🏗️ Exterior Facade Cladding\nWeather-resistant, UV-stable panels for modern building exteriors.\n\n🏗️ Interior Wall Cladding\nFor feature walls, lobbies, corridors, and wet areas.\n\n🏗️ Ventilated Facade Systems\nFull substructure + panel system with an air gap for breathability.\n\n🏗️ 100+ Colours & Textures\nMatt, silk, wood-look, stone-look, and solid colour finishes.\n\n🏗️ Panel Thickness Options\n6mm to 20mm — for both light and heavy-duty applications.\n\nWhy Fundermax is perfect for Kerala:\n✅ Zero water absorption — won't warp or swell in monsoons\n✅ UV-stable — colours won't fade under intense Kerala sun\n✅ Anti-bacterial surface — ideal for hospitals and schools\n✅ Fire-rated (Euroclass B-s1,d0)\n✅ 25+ year UV warranty\n✅ Low maintenance — just wash with water\n\nGet in touch for our catalogue and a free consultation!",
  },

  // LG Hausys general
  {
    keywords: ["lg hausys", "lg haüsys", "hi-macs", "himacs", "solid surface", "quartz surface", "countertop", "kitchen surface", "bathroom surface", "viatera", "interior film", "acrylic surface", "kitchen counter", "vanity top", "lab surface"],
    response: "LG Hausys Premium Surfaces — Authorized Dealer\n\nLG Hausys is the premium materials division of LG Group. We are an authorized dealer in Kerala.\n\n🛁 HI-MACS Solid Surface\n100% acrylic — seamless, repairable, and hygienic. The premium Corian alternative.\n\n🛁 LG Viatera Quartz\nEngineered quartz for countertops, floors, and wall cladding.\n\n🛁 LG Hausys Interior Film\nSelf-adhesive premium vinyl for furniture, doors, and wall surfaces.\n\n🛁 Luxury Vinyl Tile (LVT) Flooring\nDurable, waterproof flooring that mimics wood and stone.\n\n🛁 Kitchen Countertops\nNon-porous, stain-resistant, seamless finish.\n\n🛁 Hospital & Lab Surfaces\nChemical-resistant, hygienic, and easy to sanitize.\n\n🛁 Reception Desks & Commercial Counters\nThermoformable into custom curves and integrated sinks.\n\nWhy LG Hausys:\n✅ Non-porous — zero bacteria or stain absorption\n✅ Seamless — no visible joints like tiles or granite\n✅ Repairable — minor scratches can be sanded out\n✅ GREENGUARD certified — safe, low VOC\n\nCall us for samples and a free site assessment!",
  },

  // Site visit / consultation / booking
  {
    keywords: ["site visit", "consultation", "visit", "free visit", "book", "appointment", "meeting", "survey", "inspection", "free consult", "how to start", "get started", "start project", "begin"],
    response: "Book a FREE Site Visit!\n\nWe offer free site visits and consultations across all of Kerala — no obligation.\n\nDuring the visit our expert will:\n✅ Assess your space and understand your vision\n✅ Recommend the most suitable products\n✅ Bring physical material samples and a colour catalogue\n✅ Provide a detailed, accurate quotation\n✅ Offer 3D design visualization if required\n\nHow to book:\n📞 Call: +919895105012\n💬 WhatsApp: +919895105012\n✉️ Email: info@precisehomes.in\n\nOur team responds within 2 hours during business hours.\n📅 Mon – Sat · 9 AM – 6 PM",
  },

  // Projects / portfolio
  {
    keywords: ["project", "portfolio", "work", "completed", "previous work", "sample work", "case study", "experience", "track record", "past project"],
    response: "Our Project Portfolio:\n\n📊 500+ projects completed across Kerala\n⭐ 98% client satisfaction rate\n🏗️ 12+ years of industry experience\n\nProject types we have delivered:\n🏠 Residential villas and luxury apartments\n🏢 Corporate offices and IT parks\n🏥 Hospitals and healthcare facilities\n🏫 Educational institutions and campuses\n🏨 Hotels and hospitality projects\n🏬 Retail showrooms and commercial buildings\n\nOur work spans glass facades, structural glazing, Fundermax exterior cladding, interior feature walls, and LG Hausys surface installations across Kerala.\n\nWould you like to see project photos? WhatsApp us at +919895105012 and we will share our portfolio with you!",
  },

  // Location / address
  {
    keywords: ["location", "address", "where", "office", "showroom", "find you", "directions", "reach you", "visit office", "come to", "padivattom", "kochi office"],
    response: "Our Location:\n\n📍 Building No: 42/3405\nCivil Line Road, Padivattom\nKochi, Kerala 682024\n\n🕘 Business Hours:\nMonday – Saturday · 9:00 AM – 6:00 PM\n\nService Area — We travel anywhere in Kerala:\n• Ernakulam & Kochi\n• Thrissur & Palakkad\n• Kozhikode & Malappuram\n• Trivandrum & Kollam\n• All districts on request\n\n📞 +919895105012\n✉️ info@precisehomes.in\n\nPlease call ahead before visiting so the right team member is available for you!",
  },

  // Contact
  {
    keywords: ["contact", "phone", "call", "number", "reach", "whatsapp", "email", "talk to", "speak to", "get in touch", "connect"],
    response: "Contact Precise Homes:\n\n📞 Phone: +919895105012\n💬 WhatsApp: +919895105012\n✉️ Email: info@precisehomes.in\n🌐 Website: https://precisehomes.in\n\n📍 Civil Line Road, Padivattom, Kochi 682024\n🕘 Mon – Sat · 9 AM – 6 PM\n\nWe respond to WhatsApp messages fastest — usually within the hour during business hours.",
  },

  // Warranty / after-sales
  {
    keywords: ["warranty", "guarantee", "after sales", "service", "maintenance", "support", "repair", "lifespan", "durable", "long lasting", "how long does it last"],
    response: "Warranty & After-Sales Support:\n\n🪟 Saint-Gobain Glass:\n• Product warranty as per Saint-Gobain manufacturer norms\n• Our installation workmanship warranty: 1 year\n\n🏗️ Fundermax Cladding:\n• UV stability warranty: 25+ years\n• Panel structural warranty: 10 years\n• Colour fastness guarantee included\n\n🛁 LG Hausys Surfaces:\n• HI-MACS: 10-year limited product warranty\n• Viatera Quartz: 15-year limited warranty\n\nWe also offer:\n✅ Post-installation support and guidance\n✅ Annual maintenance contracts for commercial projects\n✅ 24–48 hour response time for service calls\n\nFor any support needs, contact us at +919895105012.",
  },

  // Timeline / delivery
  {
    keywords: ["timeline", "how long", "duration", "delivery", "installation time", "completion", "how many days", "how many weeks", "fast delivery", "urgency", "when"],
    response: "Project Timelines:\n\nTypical timelines after order confirmation:\n\n⏱️ Glass partitions & shower enclosures: 7–10 working days\n⏱️ Glass facade (medium project): 3–6 weeks\n⏱️ Fundermax cladding for a villa: 2–4 weeks\n⏱️ Full commercial building facade: 4–10 weeks\n⏱️ LG Hausys kitchen countertop: 5–8 working days\n⏱️ Large commercial project: 6–16 weeks\n\nTimelines vary based on project area, complexity, and site conditions. Our team will give you a precise project schedule during the free site visit.\n\nCall +919895105012 to discuss your timeline requirements!",
  },

  // Villa / residential
  {
    keywords: ["villa", "home", "house", "residential", "bungalow", "apartment", "flat", "bedroom", "living room", "bathroom", "kitchen", "staircase", "balcony", "terrace"],
    response: "Home & Villa Solutions:\n\nWe transform residential spaces with premium materials:\n\n🪟 Glass for Homes:\n• Frameless glass balustrades for staircases and balconies\n• Glass partitions between living and dining areas\n• Premium shower enclosures and bath screens\n• Decorative frosted glass for privacy\n• Skylights for natural light\n• Glass doors and sliding systems\n\n🏗️ Fundermax for Homes:\n• Modern exterior facade panels for villas\n• Feature cladding on entrance walls and porch areas\n• Weather-resistant wet area cladding\n• Accent walls in outdoor spaces\n\n🛁 LG Hausys for Homes:\n• Seamless kitchen countertops\n• Bathroom vanity tops with integrated sinks\n• Feature walls in living and dining areas\n\nWe provide end-to-end service — design, supply, and installation.\nCall +919895105012 for a free home consultation!",
  },

  // Commercial
  {
    keywords: ["commercial", "office", "building", "corporate", "hospital", "school", "hotel", "showroom", "mall", "institution", "it park", "clinic", "lab", "factory"],
    response: "Commercial & Institutional Solutions:\n\nWe specialize in large-scale commercial and institutional projects:\n\n🏢 Offices & IT Parks:\n• Curtain wall glass facades\n• Structural glazing with spider fittings\n• Glass partitions and meeting room walls\n• Fundermax exterior and interior cladding\n\n🏥 Hospitals & Healthcare:\n• Anti-bacterial Fundermax wall panels\n• Hygienic LG Hausys solid surfaces\n• Fire-rated glass (EI30/EI60)\n• Easy-clean, sterile-environment surfaces\n\n🏨 Hotels & Hospitality:\n• Signature glass facades and lobbies\n• Decorative glass interiors\n• Premium cladding for public areas\n• LG Hausys reception and bar countertops\n\n🏫 Educational Institutions:\n• Durable, low-maintenance Fundermax cladding\n• Solar control glass for energy efficiency\n\nFor commercial projects we provide complete project management and turnkey delivery. Call +919895105012!",
  },

  // Kerala climate
  {
    keywords: ["kerala climate", "humidity", "rain", "monsoon", "coastal", "weather", "tropical", "rust", "mould", "mold", "climate suitable", "will it last", "fade"],
    response: "Our Products Are Engineered for Kerala's Climate:\n\nKerala's humid, coastal, and high-rainfall environment can be demanding on building materials. Here's why our products are ideal:\n\n🏗️ Fundermax HPL Cladding:\n✅ Zero water absorption — will not swell or delaminate in monsoons\n✅ UV-stable — no colour fading under Kerala's intense sun\n✅ Mould and mildew resistant by nature\n✅ Tested for coastal saline environments\n✅ 25+ year UV warranty\n\n🪟 Saint-Gobain Glass:\n✅ Toughened glass handles thermal stress and temperature swings\n✅ DGU units insulate against heat and humidity\n✅ Solar control glass significantly reduces AC costs\n\n🛁 LG Hausys Surfaces:\n✅ Non-porous — zero moisture absorption\n✅ Anti-bacterial even in Kerala's humid kitchen and bathroom conditions\n✅ Chemical and stain resistant\n\nAll products carry manufacturer certifications. Call us to learn more!",
  },

  // Colours / design options
  {
    keywords: ["colour", "color", "design", "finish", "texture", "options", "shade", "style", "catalogue", "look", "appearance", "aesthetic", "pattern", "wood look", "stone look"],
    response: "Design, Colour & Finish Options:\n\n🪟 Saint-Gobain Glass Finishes:\n• Clear, tinted (bronze, grey, blue, green)\n• Frosted and acid-etched\n• Digitally printed (custom patterns or images)\n• Mirror finish\n• Low-iron ultra-clear glass\n\n🏗️ Fundermax Cladding:\n• 100+ colours and textures available\n• Finishes: Matt, Silk, Soft-touch\n• Looks: Wood grain, Stone texture, Solid colour, Abstract\n• Custom colours available on special order\n\n🛁 LG Hausys HI-MACS:\n• 100+ colours — whites, neutrals, stone-look, bold tones\n• Matte and semi-gloss finishes\n• Custom colour matching available\n\nWe can bring physical samples and digital catalogues to your site during the free visit.\nWhatsApp us at +919895105012 to get catalogues shared directly to you!",
  },

  // Process
  {
    keywords: ["process", "how does it work", "steps", "procedure", "what happens next", "how to order", "workflow", "project steps"],
    response: "Our Project Process:\n\n1️⃣ Free Site Visit\nOur expert visits your location, understands your requirements, and assesses the site — completely free.\n\n2️⃣ Design & Quotation\nWe prepare a detailed quotation with material options, colour choices, and 3D visualization within 2–3 days.\n\n3️⃣ Approval & Order\nYou approve the design and quotation. We place the material order.\n\n4️⃣ Fabrication & Delivery\nMaterials are fabricated to your specifications and delivered to site.\n\n5️⃣ Professional Installation\nOur certified installation team handles everything with minimal disruption to your space.\n\n6️⃣ Quality Check & Handover\nFinal inspection, snagging, and project handover with full warranty documentation.\n\nReady to start? Call +919895105012 or WhatsApp us to book your free site visit!",
  },

  // Which product / recommendation
  {
    keywords: ["which is better", "compare", "difference", "recommend", "best option", "what should i choose", "suggest", "which product", "what do you recommend"],
    response: "Choosing the Right Solution:\n\n🪟 Choose Saint-Gobain Glass when:\n• You want light-filled, open modern spaces\n• You need partitions without solid walls\n• You're building or upgrading a glass facade or curtain wall\n• You want skylights or premium decorative glass features\n\n🏗️ Choose Fundermax Cladding when:\n• You want a contemporary exterior look with rich colours and textures\n• You need a durable, low-maintenance solution for Kerala's climate\n• You're renovating a building's exterior facade\n• You want an eco-certified, fire-rated panel system\n\n🛁 Choose LG Hausys when:\n• You need seamless, hygienic kitchen or bathroom countertops\n• You want a premium surface for commercial spaces or reception areas\n• You need durable, chemical-resistant surfaces for hospitals or labs\n\n💡 Many of our best projects combine all three solutions!\n\nOur team will guide you to the perfect combination after a free site visit. Call +919895105012!",
  },

  // Specifications / technical
  {
    keywords: ["thickness", "mm", "specification", "technical", "size", "dimension", "weight", "strength", "grade", "standard", "certified", "certification"],
    response: "Product Technical Specifications:\n\n🪟 Saint-Gobain Glass Thickness:\n• Standard toughened: 6mm, 8mm, 10mm, 12mm\n• Laminated: 6.38mm to 17.52mm\n• DGU units: 24mm to 48mm overall\n• Structural glazing: 10mm to 19mm\n\n🏗️ Fundermax Panel Thickness:\n• Exterior: 6mm, 8mm, 10mm, 13mm\n• Interior: 3mm, 4mm, 6mm\n• Max panel size: 3050 × 1310 mm\n• Certification: EN 438, Euroclass B-s1,d0\n\n🛁 LG Hausys HI-MACS Thickness:\n• Standard: 6mm and 12mm sheets\n• Typical countertop: 12mm + edge build-up\n• Sheet size: 3680 × 760 mm\n• Certification: GREENGUARD Gold\n\nFor detailed engineering and structural specs, our team will advise based on your project requirements. Call +919895105012!",
  },

  // Quotation request
  {
    keywords: ["quote", "quotation", "estimate", "get a quote", "need a quote", "send quote", "price list", "how much will it cost", "budget estimate"],
    response: "Getting a Quotation from Precise Homes:\n\nWe provide detailed, accurate quotations after a FREE site visit — because every project is unique and pricing depends on area, specifications, and site conditions.\n\nSteps to get your quotation:\n1. Call or WhatsApp us at +919895105012\n2. We schedule a free site visit at your convenience\n3. Our expert visits, measures, and understands your requirements\n4. We prepare a detailed quotation within 2–3 business days\n5. We walk you through the options and answer all your questions\n\nNo site visit? No problem.\nShare your project details, floor plan or photos on WhatsApp and we can give you a ballpark estimate.\n\n📞 +919895105012\n✉️ info@precisehomes.in",
  },

  // Thanks / positive
  {
    keywords: ["thank", "thanks", "thank you", "ok", "okay", "great", "perfect", "awesome", "nice", "helpful", "good", "brilliant", "excellent", "wonderful"],
    response: "You're welcome! 😊\n\nIs there anything else I can help you with? Whether it's more details about our products, understanding the installation process, or booking a consultation — I'm here.\n\nWhenever you're ready:\n📞 +919895105012\n💬 WhatsApp: +919895105012\n✉️ info@precisehomes.in\n\nLooking forward to working on your project!",
  },

  // Bye
  {
    keywords: ["bye", "goodbye", "see you", "later", "cya", "take care", "talk later", "catch you later"],
    response: "Thank you for visiting Precise Homes! 👋\n\nFeel free to come back with any questions. When you're ready to move forward with your project:\n\n📞 +919895105012\n✉️ info@precisehomes.in\n\nHave a wonderful day!",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Response engine
// ─────────────────────────────────────────────────────────────────────────────
function getResponse(text: string): string {
  const lower = text.toLowerCase().trim();
  let best: KBEntry | null = null;
  let bestScore = 0;

  for (const entry of KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) score += kw.length;
    }
    if (score > bestScore) { bestScore = score; best = entry; }
  }

  if (best && bestScore > 0) return best.response;

  return "I'm not sure about that, but I'm happy to help! 😊\n\nYou can ask me about:\n• 🪟 Saint-Gobain Glass Solutions\n• 🏗️ Fundermax Exterior Cladding\n• 🛁 LG Hausys Premium Surfaces\n• 📐 Free Site Visit & Consultation\n• 🏢 Commercial & Residential Projects\n• 📋 Project Process & Timelines\n• 🌿 Kerala Climate Suitability\n\nOr reach our team directly:\n📞 +919895105012\n✉️ info@precisehomes.in";
}

// ─────────────────────────────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { emoji: "🪟", label: "Glass Solutions",    prompt: "Tell me about your Saint-Gobain glass solutions" },
  { emoji: "🏗️", label: "Fundermax Cladding", prompt: "Tell me about Fundermax exterior cladding" },
  { emoji: "🛁", label: "LG Hausys Surfaces", prompt: "Tell me about LG Hausys surface products" },
  { emoji: "📐", label: "Free Site Visit",    prompt: "How do I book a free site visit?" },
  { emoji: "🏠", label: "Home Project",       prompt: "I have a residential home project" },
  { emoji: "🏢", label: "Commercial Project", prompt: "I have a commercial building project" },
];

interface Message { id: string; role: "user" | "assistant"; content: string; timestamp: Date; typing?: boolean; }
export interface ProjectModalProps { isOpen: boolean; onClose: () => void; }

// ─────────────────────────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-[5px] py-[2px]">
      {[0, 1, 2].map((i) => (
        <motion.span key={i}
          className="block w-2 h-2 rounded-full bg-[#1a6fb5]"
          animate={{ y: [0, -4, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 0.85, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Bubble({ msg }: { msg: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: EASE }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full shrink-0 mb-0.5 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#1a6fb5 0%,#0c3d6e 100%)", boxShadow: "0 2px 8px rgba(26,111,181,0.3)" }}>
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}

      <div className={`group flex flex-col gap-1 ${isUser ? "items-end max-w-[76%]" : "items-start max-w-[82%]"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-[13.5px] leading-[1.8] font-medium whitespace-pre-wrap break-words ${
            isUser ? "rounded-br-[6px] text-white" : "rounded-bl-[6px] text-[#1a2d3d]"
          }`}
          style={
            isUser
              ? { background: "linear-gradient(135deg,#1a6fb5,#0c3d6e)", boxShadow: "0 3px 14px rgba(26,111,181,0.25)" }
              : { background: "#f0f5fb", border: "1px solid #dce8f5" }
          }
        >
          {msg.typing ? <TypingDots /> : msg.content}
        </div>

        {!msg.typing && (
          <div className={`flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isUser ? "flex-row-reverse" : ""}`}>
            <span className="text-[#94afc4] text-[10px]">
              {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {!isUser && (
              <button
                onClick={() => { navigator.clipboard.writeText(msg.content); setCopied(true); setTimeout(() => setCopied(false), 1800); }}
                className="text-[#94afc4] hover:text-[#1a6fb5] transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const [messages, setMessages]     = useState<Message[]>([]);
  const [input, setInput]           = useState("");
  const [busy, setBusy]             = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [tab, setTab]               = useState<"chat" | "contact">("chat");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && tab === "chat" && hasStarted) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen, tab, hasStarted]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const send = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    setHasStarted(true);
    setBusy(true);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";

    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: trimmed, timestamp: new Date() };
    const dotId = `d-${Date.now() + 1}`;
    const dotMsg: Message = { id: dotId, role: "assistant", content: "", timestamp: new Date(), typing: true };

    setMessages(prev => [...prev, userMsg, dotMsg]);

    setTimeout(() => {
      const answer = getResponse(trimmed);
      setMessages(prev => prev.map(m =>
        m.id === dotId ? { ...m, content: answer, typing: false } : m
      ));
      setBusy(false);
    }, 600 + Math.random() * 500);
  }, [busy]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 110)}px`;
  };

  const handleReset = () => {
    setMessages([]); setHasStarted(false); setInput(""); setBusy(false);
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div key="ph-bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-[6px]"
            onClick={onClose}
          />

          {/* ── PANEL ───────────────────────────────────────────────────── */}
          <motion.div key="ph-panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.42, ease: EASE }}
            className={`
              fixed z-[201] flex flex-col bg-white
              /* Mobile: full screen with safe margins */
              inset-x-0 bottom-0 top-0
              /* Small screens: bottom sheet style */
              sm:inset-x-auto sm:inset-y-auto
              sm:right-4 sm:bottom-4
              sm:w-[400px] sm:h-[640px]
              /* Medium+ */
              md:right-6 md:bottom-6
              md:w-[430px] md:h-[660px]
              ${syne.className}
            `}
            style={{
              borderRadius: "0px",
              boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(26,111,181,0.08)",
            }}
            // Rounded corners only on sm+
          >
            {/* Apply rounded corners via a wrapper trick for responsive */}
            <style>{`
              @media (min-width: 640px) {
                #ph-panel-inner { border-radius: 20px !important; overflow: hidden !important; }
              }
            `}</style>
            <div id="ph-panel-inner" className="flex flex-col flex-1 min-h-0 overflow-hidden" style={{ borderRadius: "0px" }}>

              {/* ── HEADER ────────────────────────────────────────────── */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 shrink-0"
                style={{ background: "linear-gradient(135deg,#1a6fb5 0%,#0c3d6e 100%)" }}>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-[18px] h-[18px] text-white" />
                    </div>
                    <motion.div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none"
                      animate={{ scale: [1, 1.45], opacity: [0.5, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity }} />
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-bold leading-tight tracking-tight">
                      Precise Homes
                    </p>
                    <div className="flex items-center gap-1.5 mt-[3px]">
                      <motion.span className="block w-[7px] h-[7px] rounded-full bg-emerald-300"
                        animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} />
                      <span className="text-white/70 text-[10.5px] font-medium">
                        Assistant · Always available
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {hasStarted && (
                    <button onClick={handleReset} title="New conversation"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200">
                      <RotateCcw className="w-[14px] h-[14px]" />
                    </button>
                  )}
                  <button onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200">
                    <X className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>

              {/* ── TABS ──────────────────────────────────────────────── */}
              <div className="flex gap-1.5 px-3 sm:px-4 pt-3 pb-2 shrink-0 bg-white"
                style={{ borderBottom: "1px solid #e8f0f8" }}>
                {(["chat", "contact"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)}
                    className="flex-1 py-2 sm:py-[9px] rounded-xl text-[11.5px] font-bold uppercase tracking-[0.08em] transition-all duration-200"
                    style={tab === t
                      ? { background: "#e8f3ff", border: "1.5px solid #a8cef5", color: "#1a6fb5" }
                      : { background: "transparent", border: "1.5px solid transparent", color: "#94afc4" }
                    }>
                    {t === "chat" ? "💬  Chat" : "📞  Contact"}
                  </button>
                ))}
              </div>

              {/* ─────────────────────────────────────────────────────── */}
              <AnimatePresence mode="wait">

                {/* ── CHAT TAB ──────────────────────────────────────── */}
                {tab === "chat" && (
                  <motion.div key="chat-tab"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col flex-1 min-h-0 bg-white"
                  >
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4"
                      style={{ scrollbarWidth: "thin", scrollbarColor: "#dce8f5 transparent" }}>

                      {!hasStarted ? (
                        /* ── Welcome ──────────────────────────────── */
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.38 }} className="flex flex-col gap-4 sm:gap-5">

                          {/* Greeting bubble */}
                          <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                              style={{ background: "linear-gradient(135deg,#1a6fb5,#0c3d6e)", boxShadow: "0 2px 8px rgba(26,111,181,0.28)" }}>
                              <Sparkles className="w-3.5 h-3.5 text-white" />
                            </div>
                            <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-[6px] text-[13.5px] leading-[1.8] font-medium text-[#1a2d3d]"
                              style={{ background: "#f0f5fb", border: "1px solid #dce8f5" }}>
                              Hi! I&apos;m the Precise Homes assistant. I can help you with questions about our{" "}
                              <span className="text-[#1a6fb5] font-semibold">Saint-Gobain glass</span>,{" "}
                              <span className="text-[#1a6fb5] font-semibold">Fundermax cladding</span>, and{" "}
                              <span className="text-[#1a6fb5] font-semibold">LG Hausys surfaces</span>.
                              What can I help you with today?
                            </div>
                          </div>

                          {/* Quick prompt grid */}
                          <div>
                            <p className="text-[#94afc4] text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2.5 px-0.5">
                              Popular questions
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {QUICK_PROMPTS.map((qp, i) => (
                                <motion.button key={qp.label}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.28, delay: 0.05 * i }}
                                  onClick={() => send(qp.prompt)}
                                  className="group text-left p-3 sm:p-3.5 rounded-xl transition-all duration-200 flex flex-col gap-1.5"
                                  style={{ background: "#f7fafd", border: "1.5px solid #dce8f5" }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = "#e8f3ff";
                                    e.currentTarget.style.border = "1.5px solid #a8cef5";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "#f7fafd";
                                    e.currentTarget.style.border = "1.5px solid #dce8f5";
                                  }}
                                >
                                  <span className="text-[16px] sm:text-[18px] leading-none">{qp.emoji}</span>
                                  <span className="text-[#1a3d5c] text-[11.5px] font-semibold leading-snug">
                                    {qp.label}
                                  </span>
                                  <ChevronRight className="w-3 h-3 text-[#b8d0e8] group-hover:text-[#1a6fb5] transition-colors duration-200" />
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          <p className="text-[#b8cede] text-[10.5px] text-center tracking-wide">
                            or type your own question below
                          </p>
                        </motion.div>

                      ) : (
                        /* ── Conversation ─────────────────────────── */
                        <>
                          {messages.map((m) => <Bubble key={m.id} msg={m} />)}
                          <div ref={messagesEndRef} />
                        </>
                      )}
                    </div>

                    {/* Mid-conversation chips */}
                    {hasStarted && !busy && messages.length >= 2 && messages.length < 10 && (
                      <div className="px-3 sm:px-4 flex gap-2 overflow-x-auto pb-2 pt-1 shrink-0"
                        style={{ scrollbarWidth: "none", borderTop: "1px solid #f0f5fb" }}>
                        {["Site visit", "Our projects", "Contact us"].map((chip) => (
                          <button key={chip}
                            onClick={() => send(chip)}
                            className="shrink-0 px-3 py-[6px] rounded-full text-[11px] font-semibold whitespace-nowrap transition-all duration-200"
                            style={{ background: "#e8f3ff", border: "1.5px solid #a8cef5", color: "#1a6fb5" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "#d0e8ff"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#e8f3ff"; }}
                          >{chip}</button>
                        ))}
                      </div>
                    )}

                    {/* Input bar */}
                    <div className="px-3 sm:px-4 pt-2 pb-4 sm:pb-4 shrink-0"
                      style={{ borderTop: "1px solid #e8f0f8" }}>
                      <div className="flex items-end gap-2 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200"
                        style={{ background: "#f7fafd", border: "1.5px solid #dce8f5" }}
                        onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1.5px solid #1a6fb5"; (e.currentTarget as HTMLDivElement).style.background = "#fff"; }}
                        onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.border = "1.5px solid #dce8f5"; (e.currentTarget as HTMLDivElement).style.background = "#f7fafd"; }}
                      >
                        <textarea ref={inputRef} value={input}
                          onChange={handleInputChange} onKeyDown={handleKeyDown}
                          placeholder="Type your question here…"
                          rows={1} disabled={busy}
                          className="flex-1 bg-transparent outline-none resize-none min-h-[22px] max-h-[110px] text-[13.5px] font-medium leading-relaxed disabled:opacity-40"
                          style={{ color: "#1a2d3d", caretColor: "#1a6fb5", fontFamily: "inherit", scrollbarWidth: "none" }}
                        />
                        <motion.button
                          onClick={() => send(input)}
                          disabled={!input.trim() || busy}
                          whileTap={{ scale: 0.88 }}
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            background: input.trim() && !busy ? "linear-gradient(135deg,#1a6fb5,#0c3d6e)" : "#dce8f5",
                            boxShadow: input.trim() && !busy ? "0 4px 14px rgba(26,111,181,0.35)" : "none",
                          }}
                        >
                          <Send className="w-[13px] h-[13px] text-white" />
                        </motion.button>
                      </div>
                      <p className="text-[#b8cede] text-[9.5px] text-center mt-1.5 tracking-wide">
                        Enter to send · Shift+Enter for new line
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ── CONTACT TAB ───────────────────────────────────── */}
                {tab === "contact" && (
                  <motion.div key="contact-tab"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 bg-[#f7fafd]"
                    style={{ scrollbarWidth: "thin", scrollbarColor: "#dce8f5 transparent" }}
                  >
                    {/* Info card */}
                    <div className="rounded-2xl p-4 bg-white" style={{ border: "1.5px solid #dce8f5", boxShadow: "0 2px 12px rgba(26,111,181,0.06)" }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg,#1a6fb5,#0c3d6e)", boxShadow: "0 4px 14px rgba(26,111,181,0.3)" }}>
                          <MessageCircle className="w-[18px] h-[18px] text-white" />
                        </div>
                        <div>
                          <p className="text-[#1a2d3d] font-bold text-[14px] leading-tight">Precise Homes</p>
                          <p className="text-[#1a6fb5] text-[11.5px] font-semibold mt-0.5">500+ Projects · 12+ Years</p>
                        </div>
                      </div>
                      <div className="space-y-2 pt-1">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-[14px] h-[14px] text-[#94afc4] mt-[2px] shrink-0" />
                          <p className="text-[#4a6880] text-[12.5px] leading-snug">{CONTACT.address}</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-[14px] h-[14px] text-[#94afc4] shrink-0" />
                          <p className="text-[#4a6880] text-[12.5px]">{CONTACT.hours}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action rows */}
                    {([
                      {
                        Icon: Phone, label: "Call Us", value: CONTACT.phone,
                        sub: "Speak directly with our team",
                        href: `tel:${CONTACT.phone}`,
                        accent: "#d72731", lightBg: "#fff5f5", border: "#fccfcf",
                      },
                      {
                        emoji: "💬", label: "WhatsApp", value: "Chat on WhatsApp",
                        sub: "Send photos, get quick answers",
                        href: CONTACT.whatsapp, target: "_blank",
                        accent: "#16a34a", lightBg: "#f0fdf4", border: "#bbf7d0",
                      },
                      {
                        Icon: Mail, label: "Email", value: CONTACT.email,
                        sub: "We reply within 2 hours",
                        href: `mailto:${CONTACT.email}?subject=${encodeURIComponent(CONTACT.emailSubject)}`,
                        accent: "#1a6fb5", lightBg: "#eff6ff", border: "#bfdbfe",
                      },
                    ] as Array<{
                      Icon?: React.ElementType; emoji?: string; label: string; value: string;
                      sub: string; href: string; target?: string; accent: string; lightBg: string; border: string;
                    }>).map((item, i) => (
                      <motion.a key={i} href={item.href}
                        target={item.target} rel={item.target ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: 0.06 * i }}
                        whileHover={{ scale: 1.01, y: -1 }} whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-white transition-all duration-200"
                        style={{ border: `1.5px solid ${item.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = item.lightBg; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#ffffff"; }}
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: item.lightBg }}>
                          {item.emoji
                            ? <span className="text-[18px]">{item.emoji}</span>
                            : item.Icon && <item.Icon className="w-[18px] h-[18px]" style={{ color: item.accent }} />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5"
                            style={{ color: item.accent }}>{item.label}</p>
                          <p className="text-[#1a2d3d] font-bold text-[13px] sm:text-[13.5px] leading-tight truncate">{item.value}</p>
                          <p className="text-[#7a9ab8] text-[11px] sm:text-[11.5px] mt-0.5">{item.sub}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 shrink-0" style={{ color: item.accent, opacity: 0.5 }} />
                      </motion.a>
                    ))}

                    {/* Brands list */}
                    <div className="rounded-2xl p-4 bg-white" style={{ border: "1.5px solid #dce8f5" }}>
                      <p className="text-[#94afc4] text-[10px] font-bold uppercase tracking-[0.18em] mb-3">
                        Authorized Dealer For
                      </p>
                      {[
                        { name: "Saint-Gobain", desc: "Glass facades, partitions & glazing", dot: "#1a6fb5" },
                        { name: "Fundermax",    desc: "HPL exterior & interior cladding",   dot: "#e87040" },
                        { name: "LG Hausys",    desc: "Solid surfaces & premium countertops", dot: "#d72731" },
                      ].map((b, i, arr) => (
                        <div key={b.name} className="flex items-start gap-3 py-2.5"
                          style={i < arr.length - 1 ? { borderBottom: "1px solid #f0f5fb" } : {}}>
                          <span className="block w-2 h-2 rounded-full mt-[5px] shrink-0" style={{ background: b.dot }} />
                          <div>
                            <p className="text-[#1a2d3d] text-[12.5px] font-semibold leading-tight">{b.name}</p>
                            <p className="text-[#7a9ab8] text-[11px] mt-0.5">{b.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Response time badge */}
                    <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white" style={{ border: "1.5px solid #dce8f5" }}>
                      <span className="text-xl shrink-0">⚡</span>
                      <div>
                        <p className="text-[#1a2d3d] text-[12.5px] font-semibold leading-snug">Fast response guaranteed</p>
                        <p className="text-[#7a9ab8] text-[11px] mt-0.5">Our team responds within 2 hours on business days</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>{/* end #ph-panel-inner */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}