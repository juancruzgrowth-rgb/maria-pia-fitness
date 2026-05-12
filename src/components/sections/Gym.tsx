import { ArrowRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/site";

const GYM_VIDEO_URL = "";
const GYM_POSTER_URL = "/images/centro-entrenamiento.png";

export function Gym() {
  return (
    <section
      id="gimnasio"
      aria-label="Mi centro de entrenamiento"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex flex-col gap-8">
          <RevealOnScroll className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Mi Centro de Entrenamiento
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Un lugar pensado para que vos te enfoques en entrenar.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
              El gimnasio de Maria Pia en Rosario es un espacio equipado, sin
              aglomeraciones y con atención personalizada. No es un gym masivo —
              es el lugar donde cada sesión tiene propósito.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <p className="text-sm md:text-base text-mp-carbon leading-relaxed">
              Máquinas de calidad, pesos libres, zonas diferenciadas para
              entrenamiento funcional y fuerza. Todo pensado para que cada
              persona pueda trabajar su plan sin distracciones.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="flex items-center gap-2 text-sm text-mp-carbon/80">
              <MapPin
                weight="duotone"
                className="h-4 w-4 text-mp-orange shrink-0"
                aria-hidden="true"
              />
              <span>Rosario, Santa Fe — Argentina</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={260}>
            <Button
              href="https://www.google.com/maps/place/MP+Centro+de+Entrenamiento+Personalizado/@-32.8984607,-60.684188,17z/data=!3m1!4b1!4m6!3m5!1s0x95b653007bd5c367:0xd8e5147c3aa73d63!8m2!3d-32.8984652!4d-60.6816131!16s%2Fg%2F11wpl28q96?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D"
              size="lg"
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Button>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={120} className="lg:col-span-6">
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-ink">
            {GYM_VIDEO_URL ? (
              <video
                src={GYM_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                aria-label="Recorrido por el centro de entrenamiento de Maria Pia"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={GYM_POSTER_URL}
                alt="Interior del centro de entrenamiento de Maria Pia en Rosario"
                className="h-full w-full object-cover opacity-90"
              />
            )}
            <span className="absolute bottom-4 left-4 right-4 inline-flex items-center gap-2 rounded-md bg-mp-canvas/90 backdrop-blur-sm px-3 py-2 text-xs font-display font-semibold uppercase tracking-[0.14em] text-mp-ink">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Mi Centro de Entrenamiento · Rosario
            </span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
