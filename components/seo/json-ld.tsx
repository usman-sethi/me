// Server Component — renders a <script type="application/ld+json"> tag.
// JSON.stringify does not sanitize the payload, so `<` is escaped to its
// unicode equivalent to prevent breaking out of the script tag.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
