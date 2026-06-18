/**
 * Centralised translations for the entire platform (marketing + app + legal).
 *
 * `es` is the source of truth for the shape; `en` must match it exactly, which
 * is enforced by the `typeof es` annotation. Components read the active
 * dictionary through the `useLanguage()` hook; server code (metadata,
 * structured data) imports `DICT` directly.
 */

export type Lang = "es" | "en";

export const LANGS: Lang[] = ["es", "en"];

/** BCP-47 tag for the <html lang> attribute. */
export const HTML_LANG: Record<Lang, string> = {
  es: "es",
  en: "en",
};

const es = {
  tagline: "La IA que entiende LATAM.",

  meta: {
    description:
      "NopalAI es el asistente de inteligencia artificial creado para LATAM. Entiende el español de la región y te ayuda con respuestas, traducciones, tareas escolares y contenido para redes sociales y marketing.",
    pricingTitle: "Precios — Gratis, Plus y Pro",
    pricingDescription:
      "Empieza gratis. Mejora a Plus (69 MXN) o Pro (199 MXN) al mes: más mensajes, sin anuncios, respuestas más rápidas y modelos premium.",
    signInTitle: "Iniciar sesión",
    signInDescription: "Inicia sesión en NopalAI, la IA que entiende LATAM.",
    signUpTitle: "Crear cuenta gratis",
    signUpDescription:
      "Crea tu cuenta gratis en NopalAI y empieza a usar la IA que entiende LATAM.",
    termsTitle: "Términos y Condiciones",
    privacyTitle: "Aviso de Privacidad",
  },

  nav: {
    home: "Inicio",
    signIn: "Entrar",
    openChat: "Abrir chat",
    theme: "Cambiar tema",
    language: "Cambiar idioma",
  },

  hero: {
    titleLead: "La IA que entiende",
    titleHighlight: "LATAM",
    subtitle:
      "Respuestas, traducciones, ayuda con tareas y contenido para redes. En español natural, al instante.",
    ctaPrimary: "Comenzar gratis",
    ctaSecondary: "Ver demo",
    note: "Gratis · Sin tarjeta · Empieza en segundos",
  },

  assistants: {
    title: "Un experto para cada cosa",
    subtitle:
      "Elige un asistente y empieza a escribir. Cada uno está afinado para lo suyo.",
  },

  pricing: {
    title: "Simple y transparente",
    subtitle: "Empieza gratis. Mejora cuando quieras. Cancela cuando quieras.",
    perMonth: "MXN / mes",
    popular: "Más popular",
    fairUse:
      "Uso justo: Precios en la moneda de su país. Puede cancelar en cualquier momento.",
    plans: [
      {
        id: "free",
        name: "Gratis",
        desc: "Para empezar a explorar la IA.",
        price: "$0",
        cta: "Comenzar gratis",
        action: "signup" as "signup" | "upgrade",
        popular: false,
        features: [
          "Asistentes de IA especializados",
          "Historial de conversaciones",
          "Modelo estándar",
          "Uso diario gratuito",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        desc: "Para el día a día, sin interrupciones.",
        price: "$69",
        cta: "Obtener Plus",
        action: "upgrade" as "signup" | "upgrade",
        popular: false,
        features: [
          "Todo lo de Gratis",
          "Más mensajes al día",
          "Sin anuncios",
          "Respuestas más rápidas",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        desc: "Para quienes exprimen la IA todos los días.",
        price: "$199",
        cta: "Obtener Pro",
        action: "upgrade" as "signup" | "upgrade",
        popular: true,
        features: [
          "Todo lo de Plus",
          "Uso prácticamente ilimitado",
          "Modelos premium (Qwen 72B)",
          "Acceso prioritario",
          "Soporte preferente",
        ],
      },
    ],
  },

  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Qué es NopalAI?",
        a: "Un asistente de inteligencia artificial creado para LATAM. Entiende el español de la región y te ayuda con respuestas del día a día, traducciones, tareas escolares y contenido para redes sociales.",
      },
      {
        q: "¿Es gratis?",
        a: "Sí. El plan Gratis te permite empezar sin tarjeta de crédito. Si necesitas más, tienes los planes Plus (69 MXN) y Pro (199 MXN) al mes.",
      },
      {
        q: "¿Puedo cancelar cuando quiera?",
        a: "Claro. Puedes cancelar tu suscripción en cualquier momento y seguirás teniendo acceso hasta el final del periodo pagado.",
      },
    ],
  },

  cta: {
    title: "Prueba la IA que entiende LATAM",
    subtitle: "Gratis para siempre. Sin tarjeta. Empieza en segundos.",
    primary: "Comenzar gratis",
    secondary: "Ver precios",
  },

  footer: {
    privacy: "Privacidad",
    terms: "Términos",
    madeFor: "Hecho para LATAM 🌎",
  },

  chatPreview: {
    tabs: {
      general: {
        q: "Ayúdame a redactar un correo formal para pedir una cotización.",
        a: "Claro. Asunto: Solicitud de cotización. \"Estimado/a [Nombre]: Le escribo para solicitar una cotización de [producto/servicio], con entrega en [lugar/fecha]. Quedo atento/a a su respuesta. Saludos, [Tu nombre].\" ¿Quieres que lo haga más breve o más detallado?",
      },
      translation: {
        q: "Traduce 'la cuenta, por favor' al inglés para un turista.",
        a: "\"The check, please.\" Y para sonar más natural: \"Could we get the check, please?\" ¿Te preparo más frases para atender turistas?",
      },
      school: {
        q: "Explícame el teorema de Pitágoras con un ejemplo.",
        a: "En un triángulo rectángulo, a² + b² = c², donde c es la hipotenusa. Ejemplo: si a = 3 y b = 4, entonces c = √(9 + 16) = √25 = 5. ¿Quieres que lo resolvamos con tus propios números?",
      },
      content: {
        q: "Dame una idea de contenido para Instagram esta semana.",
        a: "Reel: \"3 errores que cometes al [tu tema]\". Hook: \"El #2 te está costando clientes.\" Termina con un CTA: \"Guarda este Reel para no olvidarlo.\" ¿Te armo el guion completo?",
      },
    },
  },

  modes: {
    general: {
      name: "Asistente General",
      short: "General",
      blurb: "Tu copiloto para cualquier pregunta, texto o idea.",
      suggestions: [
        "Escríbeme un mensaje de WhatsApp para felicitar a un cliente",
        "Ayúdame a redactar un correo formal para pedir una cotización",
        "Dame ideas para organizar mejor mi semana",
        "Resúmeme este texto en 3 puntos clave",
      ],
    },
    translation: {
      name: "Traducción",
      short: "Traducción",
      blurb: "Traducciones naturales entre español, inglés y más.",
      suggestions: [
        "Traduce 'la cuenta, por favor' al inglés para un turista",
        "Traduce este correo al inglés de forma formal",
        "¿Cómo se dice 'estoy en la chamba' en inglés natural?",
        "Tradúceme este mensaje del inglés al español",
      ],
    },
    school: {
      name: "Escuela y Tareas",
      short: "Escuela",
      blurb: "Ayuda con tareas y estudio, explicada paso a paso.",
      suggestions: [
        "Explícame el teorema de Pitágoras con un ejemplo sencillo",
        "Ayúdame a hacer un resumen de la Revolución Industrial",
        "¿Cómo resuelvo una ecuación de segundo grado?",
        "Corrige y mejora mi ensayo",
      ],
    },
    content: {
      name: "Contenido y Marketing",
      short: "Contenido",
      blurb: "Ideas, copys y guiones para redes y marketing.",
      suggestions: [
        "Dame 5 ideas de contenido para Instagram esta semana",
        "Escribe un guion para un Reel de TikTok de 30 segundos",
        "Crea captions con hashtags para mi negocio",
        "Hazme un calendario de contenido para 7 días",
      ],
    },
  },

  dashboard: {
    home: "Inicio",
    newChat: "Nuevo chat",
    new: "Nuevo",
    untitled: "Nuevo chat",
    emptyConversations: "Tus conversaciones aparecerán aquí.",
    myAccount: "Mi cuenta",
    rename: "Renombrar",
    delete: "Eliminar",
    renameTitle: "Renombrar chat",
    chatNamePlaceholder: "Nombre del chat",
    cancel: "Cancelar",
    save: "Guardar",
    deleteTitle: "¿Eliminar este chat?",
    deleteDesc: (name: string) =>
      `Se eliminará “${name}” y todos sus mensajes. Esta acción no se puede deshacer.`,
    chatOptions: "Opciones del chat",
    openMenu: "Abrir menú",
    chatsMenu: "Menú de chats",
    pin: "Fijar barra lateral",
    unpin: "Soltar barra lateral",
    copy: "Copiar",
    copied: "Copiado",
    copyAnswer: "Copiar respuesta",
    composer: {
      placeholder: (name: string) => `Pregúntale a ${name}…`,
      defaultPlaceholder: "Escribe tu mensaje…",
      send: "Enviar",
      stop: "Detener",
      disclaimer:
        "NopalAI puede cometer errores. Verifica la información importante.",
    },
    emptyState: {
      title: "¿En qué te ayudo hoy?",
      subtitle: "Elige un asistente y empieza a escribir.",
      tryWith: "Prueba con",
      assistantType: "Tipo de asistente",
    },
    usage: {
      activeTitle: "Suscripción activa",
      activeDesc: "Mensajes ilimitados y respuestas más rápidas.",
      today: "Uso de hoy",
      upgrade: "Mejorar plan",
    },
    ad: {
      label: "Publicidad",
      remove: "Quita los anuncios con Plus",
    },
    upgrade: {
      limitTitle: "Llegaste a tu límite de hoy",
      manualTitle: "Desbloquea más con NopalAI",
      limitDesc:
        "Usaste tus mensajes gratuitos de hoy. Mejora tu plan y sigue sin interrupciones.",
      manualDesc:
        "Lleva tu productividad al siguiente nivel desde 69 MXN al mes.",
      cta: "Mejorar plan",
      secure: "Cancela cuando quieras · Pago seguro con Stripe",
    },
    toasts: {
      welcome: "¡Bienvenido! 🎉 Disfruta sin límites.",
      genError: "No se pudo generar la respuesta. Intenta de nuevo.",
      createChatError: "No se pudo crear el chat.",
      openChatError: "No se pudo abrir el chat.",
      renameError: "No se pudo renombrar.",
      deleteError: "No se pudo eliminar.",
    },
  },

  auth: {
    noAccount: "¿No tienes cuenta?",
    startFree: "Comienza gratis",
    haveAccount: "¿Ya tienes cuenta?",
    signIn: "Inicia sesión",
  },

  notFound: {
    message: "Esta página se perdió en el camino.",
    back: "Volver al inicio",
  },

  legal: {
    updated: "Última actualización: junio de 2026",
    terms: {
      title: "Términos y Condiciones",
      sections: [
        {
          h: "1. Aceptación",
          p: "Al usar NopalAI aceptas estos términos. Si no estás de acuerdo, por favor no utilices el servicio.",
        },
        {
          h: "2. El servicio",
          p: "NopalAI es un asistente de inteligencia artificial. Las respuestas se generan automáticamente y pueden contener errores. No constituyen asesoría legal, fiscal, médica ni profesional.",
        },
        {
          h: "3. Cuentas y uso aceptable",
          p: "Eres responsable de la actividad de tu cuenta. No debes usar el servicio para actividades ilícitas, dañinas o que violen derechos de terceros.",
        },
        {
          h: "4. Planes y pagos",
          p: "El plan Gratis te permite empezar sin costo. Los planes Plus (69 MXN) y Pro (199 MXN) al mes incluyen mayores límites y funciones. Los pagos se procesan con Stripe y puedes cancelar en cualquier momento; el acceso continúa hasta el final del periodo pagado.",
        },
        {
          h: "5. Limitación de responsabilidad",
          p: "El servicio se ofrece “tal cual”. NopalAI no será responsable por decisiones tomadas con base en las respuestas generadas.",
        },
        {
          h: "6. Contacto",
          p: "Dudas sobre estos términos: hola@nopalai.mx.",
        },
      ],
    },
    privacy: {
      title: "Aviso de Privacidad",
      sections: [
        {
          h: "1. Responsable",
          p: "NopalAI es responsable del tratamiento de tus datos personales, de conformidad con la legislación de protección de datos personales aplicable en tu país.",
        },
        {
          h: "2. Datos que recopilamos",
          p: "Recopilamos tu correo electrónico y nombre al crear una cuenta, así como las conversaciones que generas con el asistente para brindarte el servicio y mejorar tu experiencia.",
        },
        {
          h: "3. Uso de la información",
          p: "Usamos tus datos para autenticarte, prestar el servicio, procesar pagos a través de Stripe y entender el uso del producto mediante analíticas agregadas. No vendemos tus datos personales.",
        },
        {
          h: "4. Proveedores",
          p: "Utilizamos servicios de terceros como Clerk (autenticación), Supabase (base de datos), Stripe (pagos) y OpenRouter (modelos de IA) que procesan datos conforme a sus propias políticas.",
        },
        {
          h: "5. Tus derechos",
          p: "Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición escribiéndonos a hola@nopalai.mx.",
        },
        {
          h: "6. Contacto",
          p: "Para cualquier duda sobre este aviso, escríbenos a hola@nopalai.mx.",
        },
      ],
    },
  },
};

