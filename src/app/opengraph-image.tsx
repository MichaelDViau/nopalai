import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #fdfbf7 0%, #f4f0e8 55%, #e9efe2 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#3f5b45",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: "#1c2620" }}>
            Nopal<span style={{ color: "#3f5b45" }}>AI</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 76,
            fontWeight: 800,
            color: "#1c2620",
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          La IA que entiende Latinoamérica.
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#4b5852", maxWidth: 880 }}>
          Traducciones, tareas, contenido para redes y vida diaria — en tu español.
        </div>
      </div>
    ),
    { ...size },
  );
}
