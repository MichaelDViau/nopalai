import type { ModeId } from "@/lib/modes";

/**
 * SEO landing-page architecture.
 *
 * Each entry is a server-rendered, fully indexable page targeting a specific
 * LATAM Spanish keyword cluster (education, content, translation, business,
 * ChatGPT-alternative). Pages live at top-level SEO-friendly slugs
 * (e.g. /ia-para-estudiantes) and are the topical-authority backbone of the
 * "NopalAI = la IA para Latinoamérica" strategy.
 *
 * Adding a page = adding an entry here. The slug feeds `generateStaticParams`,
 * `generateMetadata`, the dynamic sitemap, the /soluciones hub and the footer's
 * internal-linking block, so there is a single source of truth.
 */

export type LandingCategoryId =
  | "educacion"
  | "contenido"
  | "traduccion"
  | "negocios"
  | "comparativa";

export interface LandingSection {
  h2: string;
  body: string;
  bullets?: string[];
}

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingPage {
  slug: string;
  category: LandingCategoryId;
  /** <title> / Open Graph title. Kept under ~60 chars where possible. */
  metaTitle: string;
  /** Meta description, ~150–160 chars. */
  metaDescription: string;
  /** Visible H1 — exactly one per page. */
  h1: string;
  /** Small category eyebrow rendered above the H1. */
  eyebrow: string;
  /** Lead paragraph under the H1. */
  intro: string;
  /** Target keywords (used for the keywords meta + topical context). */
  keywords: string[];
  /** Dashboard assistant the primary CTA deep-links to. */
  mode: ModeId;
  /** H2 content blocks (proper heading hierarchy). */
  sections: LandingSection[];
  /** Rendered as an accessible FAQ + emitted as FAQPage schema. */
  faqs: LandingFaq[];
  /** Slugs of related pages for the internal-linking block. */
  related: string[];
}

export const LANDING_CATEGORIES: Record<
  LandingCategoryId,
  { label: string; title: string; description: string }
> = {
  educacion: {
    label: "Educación",
    title: "IA para estudiar y aprender",
    description:
      "Herramientas de inteligencia artificial para hacer tareas, resumir textos, estudiar y aprender inglés.",
  },
  contenido: {
    label: "Creación de contenido",
    title: "IA para crear contenido",
    description:
      "Genera publicaciones, captions y guiones para Instagram, TikTok y más con inteligencia artificial.",
  },
  traduccion: {
    label: "Traducción",
    title: "Traductor con IA",
    description:
      "Traduce textos, documentos y trabajos académicos entre español e inglés con traducción natural por IA.",
  },
  negocios: {
    label: "Negocios",
    title: "IA para negocios y emprendedores",
    description:
      "Automatiza tareas, atiende clientes y haz crecer tu negocio o emprendimiento con inteligencia artificial.",
  },
  comparativa: {
    label: "Comparativa",
    title: "Alternativa a ChatGPT",
    description:
      "Descubre por qué NopalAI es la alternativa a ChatGPT pensada para Latinoamérica y el español.",
  },
};

const CTA_PRIMARY = "Comenzar gratis";
const CTA_SECONDARY = "Ver planes";

