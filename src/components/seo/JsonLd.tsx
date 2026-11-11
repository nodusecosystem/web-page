type JsonLdProps = {
  data: object
}

const serialize = (data: object): string => JSON.stringify(data).replace(/</g, '\\u003c')

export function JsonLd({ data }: Readonly<JsonLdProps>) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialize(data) }} />
}
