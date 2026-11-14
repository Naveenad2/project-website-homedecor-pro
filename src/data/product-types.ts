// ─────────────────────────────────────────────────────────────────────────────
// Product TYPE pages — /products/[product]/[type]
// Each type answers one specific search ("upvc sliding windows kochi",
// "staircase glass railing", …) with its own unique copy, honest trade-offs,
// FAQs and — where we have one — a real project film as proof.
// Facts here must stay consistent with products.ts and films.ts.
// ─────────────────────────────────────────────────────────────────────────────

import type { Faq } from "./faqs";
import { productImage, productOgImage } from "./products";
import { filmMedia } from "./films";

export type ProductType = {
  slug: string;
  /** Slug of the parent product in products.ts. */
  parent: string;
  name: string;
  /** Short label for cards and lists. */
  shortName: string;
  tagline: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  features: { title: string; text: string }[];
  bestFor: string[];
  /** Honest trade-offs — helps buyers decide and builds trust. */
  goodToKnow: { title: string; text: string }[];
  specs?: { label: string; value: string }[];
  faqs: Faq[];
  keywords: string[];
  /** Project film that shows this type: its poster is the hero image and its preview loops on screen. */
  film?: string;
  /** More project films to show on the page. */
  films?: string[];
};

const UPVC = "saint-gobain-upvc-windows";

