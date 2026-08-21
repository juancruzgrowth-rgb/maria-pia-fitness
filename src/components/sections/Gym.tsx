import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { CONTACT } from "@/lib/site";

const GYM_POSTER_URL = "/images/centro-entrenamiento.jpg";

export function Gym() {
  return (
    <section
      id="gimnasio"
      aria-label="El centro de entrenamiento de Pía"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-5 lg:col-span-6">
          <RevealOnScroll className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Dónde nació el método
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
              No soy una coach de Instagram.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={80}>
            <p className="text-base leading-relaxed text-mp-carbon/80 md:text-lg">
              Tengo un centro de entrenamiento en Rosario donde entreno personas
              todos los días, cara a cara. Ahí probé, corregí y ajusté durante
              años lo que hoy es El Reto.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={140}>
            <p className="text-sm leading-relaxed text-mp-carbon md:text-base">
              Las rutinas que vas a hacer no salieron de un curso ni de un video
              de YouTube: salieron de ver qué funciona de verdad en mujeres con
              agendas llenas, semana tras semana.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="rounded-md border border-mp-line bg-mp-canvas p-4">
              <p className="text-sm leading-relaxed text-mp-carbon">
                <span className="font-display font-semibold text-mp-ink">
                  El Reto es 100% online.
                </span>{" "}
                No hace falta que vivas en Rosario ni que vengas al centro: lo
                hacés en tu gimnasio o donde tengas equipamiento, en tus
                horarios.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={260}>
            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mp-carbon/80 transition-colors hover:text-mp-ink"
            >
              <MapPin
                weight="duotone"
                className="h-4 w-4 shrink-0 text-mp-orange"
                aria-hidden="true"
              />
              Rosario, Santa Fe — ver el centro en Google Maps
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={120} className="lg:col-span-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GYM_POSTER_URL}
              alt="Pía entrenando en su centro de entrenamiento en Rosario"
              loading="lazy"
              className="h-full w-full object-cover opacity-90"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
