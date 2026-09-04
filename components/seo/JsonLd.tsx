type JsonLdProps = {
  data: object | object[];
};

function serialize(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Hidden from visitors — search engines read this in the document, not on the page. */
export default function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => {
        const record = item as Record<string, unknown>;
        return (
          <script
            key={record["@id"] ? String(record["@id"]) : `ld-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serialize(item) }}
          />
        );
      })}
    </>
  );
}
