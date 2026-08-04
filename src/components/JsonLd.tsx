interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // El objeto lo construimos nosotros en src/lib/seo.ts, no viene de input externo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