const en: typeof es = {
  tagline: "The AI that understands LATAM.",

  meta: {
    description:
      "NopalAI is the AI assistant built for LATAM. It understands the region's Spanish and helps you with answers, translations, schoolwork, and content for social media and marketing.",
    pricingTitle: "Pricing — Free, Plus and Pro",
    pricingDescription:
      "Start free. Upgrade to Plus (69 MXN) or Pro (199 MXN) per month: more messages, no ads, faster responses, and premium models.",
    signInTitle: "Sign in",
    signInDescription: "Sign in to NopalAI, the AI that understands LATAM.",
    signUpTitle: "Create a free account",
    signUpDescription:
      "Create your free NopalAI account and start using the AI that understands LATAM.",
    termsTitle: "Terms & Conditions",
    privacyTitle: "Privacy Notice",
  },

  nav: {
    home: "Home",
    signIn: "Sign in",
    openChat: "Open chat",
    theme: "Toggle theme",
    language: "Change language",
  },

  hero: {
    titleLead: "The AI that understands",
    titleHighlight: "LATAM",
    subtitle:
      "Answers, translations, homework help, and social media content. In natural Spanish, instantly.",
    ctaPrimary: "Start free",
    ctaSecondary: "See demo",
    note: "Free · No card · Start in seconds",
  },

  assistants: {
    title: "An expert for everything",
    subtitle:
      "Pick an assistant and start typing. Each one is tuned for its job.",
  },

  pricing: {
    title: "Simple and transparent",
    subtitle: "Start free. Upgrade anytime. Cancel anytime.",
    perMonth: "MXN / month",
    popular: "Most popular",
    fairUse:
      "Fair use: Prices in your country's currency. You can cancel anytime.",
    plans: [
      {
        id: "free",
        name: "Free",
        desc: "To start exploring AI.",
        price: "$0",
        cta: "Start free",
        action: "signup",
        popular: false,
        features: [
          "Specialized AI assistants",
          "Conversation history",
          "Standard model",
          "Free daily usage",
        ],
      },
      {
        id: "plus",
        name: "Plus",
        desc: "For everyday use, no interruptions.",
        price: "$69",
        cta: "Get Plus",
        action: "upgrade",
        popular: false,
        features: [
          "Everything in Free",
          "More messages per day",
          "No ads",
          "Faster responses",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        desc: "For those who use AI every day.",
        price: "$199",
        cta: "Get Pro",
        action: "upgrade",
        popular: true,
        features: [
          "Everything in Plus",
          "Practically unlimited usage",
          "Premium models (Qwen 72B)",
          "Priority access",
          "Priority support",
        ],
      },
    ],
  },

  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What is NopalAI?",
        a: "An AI assistant built for LATAM. It understands the region's Spanish and helps you with everyday answers, translations, schoolwork, and social media content.",
      },
      {
        q: "Is it free?",
        a: "Yes. The Free plan lets you start with no credit card. If you need more, there are Plus (69 MXN) and Pro (199 MXN) monthly plans.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Of course. You can cancel your subscription anytime and keep access until the end of your paid period.",
      },
    ],
  },

  cta: {
    title: "Try the AI that understands LATAM",
    subtitle: "Free forever. No card. Start in seconds.",
    primary: "Start free",
    secondary: "See pricing",
  },

  footer: {
    privacy: "Privacy",
    terms: "Terms",
    madeFor: "Made for LATAM 🌎",
  },

  chatPreview: {
    tabs: {
      general: {
        q: "Help me draft a formal email to request a quote.",
        a: "Sure. Subject: Quote request. \"Dear [Name]: I'm writing to request a quote for [product/service], to be delivered at [place/date]. I look forward to your reply. Best, [Your name].\" Want it shorter or more detailed?",
      },
      translation: {
        q: "Translate 'la cuenta, por favor' into English for a tourist.",
        a: "\"The check, please.\" And to sound more natural: \"Could we get the check, please?\" Want more phrases for serving tourists?",
      },
      school: {
        q: "Explain the Pythagorean theorem with an example.",
        a: "In a right triangle, a² + b² = c², where c is the hypotenuse. Example: if a = 3 and b = 4, then c = √(9 + 16) = √25 = 5. Want to solve it with your own numbers?",
      },
      content: {
        q: "Give me a content idea for Instagram this week.",
        a: "Reel: \"3 mistakes you make when [your topic]\". Hook: \"#2 is costing you clients.\" End with a CTA: \"Save this Reel so you don't forget.\" Want the full script?",
      },
    },
  },

  modes: {
    general: {
      name: "General Assistant",
      short: "General",
      blurb: "Your copilot for any question, text, or idea.",
      suggestions: [
        "Write a WhatsApp message to congratulate a client",
        "Help me draft a formal email to request a quote",
        "Give me ideas to better organize my week",
        "Summarize this text into 3 key points",
      ],
    },
    translation: {
      name: "Translation",
      short: "Translation",
      blurb: "Natural translations between Spanish, English, and more.",
      suggestions: [
        "Translate 'la cuenta, por favor' into English for a tourist",
        "Translate this email into formal English",
        "How do you say 'estoy en la chamba' in natural English?",
        "Translate this message from English to Spanish",
      ],
    },
    school: {
      name: "School & Homework",
      short: "School",
      blurb: "Help with homework and studying, explained step by step.",
      suggestions: [
        "Explain the Pythagorean theorem with a simple example",
        "Help me write a summary of the Industrial Revolution",
        "How do I solve a quadratic equation?",
        "Proofread and improve my essay",
      ],
    },
    content: {
      name: "Content & Marketing",
      short: "Content",
      blurb: "Ideas, copy, and scripts for social media and marketing.",
      suggestions: [
        "Give me 5 content ideas for Instagram this week",
        "Write a 30-second TikTok Reel script",
        "Create captions with hashtags for my business",
        "Make me a 7-day content calendar",
      ],
    },
  },

  dashboard: {
    home: "Home",
    newChat: "New chat",
    new: "New",
    untitled: "New chat",
    emptyConversations: "Your conversations will appear here.",
    myAccount: "My account",
    rename: "Rename",
    delete: "Delete",
    renameTitle: "Rename chat",
    chatNamePlaceholder: "Chat name",
    cancel: "Cancel",
    save: "Save",
    deleteTitle: "Delete this chat?",
    deleteDesc: (name: string) =>
      `“${name}” and all its messages will be deleted. This action cannot be undone.`,
    chatOptions: "Chat options",
    openMenu: "Open menu",
    chatsMenu: "Chats menu",
    pin: "Pin sidebar",
    unpin: "Unpin sidebar",
    copy: "Copy",
    copied: "Copied",
    copyAnswer: "Copy answer",
    composer: {
      placeholder: (name: string) => `Ask ${name}…`,
      defaultPlaceholder: "Type your message…",
      send: "Send",
      stop: "Stop",
      disclaimer: "NopalAI can make mistakes. Verify important information.",
    },
    emptyState: {
      title: "How can I help you today?",
      subtitle: "Pick an assistant and start typing.",
      tryWith: "Try with",
      assistantType: "Assistant type",
    },
    usage: {
      activeTitle: "Active subscription",
      activeDesc: "Unlimited messages and faster responses.",
      today: "Today's usage",
      upgrade: "Upgrade plan",
    },
    ad: {
      label: "Advertisement",
      remove: "Remove ads with Plus",
    },
    upgrade: {
      limitTitle: "You've reached today's limit",
      manualTitle: "Unlock more with NopalAI",
      limitDesc:
        "You've used your free messages for today. Upgrade your plan and keep going without interruptions.",
      manualDesc: "Take your productivity to the next level from 69 MXN a month.",
      cta: "Upgrade plan",
      secure: "Cancel anytime · Secure payment with Stripe",
    },
    toasts: {
      welcome: "Welcome! 🎉 Enjoy without limits.",
      genError: "Couldn't generate a response. Please try again.",
      createChatError: "Couldn't create the chat.",
      openChatError: "Couldn't open the chat.",
      renameError: "Couldn't rename.",
      deleteError: "Couldn't delete.",
    },
  },

  auth: {
    noAccount: "Don't have an account?",
    startFree: "Start free",
    haveAccount: "Already have an account?",
    signIn: "Sign in",
  },

  notFound: {
    message: "This page got lost along the way.",
    back: "Back to home",
  },

  legal: {
    updated: "Last updated: June 2026",
    terms: {
      title: "Terms & Conditions",
      sections: [
        {
          h: "1. Acceptance",
          p: "By using NopalAI you accept these terms. If you disagree, please do not use the service.",
        },
        {
          h: "2. The service",
          p: "NopalAI is an artificial intelligence assistant. Responses are generated automatically and may contain errors. They do not constitute legal, tax, medical, or professional advice.",
        },
        {
          h: "3. Accounts and acceptable use",
          p: "You are responsible for your account's activity. You must not use the service for unlawful or harmful activities, or ones that violate the rights of others.",
        },
        {
          h: "4. Plans and payments",
          p: "The Free plan lets you start at no cost. The Plus (69 MXN) and Pro (199 MXN) monthly plans include higher limits and features. Payments are processed with Stripe and you can cancel anytime; access continues until the end of the paid period.",
        },
        {
          h: "5. Limitation of liability",
          p: "The service is provided “as is”. NopalAI is not liable for decisions made based on the generated responses.",
        },
        {
          h: "6. Contact",
          p: "Questions about these terms: hola@nopalai.mx.",
        },
      ],
    },
    privacy: {
      title: "Privacy Notice",
      sections: [
        {
          h: "1. Data controller",
          p: "NopalAI is responsible for processing your personal data, in accordance with the data protection legislation applicable in your country.",
        },
        {
          h: "2. Data we collect",
          p: "We collect your email and name when you create an account, as well as the conversations you generate with the assistant to provide the service and improve your experience.",
        },
        {
          h: "3. Use of information",
          p: "We use your data to authenticate you, provide the service, process payments through Stripe, and understand product usage via aggregated analytics. We do not sell your personal data.",
        },
        {
          h: "4. Providers",
          p: "We use third-party services such as Clerk (authentication), Supabase (database), Stripe (payments), and OpenRouter (AI models) that process data under their own policies.",
        },
        {
          h: "5. Your rights",
          p: "You can exercise your rights of access, rectification, cancellation, and objection by writing to us at hola@nopalai.mx.",
        },
        {
          h: "6. Contact",
          p: "For any questions about this notice, write to us at hola@nopalai.mx.",
        },
      ],
    },
  },
};

export const DICT: Record<Lang, typeof es> = { es, en };

export type Dictionary = typeof es;

/** Resolve a language string to a supported `Lang`, defaulting to Spanish. */
export function resolveLang(value: string | undefined | null): Lang {
  return value === "en" ? "en" : "es";
}
