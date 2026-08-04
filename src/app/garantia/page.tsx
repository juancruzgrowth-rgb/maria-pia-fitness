import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE, CONTACT } from "@/lib/site";
import { CHALLENGE, GUARANTEE } from "@/lib/products";

export const metadata: Metadata = {
  title: `Garantía de ${GUARANTEE.days} días y botón de arrepentimiento`,
  description: `Términos de la garantía de satisfacción del ${CHALLENGE.name} y cómo ejercer el derecho de revocación previsto en la Ley 24.240.`,
};

export default function GarantiaPage() {
  return (
    <LegalPage
      title={`Garantía de ${GUARANTEE.days} días`}
      updatedAt="4 de agosto de 2026"
      intro={GUARANTEE.summary}
    >
      <LegalSection heading="Cómo funciona">
        <p>
          Tenés {GUARANTEE.days} días corridos desde que recibís el acceso al{" "}
          {CHALLENGE.name} para decidir si es para vos. Si no lo es, me escribís
          y te devuelvo el 100% de lo que pagaste.
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            No hace falta que hayas completado ningún entrenamiento ni que
            justifiques tu decisión.
          </li>
          <li>
            Te voy a preguntar qué no funcionó, porque me sirve para mejorar el
            programa. Respondas lo que respondas, la devolución se procesa igual.
          </li>
          <li>
            La devolución se realiza por transferencia bancaria a la misma cuenta
            desde la que pagaste, dentro de los cinco (5) días hábiles.
          </li>
          <li>
            Al procesarse la devolución se da de baja el acceso a la comunidad y
            a los contenidos.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Por qué son 10 días y no 7">
        <p>
          Porque es lo que corresponde. El artículo 34 de la Ley 24.240 de
          Defensa del Consumidor establece que, en las contrataciones celebradas
          a distancia, podés revocar la aceptación durante los{" "}
          <strong>diez (10) días corridos</strong> contados desde que recibís el
          servicio, sin expresar causa y sin responsabilidad alguna. Es un
          derecho irrenunciable: lo tenés al comprar acá y al comprar en
          cualquier otro lado.
        </p>
        <p>
          En vez de ofrecer una garantía comercial más corta que ese plazo legal,
          preferimos que coincidan. Así no hay dos relojes distintos ni letra
          chica que interpretar: son {GUARANTEE.days} días, y punto.
        </p>
      </LegalSection>

      <LegalSection heading="Botón de arrepentimiento">
        <p>
          Conforme a la Resolución 424/2020 de la Secretaría de Comercio Interior,
          podés solicitar la revocación de tu compra de forma directa y sencilla
          por cualquiera de estas vías:
        </p>
        <div className="mt-2 flex flex-col gap-3">
          <a
            href={CONTACT.askUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] sm:w-auto"
          >
            <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
            Solicitar la baja por WhatsApp
          </a>
          <p className="text-sm">
            O por correo electrónico a{" "}
            <a
              href={`mailto:${SITE.email}?subject=Arrepentimiento%20de%20compra`}
              className="underline underline-offset-2"
            >
              {SITE.email}
            </a>
            , indicando tu nombre completo y el correo con el que te
            inscribiste.
          </p>
        </div>
        <p>
          Te vamos a confirmar la recepción del pedido dentro de las 24 horas y a
          procesar la devolución en el plazo indicado más arriba.
        </p>
      </LegalSection>

      <LegalSection heading="Qué no cubre">
        <p>
          La garantía cubre la devolución del importe abonado por el{" "}
          {CHALLENGE.name}. No cubre resultados físicos, que dependen de factores
          individuales, ni gastos de terceros en los que hayas incurrido por tu
          cuenta.
        </p>
        <p>
          La redistribución no autorizada de los contenidos del programa habilita
          la suspensión del acceso sin reembolso, conforme al punto 10 de los{" "}
          <Link href="/terminos-condiciones" className="underline underline-offset-2">
            Términos y Condiciones
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
