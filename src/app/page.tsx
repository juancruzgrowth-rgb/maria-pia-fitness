import { Hero } from "@/components/sections/Hero";
import { ForWhom } from "@/components/sections/ForWhom";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { Method } from "@/components/sections/Method";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";
import { PulseDivider } from "@/components/ui/PulseDivider";
import { JsonLd } from "@/components/JsonLd";
import { challengeJsonLd, faqJsonLd } from "@/lib/seo";

/**
 * Orden de la home, definido por Pía el 2026-08-29 sobre su prototipo escrito
 * a mano. La página se acortó a propósito: entraba demasiada información de
 * golpe y agobiaba.
 *
 * El recorrido es: quién puede entrar y quién no, la prueba de que funciona,
 * quién se lo va a enseñar, por qué su método y con qué nivel se entra, y
 * recién ahí cuánto sale y cómo se empieza.
 *
 * El precio va anteúltimo a pedido de ella: antes de ver la plata, la
 * visitante ya tiene todas las respuestas.
 *
 * Secciones eliminadas: el centro de entrenamiento —absorbido por "Soy Pía"—,
 * "Todo lo que tenés que saber" (sus niveles B1/B2 se mudaron a "Por qué mi
 * método") y "Cómo empezás", cuyos tres pasos ahora viven dentro del precio.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <PulseDivider className="container-page py-2" />
      <ForWhom />
      <Testimonials />
      <About />
      <Method />
      <Pricing />
      <FAQ />
      <FinalCta />
      <JsonLd data={challengeJsonLd()} />
      <JsonLd data={faqJsonLd()} />
    </>
  );
}
