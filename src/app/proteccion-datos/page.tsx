import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protección de Datos",
  description: `Información sobre protección de datos de ${SITE.fiscalName}.`,
};

export default function ProteccionDatosPage() {
  return (
    <article className="container-page section-pad max-w-3xl">
      <p className="text-xs uppercase tracking-[0.18em] text-mp-orange font-display font-semibold mb-4">
        Borrador — pendiente de revisión legal
      </p>
      <h1 className="font-display font-extrabold text-4xl md:text-5xl mb-8">
        Protección de Datos
      </h1>
      <div className="flex flex-col gap-5 text-mp-carbon leading-relaxed">
        <p>
          {SITE.ownerName} actúa como responsable del tratamiento de los datos
          personales recolectados a través de este sitio, en cumplimiento con
          la Ley 25.326 de la República Argentina.
        </p>
        <p>
          Para ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación y
          Oposición), escribinos a {SITE.email} indicando el derecho que
          querés ejercer y aportando una copia simple de tu DNI.
        </p>
        <p>
          Tus datos no se ceden a terceros salvo a los proveedores
          estrictamente necesarios para prestar el servicio (procesadores de
          pago, plataforma de email marketing y planilla interna de gestión).
          Todos ellos cuentan con cláusulas de confidencialidad.
        </p>
        <p className="text-xs text-mp-carbon/70 mt-8">
          Este documento es un borrador y debe ser revisado por un asesor
          legal antes de su publicación definitiva.
        </p>
      </div>
    </article>
  );
}
