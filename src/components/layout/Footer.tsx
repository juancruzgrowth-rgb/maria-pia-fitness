import Link from "next/link";
import { InstagramLogo, TiktokLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, SITE, NAV_SECTIONS } from "@/lib/site";

/* El botón de arrepentimiento es obligatorio en la home en toda venta online
   (Res. 424/2020). Va primero para que se vea sin buscarlo. */
const LEGAL_LINKS = [
  { href: "/cancelar", label: "Botón de arrepentimiento" },
  { href: "/terminos-condiciones", label: "Términos y Condiciones" },
  { href: "/politica-privacidad", label: "Política de Privacidad" },
  { href: "/proteccion-datos", label: "Protección de Datos" },
];

const SOCIALS = [
  { url: CONTACT.instagramUrl, label: "Instagram de Pía", Icon: InstagramLogo },
  { url: CONTACT.tiktokUrl, label: "TikTok de Pía", Icon: TiktokLogo },
  { url: CONTACT.youtubeUrl, label: "YouTube de Pía", Icon: YoutubeLogo },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    /* pb extra para que la barra flotante de compra no tape el contenido */
    <footer className="mt-12 border-t border-mp-line pb-24 md:pb-28">
      <div className="container-page grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Logo withTagline />
          <p className="max-w-sm text-sm leading-relaxed text-mp-carbon/80">
            Entrenamiento online para mujeres con poco tiempo libre. Desde{" "}
            {SITE.city}, {SITE.country}, para donde estés.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.filter((social) => social.url).map(({ url, label, Icon }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mp-line text-mp-ink transition-colors hover:border-mp-ink hover:text-mp-ember"
              >
                <Icon weight="regular" className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Navegación del sitio" className="flex flex-col gap-4 md:col-span-3">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
            El programa
          </h2>
          <ul className="flex flex-col gap-3">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`/#${section.id}`}
                  className="text-sm text-mp-ink transition-colors hover:text-mp-ember"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 md:col-span-4">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
            Legal
          </h2>
          <ul className="flex flex-col gap-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-mp-ink transition-colors hover:text-mp-ember"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-mp-carbon/70">
            Responsable del tratamiento de datos: {SITE.ownerName} ·{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="underline underline-offset-2 hover:text-mp-ink"
            >
              {SITE.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-mp-line">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-6 md:flex-row md:items-center">
          <p className="text-xs text-mp-carbon/70">
            © {year} {SITE.fiscalName}. Todos los derechos reservados.
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-mp-carbon/70">
            {SITE.city} · {SITE.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
