"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "es" | "en";

type Dictionary = typeof dictionaries.es;

const dictionaries = {
  es: {
    nav: { signIn: "Entrar", chat: "Abrir chat", language: "English" },
    hero: {
      badge: "IA para LATAM",
      title: "La IA que entiende LATAM.",
      body: "Respuestas, traducciones, ayuda con tareas y contenido para redes. En español e inglés, al instante.",
      primary: "Comenzar gratis",
      secondary: "Ver demo",
      note: "Gratis · Sin tarjeta · 20 mensajes al día",
    },
    pricing: {
      title: "Simple y transparente",
      body: "Empieza gratis. Mejora cuando quieras. Cancela cuando quieras.",
      popular: "Más popular",
      ctaFree: "Comenzar gratis",
      ctaPlus: "Obtener Plus",
      ctaPro: "Obtener Pro",
      freeDesc: "Para empezar a explorar la IA para LATAM.",
      plusDesc: "Para quienes usan la IA todos los días.",
      proDesc: "Para usuarios avanzados y trabajo intensivo.",
      perMonth: "MXN / mes",
      comparison: "Comparativa",
      fairUse: "Uso justo: Precios en la moneda de su país. Puede cancelar en cualquier momento.",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        ["¿Qué es NopalAI?", "Un asistente de inteligencia artificial creado para LATAM. Te ayuda con respuestas del día a día, traducciones, tareas escolares y contenido para redes sociales."],
        ["¿Es gratis?", "Sí. El plan Gratis te da 20 mensajes al día, sin tarjeta de crédito. También puedes elegir Plus por 69 MXN al mes o Pro por 199 MXN al mes."],
        ["¿Puedo cancelar cuando quiera?", "Claro. Puedes cancelar tu suscripción en cualquier momento y seguirás teniendo acceso hasta el final del periodo pagado."],
      ],
    },
    cta: { title: "Prueba la IA que entiende LATAM", body: "Gratis para siempre. Sin tarjeta. Empieza en segundos.", prices: "Ver planes" },
    footer: { privacy: "Privacidad", terms: "Términos", made: "Hecho para LATAM" },
  },
  en: {
    nav: { signIn: "Sign in", chat: "Open chat", language: "Español" },
    hero: {
      badge: "AI for LATAM",
      title: "AI that understands LATAM.",
      body: "Answers, translations, homework help, and social content. In English and Spanish, instantly.",
      primary: "Start free",
      secondary: "View demo",
      note: "Free · No card · 20 messages per day",
    },
    pricing: {
      title: "Simple and transparent",
      body: "Start free. Upgrade whenever you want. Cancel anytime.",
      popular: "Most popular",
      ctaFree: "Start free",
      ctaPlus: "Get Plus",
      ctaPro: "Get Pro",
      freeDesc: "For starting with AI for LATAM.",
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
        ["Is it free?", "Yes. The Free plan gives you 20 messages per day with no credit card. You can also choose Plus for 69 MXN/month or Pro for 199 MXN/month."],
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
