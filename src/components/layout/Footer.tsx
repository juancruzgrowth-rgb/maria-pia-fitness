import Link from "next/link";
import { InstagramLogo, TiktokLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, SITE, NAV_SECTIONS } from "@/lib/site";

const LEGAL_LINKS = [
  { href: "/politica-privacidad", label: "Política de Privacidad" },
  { href: "/terminos-condiciones", label: "Términos y Condiciones" },
  { href: "/proteccion-datos", label: "Protección de Datos" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mp-line mt-12">
      <div className="container-page py-16 grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-5 flex flex-col gap-6">
          <Logo withTagline />
          <p className="text-sm text-mp-carbon/80 max-w-sm leading-relaxed">
            {SITE.fiscalName}. Acompañamos procesos de entrenamiento y
            nutrición desde {SITE.city}, {SITE.country}.
          </p>
          <div className="flex items-center gap-2">
            {CONTACT.instagramUrl && (
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Maria Pia"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-line text-mp-ink hover:border-mp-ink hover:text-mp-amber transition-colors"
              >
                <InstagramLogo weight="regular" className="h-5 w-5" />
              </a>
            )}
            <a
              href={CONTACT.tiktokUrl || "#"}
              target={CONTACT.tiktokUrl ? "_blank" : undefined}
              rel={CONTACT.tiktokUrl ? "noopener noreferrer" : undefined}
              aria-label="TikTok"
              aria-disabled={!CONTACT.tiktokUrl}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-line text-mp-ink transition-colors ${
                CONTACT.tiktokUrl
                  ? "hover:border-mp-ink hover:text-mp-amber"
                  : "opacity-40 pointer-events-none"
              }`}
            >
              <TiktokLogo weight="regular" className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.youtubeUrl || "#"}
              target={CONTACT.youtubeUrl ? "_blank" : undefined}
              rel={CONTACT.youtubeUrl ? "noopener noreferrer" : undefined}
              aria-label="YouTube"
              aria-disabled={!CONTACT.youtubeUrl}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-line text-mp-ink transition-colors ${
                CONTACT.youtubeUrl
                  ? "hover:border-mp-ink hover:text-mp-amber"
                  : "opacity-40 pointer-events-none"
              }`}
            >
              <YoutubeLogo weight="regular" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-[0.18em] text-mp-carbon/70">
            Navegación
          </h4>
          <ul className="flex flex-col gap-3">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-mp-ink hover:text-mp-amber transition-colors"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs uppercase tracking-[0.18em] text-mp-carbon/70">
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-mp-ink hover:text-mp-amber transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-mp-carbon/70 mt-4 leading-relaxed">
            Responsable: {SITE.ownerName} · {SITE.email}
          </p>
        </div>
      </div>

      <div className="border-t border-mp-line">
        <div className="container-page flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-6">
          <p className="text-xs text-mp-carbon/70">
            © {year} {SITE.fiscalName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-mp-carbon/70 uppercase tracking-[0.14em]">
            {SITE.city} · {SITE.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
