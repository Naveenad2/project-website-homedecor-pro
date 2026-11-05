// ─────────────────────────────────────────────────────────────────────────────
// Product catalogue — powers the homepage product showcase, /products and the
// keyword-focused landing pages at /products/[slug].
// Content is written for people first (Kochi / Kerala buyers), search second.
// ─────────────────────────────────────────────────────────────────────────────

import { type ProductCategory, CATEGORIES } from "./product-categories";
import { filmMedia } from "./films";

export { type ProductCategory, CATEGORIES };

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  features: { title: string; text: string }[];
  applications: string[];
  specs?: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  accent: string;
  /** Film whose 8-second preview loop plays on the product card. */
  previewFilm?: string;
  /** Existing brand gallery page on this site. */
  brandPage?: string;
  featured?: boolean;
};

export const PRODUCTS: Product[] = [
  // ── Windows & doors ────────────────────────────────────────────────────────
  {
    slug: "saint-gobain-upvc-windows",
    name: "Saint-Gobain uPVC Windows",
    brand: "Saint-Gobain",
    category: "windows-doors",
    featured: true,
    tagline: "Sealed against monsoon rain, dust and traffic noise.",
    summary:
      "Wood-finish and white uPVC sliding, casement and French windows from Saint-Gobain — supplied and installed across Kochi and Kerala.",
    seoTitle: "Saint-Gobain uPVC Windows in Kochi & Kerala",
    seoDescription:
      "Saint-Gobain uPVC windows in Kochi — sliding, casement and French windows in wood and white finishes. Free site visit and expert installation across Kerala.",
    intro: [
      "uPVC windows are the most asked-about upgrade in Kerala homes today, and for good reason. Unlike timber, uPVC does not swell in the monsoon, attract termites or need repainting, and unlike ordinary aluminium it is a natural insulator — so rooms stay cooler and quieter.",
      "Every window is made to measure: sliding windows for wide openings, casements that open fully for cross-ventilation, and French-door configurations for sit-outs, glazed with the right glass for each room — toughened for safety, laminated for security and noise, or double-glazed for heat and sound control. Wood-grain profiles give the warmth of teak without the upkeep, as seen in our Kollam and Kaloor projects.",
      "Our team handles the whole journey: a free site visit, working samples at our Saint-Gobain experience centre in Padivattom, a precise survey, installation by trained fitters and after-sales support across Ernakulam, Thrissur, Kollam, Kottayam and the rest of Kerala.",
    ],
    features: [
      { title: "Monsoon-tight sealing", text: "Multi-chamber profiles with continuous gaskets keep wind-driven rain and dust outside — watch our splash test." },
      { title: "Quieter rooms", text: "Well-sealed frames with the right glass noticeably cut traffic and neighbourhood noise." },
      { title: "Cooler interiors", text: "uPVC is a poor conductor of heat and pairs with solar-control or double glazing to reduce AC load." },
      { title: "No termites, no rot", text: "No swelling, warping or repainting — made for Kerala's humidity and coastal air." },
      { title: "Wood-finish options", text: "Teak and walnut wood-grain profiles alongside classic white and grey." },
      { title: "Secure hardware", text: "Sturdy handles and multi-point locking options for peace of mind." },
    ],
    applications: ["Villas & independent houses", "Apartments & flats", "Balconies & sit-outs", "Rooms facing busy roads", "Replacing old timber windows", "Offices & clinics"],
    specs: [
      { label: "Window types", value: "Sliding · Casement · Fixed · French doors" },
      { label: "Finishes", value: "White, grey and wood-grain" },
      { label: "Glazing", value: "Toughened, laminated, acoustic or double-glazed (DGU)" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "What is the price of Saint-Gobain uPVC windows in Kochi?", a: "Prices depend on size, window type, glass and finish, so we quote per project after a free site measurement. Share your plan or window sizes on WhatsApp and we will send an estimate quickly." },
      { q: "Are uPVC windows good for Kerala's climate?", a: "Yes. uPVC does not absorb moisture, rot, rust or attract termites, and well-sealed frames keep monsoon rain out — which is why it has become a popular choice for homes across Kerala." },
      { q: "Can I see Saint-Gobain uPVC windows before buying?", a: "Yes — visit our experience centre on Civil Line Road, Padivattom (near Azeezia Supermarket), Kochi, to operate working samples of sliding, casement and wood-finish windows." },
      { q: "I searched for Fenesta or 'Finesta' windows — can you help?", a: "Many homeowners compare brands such as Fenesta (often searched as 'Finesta'). We specialise in Saint-Gobain uPVC and system-aluminium windows and are happy to help you compare profiles, glass and hardware side by side at our Padivattom experience centre." },
    ],
    keywords: ["saint gobain upvc windows", "saint gobain windows", "upvc windows kochi", "upvc windows cochin", "upvc windows ernakulam", "upvc windows kerala", "finesta windows", "fenesta windows alternative"],
    accent: "#02589F",
    previewFilm: "kollam-window-splash-test",
    brandPage: "/saint-gobain",
  },
  {
    slug: "saint-gobain-aluminium-windows",
    name: "Saint-Gobain Aluminium Windows",
    brand: "Saint-Gobain",
    category: "windows-doors",
    tagline: "Slim frames and big views, built for heavy glass.",
    summary:
      "Saint-Gobain aluminium window and door systems for wide sliding doors and minimal sightlines, paired with Saint-Gobain glass.",
    seoTitle: "Saint-Gobain Aluminium Windows & Doors in Kochi",
    seoDescription:
      "Saint-Gobain aluminium windows and sliding doors in Kochi, Kerala — slim profiles, large glass panels and durable finishes. Free site visit from Precise Homes.",
    intro: [
      "When you want the frame to disappear and the view to take over, aluminium is the material of choice. Its strength lets slim profiles carry large, heavy glass panels — perfect for floor-to-ceiling sliding doors, corner windows and modern elevations.",
      "Precise Homes supplies Saint-Gobain aluminium window systems together with the right Saint-Gobain glass — toughened for safety, laminated for security and acoustics, or double-glazed for thermal comfort. Powder-coated and anodised finishes are designed to handle Kerala's humid, salty coastal air.",
      "From the first site visit to the final adjustment, our team surveys every opening, recommends the right system for your spans and exposure, and installs with care across Kochi, Ernakulam and the rest of Kerala.",
    ],
    features: [
      { title: "Slim sightlines", text: "Strong profiles mean more glass and less frame." },
      { title: "Large spans", text: "Ideal for wide sliding doors that open living rooms to sit-outs and gardens." },
      { title: "Durable finishes", text: "Powder-coated and anodised colours that resist humidity and fading." },
      { title: "Smooth operation", text: "Quality rollers and hardware for effortless sliding, day after day." },
      { title: "Any glass", text: "Single, laminated, acoustic or double-glazed units to suit each room." },
      { title: "Low maintenance", text: "No painting or polishing — an occasional wipe keeps them looking new." },
    ],
    applications: ["Living-room sliding doors", "Balconies & sit-outs", "Corner windows", "Façades & shopfronts", "Villas", "Offices"],
    specs: [
      { label: "Types", value: "Sliding windows & doors · Casement · Fixed glazing" },
      { label: "Finishes", value: "Powder-coated & anodised colours" },
      { label: "Glazing", value: "Single, laminated or double-glazed" },
    ],
    faqs: [
      { q: "uPVC or aluminium windows — which is better for Kochi?", a: "Both work well. uPVC insulates better and suits most bedroom and living windows; aluminium is stronger and slimmer, ideal for very large sliding doors and modern façades. Many homes use both — we can advise room by room." },
      { q: "Do aluminium windows corrode near the sea?", a: "Quality aluminium systems with proper powder coating or anodising and stainless fittings are made for coastal conditions; routine cleaning keeps them looking new." },
      { q: "Do you install aluminium windows outside Kochi?", a: "Yes — we work across Kerala, including Thrissur, Kollam, Kottayam, Alappuzha and Kozhikode." },
    ],
    keywords: ["saint gobain aluminium windows", "aluminium windows kochi", "aluminium windows kerala", "aluminium sliding doors kochi", "aluminium windows"],
    accent: "#3E7CB1",
    brandPage: "/saint-gobain",
  },
  {
    slug: "system-aluminium-windows",
    name: "System Aluminium Windows & Doors",
    brand: "Dimore · Vitrum",
    category: "windows-doors",
    tagline: "Engineered slimline systems for landmark homes.",
    summary:
      "Premium system aluminium from Dimore (Duraslim, Vistaslim, Elegante) and Vitrum Slimline — slim interlocks, heavy-duty rollers and sashes up to 3 m tall.",
    seoTitle: "System Aluminium Windows & Doors in Kochi",
    seoDescription:
      "System aluminium windows and sliding doors in Kochi — Dimore Duraslim and Vistaslim, Vitrum Slimline. Slim interlocks, large spans, expert installation in Kerala.",
    intro: [
      "System aluminium is a complete engineered package — matched profiles, gaskets, rollers, locks and glazing designed to work together — rather than frames cut from generic sections. The result is smoother operation, tighter sealing and much larger openings.",
      "We offer Dimore by Qutone, whose Duraslim sliding windows have one of the slimmest interlocks available, and whose Vistaslim system takes 6–12 mm single glazing or 18–24 mm double glazing with sashes up to 3000 × 1800 mm. For ultra-minimal architecture, Vitrum's Slimline series brings the outdoors in with near-invisible frames.",
      "Browse the brochures below, then visit our Padivattom experience centre or book a free site visit — we will recommend the right system for your spans, wind exposure and budget.",
    ],
    features: [
      { title: "25 mm slim interlock", text: "Dimore Duraslim keeps the meeting stile minimal for wider views." },
      { title: "Tall, wide sashes", text: "Vistaslim sashes up to 3000 mm high and 1800 mm wide." },
      { title: "Heavy-duty rollers", text: "Roller capacities from 80 kg up to 350 kg for large glass." },
      { title: "Multipoint locking", text: "Single and multipoint locks with handle for security." },
      { title: "Double-glazing ready", text: "18–24 mm DGU for heat and noise insulation." },
      { title: "Made for India", text: "Designed around Indian building practice and weather conditions." },
    ],
    applications: ["Villas with large openings", "Sea & backwater-facing homes", "High-rise apartments", "Offices & showrooms", "Sit-outs & courtyards"],
    specs: [
      { label: "Dimore Duraslim", value: "Sliding · 25 mm interlock · SGU 5–8 mm / DGU 20 mm · sash up to 2440 × 1000 mm" },
      { label: "Dimore Vistaslim", value: "Sliding windows & doors · SGU 6–12 mm / DGU 18–24 mm · sash up to 3000 × 1800 mm" },
      { label: "Dimore Elegante", value: "Slim-interlock sliding door system" },
      { label: "Vitrum Slimline", value: "Minimal-sightline architectural window systems" },
    ],
    faqs: [
      { q: "What does 'system aluminium' mean?", a: "It is a complete, tested window system — profiles, gaskets, hardware and glazing designed together by the manufacturer — instead of frames assembled from generic aluminium sections. It performs better and lasts longer." },
      { q: "Can system aluminium take double glazing?", a: "Yes. Dimore Vistaslim, for example, accepts 18–24 mm double-glazed units, which improves heat and noise insulation." },
      { q: "Which is better for very big sliding doors — uPVC or system aluminium?", a: "For very large or heavy panels, system aluminium is usually the better choice thanks to its strength and slimmer frames." },
    ],
    keywords: ["system aluminium", "system aluminium windows kochi", "aluminium windows", "slimline aluminium windows", "dimore windows", "vitrum slimline windows"],
    accent: "#6B7C93",
  },
  {
    slug: "automatic-sliding-doors",
    name: "Automatic Sliding Doors",
    brand: "Saint-Gobain",
    category: "windows-doors",
    tagline: "Hands-free entrances, tested to 1 million cycles.",
    summary:
      "Saint-Gobain Access Lite and Access Pro automatic sliding doors with BLDC motors and motion-and-safety sensors for offices, showrooms, hospitals and homes.",
    seoTitle: "Automatic Sliding Doors in Kochi — Saint-Gobain",
    seoDescription:
      "Saint-Gobain automatic sliding doors in Kochi — Access Lite and Access Pro, 1 million-cycle tested, with safety sensors. Supply and installation across Kerala.",
    intro: [
      "An automatic sliding door makes an entrance feel premium, keeps conditioned air in and dust out, and gives everyone hands-free, accessible entry. Saint-Gobain's entrance automatic door solutions combine its glazing expertise with smart, efficient operators.",
      "Access Lite suits work and commercial spaces with single leaves up to 150 kg, while Access Pro handles single leaves up to 180 kg, clear openings up to 4000 mm and passage heights up to 3200 mm. Both are tested to 1 million cycles, and Access Pro is tested according to EN 16005.",
      "Microwave and active-infrared sensors detect motion and presence, so doors open smoothly and stay open while someone is in the doorway. Precise Homes supplies and installs complete automatic door systems with Saint-Gobain glass across Kerala.",
    ],
    features: [
      { title: "1 million cycles", text: "Operators durability-tested for heavy daily use." },
      { title: "BLDC motors", text: "Quiet, efficient brushless motors (65 W Lite, 100 W Pro)." },
      { title: "Safety sensors", text: "Microwave + active-infrared motion and presence detection." },
      { title: "Adjustable speed", text: "Opening and closing speeds from 15 to 50 cm/s." },
      { title: "Energy saving", text: "Doors close automatically to keep cool air in." },
      { title: "Elegant glass", text: "Frameless or framed leaves in Saint-Gobain glass." },
    ],
    applications: ["Offices", "Showrooms & retail", "Hospitals & clinics", "Hotels", "Banks", "Premium homes"],
    specs: [
      { label: "Access Lite", value: "Single leaf 750–1400 mm, up to 150 kg · Double leaf up to 2 × 120 kg · Passage height 2100–3000 mm" },
      { label: "Access Pro", value: "Up to 1 × 180 kg or 2 × 160 kg · Clear opening up to 4000 mm · Height 2100–3200 mm" },
      { label: "Testing", value: "1 million cycles · EN 16005 (Access Pro)" },
      { label: "Sensors", value: "Microwave + active-infrared motion & safety" },
    ],
    faqs: [
      { q: "Are automatic doors safe?", a: "Yes — motion and presence sensors detect people in the doorway and keep the door open, and Access Pro is tested according to EN 16005." },
      { q: "What happens during a power cut?", a: "The doors can be pushed open manually when there is no power. Our team can advise on backup options for your building." },
      { q: "Can automatic doors be fitted in homes?", a: "Yes — they suit villas and premium homes as well as offices, showrooms and hospitals." },
    ],
    keywords: ["automatic sliding door kochi", "automatic glass door kerala", "saint gobain automatic door", "sensor door kochi"],
    accent: "#02589F",
  },

  // ── Glass ─────────────────────────────────────────────────────────────────
  {
    slug: "saint-gobain-glass",
    name: "Saint-Gobain Glass",
    brand: "Saint-Gobain",
    category: "glass",
    tagline: "World-class glass, made in India, for every room.",
    summary:
      "Clear, solar-control, acoustic, toughened, laminated and decorative Saint-Gobain glass for windows, façades, partitions and interiors.",
    seoTitle: "Saint-Gobain Glass Dealer in Kochi",
    seoDescription:
      "Saint-Gobain glass in Kochi — clear, solar-control, acoustic, toughened, laminated and lacquered glass for homes and offices. Visit our Padivattom experience centre.",
    intro: [
      "Saint-Gobain is one of the world's leading glass makers, and its glass manufacturing complex at Sriperumbudur near Chennai supplies architectural glass across India. As our Kollam film explains, the glass decides how a window really performs — its clarity, strength, heat control and sound insulation.",
      "We help you pick the right Saint-Gobain glass for every opening: solar-control glass to cut heat on west-facing walls, acoustic laminated glass for bedrooms on busy roads, toughened safety glass for doors and railings, double-glazed units for air-conditioned rooms, and lacquered or frosted glass for interiors.",
      "See and compare glass samples at our experience centre in Padivattom, Kochi — then let our team measure, supply and install.",
    ],
    features: [
      { title: "Optical clarity", text: "High-quality float glass for distortion-free views." },
      { title: "Solar control", text: "Coatings and tints that reduce heat gain and glare." },
      { title: "Acoustic comfort", text: "Laminated acoustic options for quieter bedrooms." },
      { title: "Safety glass", text: "Toughened and laminated options wherever people are close to glass." },
      { title: "Decorative range", text: "Lacquered, frosted and tinted glass for interiors." },
      { title: "Made in India", text: "Produced at Saint-Gobain's complex near Chennai." },
    ],
    applications: ["Windows & doors", "Façades", "Skylights", "Partitions", "Shower enclosures", "Kitchens & furniture"],
    faqs: [
      { q: "Is Saint-Gobain glass made in India?", a: "Yes — Saint-Gobain operates a large glass manufacturing complex at Sriperumbudur near Chennai, established in 2000." },
      { q: "Which glass reduces heat in Kerala homes?", a: "Solar-control glass and double-glazed units reduce heat gain compared with plain clear glass. We recommend options based on orientation and how each room is used." },
      { q: "Where can I buy Saint-Gobain glass in Kochi?", a: "At Precise Homes, Civil Line Road, Padivattom, Kochi. Call or WhatsApp +91 98951 05012." },
    ],
    keywords: ["saint gobain glass", "saint gobain glass kochi", "saint gobain glass dealer kerala", "solar control glass kochi", "acoustic glass kochi"],
    accent: "#02589F",
    previewFilm: "kollam-saint-gobain-glass-quality",
    brandPage: "/saint-gobain",
  },
  {
    slug: "toughened-glass",
    name: "Toughened Glass",
    brand: "Saint-Gobain",
    category: "glass",
    tagline: "Several times stronger — and safe even if it breaks.",
    summary:
      "Heat-strengthened safety glass for doors, railings, partitions, shower screens and tabletops — about four to five times stronger than ordinary glass of the same thickness.",
    seoTitle: "Toughened Glass in Kochi — Safety Glass",
    seoDescription:
      "Toughened glass in Kochi for doors, railings, partitions, shower screens and tables. Saint-Gobain safety glass made to size and installed. WhatsApp for a quote.",
    intro: [
      "Toughened (tempered) glass is made by heating glass and cooling it rapidly, which locks its surfaces in compression. The result is roughly four to five times stronger than ordinary annealed glass of the same thickness — and if it ever does break, it crumbles into small, blunt granules instead of sharp shards.",
      "That mix of strength and safety is why toughened glass is used for frameless doors, staircase and terrace railings, office partitions, shower enclosures and tabletops. Because toughening happens after cutting, every piece is made to your exact size with holes and notches planned in advance.",
      "Precise Homes supplies Saint-Gobain toughened glass in clear, extra-clear, tinted and frosted options, and installs it with matching hardware across Kochi and Kerala.",
    ],
    features: [
      { title: "4–5× stronger", text: "Far more resistant to impact and loads than ordinary glass." },
      { title: "Safe breakage", text: "Breaks into small blunt pieces, greatly reducing injury risk." },
      { title: "Heat resistant", text: "Withstands bigger temperature differences — useful in sunny façades." },
      { title: "Made to measure", text: "Cut, drilled and edged before toughening for a perfect fit." },
      { title: "Many finishes", text: "Clear, extra-clear, tinted and frosted." },
      { title: "Laminate-ready", text: "Combine with lamination for railings and overhead glass." },
    ],
    applications: ["Frameless glass doors", "Railings & handrails", "Office partitions", "Shower enclosures", "Tabletops & shelves", "High-traffic windows"],
    faqs: [
      { q: "Can toughened glass be cut after toughening?", a: "No. It must be cut, drilled and edged before toughening, so we measure precisely on site before ordering." },
      { q: "Toughened or laminated glass — which is safer?", a: "Toughened glass is stronger; laminated glass stays in place when broken. For overhead glazing and tall railings, toughened-laminated glass gives you both." },
      { q: "What thickness of toughened glass do I need?", a: "It depends on the use — doors and shower screens commonly use 8–12 mm, while railings often use thicker or laminated glass. We confirm after a site visit." },
    ],
    keywords: ["toughened glass kochi", "toughen glass", "tempered glass kochi", "safety glass ernakulam", "toughened glass kerala"],
    accent: "#4A90C2",
    previewFilm: "kollam-glass-skylight-terrace",
  },
  {
    slug: "laminated-glass",
    name: "Laminated Safety Glass",
    brand: "Saint-Gobain",
    category: "glass",
    tagline: "Holds together when broken. Blocks noise and UV.",
    summary:
      "Glass panes bonded with a tough interlayer — for skylights, railings, façades and noisy rooms where safety, security and quiet matter.",
    seoTitle: "Laminated Glass in Kochi — Safety & Acoustic",
    seoDescription:
      "Laminated glass in Kochi for skylights, railings, façades and rooms facing busy roads. Stays intact when broken and cuts noise and UV. Supply and installation.",
    intro: [
      "Laminated glass sandwiches a strong interlayer — usually PVB — between two or more panes. If the glass is struck, the pieces stay bonded to the interlayer, so the panel holds in its frame instead of falling: essential for skylights, overhead glazing and tall railings.",
      "The interlayer also dampens sound and blocks most ultraviolet light, protecting furniture and floors from fading. Acoustic laminates make a real difference for homes near busy Kochi roads, and laminated glass resists forced entry better than single glass.",
      "For decorative interiors, laminated glass can even carry colours, graphics and textiles — Forms+Surfaces VividGlass is one such range, available through Precise Homes.",
    ],
    features: [
      { title: "Stays intact", text: "Broken pieces cling to the interlayer instead of falling out." },
      { title: "Noise reduction", text: "Acoustic interlayers dampen traffic and aircraft noise." },
      { title: "UV protection", text: "Interlayers block most UV, reducing fading of interiors." },
      { title: "Security", text: "Much harder to break through than single glass." },
      { title: "Decorative options", text: "Coloured, printed and textile interlayers." },
      { title: "Toughened-laminated", text: "Combine with toughening for frameless railings." },
    ],
    applications: ["Skylights & canopies", "Glass railings", "Façades", "Bedroom & living windows", "Shopfronts", "Decorative partitions"],
    faqs: [
      { q: "Why use laminated glass for skylights?", a: "Because broken pieces stay bonded to the interlayer, the glass will not fall into the room — which is why laminated glass is the standard choice for overhead glazing." },
      { q: "Does laminated glass reduce noise?", a: "Yes, especially acoustic laminated glass, which is designed to dampen traffic and aircraft noise." },
      { q: "Can laminated glass also be toughened?", a: "Yes. Toughened laminated glass combines higher strength with post-breakage safety and is ideal for frameless railings." },
    ],
    keywords: ["laminated glass kochi", "laminated glass", "acoustic glass kochi", "pvb laminated glass kerala", "safety glass skylight kochi"],
    accent: "#2F6E9E",
    previewFilm: "edappally-glass-handrail",
  },
  {
    slug: "lacquered-glass",
    name: "Lacquered Glass",
    brand: "Saint-Gobain",
    category: "glass",
    tagline: "Seamless colour for kitchens, wardrobes and walls.",
    summary:
      "Back-painted Saint-Gobain glass in rich, even colours — a glossy, wipe-clean surface for kitchen shutters, backsplashes, wardrobes and feature walls.",
    seoTitle: "Lacquered Glass in Kochi — Kitchen & Wall Glass",
    seoDescription:
      "Lacquered (back-painted) glass in Kochi for kitchen shutters, backsplashes, wardrobes and feature walls. Saint-Gobain colours, supplied to size and installed.",
    intro: [
      "Lacquered glass is glass with a high-quality coloured lacquer applied to the back, giving a deep, uniform colour seen through a perfectly smooth glass face. It turns ordinary surfaces into striking, mirror-smooth features.",
      "Because the surface is glass, it does not stain, soak up grease or harbour bacteria — you simply wipe it clean. That makes lacquered glass a favourite for modular kitchen shutters and backsplashes, as well as wardrobes, bathroom walls, reception counters and writable office walls.",
      "See lacquered glass applications at our Padivattom experience centre and choose from Saint-Gobain's colour palette; we supply it to size and fit it to your design.",
    ],
    features: [
      { title: "Uniform colour", text: "Deep, even colour behind a flawless glass surface." },
      { title: "Wipe-clean", text: "No grout lines or pores — just wipe with a soft cloth." },
      { title: "Hygienic", text: "Non-porous glass resists stains and bacteria." },
      { title: "Moisture-proof", text: "Ideal for kitchens and bathrooms." },
      { title: "Modern gloss", text: "Reflects light to make rooms feel larger." },
      { title: "Versatile", text: "Shutters, splashbacks, wardrobes, walls and furniture." },
    ],
    applications: ["Kitchen shutters", "Backsplashes", "Wardrobe doors", "Feature walls", "Bathroom walls", "Writing walls & furniture"],
    faqs: [
      { q: "What is 'lackered glass'?", a: "It is a common spelling of lacquered glass — coloured, back-painted glass used for kitchens, wardrobes and interior walls." },
      { q: "Can lacquered glass be used behind a cooktop?", a: "Areas close to direct heat need the right specification and spacing. Our team will recommend a suitable option based on your kitchen layout." },
      { q: "How do I clean lacquered glass?", a: "Use a soft cloth with a mild glass cleaner and avoid abrasive pads." },
    ],
    keywords: ["lacquered glass kochi", "lackered glass", "lacquered glass", "back painted glass kochi", "kitchen glass shutters kochi"],
    accent: "#C2452D",
  },
  {
    slug: "shower-partitions",
    name: "Shower Partitions & Cubicles",
    brand: "Saint-Gobain",
    category: "glass",
    featured: true,
    tagline: "Give your bathroom a five-star upgrade.",
    summary:
      "Frameless and semi-frameless shower partitions and Saint-Gobain shower cubicles in toughened glass — sliding, hinged and walk-in designs made to fit.",
    seoTitle: "Shower Partitions & Glass Cubicles in Kochi",
    seoDescription:
      "Glass shower partitions and Saint-Gobain shower cubicles in Kochi — frameless, sliding and hinged toughened glass, made to measure and installed by experts.",
    intro: [
      "A glass shower partition keeps water where it belongs and makes even a compact bathroom feel larger and brighter. We design frameless, semi-frameless and framed enclosures in toughened safety glass to suit bathrooms of every size.",
      "Choose sliding doors that save space, hinged doors that open wide, walk-in fixed panels, and corner or in-line layouts — in clear, frosted or tinted glass with chrome, matte black or brushed hardware.",
      "Try Saint-Gobain shower cubicles at our Padivattom experience centre; we then measure your bathroom and install with watertight seals.",
    ],
    features: [
      { title: "Toughened safety glass", text: "Strong glass that is safe even in the unlikely event of breakage." },
      { title: "Made to measure", text: "Every partition is sized to your bathroom on site." },
      { title: "Sliding, hinged or walk-in", text: "Layouts for compact and spacious bathrooms alike." },
      { title: "Hardware finishes", text: "Chrome, matte black and brushed options." },
      { title: "Easy to clean", text: "Smooth glass with minimal frames and seals." },
      { title: "Watertight fitting", text: "Careful sealing keeps water inside the shower area." },
    ],
    applications: ["Master bathrooms", "Compact bathrooms", "Hotels & service apartments", "Hospitals & clinics", "Gyms & clubs", "Bathroom renovations"],
    faqs: [
      { q: "What glass is used for shower partitions?", a: "Toughened safety glass, typically 8–10 mm for frameless designs, so it is strong and safe." },
      { q: "Will a shower partition fit a small bathroom?", a: "Yes — sliding or fixed walk-in panels work well in compact spaces. We measure on site to make the most of the room." },
      { q: "Do you install shower cubicles outside Kochi?", a: "Yes, we install across Kerala." },
    ],
    keywords: ["shower partitions kochi", "shower partitions", "shower cubicles kochi", "glass shower enclosure ernakulam", "saint gobain shower cubicle"],
    accent: "#1B8EAA",
    previewFilm: "experience-centre-tour",
  },
  {
    slug: "glass-handrails",
    name: "Glass Handrails & Railings",
    brand: "Precise Homes",
    category: "glass",
    featured: true,
    tagline: "Open views with uncompromised safety.",
    summary:
      "Frameless and post-supported glass railings for staircases, balconies, terraces and atriums — toughened-laminated glass with stainless or concealed fixings.",
    seoTitle: "Glass Handrails & Railings in Kochi",
    seoDescription:
      "Glass handrails in Kochi for staircases, balconies and terraces — frameless channel, spigot and stainless systems with toughened-laminated glass. Free site visit.",
    intro: [
      "Glass railings replace bulky grills and balusters with a clean, transparent edge, so your staircase, balcony or terrace instantly feels larger and the view stays open. Our Edappally rooftop film shows a frameless system up close.",
      "We install frameless base-channel systems, spigot-mounted glass, point-fixed glass and post-and-glass designs, using toughened or toughened-laminated glass with stainless steel or aluminium top rails. Each system is chosen for safety at the height and location it is used.",
      "From villa staircases in Kaloor to rooftop terraces in Edappally, Precise Homes handles measurement, glass selection and installation across Kochi and Kerala.",
    ],
    features: [
      { title: "Frameless look", text: "Concealed base channels for an uninterrupted glass edge." },
      { title: "Laminated safety", text: "Toughened-laminated glass stays in place even if cracked." },
      { title: "Weather-proof", text: "Stainless and powder-coated hardware for outdoor use." },
      { title: "Indoor & outdoor", text: "Staircases, balconies, terraces and pool sides." },
      { title: "Custom heights", text: "Designed to suit each location and building." },
      { title: "Easy cleaning", text: "Smooth glass is simple to keep spotless." },
    ],
    applications: ["Staircases", "Balconies", "Rooftop terraces", "Atriums & mezzanines", "Pool fences", "Commercial lobbies"],
    faqs: [
      { q: "Is a glass handrail safe for children?", a: "With the right toughened-laminated glass, height and fixing system, glass railings are very safe — the glass stays in place even if it cracks." },
      { q: "What glass thickness is used for railings?", a: "Common choices are 10–12 mm toughened glass or laminated combinations such as 6+6 mm or 8+8 mm, depending on the height and system." },
      { q: "Do glass railings work outdoors in Kerala's rain?", a: "Yes. With stainless steel or powder-coated aluminium hardware they are fully weather-proof and only need occasional cleaning." },
    ],
    keywords: ["glass handrail kochi", "glass handrail", "glass railing kochi", "frameless glass railing kerala", "balcony glass railing ernakulam", "staircase glass railing kochi"],
    accent: "#3BA3C9",
    previewFilm: "edappally-glass-handrail",
  },

  // ── Cladding & HPL ────────────────────────────────────────────────────────
  {
    slug: "fundermax-hpl-cladding",
    name: "Fundermax HPL Cladding",
    brand: "Fundermax",
    category: "cladding",
    featured: true,
    tagline: "Austrian façade panels made for Kerala weather.",
    summary:
      "Max Compact Exterior high-pressure laminate panels for façades, gates, balconies and compound walls — 132 décors, colour-stable and weather-resistant.",
    seoTitle: "Fundermax Cladding in Kochi — HPL Exterior Panels",
    seoDescription:
      "Fundermax HPL cladding in Kochi and Kerala — Max Compact Exterior panels in wood, stone and solid décors for façades, gates and balconies. Supply and installation.",
    intro: [
      "Fundermax Max Compact Exterior panels are high-pressure laminates made from wood fibres and resins pressed under high pressure and heat, finished with a weather-resistant surface that keeps its colour in strong sun and heavy rain. The result is a solid, durable panel for façades, balconies, gates and outdoor elements.",
      "The Exterior 2.3 collection offers 132 décors — realistic wood grains, stone and concrete looks and bold solid colours — across several surface textures, including silky-matt and anti-fingerprint finishes. The panels are made largely from renewable raw materials and carry FSC® and PEFC certification.",
      "As seen at our Kollam residence, wood-look Fundermax panels deliver the warmth of timber with none of its maintenance. Precise Homes plans and installs Fundermax cladding across Kochi and Kerala.",
    ],
    features: [
      { title: "Weather & UV resistant", text: "Built for outdoor exposure to sun, rain and humidity." },
      { title: "132 décors", text: "Wood, stone, concrete and solid colours in several textures." },
      { title: "No painting", text: "Colour-stable surfaces that only need occasional washing." },
      { title: "Solid core", text: "Dense, robust panels that resist impact." },
      { title: "Sustainable", text: "FSC® and PEFC certified, largely renewable raw materials." },
      { title: "Versatile", text: "Façades, gates, balconies, soffits and screens." },
    ],
    applications: ["Building façades", "Gates & compound walls", "Balcony cladding", "Soffits & canopies", "Pergolas & screens", "Commercial frontages"],
    specs: [
      { label: "Collection", value: "Fundermax Max Compact Exterior 2.3" },
      { label: "Décors", value: "132 décors (39 new)" },
      { label: "Surfaces", value: "NT silky-matt plus NG, NY and NP finishes" },
      { label: "Certification", value: "FSC®, PEFC and biobased product label" },
    ],
    faqs: [
      { q: "What is HPL cladding?", a: "High-pressure laminate cladding is a dense panel made by pressing layers of wood fibre and resin under heat and pressure, finished with a weather-resistant surface. It is strong, colour-stable and low-maintenance." },
      { q: "Is Fundermax suitable for Kerala's monsoon?", a: "Yes. Max Compact Exterior panels are designed for outdoor exposure to rain, humidity and UV, which is why they are popular for façades and gates in Kerala." },
      { q: "Where can I see Fundermax décors in Kochi?", a: "At our Padivattom experience centre — or open the Max Compact Exterior presentation below." },
    ],
    keywords: ["fundermax cladding", "fundermax cladding kochi", "fundermax kerala", "hpl cladding", "hpl cladding kochi", "exterior hpl panels kerala"],
    accent: "#D72731",
    previewFilm: "kollam-fundermax-cladding",
    brandPage: "/fundermax",
  },
  {
    slug: "high-pressure-laminates",
    name: "High Pressure Laminates (HPL)",
    brand: "Fundermax",
    category: "cladding",
    tagline: "Tough, hygienic surfaces for walls, cubicles and furniture.",
    summary:
      "Compact HPL panels and laminates for wall panelling, washroom cubicles, lockers, furniture and worktops — impact-, moisture- and scratch-resistant.",
    seoTitle: "High Pressure Laminates (HPL) in Kochi",
    seoDescription:
      "High pressure laminates in Kochi — Fundermax compact HPL for wall panelling, washroom cubicles, furniture and exteriors. Durable, hygienic, many décors.",
    intro: [
      "High pressure laminates are made by bonding layers of resin-impregnated paper under very high pressure and temperature. Thicker 'compact' HPL becomes a self-supporting board that is remarkably tough — resisting impact, scratches, moisture and everyday chemicals.",
      "That makes HPL a material of choice for high-use interiors: washroom cubicles and lockers, wall panelling in corridors and lobbies, hospital and school interiors, furniture surfaces and laboratory worktops. Exterior-grade versions with weather-resistant surfaces are used for façades (see Fundermax HPL Cladding).",
      "Precise Homes supplies Fundermax HPL in a wide range of wood, stone and solid décors and helps architects and builders across Kerala specify the right grade and thickness.",
    ],
    features: [
      { title: "Impact resistant", text: "Dense boards that shrug off knocks in busy spaces." },
      { title: "Moisture resistant", text: "Compact HPL suits washrooms and wet areas." },
      { title: "Hygienic", text: "Closed surfaces that are easy to clean and disinfect." },
      { title: "Scratch & stain resistant", text: "Keeps looking new under daily use." },
      { title: "Wide décor range", text: "Wood, stone, concrete and solid colours." },
      { title: "Interior & exterior grades", text: "From cubicles to façades." },
    ],
    applications: ["Washroom cubicles", "Wall panelling", "Lockers & furniture", "Hospitals & schools", "Laboratory worktops", "Façade cladding"],
    faqs: [
      { q: "What is the difference between HPL and ordinary laminate?", a: "HPL is pressed at much higher pressure, making it denser and tougher. Compact HPL is thick enough to be used as a standalone board without a substrate." },
      { q: "Is HPL waterproof?", a: "Compact HPL is highly moisture-resistant, which is why it is widely used for washroom cubicles and wet areas." },
      { q: "Can HPL be used outdoors?", a: "Only exterior-grade HPL with a weather-resistant surface, such as Fundermax Max Compact Exterior." },
    ],
    keywords: ["high pressure laminates", "high preasure laminates", "high pressure laminates kochi", "hpl sheets kerala", "compact laminate kochi"],
    accent: "#B5472E",
    brandPage: "/fundermax",
  },
  {
    slug: "iclad-cladding",
    name: "iCLAD Sintered Stone Cladding",
    brand: "iCLAD by Qutone",
    category: "cladding",
    featured: true,
    tagline: "The look of stone, engineered for ventilated façades.",
    summary:
      "6 mm sintered stone panels in 3000 × 1000 mm and 1800 × 600 mm formats for rear-ventilated façades, columns, louvres, soffits and compound walls.",
    seoTitle: "iCLAD Cladding in Kochi — Sintered Stone Façades",
    seoDescription:
      "iCLAD sintered stone cladding in Kochi and Kerala — large 3000×1000 mm panels for ventilated façades, columns and compound walls. Weather and UV resistant.",
    intro: [
      "iCLAD sintered stone panels are made by compacting natural minerals under extreme pressure and heat, producing a dense surface that resists UV, weather, chemicals and wear. They bring the richness of stone and concrete textures to a façade at a thickness of just 6 mm.",
      "Large 3000 × 1000 mm panels create sleek, continuous surfaces, while 1800 × 600 mm panels suit smaller or more intricate elevations. iCLAD's semi-unitised, rear-ventilated façade system lets air circulate behind the cladding, improving thermal efficiency and reducing the demand on air-conditioning.",
      "Use iCLAD for façades, columns, entrance portals, louvres, soffits, compound walls, parasols and perforated double-skin designs. Explore the full collection in the catalogue below and talk to Precise Homes about supply and installation in Kerala.",
    ],
    features: [
      { title: "6 mm sintered stone", text: "Stone-like beauty without the weight of natural stone." },
      { title: "Large formats", text: "3000 × 1000 mm and 1800 × 600 mm panels." },
      { title: "Ventilated façade", text: "Rear ventilation keeps walls cooler and drier." },
      { title: "UV & weather resistant", text: "Colours and textures that stay true outdoors." },
      { title: "Low maintenance", text: "Dense surfaces resist stains, chemicals and wear." },
      { title: "BIM-ready", text: "BIM objects available for architects and consultants." },
    ],
    applications: ["Façades", "Columns", "Entrance portals", "Louvres", "Soffits", "Compound walls"],
    specs: [
      { label: "Material", value: "Sintered stone, 6 mm" },
      { label: "Panel sizes", value: "3000 × 1000 mm · 1800 × 600 mm" },
      { label: "System", value: "Semi-unitised, rear-ventilated façade" },
      { label: "Uses", value: "Façades, columns, louvres, soffits, compound walls, parasols" },
    ],
    faqs: [
      { q: "What is sintered stone cladding?", a: "Sintered stone is made by compacting natural minerals under very high pressure and heat, creating a dense, durable surface with the look of stone or concrete — ideal for façades." },
      { q: "Why choose a ventilated façade in Kerala?", a: "The air gap behind the panels carries away heat and moisture, keeping walls cooler and drier — well suited to Kerala's hot, humid climate." },
      { q: "Can iCLAD be used for compound walls and gate pillars?", a: "Yes — compound walls, columns and entrance portals are among its listed applications." },
    ],
    keywords: ["iclad cladding", "iclad cladding kochi", "sintered stone cladding kerala", "ventilated facade kochi", "stone cladding kochi", "facade cladding kerala"],
    accent: "#B08D57",
  },

  // ── Walls & surfaces ──────────────────────────────────────────────────────
  {
    slug: "novelio-wall-coverings",
    name: "Novelio Wall Coverings",
    brand: "Saint-Gobain ADFORS",
    category: "walls-surfaces",
    tagline: "Say goodbye to cracks in your walls.",
    summary:
      "Paintable glass-fibre wall coverings that reinforce walls, hide and prevent cracks, resist impact and stay hygienic — Classic, Nature and Opposites designs.",
    seoTitle: "Novelio Wall Coverings in Kochi — Crack-Free Walls",
    seoDescription:
      "Novelio glass-fibre wall coverings in Kochi — paintable, crack-preventing, impact-resistant and hygienic designer textures from Saint-Gobain ADFORS.",
    intro: [
      "Novelio is a fabric woven from glass yarn that is pasted onto walls and ceilings and then painted in any colour you like. Because glass fibre has very high tensile strength, it reinforces the wall — covering existing hairline cracks and helping to prevent new ones.",
      "The result is a surface that resists knocks and abrasion, can be scrubbed and disinfected, and does not support the growth of micro-organisms because glass is inorganic. Repaint it whenever you want a new look — the texture stays crisp for years.",
      "Choose from Novelio Classic weaves — including pre-painted, pre-glued and self-adhesive versions — and the designer Nature and Opposites collections, ideal for homes, hotels, schools, hospitals and offices.",
    ],
    features: [
      { title: "Crack prevention", text: "Reinforces walls, covers hairline cracks and helps stop new ones." },
      { title: "Impact resistant", text: "Withstands far more force than ordinary wall coverings." },
      { title: "Hygienic", text: "Glass is inorganic — it can be scrubbed and disinfected." },
      { title: "Paint & repaint", text: "Change colours over the years without losing the texture." },
      { title: "Designer textures", text: "Classic weaves plus Nature and Opposites collections." },
      { title: "Long service life", text: "Keeps walls looking good for decades." },
    ],
    applications: ["Living rooms & bedrooms", "Renovations with cracked plaster", "Hotels", "Hospitals & clinics", "Schools", "Offices & corridors"],
    faqs: [
      { q: "Can Novelio hide cracks in old walls?", a: "Yes. It bridges and reinforces hairline cracks and helps prevent new ones, which makes it ideal for renovations." },
      { q: "Can Novelio be repainted?", a: "Yes — it is designed to be painted and repainted many times." },
      { q: "Is Novelio suitable for humid Kerala homes?", a: "Glass fibre does not rot and Novelio can be cleaned and disinfected easily. Correct wall preparation matters, so our team assesses the walls before installation." },
    ],
    keywords: ["novelio wall covering", "novelio kochi", "glass fibre wall covering kerala", "crack proof wall covering", "paintable wall covering kochi"],
    accent: "#5E8C7B",
  },
  {
    slug: "architectural-surfaces",
    name: "Forms+Surfaces Architectural Surfaces",
    brand: "Forms+Surfaces",
    category: "walls-surfaces",
    tagline: "Decorative glass and metal for lobbies, lifts and landmarks.",
    summary:
      "VividGlass decorative laminated glass, stainless steel and bonded metal, bonded quartz and the LEVELe wall cladding system for elevators, lobbies and public spaces.",
    seoTitle: "Forms+Surfaces Decorative Glass & Metal in Kochi",
    seoDescription:
      "Forms+Surfaces in Kochi — VividGlass decorative laminated glass, stainless steel, bonded metal and LEVELe wall cladding for elevator interiors and lobbies.",
    intro: [
      "Forms+Surfaces is a design company that has created architectural products for public spaces around the world for about 50 years. Its surfaces range brings precision-made decorative materials to elevator interiors, lobbies, corridors and feature walls.",
      "VividGlass is its line of architectural laminated glass — ViviChrome, ViviGraphix, ViviSpectra, ViviStone, ViviStrata and ViviTela — with colours, graphics, metallic meshes and textiles laminated inside the glass. Alongside it come stainless steel and fused-metal finishes, bonded metal and bonded quartz panels, and the LEVELe wall cladding system.",
      "For hotels, hospitals, offices and residential towers in Kerala, Precise Homes can help architects and developers specify Forms+Surfaces products — browse both catalogues below.",
    ],
    features: [
      { title: "VividGlass", text: "Decorative laminated glass with colour, graphics or textiles inside." },
      { title: "Durable metals", text: "Stainless steel, fused metal and bonded metal finishes." },
      { title: "Elevator interiors", text: "LEVELe systems designed for high-traffic lift cars." },
      { title: "Wall cladding", text: "Panel systems for lobbies and corridors." },
      { title: "Sustainable by design", text: "Durability-led design and certified materials." },
      { title: "Global portfolio", text: "Used in landmark public spaces worldwide." },
    ],
    applications: ["Elevator interiors", "Hotel & office lobbies", "Corridors & feature walls", "Hospitals", "Retail", "Public spaces"],
    faqs: [
      { q: "What is VividGlass?", a: "Forms+Surfaces' range of architectural laminated glass with colours, graphics, metal meshes or textiles bonded inside — used for decorative walls, partitions and elevator interiors." },
      { q: "Can these surfaces be used in elevators?", a: "Yes. The LEVELe system and stainless steel finishes are designed for elevator interiors and other high-traffic areas." },
      { q: "Can Precise Homes supply Forms+Surfaces in Kerala?", a: "Yes — contact us with your project details and we will help with specification and supply." },
    ],
    keywords: ["forms+surfaces india", "vividglass", "decorative laminated glass kochi", "elevator interior panels kerala", "stainless steel wall cladding"],
    accent: "#9C7B5B",
  },
  {
    slug: "lg-hausys-surfaces",
    name: "LG Hausys Surfaces",
    brand: "LG Hausys",
    category: "walls-surfaces",
    tagline: "Innovative surfaces for beautiful interiors.",
    summary:
      "LG Hausys interior surfaces — HI-MACS solid surfaces, interior films and decorative panels for kitchens, bathrooms, ceilings and feature walls.",
    seoTitle: "LG Hausys Surfaces in Kochi — Interior Panels",
    seoDescription:
      "LG Hausys interior surfaces in Kochi — HI-MACS solid surfaces, interior films and decorative panels for kitchens, ceilings and walls, installed by Precise Homes.",
    intro: [
      "LG Hausys — now known internationally as LX Hausys — grew out of the LG Group and is known for HI-MACS solid surfaces, interior films and decorative panels.",
      "Precise Homes uses LG Hausys materials for ceiling features, wood-look wall panels, seamless countertops and vanities. See our installations on the LG Hausys gallery page.",
    ],
    features: [
      { title: "Seamless surfaces", text: "HI-MACS joins almost invisibly for flowing countertops." },
      { title: "Wood-look panels", text: "Warm ceiling and wall features without real timber." },
      { title: "Non-porous", text: "Hygienic and easy to clean." },
      { title: "Thermoformable", text: "Can be shaped into curves and custom forms." },
      { title: "Interior films", text: "Refresh furniture, doors and walls quickly." },
      { title: "Low maintenance", text: "Durable finishes for busy homes." },
    ],
    applications: ["Ceiling features", "Wall panels", "Kitchen countertops", "Bathroom vanities", "Reception desks", "Furniture refacing"],
    faqs: [
      { q: "Is LG Hausys the same as LX Hausys?", a: "Yes — LG Hausys was renamed LX Hausys in 2021; many people in Kerala still search for it as LG Hausys." },
      { q: "Where can I see LG Hausys work in Kochi?", a: "Browse our LG Hausys gallery or visit our Padivattom experience centre." },
    ],
    keywords: ["lg hausys kochi", "lx hausys kerala", "hi-macs kochi", "interior panels kochi"],
    accent: "#A50034",
    brandPage: "/lg-hausys",
  },

  // ── Roofing ───────────────────────────────────────────────────────────────
  {
    slug: "roofing-shingles",
    name: "Saint-Gobain Roofing Shingles",
    brand: "Saint-Gobain",
    category: "roofing",
    tagline: "A rich, weather-resistant roof for Kerala's rain.",
    summary:
      "Architectural roofing shingles for sloped roofs — layered, textured and colour-rich, and much lighter than tiles for villas, pergolas and gazebos.",
    seoTitle: "Roofing Shingles in Kochi — Saint-Gobain",
    seoDescription:
      "Saint-Gobain roofing shingles in Kochi for sloped roofs, villas, pergolas and gazebos — lightweight, textured and weather-resistant. Talk to Precise Homes.",
    intro: [
      "Roofing shingles are overlapping roof coverings laid on a sloped deck. Their layered, textured profile gives roofs a rich, dimensional look, and their light weight puts far less load on the structure than heavy clay or concrete tiles.",
      "In our rooftop film, the team discusses roofing for Kerala's heavy monsoon on a sloping roof finished in Saint-Gobain shingles, alongside a frameless glass railing. Shingles suit new villas, roof renovations, pergolas, gazebos and sit-out canopies.",
      "Talk to Precise Homes about colours, underlayment and detailing for your roof, and we will guide you from selection to installation.",
    ],
    features: [
      { title: "Lightweight", text: "Much lighter than clay or concrete tiles." },
      { title: "Weather resistant", text: "Overlapping layers shed heavy rain when installed correctly." },
      { title: "Dimensional look", text: "Textured, layered profiles with depth and shadow." },
      { title: "Many colours", text: "Blends and shades to suit any architecture." },
      { title: "Versatile", text: "Villas, pergolas, gazebos and canopies." },
      { title: "Clean installation", text: "Laid on a prepared deck with proper underlayment." },
    ],
    applications: ["Sloped villa roofs", "Roof renovations", "Pergolas", "Gazebos", "Sit-outs & canopies", "Resorts"],
    faqs: [
      { q: "Are shingles suitable for Kerala's heavy rain?", a: "Yes, when installed on a properly sloped deck with the right underlayment and detailing — our team covers this in the rooftop film." },
      { q: "Are shingles lighter than roof tiles?", a: "Yes, significantly lighter than clay or concrete tiles, which reduces the load on the roof structure." },
      { q: "Can shingles be used on a flat terrace?", a: "No — shingles need a sloped roof. For flat terraces we can suggest other solutions." },
    ],
    keywords: ["roofing shingles kochi", "saint gobain shingles", "roof shingles kerala", "shingle roof kochi"],
    accent: "#8A5A44",
    previewFilm: "saint-gobain-shingles-glass-railing",
  },
];

/** Slim, serialisable card data — only this crosses into client components. */
export type ProductCardData = Pick<Product, "slug" | "name" | "brand" | "category" | "tagline" | "summary" | "accent" | "featured"> & {
  image: string;
  preview?: string;
  highlights: string[];
};

export const toProductCard = (p: Product): ProductCardData => ({
  slug: p.slug,
  name: p.name,
  brand: p.brand,
  category: p.category,
  tagline: p.tagline,
  summary: p.summary,
  accent: p.accent,
  featured: p.featured,
  image: productImage(p.slug),
  preview: p.previewFilm ? filmMedia(p.previewFilm).preview : undefined,
  highlights: p.features.slice(0, 3).map((f) => f.title),
});

export const productImage = (slug: string) => `/media/products/${slug}.webp`;
export const productOgImage = (slug: string) => `/media/og/products/${slug}.jpg`;
export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productHref = (slug: string) => `/products/${slug}`;
export const categoryLabel = (key: ProductCategory) => CATEGORIES.find((c) => c.key === key)?.label ?? key;
