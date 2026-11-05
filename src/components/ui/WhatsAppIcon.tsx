import { SpriteIcon } from "./IconSprite";

// WhatsApp glyph (simple-icons, CC0) — referenced from the sprite in the root layout.
export default function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <SpriteIcon id="ph-wa" className={className} />;
}