export const PRODUCT_TYPES: ProductType[] = [
  // ── uPVC windows & doors ───────────────────────────────────────────────────
  {
    slug: "sliding-windows",
    parent: UPVC,
    name: "uPVC Sliding Windows",
    shortName: "Sliding windows",
    tagline: "Wide openings that never swing into your room.",
    summary:
      "Saint-Gobain uPVC sliding windows for living rooms, bedrooms and balconies — wood-finish or white, made to measure and installed across Kochi and Kerala.",
    seoTitle: "uPVC Sliding Windows in Kochi & Kerala",
    seoDescription:
      "Saint-Gobain uPVC sliding windows in Kochi: two-track and multi-track, wood finish or white, made to measure. Free site visit across Kerala.",
    intro: [
      "Sliding windows are the most popular choice in Kerala homes because the shutters glide sideways along a track instead of swinging open. Nothing projects into the room or over a sit-out, so curtains, furniture and grills stay where you want them — and wide openings can be filled with large panes of glass.",
      "Saint-Gobain uPVC sliding windows pair a multi-chamber uPVC frame with smooth rollers, interlocking shutters and brush seals. Choose a two-track frame for everyday openings, or a multi-track frame when you want an extra shutter — for example an insect mesh alongside the glass. Wood-grain finishes give the warmth of teak, as in our Kollam and Kaloor projects, without polishing or termite worries.",
      "We measure every opening, recommend the glass for each room — toughened for large panes, laminated or double-glazed where noise or heat is a problem — and install with proper perimeter sealing so the rain stays outside.",
    ],
    features: [
      { title: "Space-saving", text: "Shutters slide within the frame, so nothing swings into the room or onto a balcony." },
      { title: "Big glass, big views", text: "Wide shutters suit living rooms and garden-facing walls where the view matters." },
      { title: "Smooth rollers", text: "Quality rollers and tracks keep large shutters easy to move, day after day." },
      { title: "Mesh-ready frames", text: "Multi-track frames can carry an insect-mesh shutter alongside the glass." },
      { title: "Wood finish or white", text: "Teak-look wood-grain profiles or classic white." },
      { title: "Low maintenance", text: "No painting and no monsoon swelling — just wipe the frame and clear the track." },
    ],
    bestFor: ["Living rooms", "Balcony & sit-out openings", "Bedrooms with furniture near the window", "Garden-facing walls", "Apartments", "Rooms with curtains or blinds"],
    goodToKnow: [
      { title: "Ventilation is half the opening", text: "Only one shutter opens at a time, so a two-shutter window gives about half its width for air. If cross-ventilation is the priority, look at casement windows." },
      { title: "Very exposed walls", text: "Sliding shutters seal with brush seals. On walls that take the full force of monsoon rain, casements — which close onto compression gaskets — seal tighter. We advise wall by wall." },
      { title: "Keep the track clean", text: "Dust and leaves in the bottom track make sliding stiff and can block the drainage slots. A quick clean every few weeks keeps them gliding." },
    ],
    specs: [
      { label: "Tracks", value: "Two-track and multi-track frames" },
      { label: "Finishes", value: "Wood-grain and white" },
      { label: "Glazing", value: "Toughened, laminated, acoustic or double-glazed (DGU)" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "Are uPVC sliding windows good for Kerala's rain?", a: "Yes, when they are well made and properly installed. The frame has drainage channels that carry water back outside, and the gap between frame and wall is sealed. For walls facing the full force of the monsoon we may suggest casement windows, which seal even tighter." },
      { q: "Sliding or casement windows — which should I choose?", a: "Choose sliding windows where space is tight or you want wide views; choose casements where you want maximum ventilation and the tightest seal against rain and noise. Many homes use both.", link: { href: "/products/saint-gobain-upvc-windows/casement-windows", label: "uPVC casement windows" } },
      { q: "Can I add a mosquito mesh to a sliding window?", a: "Yes — a multi-track frame can carry an insect-mesh shutter that slides independently of the glass. Ask our team which option suits your window sizes." },
      { q: "What is the price of uPVC sliding windows in Kochi?", a: "It depends on the size, number of tracks, glass and finish, so we quote after a free site measurement. WhatsApp your window sizes or plan for a quick estimate." },
    ],
    keywords: ["upvc sliding windows kochi", "upvc sliding windows kerala", "sliding windows kochi", "saint gobain sliding windows", "upvc sliding window price kerala"],
    film: "kollam-homeowner-sliding-windows",
    films: ["kaloor-villa-garden-windows", "kaloor-villa-homeowner-talk"],
  },
  {
    slug: "casement-windows",
    parent: UPVC,
    name: "uPVC Casement Windows",
    shortName: "Casement windows",
    tagline: "Opens fully for the breeze, seals tight against the rain.",
    summary:
      "Side-hung Saint-Gobain uPVC casement windows that open fully for cross-ventilation and close onto compression gaskets for the tightest seal against rain, dust and noise.",
    seoTitle: "uPVC Casement Windows in Kochi & Kerala",
    seoDescription:
      "Saint-Gobain uPVC casement windows in Kochi: open fully for cross-ventilation and seal tight against monsoon rain and noise. Free site visit across Kerala.",
    intro: [
      "A casement window is hinged at the side and swings open like a door. Because the whole shutter opens, you get the full opening for fresh air — ideal for Kerala homes that rely on cross-ventilation.",
      "When a casement closes, the shutter presses onto continuous rubber gaskets all round the frame. That compression seal is why casements usually keep out wind-driven rain, dust and traffic noise better than sliding windows — a real advantage on exposed walls and in bedrooms facing busy roads.",
      "Our Kaloor villa film shows tall casement windows opening wide to Kochi's breeze beside a glass staircase. We combine casements with fixed glass for larger openings, fit sturdy handles and locking hardware, and choose the right glass for each room.",
    ],
    features: [
      { title: "Full opening", text: "The entire shutter opens, giving the most airflow of any window type." },
      { title: "Tightest seal", text: "Compression gaskets seal the closed window against rain, dust and noise." },
      { title: "Quieter bedrooms", text: "With laminated or double glazing, casements are our first choice near traffic." },
      { title: "Secure hardware", text: "Sturdy handles with multi-point locking options." },
      { title: "Combine freely", text: "Pair opening shutters with fixed glass for wide, bright openings." },
      { title: "Wood finish or white", text: "Teak-look wood-grain profiles or classic white." },
    ],
    bestFor: ["Bedrooms", "Staircases & double-height walls", "Walls exposed to monsoon rain", "Rooms facing busy roads", "Kitchens & work areas", "Homes that rely on cross-ventilation"],
    goodToKnow: [
      { title: "Needs swing space", text: "The shutter swings open, so check sunshades, grills and walkways around the window before choosing casements." },
      { title: "Mesh works differently", text: "Because the shutter swings, insect mesh is usually a fixed, hinged or pleated screen on the inside rather than a sliding shutter." },
      { title: "Close before a storm", text: "Stays hold an open shutter in place, but casements should be closed before strong wind and heavy rain." },
    ],
    specs: [
      { label: "Type", value: "Side-hung casement · combinations with fixed glass" },
      { label: "Finishes", value: "Wood-grain and white" },
      { label: "Glazing", value: "Toughened, laminated, acoustic or double-glazed (DGU)" },
      { label: "Hardware", value: "Handles with multi-point locking options" },
    ],
    faqs: [
      { q: "Do casement windows leak less than sliding windows?", a: "In general, yes. A closed casement presses onto compression gaskets on all sides, while sliding shutters seal with brushes. Correct installation and perimeter sealing matter just as much as the window type.", link: { href: "/blog/stop-window-leaks-monsoon-kerala", label: "Why windows leak in the monsoon" } },
      { q: "Are casement windows good for small rooms?", a: "Yes, as long as there is space outside for the shutter to swing. Where there is no swing space, a sliding window is the better fit." },
      { q: "Which glass should I choose for a bedroom casement?", a: "For a quiet bedroom near traffic, acoustic laminated glass or a double-glazed unit makes the biggest difference; for a west-facing room, solar-control glass cuts heat. We recommend options after a site visit.", link: { href: "/products/saint-gobain-upvc-windows/soundproof-windows", label: "Soundproof windows" } },
    ],
    keywords: ["upvc casement windows kochi", "casement windows kerala", "upvc casement window", "saint gobain casement windows", "openable windows kochi"],
    film: "kaloor-villa-tilt-turn-windows",
  },
  {
    slug: "french-doors",
    parent: UPVC,
    name: "uPVC French Doors",
    shortName: "French doors",
    tagline: "Open the whole doorway to your sit-out or garden.",
    summary:
      "Pairs of hinged, fully glazed Saint-Gobain uPVC doors in rich wood finish or white — for sit-outs, gardens and balconies, with safety glass and multi-point locking.",
    seoTitle: "uPVC French Doors in Kochi & Kerala",
    seoDescription:
      "Saint-Gobain uPVC French doors in Kochi: wood-finish glazed doors for sit-outs, gardens and balconies, with safety glass and multi-point locks.",
    intro: [
      "French doors are a pair of hinged, glazed doors that open from the middle. With both leaves open the entire doorway is clear — the most generous connection between a living room and a sit-out, verandah, garden or balcony.",
      "At our Kaloor villa, wood-finish Saint-Gobain French doors and sliders frame the tropical garden, and the owner talks about choosing them in his review film. uPVC gives the look of a traditional teak door without the swelling, termites or repainting that timber suffers in Kerala's humidity.",
      "Because people walk through them, door glass is always safety glass — toughened, or laminated where extra security or quiet is wanted. We fit multi-point locking hardware and plan the threshold so rain drains away while the step stays comfortable.",
    ],
    features: [
      { title: "Full-width opening", text: "Both leaves open, leaving the whole doorway clear." },
      { title: "Wood-finish warmth", text: "Teak-look profiles that suit traditional and modern Kerala homes." },
      { title: "Safety glass", text: "Toughened or laminated glass, as every glazed door should have." },
      { title: "Multi-point locking", text: "Locks that engage at several points along the door." },
      { title: "Weather-sealed", text: "Gaskets and a drained threshold keep monsoon rain outside." },
      { title: "No termites, no swelling", text: "Doors that keep closing smoothly through every monsoon." },
    ],
    bestFor: ["Living room to sit-out", "Garden & verandah access", "Bedroom balconies", "Courtyards", "Heritage-style homes", "Replacing old timber doors"],
    goodToKnow: [
      { title: "Plan for the swing", text: "Both leaves need clear floor space to open — plan furniture and planters around them." },
      { title: "French or sliding?", text: "If space is tight, a sliding door gives a wide opening without the swing; French doors open the full width." },
      { title: "Threshold height", text: "On exposed sit-outs a slightly raised, drained threshold keeps rain out; we balance it with comfort for children and elders." },
    ],
    specs: [
      { label: "Type", value: "Double-leaf hinged glazed doors" },
      { label: "Finishes", value: "Wood-grain and white" },
      { label: "Glazing", value: "Toughened or laminated safety glass" },
      { label: "Locking", value: "Multi-point locking options" },
    ],
    faqs: [
      { q: "Are uPVC French doors secure?", a: "Yes. With multi-point locks and toughened or laminated glass, they are a secure choice for doors to sit-outs, gardens and balconies." },
      { q: "Will French doors let rain in during the monsoon?", a: "Not when they are properly made and installed: gaskets seal the leaves and the threshold is designed to drain water away. On very exposed sit-outs a canopy or sunshade helps further." },
      { q: "French doors or sliding doors — which is better?", a: "French doors open the full width and suit traditional elevations; sliding doors save space and suit very wide openings. Many homes use both, as at our Kaloor villa." },
      { q: "Can I get French doors in a wood finish?", a: "Yes — wood-grain uPVC profiles, like those in our Kaloor villa film, give the look of timber without polishing or termite problems." },
    ],
    keywords: ["upvc french doors kochi", "french doors kerala", "upvc doors kochi", "wood finish upvc doors", "upvc french door price kerala"],
    film: "kaloor-villa-french-doors",
    films: ["kaloor-villa-owner-review"],
  },
  {
    slug: "soundproof-windows",
    parent: UPVC,
    name: "Soundproof Windows",
    shortName: "Soundproof windows",
    tagline: "Turn down traffic, horns and construction noise.",
    summary:
      "Noise-reducing windows for homes near busy roads, metro lines and construction — well-sealed uPVC frames with Saint-Gobain acoustic laminated or double-glazed glass.",
    seoTitle: "Soundproof Windows in Kochi — Noise Reduction",
    seoDescription:
      "Soundproof windows in Kochi for homes near busy roads: sealed uPVC frames with Saint-Gobain acoustic laminated or double glazing. Free site visit.",
    intro: [
      "Traffic, horns, buses and construction can make a bedroom or study near a busy road hard to rest in. Most of that noise gets in through the windows — through gaps around old frames and through thin single glass.",
      "A noise-reducing window tackles both. A well-sealed uPVC frame — ideally a casement, which closes onto compression gaskets — shuts the air gaps, and the right glass blocks more sound: acoustic laminated glass, whose interlayer damps vibration, or a double-glazed unit, ideally with panes of different thickness.",
      "No window makes a room completely silent, so be wary of promises like that. A good acoustic window cuts everyday noise to a level you notice far less. We look at the noise source, the room and your existing openings, then recommend the frame and glass that give the biggest improvement for your budget.",
    ],
    features: [
      { title: "Airtight sealing", text: "Sound travels through gaps first; sealed frames and gaskets close them." },
      { title: "Acoustic laminated glass", text: "A special interlayer damps sound vibrations, especially traffic noise." },
      { title: "Double glazing", text: "Two panes with a sealed gap; different pane thicknesses improve noise reduction." },
      { title: "Casement first", text: "Compression-sealed casements usually outperform sliders for noise." },
      { title: "Careful installation", text: "The gap between frame and wall is sealed so noise can't bypass the window." },
      { title: "Bonus comfort", text: "The same upgrades reduce dust, and double glazing also cuts heat gain." },
    ],
    bestFor: ["Bedrooms facing main roads", "Homes near metro lines & highways", "Home offices & study rooms", "Apartments above busy junctions", "Hospitals & clinics", "Meeting rooms"],
    goodToKnow: [
      { title: "Doors and vents matter too", text: "Noise also enters through doors, AC openings and ventilators — we look at the whole room, not just the window." },
      { title: "Closed to work", text: "A window only blocks noise when it is shut, so plan ventilation or air-conditioning for the rooms you want quiet." },
      { title: "Pay for what helps", text: "We check the noise source and existing windows on site before recommending glass, so you only pay for upgrades that make a difference." },
    ],
    specs: [
      { label: "Frame", value: "Saint-Gobain uPVC casement or sliding" },
      { label: "Glass", value: "Acoustic laminated (PVB) or double-glazed units (DGU)" },
      { label: "Strongest option", value: "Casement + acoustic laminated glass or a DGU with a laminated pane" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "Do soundproof windows really work?", a: "Yes. A well-sealed window with acoustic laminated or double glazing noticeably reduces traffic and street noise compared with old single-glazed windows. It won't make a room completely silent, but most people notice the difference straight away, especially at night." },
      { q: "Laminated or double glazing — which is better for noise?", a: "Acoustic laminated glass is very effective against traffic noise and keeps frames slim; double glazing adds heat insulation too. For the strongest result, combine them: a double-glazed unit with a laminated pane." },
      { q: "Can I just replace the glass in my existing windows?", a: "Sometimes, if the frames are sound and can take thicker glass. But if the old frames leak air, new glass alone won't help much — sealed frames make the biggest difference." },
      { q: "Are casement or sliding windows better for noise?", a: "Casement windows usually perform better because they close onto compression gaskets on all sides.", link: { href: "/products/saint-gobain-upvc-windows/casement-windows", label: "uPVC casement windows" } },
    ],
    keywords: ["soundproof windows kochi", "noise reduction windows kerala", "acoustic windows kochi", "soundproof upvc windows", "noise proof windows ernakulam"],
  },
  {
    slug: "double-glazed-windows",
    parent: UPVC,
    name: "Double Glazed Windows",
    shortName: "Double glazed windows",
    tagline: "Cooler rooms, quieter nights and less work for your AC.",
    summary:
      "uPVC and aluminium windows with double-glazed units (DGU) — two panes of Saint-Gobain glass with a sealed gap that cuts heat gain and noise in air-conditioned Kerala homes.",
    seoTitle: "Double Glazed Windows in Kochi & Kerala",
    seoDescription:
      "Double glazed windows in Kochi: two panes of Saint-Gobain glass with a sealed gap to cut heat, AC load and noise. uPVC or aluminium, across Kerala.",
    intro: [
      "A double-glazed unit (DGU) is two panes of glass separated by a spacer and sealed at the edges, with dry air or gas trapped between them. That still gap slows the flow of heat and sound through the window far more than a single pane can.",
      "In Kerala the aim is keeping heat out rather than in. Air-conditioned bedrooms, west-facing living rooms and large glass walls benefit most — especially when the outer pane is Saint-Gobain solar-control glass, which reflects much of the sun's heat before it reaches the gap. Double glazing also takes the edge off traffic noise.",
      "Both our Saint-Gobain uPVC windows and our system aluminium ranges accept double-glazed units — Dimore Vistaslim, for example, takes 18–24 mm DGUs. We'll tell you honestly where double glazing earns its cost and where single toughened or laminated glass is enough.",
    ],
    features: [
      { title: "Less heat gain", text: "The sealed gap slows heat moving from the hot outdoors into a cool room." },
      { title: "Less work for the AC", text: "Cooler glass means air-conditioners work less to hold the temperature." },
      { title: "Solar-control option", text: "Saint-Gobain solar-control glass on the outside for sunny walls." },
      { title: "Quieter rooms", text: "Two panes and a gap reduce outside noise, more so with different pane thicknesses." },
      { title: "Less outside fogging", text: "In cold AC rooms, single glass can fog on the outside in humid weather; DGUs largely stop this." },
      { title: "uPVC or aluminium", text: "Available in our uPVC and system aluminium window ranges." },
    ],
    bestFor: ["Air-conditioned bedrooms", "West-facing rooms", "Large glass walls & sliding doors", "Home offices", "Rooms near traffic", "High-floor apartments"],
    goodToKnow: [
      { title: "Not every window needs it", text: "Small windows in naturally ventilated rooms may not repay the extra cost — we prioritise the rooms where it matters." },
      { title: "Heavier glass", text: "DGUs are thicker and heavier, so frames and hardware must be designed for them. We specify systems that are." },
      { title: "The outer pane matters most", text: "On sunny walls, a solar-control coating on the outer pane does more to block the sun's heat than the gap itself." },
    ],
    specs: [
      { label: "Build", value: "Glass + spacer + glass, edge-sealed (e.g. 18–24 mm overall in Dimore Vistaslim)" },
      { label: "Outer pane", value: "Clear, tinted or Saint-Gobain solar-control" },
      { label: "Inner pane", value: "Clear, toughened or laminated" },
      { label: "Frames", value: "Saint-Gobain uPVC and system aluminium" },
    ],
    faqs: [
      { q: "Is double glazing worth it in Kerala's climate?", a: "It is most worthwhile in air-conditioned rooms, on west-facing walls and for large glass areas, where it reduces heat gain and noise. For small windows in naturally ventilated rooms, good single glass is often enough." },
      { q: "Does double glazing stop heat completely?", a: "No glass stops heat completely. Double glazing slows heat transfer, and a solar-control outer pane reflects much of the sun's heat — together they make rooms noticeably more comfortable." },
      { q: "Can double glazing go into my existing windows?", a: "Only if the frames are designed to hold the thicker unit. Usually DGUs are specified with new uPVC or system aluminium windows." },
      { q: "Why does my air-conditioned room's window fog up on the outside?", a: "In humid weather a cold single pane drops below the dew point of the outside air, so moisture condenses on it. Double glazing keeps the outer pane warmer and largely stops this." },
    ],
    keywords: ["double glazed windows kochi", "double glazing kerala", "dgu windows kochi", "insulated glass windows kerala", "heat reduction windows kochi"],
  },

  // ── Aluminium ──────────────────────────────────────────────────────────────
  {
    slug: "aluminium-sliding-doors",
    parent: "system-aluminium-windows",
    name: "Aluminium Sliding Doors",
    shortName: "Aluminium sliding doors",
    tagline: "Floor-to-ceiling glass that glides open.",
    summary:
      "Large system aluminium sliding doors from Dimore and Vitrum — slim interlocks, heavy-duty rollers and tall sashes for living rooms that open onto sit-outs, gardens and balconies.",
    seoTitle: "Aluminium Sliding Doors in Kochi & Kerala",
    seoDescription:
      "Aluminium sliding doors in Kochi: Dimore and Vitrum systems with slim interlocks, heavy-duty rollers and sashes up to 3 m tall. Free site visit.",
    intro: [
      "When a living room opens onto a sit-out, garden, pool or balcony, a large sliding door turns a wall into a window. Aluminium is the material of choice for the biggest panels: it is strong enough to carry heavy glass in slim frames, so you see more view and less frame.",
      "We supply system aluminium — complete, engineered sliding systems rather than frames cut from generic sections. Dimore's Vistaslim takes sashes up to 3000 mm high and 1800 mm wide, with single glazing from 6–12 mm or double glazing from 18–24 mm; its Elegante system is a slim-interlock sliding door; and heavy-duty rollers rated from 80 kg up to 350 kg keep big panels moving easily. For minimal architecture, Vitrum's Slimline series pushes the frame almost out of sight.",
      "Every door is surveyed for span, wind exposure and floor levels, glazed with safety glass, and installed with a drained track so monsoon water runs out rather than in.",
    ],
    features: [
      { title: "Tall, wide panels", text: "Sashes up to 3000 mm high and 1800 mm wide in Dimore Vistaslim." },
      { title: "Slim interlocks", text: "Narrow meeting stiles keep the view clean." },
      { title: "Heavy-duty rollers", text: "Roller capacities from 80 kg to 350 kg for large, heavy glass." },
      { title: "Double-glazing ready", text: "18–24 mm DGUs for heat and noise control." },
      { title: "Multipoint locking", text: "Single and multipoint locks for security." },
      { title: "No painting", text: "Powder-coated or anodised finishes need only routine cleaning." },
    ],
    bestFor: ["Living room to sit-out", "Garden & pool decks", "Apartment balconies", "Sea & backwater-facing homes", "Courtyards", "Showrooms & offices"],
    goodToKnow: [
      { title: "Plan the track early", text: "A flush floor track needs drainage planned before flooring is laid; a raised track suits renovations and exposed sit-outs." },
      { title: "Safety glass, and markings", text: "Large door panels are glazed with toughened or laminated glass, and markings at eye level stop people walking into clear glass." },
      { title: "Aluminium or uPVC?", text: "uPVC insulates better and suits most openings; aluminium wins for the largest, heaviest panels and the slimmest frames." },
    ],
    specs: [
      { label: "Dimore Vistaslim", value: "Sliding windows & doors · SGU 6–12 mm / DGU 18–24 mm · sash up to 3000 × 1800 mm" },
      { label: "Dimore Elegante", value: "Slim-interlock sliding door system" },
      { label: "Vitrum Slimline", value: "Minimal-sightline architectural systems" },
      { label: "Rollers", value: "Heavy-duty, from 80 kg up to 350 kg" },
    ],
    faqs: [
      { q: "How big can an aluminium sliding door be?", a: "With Dimore Vistaslim, individual sashes can be up to 3000 mm high and 1800 mm wide, and several sashes combine for wider openings. We confirm what's possible after measuring your opening." },
      { q: "Aluminium or uPVC sliding doors — which is better?", a: "uPVC insulates better and offers wood finishes; system aluminium carries bigger, heavier glass in slimmer frames. For very large openings aluminium is usually the better choice.", link: { href: "/blog/upvc-vs-aluminium-windows-kerala", label: "uPVC vs aluminium: full comparison" } },
      { q: "Will rain come in through the track?", a: "Quality sliding systems have drainage built into the track, and correct installation — level frames, sealed joints and a sill that falls outward — keeps monsoon water out." },
      { q: "Can aluminium sliding doors take double glazing?", a: "Yes. Dimore Vistaslim accepts 18–24 mm double-glazed units for heat and noise insulation." },
    ],
    keywords: ["aluminium sliding doors kochi", "aluminium sliding door kerala", "slim sliding doors kochi", "dimore sliding door", "large glass sliding doors kerala"],
  },

  // ── Glass railings ─────────────────────────────────────────────────────────
  {
    slug: "staircase-glass-railing",
    parent: "glass-handrails",
    name: "Staircase Glass Railings",
    shortName: "Staircase railings",
    tagline: "A staircase that feels open, bright and safe.",
    summary:
      "Frameless and post-supported glass balustrades for staircases, landings and double-height halls — toughened-laminated glass cut to your stair's angle, with stainless or concealed fixings.",
    seoTitle: "Staircase Glass Railing in Kochi & Kerala",
    seoDescription:
      "Staircase glass railings in Kochi: frameless and post-supported balustrades in toughened-laminated glass, cut to your stair's angle. Free site visit.",
    intro: [
      "Swapping a solid or grilled balustrade for glass is one of the quickest ways to make a staircase feel lighter. Daylight passes through, the stair becomes a feature instead of a barrier, and a double-height hall reads as one open space.",
      "Staircase glass is made to measure: each panel is cut to the angle of the flight before it is toughened, because toughened glass cannot be cut afterwards. It can sit in a concealed base channel, on side-mounted spigots or point fixings along the edge of the stair, or between slim posts — finished with a stainless steel or aluminium handrail you can grip.",
      "Our Kaloor villa film shows a double-height staircase lined with glass balustrades, and the Edappally film explains the glass and fixings piece by piece. For safety we use toughened-laminated glass, which stays in place even if a pane cracks.",
    ],
    features: [
      { title: "Cut to your stair", text: "Panels are made to the exact pitch of the flight before toughening." },
      { title: "Side or base fixing", text: "Side-mounted fixings keep treads clear; base channels give a frameless edge." },
      { title: "Laminated safety", text: "Toughened-laminated glass holds in place even if cracked." },
      { title: "A rail to hold", text: "Stainless steel or aluminium handrails where you need a firm grip." },
      { title: "More daylight", text: "Light from windows and skylights reaches the whole stairwell." },
      { title: "Easy to clean", text: "Smooth glass wipes clean — no balusters to dust." },
    ],
    bestFor: ["Villa staircases", "Double-height halls", "Landings & mezzanines", "Duplex apartments", "Office & showroom stairs", "Straight & dog-leg flights"],
    goodToKnow: [
      { title: "Measure after finishing", text: "Glass is cut before toughening, so we measure once the stair's flooring and cladding are complete." },
      { title: "Gaps and edges", text: "We plan panel gaps and the bottom clearance with small children in mind, and finish exposed edges smoothly." },
      { title: "Fingerprints happen", text: "Glass near hands shows marks — a top handrail keeps most hands off the glass." },
    ],
    specs: [
      { label: "Glass", value: "10–12 mm toughened, or laminated such as 6+6 mm / 8+8 mm" },
      { label: "Fixing", value: "Base channel · side-mounted spigots · point fixings · post & glass" },
      { label: "Handrail", value: "Stainless steel or aluminium" },
      { label: "Finishes", value: "Clear, extra-clear or frosted glass" },
    ],
    faqs: [
      { q: "Is a glass staircase railing safe for children?", a: "Yes, when it is designed properly: toughened-laminated glass that stays in place even if cracked, the right height, secure fixings and small gaps. We design each balustrade around who uses the stair." },
      { q: "Do I need a handrail on top of the glass?", a: "On stairs we recommend one: a rail you can grip makes climbing safer and protects the top edge of the glass. On some landings a frameless top edge is possible." },
      { q: "What thickness of glass is used for staircase railings?", a: "Common choices are 10–12 mm toughened glass or laminated combinations such as 6+6 mm or 8+8 mm, depending on the height and fixing system." },
      { q: "Can glass railing be fitted to an existing staircase?", a: "In most cases, yes. Side-mounted spigots or point fixings attach to the edge of the stair, so the treads don't need to be broken up. We check the structure during the site visit." },
    ],
    keywords: ["staircase glass railing kochi", "glass staircase railing kerala", "staircase glass handrail", "glass balustrade kochi", "stair glass railing price kerala"],
    film: "kaloor-villa-tilt-turn-windows",
    films: ["edappally-glass-handrail"],
  },
  {
    slug: "balcony-glass-railing",
    parent: "glass-handrails",
    name: "Balcony & Terrace Glass Railings",
    shortName: "Balcony & terrace railings",
    tagline: "Keep the view, lose the grills.",
    summary:
      "Frameless glass railings for balconies, rooftop terraces and pool decks — toughened-laminated glass with weather-proof stainless or aluminium hardware made for Kerala's rain.",
    seoTitle: "Balcony Glass Railing in Kochi & Kerala",
    seoDescription:
      "Balcony and terrace glass railings in Kochi: frameless toughened-laminated glass with weather-proof stainless or aluminium hardware. Free site visit.",
    intro: [
      "A balcony or rooftop terrace is about the view — and a solid parapet or steel grill blocks exactly what you came out to see. A glass railing keeps the edge safe while leaving the backwaters, garden or skyline in full view.",
      "Outdoors, a railing faces wind, sun and months of monsoon rain, so the details matter. We use toughened-laminated glass that holds in place even if a pane is damaged, base channels or spigots in stainless steel or powder-coated aluminium, and drainage so water never pools in the fixing channel. Near the sea we recommend higher-grade stainless hardware, which copes better with salty air.",
      "Our Edappally rooftop film walks through a frameless terrace railing piece by piece — the glass, the fixing profile and what makes it safe. We measure on site, confirm the height your building needs and install across Kochi and Kerala.",
    ],
    features: [
      { title: "Uninterrupted views", text: "Frameless glass instead of grills or high parapets." },
      { title: "Laminated safety", text: "Toughened-laminated glass stays in its frame even if damaged." },
      { title: "Weather-proof hardware", text: "Stainless steel or powder-coated aluminium fixings for outdoor use." },
      { title: "Drained channels", text: "Base channels are detailed so rainwater drains away." },
      { title: "Designed for exposure", text: "Glass thickness and fixings are chosen for the height and the wind." },
      { title: "Optional top rail", text: "A cap rail adds a hand-hold and protects the glass edge." },
    ],
    bestFor: ["Apartment balconies", "Rooftop terraces", "Sit-outs with a view", "Pool decks", "Sea & backwater-facing homes", "Hotel & resort balconies"],
    goodToKnow: [
      { title: "Height rules", text: "Balcony railings must meet the minimum height your building rules require — we confirm this before designing." },
      { title: "Cleaning outdoors", text: "Rain leaves water marks on outdoor glass; a quick wipe after the monsoon keeps it clear." },
      { title: "Check the slab edge", text: "The balcony edge must be strong enough to take the fixings — we inspect it during the site visit." },
    ],
    specs: [
      { label: "Glass", value: "Toughened-laminated (e.g. 6+6 mm or 8+8 mm) or 10–12 mm toughened" },
      { label: "Fixing", value: "Base channel · spigots · point fixings" },
      { label: "Hardware", value: "Stainless steel or powder-coated aluminium" },
      { label: "Options", value: "Clear, extra-clear or tinted glass · top cap rail" },
    ],
    faqs: [
      { q: "Are glass balcony railings safe?", a: "Yes. With toughened-laminated glass, the right thickness for the height and secure fixings into a sound slab edge, glass railings are as safe as traditional railings — and the glass stays in place even if it cracks." },
      { q: "Will a glass railing survive Kerala's monsoon?", a: "Yes. Glass isn't affected by rain, and stainless or powder-coated aluminium hardware with drained channels is made for outdoor use. Occasional cleaning is all it needs." },
      { q: "Can I install a glass railing on an existing apartment balcony?", a: "Usually, yes — spigot or base-channel fixings attach to the slab edge. In apartments, check with your association about changes to the façade first." },
      { q: "Clear or tinted glass for a balcony?", a: "Clear or extra-clear glass keeps the view; tinted or frosted glass adds privacy where neighbours are close." },
    ],
    keywords: ["balcony glass railing kochi", "terrace glass railing kerala", "frameless glass railing kochi", "glass balcony railing price", "glass railing ernakulam"],
    film: "edappally-glass-handrail",
    films: ["saint-gobain-shingles-glass-railing"],
  },

  // ── Glass ──────────────────────────────────────────────────────────────────
  {
    slug: "glass-partitions",
    parent: "toughened-glass",
    name: "Glass Partitions",
    shortName: "Glass partitions",
    tagline: "Divide the space, keep the light.",
    summary:
      "Frameless toughened glass partitions and glass doors for offices, clinics, showrooms and homes — clear, frosted or acoustic laminated, made to measure and installed across Kochi.",
    seoTitle: "Glass Partitions in Kochi — Office & Home",
    seoDescription:
      "Toughened glass partitions in Kochi for offices, cabins, clinics and homes: frameless, frosted or acoustic laminated, with matching glass doors.",
    intro: [
      "A glass partition separates a cabin, meeting room or kitchen without blocking the daylight or the sense of space. Teams stay visible, small offices feel larger, and rooms in the middle of a floor still get natural light.",
      "We build partitions from Saint-Gobain toughened glass — about four to five times stronger than ordinary glass of the same thickness, and breaking into small blunt granules if it ever breaks — held in slim floor and ceiling channels or fittings, with hinged or sliding glass doors to match.",
      "Need privacy? Frosted glass, or frosted bands at eye level, screen a cabin while keeping it bright. For meeting and consultation rooms, acoustic laminated glass keeps conversations private. We also add visibility markings so nobody walks into clear glass.",
    ],
    features: [
      { title: "Daylight everywhere", text: "Light reaches inner cabins and corridors." },
      { title: "Safety glass", text: "Toughened glass is 4–5× stronger and breaks into blunt granules." },
      { title: "Privacy options", text: "Frosted glass or frosted bands where you need screening." },
      { title: "Acoustic privacy", text: "Laminated acoustic glass for meeting and consultation rooms." },
      { title: "Matching doors", text: "Hinged or sliding glass doors that match the partition." },
      { title: "Fast and clean", text: "Far less mess and time than building and plastering walls." },
    ],
    bestFor: ["Office cabins & meeting rooms", "Clinics & consultation rooms", "Showrooms & reception areas", "Home offices", "Kitchen & dining dividers", "Gyms & studios"],
    goodToKnow: [
      { title: "Sound needs the right glass", text: "Ordinary toughened glass blocks less sound than a solid wall; choose acoustic laminated glass and sealed joints where privacy matters." },
      { title: "Mark the glass", text: "Clear full-height glass needs visible markings at eye level so people don't walk into it." },
      { title: "Measured once, made once", text: "Toughened glass can't be cut after it is made, so we measure on site after ceilings and flooring are finished." },
    ],
    specs: [
      { label: "Glass", value: "Toughened (typically 10–12 mm) or acoustic laminated" },
      { label: "Finishes", value: "Clear, extra-clear, tinted or frosted" },
      { label: "Doors", value: "Hinged or sliding glass doors" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "What thickness of glass is used for office partitions?", a: "Frameless partitions commonly use 10–12 mm toughened glass; the right thickness depends on the height and how the glass is fixed. We confirm it after measuring." },
      { q: "Do glass partitions block sound?", a: "Single toughened glass reduces some noise, but for confidential meeting or consultation rooms we recommend acoustic laminated glass and sealed joints." },
      { q: "Can glass partitions be moved later?", a: "Channel-fixed partitions can be dismantled, but each pane is made for its original size, so a new layout usually needs some new glass." },
      { q: "How do I get privacy in a glass cabin?", a: "Use frosted glass, frosted bands at eye level or tinted glass — they screen the view while letting the light through." },
    ],
    keywords: ["glass partition kochi", "office glass partition kochi", "toughened glass partition kerala", "frameless glass partition", "glass cabin partition ernakulam"],
  },
  {
    slug: "glass-skylights",
    parent: "laminated-glass",
    name: "Glass Skylights & Roof Glazing",
    shortName: "Glass skylights",
    tagline: "Daylight from above — without the heat or the leaks.",
    summary:
      "Glass skylights over stairwells, courtyards and sit-outs — toughened-laminated Saint-Gobain glass that stays in place if broken, with solar-control options and monsoon-proof detailing.",
    seoTitle: "Glass Skylights in Kochi & Kerala",
    seoDescription:
      "Glass skylights in Kochi for stairwells, courtyards and sit-outs: laminated Saint-Gobain safety glass, solar-control options and leak-proof detailing.",
    intro: [
      "A skylight brings daylight into the parts of a home windows can't reach — the stairwell, a central courtyard (nadumuttam), an inner corridor or a covered sit-out. In our Kollam film, a glass skylight above the stairwell carries light deep into the house before the tour opens onto the terrace.",
      "Glass overhead must be specified differently from glass in a wall. Laminated glass is the standard for overhead glazing because, if it is ever broken, the pieces stay bonded to the interlayer instead of falling into the room. We usually combine it with toughening for strength, and add Saint-Gobain solar-control glass so the skylight lets in light without turning the space below into an oven.",
      "Kerala's monsoon is the real test of a skylight. We give the glass enough slope to shed water, seal every joint and detail the frame so rainwater drains outside — a bright space that stays dry through the heaviest rain.",
    ],
    features: [
      { title: "Laminated safety", text: "Broken glass stays bonded to the interlayer, not on the floor below." },
      { title: "Solar control", text: "Coated or tinted glass cuts heat and glare from the midday sun." },
      { title: "UV protection", text: "Laminated interlayers block most UV, protecting floors and furniture." },
      { title: "Sloped & sealed", text: "Designed to shed heavy rain, with sealed and drained joints." },
      { title: "Made to measure", text: "From a narrow stairwell slot to a full courtyard roof." },
      { title: "Natural light", text: "Daylight reaches stairwells, corridors and inner rooms." },
    ],
    bestFor: ["Stairwells", "Courtyards & nadumuttam", "Covered sit-outs & pergolas", "Inner corridors", "Terrace staircase heads", "Atriums"],
    goodToKnow: [
      { title: "Heat is the big risk", text: "Plain clear glass overhead can make a room very hot. Solar-control or tinted laminated glass keeps it comfortable." },
      { title: "Plan cleaning access", text: "Leaves and dust settle on roof glass; plan safe access so it can be cleaned after the monsoon." },
      { title: "Slope matters", text: "Flat glass collects water and dirt; a fall lets rain wash the glass and drain away." },
    ],
    specs: [
      { label: "Glass", value: "Toughened-laminated Saint-Gobain glass" },
      { label: "Options", value: "Clear, tinted or solar-control" },
      { label: "Uses", value: "Stairwells, courtyards, canopies, pergolas" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "Which glass is best for a skylight?", a: "Laminated glass — usually toughened-laminated — because it stays in place if broken. On sunny roofs, add solar-control or tinted glass to limit heat." },
      { q: "Will a glass skylight leak in the monsoon?", a: "Not when it is designed and installed properly: enough slope to shed water, sealed joints and a frame that drains outside. Most skylight leaks come from poor detailing, not from the glass." },
      { q: "Does a skylight make the room hot?", a: "Plain clear glass can. Solar-control or tinted laminated glass lets daylight in while blocking much of the heat." },
      { q: "Can I add a skylight to an existing house?", a: "Often, yes — over a stairwell or courtyard — but the roof opening should be checked by a structural engineer before it is cut." },
    ],
    keywords: ["glass skylight kochi", "skylight glass kerala", "roof glass kochi", "laminated glass skylight", "courtyard glass roof kerala"],
    film: "kollam-glass-skylight-terrace",
  },

  // ── Cladding ───────────────────────────────────────────────────────────────
  {
    slug: "compound-wall-cladding",
    parent: "fundermax-hpl-cladding",
    name: "Gate & Compound Wall Cladding",
    shortName: "Gate & compound walls",
    tagline: "Timber-look walls that never need repainting.",
    summary:
      "Fundermax HPL panels for gate pillars, compound walls and entrance features — wood, stone and solid décors that shrug off Kerala's sun and rain without termites, rot or repainting.",
    seoTitle: "Compound Wall & Gate Cladding in Kerala",
    seoDescription:
      "Gate and compound wall cladding in Kerala with Fundermax HPL: wood-look and solid décors that resist rain, sun and termites. Installed from Kochi.",
    intro: [
      "The gate and compound wall are the first thing anyone sees of your home — and the first thing Kerala's weather attacks. Painted walls stain and fade after a monsoon or two, and real timber on a gate pillar invites termites and rot.",
      "Fundermax Max Compact Exterior is a dense, weather-resistant high-pressure laminate with the décor built into its surface. In our Kollam film, panels in a warm wood décor clad the gate and boundary walls: the look of timber, without warping, termites or repainting.",
      "We plan the panel layout on site, fix the panels securely and finish edges and joints cleanly. The same décor can continue onto the entrance porch, a feature wall or the façade, so the whole elevation feels designed as one.",
    ],
    features: [
      { title: "Wood look, no timber problems", text: "Real-wood décors with no termites, rot or polishing." },
      { title: "Weather & UV resistant", text: "Built for outdoor exposure to sun, rain and humidity." },
      { title: "132 décors", text: "Wood, stone, concrete and solid colours in several textures." },
      { title: "No painting", text: "Colour-stable surfaces that only need occasional washing." },
      { title: "Solid core", text: "Dense, robust panels that resist knocks at gate level." },
      { title: "One look, end to end", text: "Carry the same décor from gate to porch to façade." },
    ],
    bestFor: ["Gate pillars", "Compound & boundary walls", "Entrance porches", "Car porch walls", "Feature walls", "Nameplate & letterbox walls"],
    goodToKnow: [
      { title: "Fix damp first", text: "Damp or cracked walls should be repaired before cladding — cladding is a finish, not a cure for structural damp." },
      { title: "Choose décors in daylight", text: "View samples outdoors, next to your paint and stone colours, before deciding." },
      { title: "Think about the whole elevation", text: "Using the same décor on the gate, porch and façade ties the home together." },
    ],
    specs: [
      { label: "Material", value: "Fundermax Max Compact Exterior HPL" },
      { label: "Décors", value: "132 wood, stone, concrete and solid décors" },
      { label: "Uses", value: "Gate pillars, compound walls, porches, façades" },
      { label: "Service area", value: "Kochi, Ernakulam & all of Kerala" },
    ],
    faqs: [
      { q: "Is HPL cladding good for compound walls in Kerala?", a: "Yes. Exterior-grade HPL such as Fundermax Max Compact Exterior is designed for outdoor exposure to rain, humidity and UV, resists termites, and keeps its colour far longer than paint." },
      { q: "Does wood-look HPL need polishing?", a: "No. The décor is part of the panel surface, so it never needs polishing or painting — just an occasional wash with water." },
      { q: "Can you clad an existing gate pillar and wall?", a: "Yes, as long as the wall is sound and dry. We check the surface during the site visit and plan the fixing to suit it." },
      { q: "Can the same panels be used on the house façade?", a: "Yes — Fundermax exterior panels are used for façades, balconies and soffits too, so the gate, wall and house can share one décor." },
    ],
    keywords: ["compound wall cladding kerala", "gate pillar cladding kochi", "hpl compound wall cladding", "fundermax gate cladding", "boundary wall cladding kochi"],
    film: "kollam-fundermax-cladding",
    films: ["kollam-homeowner-review"],
  },
];

export const typesForProduct = (parent: string) => PRODUCT_TYPES.filter((t) => t.parent === parent);
export const getProductType = (parent: string, slug: string) => PRODUCT_TYPES.find((t) => t.parent === parent && t.slug === slug);
export const productTypeHref = (t: Pick<ProductType, "parent" | "slug">) => `/products/${t.parent}/${t.slug}`;
/** Portrait hero image: the project film's poster, or the parent product photo. */
export const productTypeImage = (t: ProductType) => (t.film ? filmMedia(t.film).poster : productImage(t.parent));
/** 1200×630 share card. */
export const productTypeOgImage = (t: ProductType) => (t.film ? filmMedia(t.film).og : productOgImage(t.parent));
