import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: `Aviso de privacidad de ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Aviso de Privacidad</h1>
      <p className="text-sm text-muted-foreground">
        Última actualización: junio de 2026
      </p>

      <h2>1. Responsable</h2>
      <p>
        {SITE.name} es responsable del tratamiento de tus datos personales, de
        conformidad con la Ley Federal de Protección de Datos Personales en
        Posesión de los Particulares (LFPDPPP).
      </p>

      <h2>2. Datos que recopilamos</h2>
      <p>
        Recopilamos tu correo electrónico y nombre al crear una cuenta, así como
        las conversaciones que generas con el asistente para brindarte el
        servicio y mejorar tu experiencia.
      </p>

      <h2>3. Uso de la información</h2>
      <p>
        Usamos tus datos para autenticarte, prestar el servicio, procesar pagos
        a través de Stripe y entender el uso del producto mediante analíticas
        agregadas. No vendemos tus datos personales.
      </p>

      <h2>4. Proveedores</h2>
      <p>
        Utilizamos servicios de terceros como Clerk (autenticación), Supabase
        (base de datos), Stripe (pagos) y OpenRouter (modelos de IA) que
        procesan datos conforme a sus propias políticas.
      </p>

      <h2>5. Tus derechos (ARCO)</h2>
      <p>
        Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y
        Oposición escribiéndonos a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Para cualquier duda sobre este aviso, escríbenos a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </>
  );
}
