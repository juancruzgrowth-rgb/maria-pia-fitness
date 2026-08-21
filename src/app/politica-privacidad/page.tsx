import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${SITE.fiscalName} trata tus datos personales conforme a la Ley 25.326 de la República Argentina.`,
};

export default function PoliticaPrivacidadPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updatedAt="4 de agosto de 2026"
      intro="Esta política explica qué datos personales recolectamos, para qué los usamos, con quién los compartimos y cómo podés ejercer tus derechos. Se rige por la Ley 25.326 de Protección de los Datos Personales de la República Argentina."
    >
      <LegalSection heading="1. Responsable del tratamiento">
        <p>
          {SITE.ownerName} ({SITE.fiscalName}), con domicilio en {SITE.city},{" "}
          {SITE.country}. Correo electrónico de contacto: {SITE.email}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Qué datos recolectamos">
        <p>
          <strong>Datos de contacto y contratación:</strong> nombre y apellido,
          correo electrónico, número de teléfono o WhatsApp, y los datos de tu
          suscripción que nos informa MercadoPago (estado del pago, fecha y
          monto debitado).
        </p>
        <p>
          <strong>Datos de salud y actividad física:</strong> si durante la
          comunidad, por WhatsApp o durante el desarrollo del programa nos compartís
          información sobre lesiones, condiciones médicas, embarazo o medicación,
          esos datos reciben el tratamiento reforzado que la Ley 25.326 asigna a
          los datos sensibles. Sólo los usamos para adaptar tu entrenamiento, no
          se comparten con terceros y podés negarte a proporcionarlos.
        </p>
        <p>
          <strong>Datos de navegación:</strong> métricas agregadas y anónimas de
          uso del sitio. La dirección IP se procesa únicamente en registros
          efímeros y no se almacena de forma persistente.
        </p>
        <p>
          <strong>No recolectamos datos de tarjetas ni bancarios.</strong> El
          pago y el débito automático los procesa íntegramente MercadoPago en
          su propia plataforma: nosotras no vemos ni almacenamos el número de
          tu tarjeta ni tus credenciales bancarias.
        </p>
      </LegalSection>

      <LegalSection heading="3. Con qué finalidad los usamos">
        <p>
          Para gestionar tu inscripción y darte acceso al programa; para
          hacer el seguimiento de tu avance; para responder tus consultas y
          corregir la técnica de los videos que nos envíes; para avisarte
          cuando se acerca el vencimiento de tu acceso; para enviarte comunicaciones relacionadas con el programa
          que contrataste; para cumplir obligaciones legales, contables e
          impositivas; y, sólo si prestaste consentimiento expreso, para
          enviarte contenidos o novedades comerciales.
        </p>
      </LegalSection>

      <LegalSection heading="4. Base legal">
        <p>
          El tratamiento se funda en tu consentimiento libre, expreso e
          informado, en la ejecución del contrato que celebrás al inscribirte y
          en el cumplimiento de obligaciones legales a cargo de la responsable.
        </p>
      </LegalSection>

      <LegalSection heading="5. Con quién los compartimos">
        <p>
          Compartimos datos únicamente con los proveedores necesarios para
          prestar el servicio, que actúan como encargados del tratamiento: la
          plataforma donde se aloja el programa y la comunidad, el proveedor de
          correo electrónico, el proveedor de hosting del sitio y las
          herramientas de organización interna.
        </p>
        <p>
          Algunos de estos proveedores están radicados fuera de la República
          Argentina. En esos casos la transferencia internacional se realiza al
          amparo de los artículos 11 y 12 de la Ley 25.326, con proveedores que
          ofrecen niveles adecuados de protección y cláusulas contractuales que
          los obligan a resguardar tus datos.
        </p>
        <p>
          No vendemos, cedemos ni alquilamos tus datos personales a terceros con
          fines publicitarios.
        </p>
      </LegalSection>

      <LegalSection heading="6. Cuánto tiempo los conservamos">
        <p>
          Conservamos tus datos mientras dure la relación contractual y,
          posteriormente, durante los plazos exigidos por la normativa comercial
          e impositiva argentina. Cumplidos esos plazos, se eliminan o anonimizan.
          Si nunca contrataste y sólo dejaste tu contacto, podés pedir la baja en
          cualquier momento.
        </p>
      </LegalSection>

      <LegalSection heading="7. Tus derechos">
        <p>
          Podés ejercer en forma gratuita tus derechos de acceso, rectificación,
          actualización, supresión y oposición escribiendo a {SITE.email}.
          Encontrás el procedimiento detallado en la página de{" "}
          <Link href="/proteccion-datos" className="underline underline-offset-2">
            Protección de Datos
          </Link>
          .
        </p>
        <p>
          La Agencia de Acceso a la Información Pública, en su carácter de
          autoridad de aplicación de la Ley 25.326, tiene la atribución de
          atender las denuncias y reclamos que interpongan quienes resulten
          afectados en sus derechos por incumplimiento de las normas vigentes en
          materia de protección de datos personales.
        </p>
      </LegalSection>

      <LegalSection heading="8. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus
          datos: acceso restringido al personal que lo necesita, cifrado en
          tránsito y credenciales de acceso individuales. Ningún sistema es
          completamente infalible, pero nos comprometemos a notificarte ante
          cualquier incidente que pueda afectar tus datos.
        </p>
      </LegalSection>

      <LegalSection heading="9. Menores de edad">
        <p>
          El servicio está dirigido a personas mayores de 18 años. No
          recolectamos deliberadamente datos de menores. Si detectamos que
          recibimos datos de una persona menor de edad sin la debida
          autorización, los eliminamos.
        </p>
      </LegalSection>

      <LegalSection heading="10. Cookies">
        <p>
          El sitio utiliza únicamente cookies técnicas necesarias para su
          funcionamiento y métricas agregadas de uso. No utilizamos cookies
          publicitarias de terceros ni realizamos seguimiento entre sitios.
        </p>
      </LegalSection>

      <LegalSection heading="11. Cambios en esta política">
        <p>
          Podemos actualizar esta política. La fecha de última actualización
          figura al comienzo. Si el cambio es sustancial y afecta tus derechos, te
          lo comunicaremos por los canales de contacto que nos hayas
          proporcionado.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
