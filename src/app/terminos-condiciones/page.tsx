import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { LEGAL_ADDRESS, SITE } from "@/lib/site";
import {
  CHALLENGE,
  EQUIPMENT,
  RENEWAL,
  TRAINING,
  WITHDRAWAL_RIGHT,
  NUTRITION_GUIDE,
  VISIBLE_PLANS,
  formatARS,
} from "@/lib/products";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de contratación del ${CHALLENGE.name} de ${SITE.fiscalName}.`,
};

export default function TerminosCondicionesPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      updatedAt="25 de agosto de 2026"
      intro={`Estos términos regulan la contratación del ${CHALLENGE.name} ofrecido por ${SITE.fiscalName}. Al contratar el servicio declarás haberlos leído y aceptado.`}
    >
      <LegalSection heading="1. Identificación del prestador">
        <p>
          El servicio es prestado por {SITE.fiscalName}, CUIT {SITE.cuit}, con
          domicilio en {LEGAL_ADDRESS}. Correo electrónico de contacto:{" "}
          {SITE.email}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Objeto del servicio">
        <p>
          El {CHALLENGE.name} es un programa de entrenamiento físico prestado
          de forma íntegramente online, contratado por períodos de{" "}
          {RENEWAL.accessDays} días o múltiplos de ese plazo, según el plan
          elegido. Incluye acceso a contenidos audiovisuales grabados, material
          descargable, corrección asincrónica de técnica y participación en una
          comunidad privada mientras el período abonado se encuentre vigente.
        </p>
        <p>
          <strong>El plan de entrenamiento no es personalizado.</strong> Es el
          mismo para todas las participantes. El único componente
          individualizado es la devolución sobre los videos de técnica que la
          participante decida enviar, que se responde de forma asincrónica.
        </p>
        <p>
          {/* `TRAINING.levels` son objetos: unirlos directo imprimía
              "[object Object] y [object Object]". Se listan los de
              `available`, que además son los únicos que hoy se entregan. */}
          El entrenamiento está organizado en niveles ({TRAINING.available.join(" y ")}),
          de {TRAINING.daysPerLevel} días cada uno y {TRAINING.setsPerDay} sets
          por día. {EQUIPMENT.detail}
        </p>
        <p>
          La asesoría 1:1 es un servicio distinto, con alcance, duración y
          precio propios, que se contrata por separado.
        </p>
        <p>
          La {NUTRITION_GUIDE.name.toLowerCase()} es un contenido digital
          complementario, de adquisición opcional y por única vez, que se
          entrega dentro de la comunidad y no vence ni se renueva. Constituye{" "}
          <strong>material educativo de carácter general</strong>: no es un plan
          alimentario personalizado, no contempla condiciones de salud
          particulares y no reemplaza la consulta con un profesional de la
          nutrición matriculado.
        </p>
        <p>
          El servicio no constituye una prestación médica ni reemplaza el
          asesoramiento de un profesional de la salud.
        </p>
      </LegalSection>

      <LegalSection heading="3. Precio y forma de pago">
        <p>
          Los precios vigentes, con impuestos incluidos, son:{" "}
          {VISIBLE_PLANS.map((plan) => `${plan.name}, ${formatARS(plan.priceARS)}`).join("; ")}.{" "}
          La {NUTRITION_GUIDE.name.toLowerCase()}, de adquisición opcional, se
          abona por única vez: {formatARS(NUTRITION_GUIDE.priceARS)}.
          Estos importes corresponden al precio promocional de lanzamiento
          vigente al momento de la contratación. Quienes contraten a ese precio
          lo conservan sin aumentos mientras renueven sin interrupciones. La
          prestadora puede modificar los precios para nuevas contrataciones,
          informándolo en el sitio.
        </p>
        <p>
          El pago se realiza por <strong>transferencia bancaria</strong> a la
          cuenta informada en el sitio, por adelantado y por el período
          completo. <strong>No hay débito automático, adhesión ni renovación
          automática:</strong> la prestadora no conserva ningún medio de pago de
          la participante y ningún importe se cobra sin una transferencia hecha
          por ella.
        </p>
        <p>
          El acceso se otorga una vez verificada la acreditación de la
          transferencia, dentro de las 24 horas de recibido el comprobante. Al
          finalizar el período abonado el acceso se interrumpe, salvo que la
          participante abone un período nuevo. No hace falta cancelar nada para
          dejar de participar: alcanza con no renovar.
        </p>
        <p>
          Los importes correspondientes a períodos ya transcurridos no se
          reintegran, sin perjuicio del derecho de revocación del punto 5.
        </p>
      </LegalSection>

      <LegalSection heading="4. Inicio y modalidad del programa">
        <p>
          El programa es íntegramente digital y asincrónico. La totalidad del
          material —rutinas y videos explicativos— se encuentra grabado y se
          pone a disposición de la participante al confirmarse el acceso. No hay fechas de inicio
          predeterminadas: el programa comienza el día en que se otorga el
          acceso.
        </p>
        <p>
          El servicio no incluye sesiones en vivo, individuales ni grupales. Las
          consultas y la corrección de técnica se responden de forma
          asincrónica a través de la comunidad privada y de WhatsApp, dentro de
          los plazos razonables informados en el sitio.
        </p>
      </LegalSection>

      <LegalSection heading={`5. Derecho de revocación (${WITHDRAWAL_RIGHT.law})`}>
        <p>
          De acuerdo con el artículo 34 de la Ley 24.240 de Defensa del
          Consumidor, al tratarse de una contratación celebrada fuera del
          establecimiento comercial, tenés derecho a revocar la contratación
          dentro de los{" "}
          <strong>diez ({WITHDRAWAL_RIGHT.days}) días corridos</strong> contados a
          partir de la fecha en que se te otorgue el acceso al programa, sin
          necesidad de expresar causa y sin responsabilidad alguna de tu parte.
        </p>
        <p>
          Para ejercer este derecho alcanza con comunicarlo por WhatsApp o por
          correo electrónico a {SITE.email}. La devolución del importe se
          realizará por transferencia bancaria a la cuenta que indiques,
          dentro de los cinco (5) días hábiles siguientes, y el acceso se da de
          baja sin cargos posteriores.
        </p>
        <p>
          Este derecho es irrenunciable y prevalece sobre cualquier otra
          condición establecida en estos términos.
        </p>
      </LegalSection>

      <LegalSection heading="6. Obligaciones de la participante">
        <p>
          El acceso al programa es personal e intransferible. No está permitido
          compartir credenciales, descargar y redistribuir los contenidos, ni
          reproducirlos total o parcialmente fuera de la plataforma.
        </p>
        <p>
          Declarás encontrarte en condiciones físicas de realizar actividad
          física y asumís la responsabilidad de consultar a un profesional de la
          salud antes de comenzar, especialmente si tenés alguna condición
          médica preexistente, lesión, estás cursando un embarazo o tomás
          medicación.
        </p>
      </LegalSection>

      <LegalSection heading="7. Resultados">
        <p>
          Los resultados dependen de factores individuales como el punto de
          partida, la adherencia al programa, el descanso, la alimentación y la
          genética. La prestadora no garantiza resultados físicos específicos ni
          en un plazo determinado.
        </p>
      </LegalSection>

      <LegalSection heading="8. Propiedad intelectual">
        <p>
          Todos los contenidos del programa y del sitio (videos, textos,
          planillas, marcas y diseños) son propiedad de {SITE.fiscalName} y se
          encuentran protegidos por la Ley 11.723 de Propiedad Intelectual. Su
          uso está autorizado únicamente para consumo personal durante la
          vigencia del programa.
        </p>
      </LegalSection>

      <LegalSection heading="9. Suspensión del acceso">
        <p>
          La prestadora podrá suspender el acceso, sin derecho a reembolso, ante
          el incumplimiento de estos términos, la redistribución no autorizada
          de contenidos o conductas agresivas o discriminatorias dentro de la
          comunidad.
        </p>
      </LegalSection>

      <LegalSection heading="10. Datos personales">
        <p>
          El tratamiento de tus datos personales se rige por la{" "}
          <Link href="/politica-privacidad" className="underline underline-offset-2">
            Política de Privacidad
          </Link>
          , conforme a la Ley 25.326 de Protección de los Datos Personales.
        </p>
      </LegalSection>

      <LegalSection heading="11. Modificaciones">
        <p>
          Estos términos pueden actualizarse. Las modificaciones no afectan a las
          contrataciones ya perfeccionadas, que se rigen por la versión vigente
          al momento de la compra.
        </p>
      </LegalSection>

      <LegalSection heading="12. Ley aplicable y jurisdicción">
        <p>
          Estos términos se rigen por las leyes de la República Argentina. Para
          cualquier controversia serán competentes los tribunales ordinarios de
          la ciudad de Rosario, Provincia de Santa Fe, sin perjuicio del derecho
          de la consumidora de accionar ante los tribunales de su domicilio,
          conforme a la Ley 24.240.
        </p>
        <p>
          Podés presentar un reclamo ante la Dirección Nacional de Defensa del
          Consumidor o a través de la Ventanilla Única Federal de Defensa del
          Consumidor.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