export const LANDING_PAGES: LandingPage[] = [
  // ── Educación ────────────────────────────────────────────────────────────
  {
    slug: "ia-para-estudiantes",
    category: "educacion",
    metaTitle: "IA para Estudiantes — Hacer Tareas y Estudiar con IA",
    metaDescription:
      "Usa la inteligencia artificial para hacer tareas, resolver ejercicios, estudiar y entender cualquier tema. IA para estudiantes en español. Empieza gratis.",
    h1: "IA para Estudiantes",
    eyebrow: "Educación",
    intro:
      "NopalAI es el asistente de inteligencia artificial para estudiantes de Latinoamérica. Resuelve ejercicios, explica temas paso a paso, corrige ensayos y te ayuda a estudiar para tus exámenes, en español y sin complicaciones.",
    keywords: [
      "hacer tareas con IA",
      "ayuda con tareas escolares",
      "resolver ejercicios con IA",
      "estudiar con inteligencia artificial",
      "IA para estudiantes",
    ],
    mode: "school",
    sections: [
      {
        h2: "Haz tus tareas y resuelve ejercicios con IA",
        body: "Pega tu ejercicio o pregunta y NopalAI te muestra la respuesta y, sobre todo, el procedimiento para que entiendas cómo se llega a ella. Funciona con matemáticas, física, química, historia, español e inglés.",
        bullets: [
          "Resuelve problemas de matemáticas paso a paso",
          "Explica conceptos difíciles con ejemplos sencillos",
          "Corrige y mejora tus ensayos y redacciones",
          "Adaptado al plan de estudios de Latinoamérica",
        ],
      },
      {
        h2: "Estudia más rápido y entiende mejor",
        body: "En lugar de solo darte la respuesta, NopalAI te ayuda a aprender: resume tus apuntes, crea guías de estudio, genera preguntas de práctica y explica el porqué de cada tema para que llegues seguro a tu examen.",
      },
      {
        h2: "Disponible en español, gratis y desde tu celular",
        body: "Empieza gratis, sin tarjeta de crédito, desde tu teléfono o computadora. NopalAI responde en español latinoamericano natural y cercano, pensado para estudiantes de secundaria, preparatoria y universidad.",
      },
    ],
    faqs: [
      {
        q: "¿NopalAI puede hacer mi tarea?",
        a: "Sí. NopalAI te ayuda a resolver ejercicios, escribir ensayos, hacer resúmenes y entender cualquier tema. Te muestra el procedimiento para que también aprendas y puedas defender tu trabajo.",
      },
      {
        q: "¿Sirve para matemáticas y ciencias?",
        a: "Sí. Resuelve problemas de matemáticas, física y química paso a paso, explicando cada parte del procedimiento con ejemplos claros.",
      },
      {
        q: "¿Es gratis para estudiantes?",
        a: "Puedes empezar gratis sin tarjeta de crédito. El plan gratuito incluye un número de mensajes diarios suficiente para el día a día, y puedes mejorar a Plus o Pro cuando necesites más.",
      },
      {
        q: "¿En qué idioma responde?",
        a: "Responde en español latinoamericano natural por defecto, y también puede ayudarte en inglés u otros idiomas cuando lo necesites.",
      },
    ],
    related: ["como-estudiar-con-ia", "ia-para-resumir-documentos", "ia-para-aprender-ingles"],
  },
  {
    slug: "ia-para-aprender-ingles",
    category: "educacion",
    metaTitle: "IA para Aprender Inglés — Practica Inglés con IA Gratis",
    metaDescription:
      "Aprende y practica inglés con inteligencia artificial: conversa, corrige tu gramática, aprende vocabulario y traduce. IA para aprender inglés en español. Gratis.",
    h1: "IA para Aprender Inglés",
    eyebrow: "Educación",
    intro:
      "Practica inglés a tu ritmo con NopalAI. Conversa en inglés, corrige tu gramática, aprende vocabulario y frases reales, y resuelve dudas en español. Tu tutor de inglés con inteligencia artificial, disponible las 24 horas.",
    keywords: [
      "aprender inglés con IA",
      "practicar inglés con inteligencia artificial",
      "tutor de inglés IA",
      "IA para aprender inglés",
      "traductor español inglés",
    ],
    mode: "translation",
    sections: [
      {
        h2: "Conversa y practica inglés sin miedo a equivocarte",
        body: "NopalAI es un compañero de práctica paciente. Mantén conversaciones en inglés sobre cualquier tema, recibe correcciones al instante y aprende cómo se dirían las cosas de forma natural, no literal.",
        bullets: [
          "Conversaciones de práctica a tu nivel",
          "Corrección de gramática y pronunciación escrita",
          "Vocabulario y frases que se usan de verdad",
          "Explicaciones de las dudas en español",
        ],
      },
      {
        h2: "Aprende con ejemplos de la vida real",
        body: "Aprende inglés para viajes, trabajo, entrevistas o estudios. NopalAI te da ejemplos prácticos, te enseña expresiones comunes y te explica los matices culturales entre el español y el inglés.",
      },
      {
        h2: "Traduce y aprende al mismo tiempo",
        body: "Traduce frases del español al inglés y entiende por qué se traducen así. NopalAI combina traducción natural con explicaciones, para que cada traducción sea también una lección.",
      },
    ],
    faqs: [
      {
        q: "¿Puedo practicar conversación en inglés?",
        a: "Sí. Puedes conversar en inglés sobre cualquier tema y NopalAI te responde, te corrige y te sugiere cómo mejorar tu forma de expresarte.",
      },
      {
        q: "¿Corrige mi gramática?",
        a: "Sí. NopalAI corrige tu gramática y ortografía en inglés y te explica el error en español para que no lo repitas.",
      },
      {
        q: "¿Sirve para cualquier nivel?",
        a: "Sí. Funciona desde nivel principiante hasta avanzado. Solo dile tu nivel y adaptará el vocabulario y la dificultad.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito y practicar todos los días dentro del límite del plan gratuito.",
      },
    ],
    related: ["traductor-ia-espanol-ingles", "ia-para-estudiantes", "como-estudiar-con-ia"],
  },
  {
    slug: "ia-para-resumir-documentos",
    category: "educacion",
    metaTitle: "IA para Resumir Documentos y Textos — Resúmenes con IA",
    metaDescription:
      "Resume documentos, textos largos, PDFs y artículos con inteligencia artificial. Obtén las ideas clave en segundos. Resumir textos con IA en español, gratis.",
    h1: "IA para Resumir Documentos",
    eyebrow: "Educación",
    intro:
      "Convierte textos largos en resúmenes claros con NopalAI. Pega un documento, artículo o tus apuntes y obtén las ideas principales, un resumen ejecutivo o puntos clave en segundos, en español.",
    keywords: [
      "resumir textos con IA",
      "resumir documentos con inteligencia artificial",
      "resumen automático IA",
      "resumir PDF con IA",
      "resumir artículos con IA",
    ],
    mode: "general",
    sections: [
      {
        h2: "Resúmenes claros en segundos",
        body: "Pega cualquier texto y elige el resumen que necesitas: un párrafo corto, una lista de puntos clave o un resumen detallado por secciones. Ideal para estudiar, preparar reuniones o entender informes rápido.",
        bullets: [
          "Resumen en puntos clave o en párrafo",
          "Extrae las ideas principales de textos largos",
          "Convierte apuntes en guías de estudio",
          "Ajusta la longitud y el tono del resumen",
        ],
      },
      {
        h2: "Perfecto para estudiar y trabajar",
        body: "Resume capítulos de libros, papers, contratos, correos largos o reportes. NopalAI mantiene la información importante y elimina lo que sobra, para que ahorres tiempo sin perder el contexto.",
      },
      {
        h2: "Pregunta sobre lo que resumiste",
        body: "Después de resumir, puedes hacer preguntas sobre el contenido, pedir aclaraciones o profundizar en una parte específica. Es como tener a alguien que ya leyó todo el documento por ti.",
      },
    ],
    faqs: [
      {
        q: "¿Qué tipo de textos puede resumir?",
        a: "Artículos, apuntes, capítulos, informes, contratos, correos y cualquier texto que pegues en el chat. Cuanto más claro sea el texto, mejor el resumen.",
      },
      {
        q: "¿Puedo elegir qué tan largo es el resumen?",
        a: "Sí. Puedes pedir un resumen de una línea, de tres puntos clave o uno más detallado por secciones, según lo que necesites.",
      },
      {
        q: "¿Resume en español e inglés?",
        a: "Sí. Puede resumir textos en español, inglés y otros idiomas, y darte el resumen en el idioma que prefieras.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito y resumir documentos dentro del límite del plan gratuito.",
      },
    ],
    related: ["ia-para-estudiantes", "como-estudiar-con-ia", "traduccion-de-documentos"],
  },
  {
    slug: "como-estudiar-con-ia",
    category: "educacion",
    metaTitle: "Cómo Estudiar con IA — Guía y Técnicas con Inteligencia Artificial",
    metaDescription:
      "Aprende cómo estudiar con inteligencia artificial: técnicas, ejemplos y herramientas para entender más rápido, repasar y preparar exámenes. Guía práctica en español.",
    h1: "Cómo Estudiar con IA",
    eyebrow: "Educación",
    intro:
      "La inteligencia artificial puede ser tu mejor herramienta de estudio si sabes usarla. Aquí te mostramos cómo estudiar con IA: técnicas concretas para entender más rápido, repasar mejor y llegar seguro a tus exámenes con NopalAI.",
    keywords: [
      "estudiar con inteligencia artificial",
      "cómo estudiar con IA",
      "técnicas de estudio con IA",
      "preparar exámenes con IA",
      "estudiar con IA",
    ],
    mode: "school",
    sections: [
      {
        h2: "1. Convierte tus apuntes en guías de estudio",
        body: "Pega tus apuntes o el temario y pide a NopalAI un resumen, un mapa de conceptos clave o una lista de lo más importante para el examen. Así sabes exactamente qué repasar.",
      },
      {
        h2: "2. Hazte preguntas de práctica",
        body: "Pide a NopalAI que genere preguntas tipo examen sobre el tema y que te las califique. Practicar con preguntas es una de las formas más efectivas de fijar lo que aprendes.",
        bullets: [
          "Pide preguntas de opción múltiple o abiertas",
          "Responde y recibe retroalimentación",
          "Repite los temas donde fallaste",
          "Simula el examen real con tiempo",
        ],
      },
      {
        h2: "3. Pide explicaciones hasta que lo entiendas",
        body: "Si algo no te queda claro, pídele que te lo explique de otra forma, con un ejemplo, una analogía o como si tuvieras 12 años. NopalAI tiene paciencia infinita y se adapta a tu nivel.",
      },
    ],
    faqs: [
      {
        q: "¿La IA me ayuda a aprender o solo me da la respuesta?",
        a: "Te ayuda a aprender. NopalAI está diseñado para explicar el procedimiento, el porqué y los conceptos, no solo dar respuestas, para que de verdad entiendas el tema.",
      },
      {
        q: "¿Puedo prepararme para un examen con IA?",
        a: "Sí. Puedes generar guías de estudio, preguntas de práctica, simulacros de examen y repasos personalizados según tus apuntes.",
      },
      {
        q: "¿Funciona para cualquier materia?",
        a: "Sí. Sirve para matemáticas, ciencias, historia, español, inglés y prácticamente cualquier materia de secundaria, preparatoria o universidad.",
      },
      {
        q: "¿Necesito pagar?",
        a: "Puedes empezar gratis sin tarjeta. Si estudias mucho cada día, los planes Plus o Pro te dan más capacidad.",
      },
    ],
    related: ["ia-para-estudiantes", "ia-para-resumir-documentos", "ia-para-aprender-ingles"],
  },

  // ── Creación de contenido ──────────────────────────────────────────────────
  {
    slug: "ia-para-redes-sociales",
    category: "contenido",
    metaTitle: "IA para Redes Sociales — Contenido para Instagram y TikTok",
    metaDescription:
      "Crea publicaciones para Instagram, contenido para TikTok, captions y hashtags con IA. Ideas y textos listos para publicar en redes sociales. En español, gratis.",
    h1: "IA para Redes Sociales",
    eyebrow: "Creación de contenido",
    intro:
      "Crea contenido para redes sociales en minutos con NopalAI. Genera ideas, captions, hooks, guiones para Reels y TikTok, y calendarios de contenido listos para publicar, con un tono fresco pensado para audiencias de Latinoamérica.",
    keywords: [
      "publicaciones para Instagram",
      "contenido para TikTok",
      "captions con IA",
      "IA para redes sociales",
      "hashtags con IA",
    ],
    mode: "content",
    sections: [
      {
        h2: "Captions, hooks y hashtags listos para publicar",
        body: "Dile a NopalAI de qué trata tu publicación y obtén captions con el tono de tu marca, ganchos que detienen el scroll y hashtags relevantes para llegar a más gente.",
        bullets: [
          "Captions para Instagram, Facebook y LinkedIn",
          "Guiones para Reels y videos de TikTok",
          "Hooks y títulos que generan clics",
          "Hashtags relevantes para tu nicho",
        ],
      },
      {
        h2: "Ideas y calendarios de contenido",
        body: "¿Sin ideas? NopalAI te da decenas de ideas de contenido para la semana y arma un calendario completo, con formatos sugeridos (Reel, carrusel, historia) y temas alineados a tu audiencia.",
      },
      {
        h2: "Pensado para creadores y negocios de LATAM",
        body: "El lenguaje, las tendencias y los ejemplos están pensados para el público latinoamericano. Ideal para creadores de contenido, community managers y dueños de pequeños negocios.",
      },
    ],
    faqs: [
      {
        q: "¿Para qué redes sirve?",
        a: "Para Instagram, TikTok, Facebook, YouTube, LinkedIn y WhatsApp Business. NopalAI conoce el formato y el lenguaje de cada plataforma.",
      },
      {
        q: "¿Genera guiones para Reels y TikTok?",
        a: "Sí. Te da guiones completos con hook, desarrollo y llamada a la acción, además de ideas de imagen o video.",
      },
      {
        q: "¿Puede mantener el tono de mi marca?",
        a: "Sí. Dile cómo es tu marca (cercana, formal, divertida) y adaptará todo el contenido a ese estilo.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito y crear contenido dentro del límite del plan gratuito.",
      },
    ],
    related: ["generador-de-contenido-con-ia", "como-crear-contenido-con-ia", "ia-para-emprendedores"],
  },
  {
    slug: "generador-de-contenido-con-ia",
    category: "contenido",
    metaTitle: "Generador de Contenido con IA — Textos y Publicaciones",
    metaDescription:
      "Genera textos, publicaciones, correos, anuncios y descripciones con un generador de contenido con IA. Crea contenido con inteligencia artificial en español. Gratis.",
    h1: "Generador de Contenido con IA",
    eyebrow: "Creación de contenido",
    intro:
      "NopalAI es tu generador de contenido con inteligencia artificial. Crea textos para redes, blogs, correos, anuncios, descripciones de producto y más, listos para usar y con el tono que necesitas, en español e inglés.",
    keywords: [
      "generador de textos IA",
      "crear contenido con IA",
      "generador de contenido con inteligencia artificial",
      "redactar con IA",
      "escribir textos con IA",
    ],
    mode: "content",
    sections: [
      {
        h2: "Genera cualquier tipo de texto",
        body: "Desde un caption hasta un artículo de blog o el copy de un anuncio. Solo describe lo que necesitas y NopalAI redacta varias opciones para que elijas y ajustes.",
        bullets: [
          "Publicaciones para redes y blogs",
          "Correos, anuncios y newsletters",
          "Descripciones de producto para tu tienda",
          "Eslóganes, títulos y llamadas a la acción",
        ],
      },
      {
        h2: "Ajusta el tono, el largo y el formato",
        body: "Pide el texto formal o casual, corto o detallado, en español o en inglés. Si no te convence, pide otra versión: puedes iterar hasta que quede exactamente como lo imaginabas.",
      },
      {
        h2: "Contenido original y en tu idioma",
        body: "NopalAI redacta contenido nuevo a partir de tus indicaciones, con un español latinoamericano natural. Tú mantienes el control: revisa, edita y publica.",
      },
    ],
    faqs: [
      {
        q: "¿Qué tipo de contenido puede generar?",
        a: "Publicaciones para redes, artículos de blog, correos, anuncios, descripciones de producto, guiones, eslóganes y prácticamente cualquier texto que necesites.",
      },
      {
        q: "¿El contenido es original?",
        a: "Sí. NopalAI redacta contenido nuevo a partir de tus instrucciones. Te recomendamos siempre revisar y darle tu toque personal antes de publicar.",
      },
      {
        q: "¿Puede escribir en inglés?",
        a: "Sí. Puede generar y traducir contenido en español, inglés y otros idiomas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Puedes empezar gratis sin tarjeta. Para generar contenido todos los días sin límites, los planes Plus y Pro son ideales.",
      },
    ],
    related: ["ia-para-redes-sociales", "como-crear-contenido-con-ia", "ia-para-negocios"],
  },
  {
    slug: "como-crear-contenido-con-ia",
    category: "contenido",
    metaTitle: "Cómo Crear Contenido con IA — Guía Paso a Paso",
    metaDescription:
      "Aprende cómo crear contenido con inteligencia artificial: ideas, guiones, captions y calendarios. Guía práctica para crear contenido con IA en español, paso a paso.",
    h1: "Cómo Crear Contenido con IA",
    eyebrow: "Creación de contenido",
    intro:
      "Crear contenido constante es difícil. Con inteligencia artificial puedes producir más y mejor en menos tiempo. Te mostramos cómo crear contenido con IA, paso a paso, usando NopalAI.",
    keywords: [
      "cómo crear contenido con IA",
      "crear contenido con inteligencia artificial",
      "ideas de contenido con IA",
      "contenido con IA paso a paso",
      "producir contenido con IA",
    ],
    mode: "content",
    sections: [
      {
        h2: "1. Genera ideas alineadas a tu audiencia",
        body: "Empieza pidiendo ideas de contenido sobre tu tema o nicho. NopalAI te da decenas de ángulos distintos para que nunca te quedes sin qué publicar.",
      },
      {
        h2: "2. Convierte la idea en una pieza completa",
        body: "Elige una idea y pide el guion, el caption o el texto completo. Pide variaciones, ajusta el tono y elige la que mejor funcione para tu marca.",
        bullets: [
          "Define el formato: Reel, carrusel, post o video",
          "Pide hook, desarrollo y llamada a la acción",
          "Añade hashtags y una idea visual",
          "Adapta el mismo contenido a varias plataformas",
        ],
      },
      {
        h2: "3. Organiza un calendario y mantén el ritmo",
        body: "Pide a NopalAI un calendario de contenido para la semana o el mes. Con un plan claro, publicar con constancia deja de ser un dolor de cabeza.",
      },
    ],
    faqs: [
      {
        q: "¿Necesito experiencia para crear contenido con IA?",
        a: "No. Solo describe lo que quieres en lenguaje natural y NopalAI hace el resto. Tú revisas, ajustas y publicas.",
      },
      {
        q: "¿Puedo reutilizar el mismo contenido en varias redes?",
        a: "Sí. Pide a NopalAI que adapte una misma idea al formato de Instagram, TikTok, Facebook o LinkedIn.",
      },
      {
        q: "¿Cómo evito que suene genérico?",
        a: "Dale contexto: tu marca, tu público, tu tono y ejemplos de lo que te gusta. Mientras más contexto, más personalizado el resultado.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito. Los planes Plus y Pro te dan más capacidad para producir a diario.",
      },
    ],
    related: ["ia-para-redes-sociales", "generador-de-contenido-con-ia", "ia-para-emprendedores"],
  },

  // ── Traducción ────────────────────────────────────────────────────────────
  {
    slug: "traductor-ia-espanol-ingles",
    category: "traduccion",
    metaTitle: "Traductor IA Español ↔ Inglés — Traducción Natural",
    metaDescription:
      "Traductor con IA español-inglés que traduce de forma natural, no literal. Respeta tono, contexto y modismos. Traduce textos y conversaciones gratis, en segundos.",
    h1: "Traductor IA Español ↔ Inglés",
    eyebrow: "Traducción",
    intro:
      "NopalAI traduce entre español e inglés de forma natural y fluida, no palabra por palabra. Respeta el tono, el contexto y los modismos, y te ofrece versiones formales o informales según lo que necesites.",
    keywords: [
      "traductor español inglés",
      "traducción con IA",
      "traductor IA español inglés",
      "traducir con inteligencia artificial",
      "traductor natural IA",
    ],
    mode: "translation",
    sections: [
      {
        h2: "Traducción natural, no literal",
        body: "Los traductores tradicionales traducen palabra por palabra. NopalAI entiende el contexto y traduce como lo diría un nativo, eligiendo el tono y las expresiones correctas para cada situación.",
        bullets: [
          "Versión formal e informal del mismo texto",
          "Respeta modismos y matices culturales",
          "Mantiene el formato (listas, emojis, saltos)",
          "Explica las traducciones cuando lo pides",
        ],
      },
      {
        h2: "Traduce en ambas direcciones",
        body: "Español a inglés e inglés a español, además de otros idiomas comunes como portugués, francés e italiano. Solo pega el texto y NopalAI detecta el idioma y lo traduce al otro.",
      },
      {
        h2: "Más que un traductor",
        body: "Pregúntale por qué se traduce así, pide alternativas, adapta el texto a un público específico o haz que suene más profesional. Es un traductor que también explica y aconseja.",
      },
    ],
    faqs: [
      {
        q: "¿En qué se diferencia de un traductor normal?",
        a: "NopalAI traduce con contexto: entiende la intención, el tono y los modismos, y traduce de forma natural en lugar de palabra por palabra. También puede explicarte y ofrecerte alternativas.",
      },
      {
        q: "¿Qué idiomas traduce?",
        a: "Principalmente español e inglés en ambas direcciones, y también idiomas comunes como portugués, francés e italiano.",
      },
      {
        q: "¿Puede dar una versión formal y otra informal?",
        a: "Sí. Puedes pedir ambas versiones y elegir la que mejor encaje según el contexto.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito y traducir dentro del límite del plan gratuito.",
      },
    ],
    related: ["traduccion-de-documentos", "traduccion-academica", "ia-para-aprender-ingles"],
  },
  {
    slug: "traduccion-de-documentos",
    category: "traduccion",
    metaTitle: "Traducción de Documentos con IA — Español e Inglés",
    metaDescription:
      "Traduce documentos, correos, contratos e informes con IA manteniendo el formato y el tono profesional. Traducir documentos con inteligencia artificial, en segundos.",
    h1: "Traducción de Documentos con IA",
    eyebrow: "Traducción",
    intro:
      "Traduce documentos completos con NopalAI sin perder el formato ni el sentido. Correos, contratos, informes, presentaciones o manuales: pega el contenido y obtén una traducción profesional y coherente.",
    keywords: [
      "traducir documentos con IA",
      "traducción de documentos",
      "traducir contratos con IA",
      "traductor de documentos español inglés",
      "traducción profesional con IA",
    ],
    mode: "translation",
    sections: [
      {
        h2: "Documentos largos sin perder el contexto",
        body: "NopalAI mantiene la coherencia en todo el documento: usa el mismo término para los mismos conceptos, respeta el formato y conserva el tono profesional de principio a fin.",
        bullets: [
          "Correos, informes y reportes",
          "Contratos y documentos formales",
          "Manuales, fichas técnicas y presentaciones",
          "Mantiene listas, títulos y estructura",
        ],
      },
      {
        h2: "Tono adecuado para cada documento",
        body: "Un contrato no se traduce igual que un correo casual. NopalAI ajusta el registro: formal y preciso para documentos legales o corporativos, cercano para comunicaciones internas.",
      },
      {
        h2: "Revisa, ajusta y pregunta",
        body: "Después de traducir puedes pedir cambios, aclarar términos específicos o adaptar el documento a un público concreto. Para documentos legales sensibles, recomendamos confirmar con un profesional.",
      },
    ],
    faqs: [
      {
        q: "¿Mantiene el formato del documento?",
        a: "Sí. NopalAI conserva la estructura, las listas, los títulos y el formato general del texto que pegas.",
      },
      {
        q: "¿Sirve para documentos legales o técnicos?",
        a: "Sí, ayuda a traducirlos con tono profesional y terminología coherente. Para documentos legales con valor oficial, recomendamos la revisión de un traductor o profesional certificado.",
      },
      {
        q: "¿Puedo traducir documentos largos?",
        a: "Sí. Puedes traducir por secciones para documentos muy largos y NopalAI mantiene la coherencia entre ellas.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Puedes empezar gratis sin tarjeta. Para traducir documentos largos con frecuencia, los planes Plus y Pro te dan más capacidad.",
      },
    ],
    related: ["traductor-ia-espanol-ingles", "traduccion-academica", "ia-para-resumir-documentos"],
  },
  {
    slug: "traduccion-academica",
    category: "traduccion",
    metaTitle: "Traducción Académica con IA — Papers, Tesis y Ensayos",
    metaDescription:
      "Traducción académica con IA para papers, tesis, ensayos y artículos científicos. Traduce con terminología precisa y tono académico entre español e inglés. Gratis.",
    h1: "Traducción Académica con IA",
    eyebrow: "Traducción",
    intro:
      "NopalAI te ayuda con la traducción académica de papers, tesis, ensayos y artículos científicos. Traduce con terminología precisa, tono formal y la coherencia que exige el trabajo académico, entre español e inglés.",
    keywords: [
      "traducción académica",
      "traductor profesional IA",
      "traducir papers con IA",
      "traducción de tesis",
      "traducir artículos científicos con IA",
    ],
    mode: "translation",
    sections: [
      {
        h2: "Terminología precisa y tono académico",
        body: "La traducción académica exige precisión. NopalAI respeta los términos técnicos, mantiene el registro formal y conserva la estructura de tu trabajo: resumen, introducción, metodología, resultados y conclusiones.",
        bullets: [
          "Papers y artículos científicos",
          "Tesis, ensayos y trabajos finales",
          "Abstracts y resúmenes para revistas",
          "Citas y referencias bien conservadas",
        ],
      },
      {
        h2: "Publica en inglés con confianza",
        body: "Si necesitas enviar tu trabajo a una revista o congreso en inglés, NopalAI te ayuda a traducir tu abstract o artículo con un inglés académico claro y profesional.",
      },
      {
        h2: "Aclara dudas y mejora la redacción",
        body: "Además de traducir, NopalAI puede mejorar la redacción, sugerir términos más adecuados y explicarte por qué eligió una traducción. Recuerda revisar siempre el resultado final.",
      },
    ],
    faqs: [
      {
        q: "¿Sirve para traducir mi tesis o paper?",
        a: "Sí. NopalAI traduce trabajos académicos con terminología precisa y tono formal, manteniendo la estructura y las citas.",
      },
      {
        q: "¿Respeta los términos técnicos?",
        a: "Sí. Mantiene la coherencia terminológica a lo largo del documento. Para campos muy especializados, conviene revisar los términos clave.",
      },
      {
        q: "¿Puede traducir mi abstract al inglés?",
        a: "Sí. Traduce abstracts y artículos completos a un inglés académico claro, listo para enviar a revistas o congresos.",
      },
      {
        q: "¿Es gratis?",
        a: "Puedes empezar gratis sin tarjeta de crédito. Los planes Plus y Pro te dan más capacidad para trabajos largos.",
      },
    ],
    related: ["traduccion-de-documentos", "traductor-ia-espanol-ingles", "ia-para-resumir-documentos"],
  },

  // ── Negocios ──────────────────────────────────────────────────────────────
  {
    slug: "ia-para-negocios",
    category: "negocios",
    metaTitle: "IA para Negocios y Empresas — Automatiza y Crece",
    metaDescription:
      "Usa la IA para tu negocio o empresa: atiende clientes, redacta correos, crea contenido, automatiza tareas y toma mejores decisiones. IA para negocios en español.",
    h1: "IA para Negocios",
    eyebrow: "Negocios",
    intro:
      "NopalAI es la inteligencia artificial para negocios y empresas de Latinoamérica. Ahorra tiempo automatizando tareas, mejora tu comunicación con clientes y haz crecer tu negocio sin contratar un equipo entero.",
    keywords: [
      "IA para negocios",
      "IA para empresas",
      "automatización con IA",
      "inteligencia artificial para empresas",
      "IA para PyMES",
    ],
    mode: "general",
    sections: [
      {
        h2: "Automatiza el trabajo repetitivo",
        body: "Redacta correos, responde mensajes de clientes, crea cotizaciones, resume reuniones y prepara reportes en minutos. NopalAI se encarga de lo repetitivo para que tú te enfoques en lo importante.",
        bullets: [
          "Correos y respuestas a clientes",
          "Cotizaciones, propuestas y reportes",
          "Resúmenes de reuniones y documentos",
          "Descripciones de producto y contenido",
        ],
      },
      {
        h2: "Atiende mejor a tus clientes",
        body: "Crea respuestas claras y profesionales para WhatsApp, correo o redes. Mejora tu comunicación, responde más rápido y mantén un tono consistente con tu marca en cada interacción.",
      },
      {
        h2: "Toma mejores decisiones",
        body: "Pide a NopalAI que analice opciones, haga lluvias de ideas, compare alternativas o estructure un plan. Ten un asesor disponible 24/7 para las decisiones del día a día de tu negocio.",
      },
    ],
    faqs: [
      {
        q: "¿Para qué tipo de negocios sirve?",
        a: "Para negocios de cualquier tamaño: desde emprendedores y PyMES hasta equipos de empresas más grandes que quieren ahorrar tiempo en tareas de comunicación y contenido.",
      },
      {
        q: "¿Puede atender a mis clientes?",
        a: "Te ayuda a redactar respuestas profesionales y rápidas para clientes por WhatsApp, correo o redes, con el tono de tu marca.",
      },
      {
        q: "¿Es seguro usarlo en mi empresa?",
        a: "Tus conversaciones se manejan de forma segura. Aun así, evita compartir datos confidenciales o personales sensibles innecesariamente.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Puedes empezar gratis sin tarjeta. Para uso diario e intensivo, los planes Plus y Pro ofrecen más capacidad y modelos premium.",
      },
    ],
    related: ["ia-para-emprendedores", "generador-de-contenido-con-ia", "ia-para-redes-sociales"],
  },
  {
    slug: "ia-para-emprendedores",
    category: "negocios",
    metaTitle: "IA para Emprendedores — Lanza y Haz Crecer tu Proyecto",
    metaDescription:
      "La IA para emprendedores que te ayuda a validar ideas, crear contenido, redactar y automatizar tareas para lanzar y hacer crecer tu proyecto. En español, gratis.",
    h1: "IA para Emprendedores",
    eyebrow: "Negocios",
    intro:
      "Emprender significa hacer de todo con poco. NopalAI es el equipo que aún no puedes contratar: te ayuda a validar ideas, crear tu marca, redactar, vender y automatizar tareas para que tu proyecto despegue.",
    keywords: [
      "IA para emprendedores",
      "inteligencia artificial para emprender",
      "IA para startups",
      "herramientas IA para emprendedores",
      "emprender con IA",
    ],
    mode: "general",
    sections: [
      {
        h2: "De la idea al lanzamiento",
        body: "Valida tu idea, define a tu cliente ideal, encuentra un nombre, crea tu propuesta de valor y arma un plan de acción. NopalAI te acompaña en cada paso de los primeros días de tu proyecto.",
        bullets: [
          "Nombres, eslóganes e identidad de marca",
          "Propuesta de valor y pitch para inversores",
          "Plan de marketing y de contenido",
          "Correos de ventas y mensajes para clientes",
        ],
      },
      {
        h2: "Haz el trabajo de varios, tú solo",
        body: "Sin presupuesto para un equipo grande, NopalAI te ayuda con marketing, ventas, atención a clientes y operaciones. Es como tener a un asistente que nunca se cansa.",
      },
      {
        h2: "Pensado para el mercado latinoamericano",
        body: "Ejemplos, costumbres, plataformas y lenguaje pensados para emprender en Latinoamérica. Desde un puesto local hasta una startup digital, NopalAI habla tu idioma.",
      },
    ],
    faqs: [
      {
        q: "¿Cómo me ayuda a empezar mi negocio?",
        a: "Te ayuda a validar tu idea, definir tu cliente, crear tu marca, redactar tu contenido y armar tu plan de marketing y ventas, todo desde un solo lugar.",
      },
      {
        q: "¿Sirve si no tengo experiencia en marketing?",
        a: "Sí. NopalAI te guía con lenguaje sencillo y ejemplos concretos, sin que necesites conocimientos previos.",
      },
      {
        q: "¿Es realista para un presupuesto pequeño?",
        a: "Totalmente. Está pensado para emprendedores y PyMES: piensa en presupuestos reales y te da opciones accesibles.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Puedes empezar gratis sin tarjeta de crédito. Cuando tu proyecto crezca, los planes Plus y Pro te dan más capacidad.",
      },
    ],
    related: ["ia-para-negocios", "ia-para-redes-sociales", "generador-de-contenido-con-ia"],
  },

  // ── Alternativa a ChatGPT ──────────────────────────────────────────────────
  {
    slug: "alternativa-a-chatgpt",
    category: "comparativa",
    metaTitle: "Alternativa a ChatGPT en Español para Latinoamérica",
    metaDescription:
      "NopalAI es la alternativa a ChatGPT pensada para Latinoamérica: responde en español natural, entiende tu contexto y precios en tu moneda. Pruébala gratis.",
    h1: "La Alternativa a ChatGPT para Latinoamérica",
    eyebrow: "Comparativa",
    intro:
      "¿Buscas una alternativa a ChatGPT en español? NopalAI es la inteligencia artificial diseñada para Latinoamérica: responde en español latinoamericano natural, entiende tu contexto cultural y tiene precios pensados para la región.",
    keywords: [
      "alternativa a ChatGPT",
      "mejor que ChatGPT",
      "ChatGPT en español",
      "IA para Latinoamérica",
      "alternativa ChatGPT español",
    ],
    mode: "general",
    sections: [
      {
        h2: "Pensada para Latinoamérica, no traducida",
        body: "NopalAI no es una herramienta en inglés traducida al español. Está diseñada para LATAM: usa modismos, costumbres, instituciones y contexto local para darte respuestas que de verdad encajan con tu realidad.",
        bullets: [
          "Responde en español latinoamericano natural",
          "Entiende el contexto y la cultura de la región",
          "Asistentes para estudiar, traducir y crear contenido",
          "Funciona perfecto desde el celular",
        ],
      },
      {
        h2: "Precios en tu moneda y un plan gratis",
        body: "Empieza gratis, sin tarjeta de crédito. Y cuando quieras más, los planes Plus y Pro tienen precios pensados para Latinoamérica, con métodos de pago locales como tarjetas, PayPal, Mercado Pago y OXXO.",
      },
      {
        h2: "Todo lo que esperas, en un solo lugar",
        body: "Respuestas, traducción, ayuda con tareas, creación de contenido y asistencia para tu negocio. NopalAI reúne lo que necesitas a diario en una sola plataforma simple y rápida, en español e inglés.",
      },
    ],
    faqs: [
      {
        q: "¿En qué se diferencia NopalAI de ChatGPT?",
        a: "NopalAI está diseñado específicamente para Latinoamérica: responde en español latinoamericano natural, entiende el contexto cultural de la región, ofrece asistentes especializados y tiene precios y métodos de pago locales.",
      },
      {
        q: "¿Es gratis como ChatGPT?",
        a: "Sí. Puedes empezar gratis sin tarjeta de crédito. Los planes Plus y Pro están disponibles con precios pensados para la región.",
      },
      {
        q: "¿Responde igual de bien en español?",
        a: "Sí. NopalAI está optimizado para el español latinoamericano, por lo que sus respuestas suelen sentirse más naturales y cercanas para usuarios de LATAM.",
      },
      {
        q: "¿Funciona en mi celular?",
        a: "Sí. NopalAI funciona perfectamente en teléfonos, tabletas y computadoras, desde el navegador, sin instalar nada.",
      },
    ],
    related: ["ia-para-estudiantes", "traductor-ia-espanol-ingles", "ia-para-negocios"],
  },
];

/** Fast slug → page lookup. */
const PAGE_BY_SLUG = new Map(LANDING_PAGES.map((p) => [p.slug, p]));

export function getLandingPage(slug: string): LandingPage | undefined {
  return PAGE_BY_SLUG.get(slug);
}

export function getRelatedPages(page: LandingPage): LandingPage[] {
  return page.related
    .map((slug) => PAGE_BY_SLUG.get(slug))
    .filter((p): p is LandingPage => Boolean(p));
}

export const LANDING_SLUGS = LANDING_PAGES.map((p) => p.slug);

/**
 * Curated subset surfaced in the site footer for cross-page internal linking.
 * One high-intent page per topic cluster keeps the footer compact while giving
 * crawlers a path to the rest (each links onward to its related pages).
 */
export const FEATURED_LANDING_SLUGS = [
  "ia-para-estudiantes",
  "traductor-ia-espanol-ingles",
  "ia-para-redes-sociales",
  "ia-para-negocios",
  "alternativa-a-chatgpt",
] as const;

export { CTA_PRIMARY, CTA_SECONDARY };
