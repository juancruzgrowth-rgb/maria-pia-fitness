import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Protección de Datos",
  description:
    "Cómo ejercer tus derechos de acceso, rectificación, actualización y supresión de datos personales conforme a la Ley 25.326.",
};

const RIGHTS = [
  {
    name: "Acceso",
    body: "Pedir qué datos tuyos tenemos, de dónde los obtuvimos y con qué finalidad los tratamos. El artículo 14 de la Ley 25.326 establece que el titular puede solicitar esta información en intervalos no menores a seis meses, salvo que acredite un interés legítimo.",
  },
  {
    name: "Rectificación y actualización",
    body: "Corregir datos inexactos o incompletos, o actualizarlos si cambiaron.",
  },
  {
    name: "Supresión",
    body: "Pedir que eliminemos tus datos cuando ya no sean necesarios para la finalidad por la que fueron recolectados, con las limitaciones que impongan las obligaciones legales, contables e impositivas vigentes.",
  },
  {
    name: "Oposición",
    body: "Oponerte a que tratemos tus datos con determinadas finalidades, por ejemplo el envío de comunicaciones comerciales.",
  },
];

export default function ProteccionDatosPage() {
  return (
    <LegalPage
      title="Protección de Datos"
      updatedAt="4 de agosto de 2026"
      intro="Si nos diste tus datos personales, la Ley 25.326 te reconoce una serie de derechos que podés ejercer en cualquier momento y sin costo. Acá te explicamos cuáles son y cómo hacerlo."
    >
      <LegalSection heading="Tus derechos">
        <ul className="flex flex-col gap-4">
          {RIGHTS.map((right) => (
            <li key={right.name} className="border-l-2 border-mp-orange pl-4">
              <p className="font-display font-semibold text-mp-ink">
                {right.name}
              </p>
              <p className="mt-1">{right.body}</p>
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection heading="Cómo ejercerlos">
        <p>
          Escribinos a <strong>{SITE.email}</strong> desde la misma dirección de
          correo con la que te registraste, indicando qué derecho querés ejercer
          y sobre qué datos. Si escribís desde otra dirección podemos pedirte
          algún dato adicional para verificar tu identidad, únicamente con ese
          fin.
        </p>
        <p>
          <strong>Plazos de respuesta.</strong> Los pedidos de acceso se
          responden dentro de los diez (10) días corridos. Los de rectificación,
          actualización o supresión se resuelven dentro de los cinco (5) días
          hábiles. Ambos plazos están fijados por los artículos 14 y 16 de la Ley
          25.326.
        </p>
        <p>El trámite es gratuito.</p>
      </LegalSection>

      <LegalSection heading="Autoridad de control">
        <p>
          Si considerás que no atendimos tu pedido correctamente, podés presentar
          un reclamo ante la Agencia de Acceso a la Información Pública, órgano
          de control de la Ley 25.326, con domicilio en Av. Pte. Julio A. Roca
          710, Piso 3°, Ciudad Autónoma de Buenos Aires.
        </p>
      </LegalSection>

      <LegalSection heading="Datos sensibles">
        <p>
          La información sobre lesiones, condiciones médicas, embarazo o
          medicación que nos compartas durante el programa constituye dato
          sensible en los términos del artículo 2 de la Ley 25.326. Nadie está
          obligado a proporcionar datos sensibles. Si decidís compartirlos, los
          usamos exclusivamente para adaptar tu entrenamiento de forma segura, no
          se ceden a terceros y se eliminan al finalizar el plazo de conservación.
        </p>
      </LegalSection>

      <LegalSection heading="Documentos relacionados">
        <p>
          Para el detalle completo de qué datos tratamos y con qué finalidad,
          consultá la{" "}
          <Link href="/politica-privacidad" className="underline underline-offset-2">
            Política de Privacidad
          </Link>
          . Para las condiciones de contratación, los{" "}
          <Link href="/terminos-condiciones" className="underline underline-offset-2">
            Términos y Condiciones
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
