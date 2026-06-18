"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NopalAI global error]", error);
  }, [error]);

  return (
    <html lang="es-419">
      <body
        style={{
          display: "flex",
          minHeight: "100dvh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "1rem",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#fbf8f3",
          color: "#1c2620",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
          Algo salió mal
        </h1>
        <p style={{ color: "#6b7280", maxWidth: "24rem", margin: 0 }}>
          Ocurrió un error inesperado. Por favor, intenta de nuevo.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#3f5b45",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Intentar de nuevo
          </button>
          <a
            href="/"
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              background: "transparent",
              color: "#1c2620",
              cursor: "pointer",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Volver al inicio
          </a>
        </div>
      </body>
    </html>
  );
}
