// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export default function Image() {
  return new ImageResponse(
    <div style={{ background: "#03070b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: 64 }}>
      Precise Homes
    </div>
  );
}