"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "es" | "en";

type Dictionary = typeof dictionaries.es;

const dictionaries = {
  es: {
    nav: { signIn: "Iniciar Sesión", chat: "Abrir chat", language: "English" },
    hero: {
      title: "La IA que entiende LATAM.",
      body: "Respuestas, traducciones, ayuda con tareas y contenido para redes. En español e inglés, al instante.",
      primary: "Comenzar gratis",
      secondary: "Ver demo",
      availability: "Agentes de IA Plus y Pro también disponibles",
    },
    pricing: {
      title: "Simple y transparente",
      body: "Empieza gratis. Mejora cuando quieras. Cancela cuando quieras.",
      popular: "Más popular",
      ctaFree: "Comenzar gratis",
      ctaPlus: "Obtener Plus",
      ctaPro: "Obtener Pro",
      freeDesc: "Para empezar gratis con agentes Plus y Pro disponibles.",
      plusDesc: "Para quienes usan la IA todos los días.",
      proDesc: "Para usuarios avanzados y trabajo intensivo.",
      perMonth: "MXN / mes",
      comparison: "Comparativa",
      fairUse: "Uso justo: Precios en la moneda de su país. Puede cancelar en cualquier momento.",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        ["¿Qué es NopalAI?", "La inteligencia artificial para Latinoamérica.\n\nAccede a respuestas de alta calidad, traducciones, apoyo académico, generación de contenido y asistencia profesional en segundos.\n\nToda la potencia de los mejores modelos de IA del mundo, adaptada a las necesidades de LATAM y disponible a un precio accesible para todos."],
        ["¿Es gratis?", "Empieza gratis, sin tarjeta de crédito.\n\nCuando necesites más potencia, desbloquea Plus o Pro y accede a agentes de IA avanzados diseñados para tareas más exigentes, generación de contenido, productividad y trabajo profesional.\n\nTecnología de primer nivel, con precios accesibles para Latinoamérica."],
        ["¿Puedo cancelar cuando quiera?", "Sí. Tienes total libertad para cancelar tu suscripción cuando lo desees.\n\nTu acceso permanecerá activo hasta el final del periodo de facturación ya pagado, sin penalizaciones ni cargos ocultos."],
      ],
    },
    cta: { title: "Prueba la IA que entiende LATAM", body: "Gratis para siempre. Sin tarjeta. Empieza en segundos.", prices: "Ver planes" },
    footer: { privacy: "Privacidad", terms: "Términos", made: "Hecho para LATAM" },
  },
  en: {
    nav: { signIn: "Sign in", chat: "Open chat", language: "Español" },
    hero: {
      title: "AI that understands LATAM.",
      body: "Answers, translations, homework help, and social content. In English and Spanish, instantly.",
      primary: "Start free",
      secondary: "View demo",
      availability: "Plus and Pro AI agents also available",
    },
    pricing: {
      title: "Simple and transparent",
      body: "Start free. Upgrade whenever you want. Cancel anytime.",
      popular: "Most popular",
      ctaFree: "Start free",
      ctaPlus: "Get Plus",
      ctaPro: "Get Pro",
      freeDesc: "For starting free with Plus and Pro agents available.",
      plusDesc: "For people who use AI every day.",
      proDesc: "For advanced users and intensive work.",
      perMonth: "MXN / month",
      comparison: "Comparison",
      fairUse: "Fair use: Prices in your country's currency. You can cancel at any time.",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        ["What is NopalAI?", "An artificial intelligence assistant created for LATAM. It helps with everyday answers, translations, schoolwork, and social media content."],
        ["Is it free?", "Yes. You can start free with no credit card. Plus and Pro AI agents are also available."],
        ["Can I cancel anytime?", "Yes. You can cancel your subscription at any time and keep access until the end of the paid period."],
      ],
    },
    cta: { title: "Try AI that understands LATAM", body: "Free forever. No card. Start in seconds.", prices: "View plans" },
    footer: { privacy: "Privacy", terms: "Terms", made: "Made for LATAM" },
  },
};

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Dictionary } | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem("nopalai-lang");
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem("nopalai-lang", next);
    document.documentElement.lang = next === "es" ? "es-MX" : "en";
  };

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
