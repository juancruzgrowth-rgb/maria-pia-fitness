import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad de ${SITE.fiscalName}.`,
};

export default function PoliticaPrivacidadPage() {
  return (
    <article className="container-page section-pad max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-mp-orange font-display font-semibold mb-4">
        Borrador — pendiente de revisión legal
      </p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-8">
        Política de Privacidad
      </h1>
      <div className="prose-mp flex flex-col gap-5 text-mp-carbon leading-relaxed">
        <p>
          Responsable del tratamiento: {SITE.ownerName} ({SITE.fiscalName}),
          con domicilio en {SITE.city}, {SITE.country}. Contacto: {SITE.email}.
        </p>
        <p>
          Tratamos los datos personales que nos brindás (nombre, email,
          teléfono y datos de contacto) con la finalidad de gestionar tu
          consulta, suscripción al newsletter y/o la contratación de los
          programas ofrecidos.
        </p>
        <p>
          Tus datos se conservan únicamente por el tiempo necesario para la
          finalidad declarada. Podés ejercer en cualquier momento los derechos
          de Acceso, Rectificación, Cancelación y Oposición (ARCO) escribiendo
          a {SITE.email}.
        </p>
        <p>
          Cumplimos con la Ley 25.326 de Protección de los Datos Personales
          de la República Argentina.
        </p>
        <p className="text-xs text-mp-carbon/70 mt-8">
          Este documento es un borrador y debe ser revisado por un asesor
          legal antes de su publicación definitiva.
        </p>
      </div>
    </article>
  );
}
