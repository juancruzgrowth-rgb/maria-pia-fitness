import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";
import { CHALLENGE, GUARANTEE, TRANSFER, formatARS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: `Términos y condiciones de contratación del ${CHALLENGE.name} de ${SITE.fiscalName}.`,
};

export default function TerminosCondicionesPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      updatedAt="4 de agosto de 2026"
      intro={`Estos términos regulan la contratación del ${CHALLENGE.name} ofrecido por ${SITE.fiscalName}. Al contratar el servicio declarás haberlos leído y aceptado.`}
    >
      <LegalSection heading="1. Identificación del prestador">
        <p>
          El servicio es prestado por {SITE.ownerName} ({SITE.fiscalName}), con
          domicilio en {SITE.city}, {SITE.country}. Correo electrónico de
          contacto: {SITE.email}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Objeto del servicio">
        <p>
          El {CHALLENGE.name} es un programa de entrenamiento físico y
          orientación nutricional de {CHALLENGE.duration} de duración, prestado
          de forma íntegramente online. Incluye acceso a contenidos
          audiovisuales, material descargable, una llamada individual de
          bienvenida, corrección de técnica por video y participación en una
          comunidad privada durante la vigencia del programa.
        </p>
        <p>
          <strong>
            El plan de entrenamiento y nutrición no es personalizado.
          </strong>{" "}
          Es el mismo para todas las participantes de un mismo grupo. Los
          componentes individuales del servicio son exclusivamente la llamada de
          bienvenida, la corrección de técnica y los ajustes que la prestadora
          realice durante el programa.
        </p>
        <p>
          El servicio no constituye una prestación médica ni reemplaza el
          asesoramiento de un profesional de la salud.
        </p>
      </LegalSection>

      <LegalSection heading="3. Precio y forma de pago">
        <p>
          El precio vigente del {CHALLENGE.name} es de{" "}
          {formatARS(CHALLENGE.priceARS)}, en un pago único, con impuestos
          incluidos. No existe suscripción, débito automático ni renovación
          automática de ningún tipo.
        </p>
        <p>
          El pago se realiza mediante transferencia bancaria a la cuenta
          informada en la página de compra. La contratación se perfecciona una
          vez que la prestadora verifica el ingreso de los fondos y confirma el
          acceso, lo que ocurre habitualmente en {TRANSFER.responseWindow} desde
          la recepción del comprobante.
        </p>
      </LegalSection>

      <LegalSection heading="4. Grupos, cupos e inicio del programa">
        <p>
          El programa se dicta por grupos con fecha de inicio determinada y
          cupo limitado. La cantidad de lugares informada en el sitio es real y
          está limitada por la disponibilidad de la prestadora para realizar las
          llamadas individuales de bienvenida.
        </p>
        <p>
          Si la inscripción se encuentra cerrada, podés solicitar ser
          incorporada a la lista de espera del grupo siguiente, sin costo ni
          obligación.
        </p>
      </LegalSection>

      <LegalSection heading="5. Derecho de revocación (Art. 34, Ley 24.240)">
        <p>
          De acuerdo con el artículo 34 de la Ley 24.240 de Defensa del
          Consumidor, al tratarse de una contratación celebrada fuera del
          establecimiento comercial, tenés derecho a revocar la contratación
          dentro de los <strong>diez (10) días corridos</strong> contados a
          partir de la fecha en que se te otorgue el acceso al programa, sin
          necesidad de expresar causa y sin responsabilidad alguna de tu parte.
        </p>
        <p>
          Para ejercer este derecho alcanza con comunicarlo por WhatsApp o por
          correo electrónico a {SITE.email}. La devolución del importe se
          realizará mediante transferencia bancaria a la misma cuenta de origen,
          dentro de los cinco (5) días hábiles siguientes.
        </p>
        <p>
          Este derecho es irrenunciable y prevalece sobre cualquier otra
          condición establecida en estos términos.
        </p>
      </LegalSection>

      <LegalSection heading="6. Garantía comercial de satisfacción">
        <p>
          La prestadora ofrece además una garantía comercial de satisfacción de{" "}
          {GUARANTEE.days} días, cuyo plazo se encuentra deliberadamente
          alineado con el derecho de revocación del punto anterior. Durante ese
          período podés solicitar la devolución íntegra de lo abonado sin
          expresar causa y sin condición alguna: no se exige haber completado
          entrenamientos, haber asistido a la llamada de bienvenida ni acreditar
          ningún tipo de uso del servicio.
        </p>
        <p>
          Esta garantía no sustituye ni limita el derecho de revocación previsto
          en la Ley 24.240. Ante cualquier diferencia entre ambos, se aplica el
          régimen más favorable para vos.
        </p>
        <p>
          Los términos completos están disponibles en la{" "}
          <Link href="/garantia" className="underline underline-offset-2">
            página de garantía
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="7. Obligaciones de la participante">
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

      <LegalSection heading="8. Resultados">
        <p>
          Los resultados dependen de factores individuales como el punto de
          partida, la adherencia al programa, el descanso, la alimentación y la
          genética. La prestadora no garantiza resultados físicos específicos ni
          en un plazo determinado. Los testimonios publicados corresponden a
          experiencias individuales y no constituyen una promesa de resultado.
        </p>
      </LegalSection>

      <LegalSection heading="9. Propiedad intelectual">
        <p>
          Todos los contenidos del programa y del sitio (videos, textos,
          planillas, marcas y diseños) son propiedad de {SITE.fiscalName} y se
          encuentran protegidos por la Ley 11.723 de Propiedad Intelectual. Su
          uso está autorizado únicamente para consumo personal durante la
          vigencia del programa.
        </p>
      </LegalSection>

      <LegalSection heading="10. Suspensión del acceso">
        <p>
          La prestadora podrá suspender el acceso, sin derecho a reembolso, ante
          el incumplimiento de estos términos, la redistribución no autorizada
          de contenidos o conductas agresivas o discriminatorias dentro de la
          comunidad.
        </p>
      </LegalSection>

      <LegalSection heading="11. Datos personales">
        <p>
          El tratamiento de tus datos personales se rige por la{" "}
          <Link href="/politica-privacidad" className="underline underline-offset-2">
            Política de Privacidad
          </Link>
          , conforme a la Ley 25.326 de Protección de los Datos Personales.
        </p>
      </LegalSection>

      <LegalSection heading="12. Modificaciones">
        <p>
          Estos términos pueden actualizarse. Las modificaciones no afectan a las
          contrataciones ya perfeccionadas, que se rigen por la versión vigente
          al momento de la compra.
        </p>
      </LegalSection>

      <LegalSection heading="13. Ley aplicable y jurisdicción">
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
