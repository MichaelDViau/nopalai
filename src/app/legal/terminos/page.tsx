import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de uso de ${SITE.name}.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">
        Términos y Condiciones
      </h1>
      <p className="text-sm text-muted-foreground">
        Última actualización: junio de 2026
      </p>

      <h2>1. Aceptación</h2>
      <p>
        Al usar {SITE.name} aceptas estos términos. Si no estás de acuerdo, por
        favor no utilices el servicio.
      </p>

      <h2>2. El servicio</h2>
      <p>
        {SITE.name} es un asistente de inteligencia artificial. Las respuestas
        se generan automáticamente y pueden contener errores. No constituyen
        asesoría legal, fiscal, médica ni profesional.
      </p>

      <h2>3. Cuentas y uso aceptable</h2>
      <p>
        Eres responsable de la actividad de tu cuenta. No debes usar el servicio
        para actividades ilícitas, dañinas o que violen derechos de terceros.
      </p>

      <h2>4. Planes y pagos</h2>
      <p>
        El plan Gratis incluye 20 mensajes diarios. El plan Plus cuesta 69
        MXN al mes y el plan Pro cuesta 199 MXN al mes; ambos incluyen
        mayores límites y funciones. Los pagos se procesan
        con Stripe y puedes cancelar en cualquier momento; el acceso continúa
        hasta el final del periodo pagado.
      </p>

      <h2>5. Limitación de responsabilidad</h2>
      <p>
        El servicio se ofrece “tal cual”. {SITE.name} no será responsable por
        decisiones tomadas con base en las respuestas generadas.
      </p>

      <h2>6. Contacto</h2>
      <p>
        Dudas sobre estos términos:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </>
  );
}
