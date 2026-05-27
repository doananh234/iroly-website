interface JsonLdProps {
  data: Record<string, unknown>;
}

// Renders JSON-LD structured data in a script tag for SEO
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
