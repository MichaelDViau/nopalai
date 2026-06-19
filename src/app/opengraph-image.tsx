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
            "linear-gradient(135deg, #ffffff 0%, #f1faf5 55%, #e3f4ec 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: SITE.brandColor,
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
          <div style={{ fontSize: 40, fontWeight: 700, color: "#16201c" }}>
            Nopal<span style={{ color: SITE.brandColor }}>AI</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 800,
            color: "#16201c",
            lineHeight: 1.05,
            maxWidth: 980,
          }}
        >
          La inteligencia artificial para Latinoamérica.
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#4b5852", maxWidth: 880 }}>
          Respuestas, aprendizaje, traducciones y contenido. Simple y accesible, en español e inglés.
        </div>
      </div>
    ),
    { ...size },
  );
}
