import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de ${SITE.fiscalName}.`,
};

export default function TerminosCondicionesPage() {
  return (
    <article className="container-page section-pad max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-mp-orange font-display font-semibold mb-4">
        Borrador — pendiente de revisión legal
      </p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-8">
        Términos y Condiciones
      </h1>
      <div className="flex flex-col gap-5 text-mp-carbon leading-relaxed">
        <p>
          Estos términos regulan la contratación de los programas de
          entrenamiento y nutrición ofrecidos por {SITE.fiscalName}.
        </p>
        <p>
          Los planes son personalizados y de uso individual. No se permite la
          reventa, distribución ni reproducción del material entregado sin
          autorización expresa.
        </p>
        <p>
          Los pagos se procesan a través de plataformas externas (MercadoPago
          o Stripe). Una vez confirmado el pago, recibirás el acceso al
          programa contratado dentro de las 48 horas hábiles.
        </p>
        <p>
          La participación en cualquier programa físico implica responsabilidad
          del usuario sobre su estado de salud. Se recomienda consultar con un
          médico antes de comenzar.
        </p>
        <p className="text-xs text-mp-carbon/70 mt-8">
          Este documento es un borrador y debe ser revisado por un asesor
          legal antes de su publicación definitiva.
        </p>
      </div>
    </article>
  );
}
