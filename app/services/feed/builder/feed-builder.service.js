export function buildXMLFeed({
  title,
  link,
  description,
  items,
}) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

  xml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
  xml += `<channel>\n`;

  xml += `<title>${title}</title>\n`;
  xml += `<link>${link}</link>\n`;
  xml += `<description>${description}</description>\n`;

  items.forEach((item) => {
    xml += `
<item>

<g:id>${item.id}</g:id>

<title><![CDATA[${item.title}]]></title>

<description><![CDATA[${item.description}]]></description>

<link>${item.link}</link>

<g:image_link>${item.image}</g:image_link>

<g:brand>${item.brand}</g:brand>

<g:condition>${item.condition}</g:condition>

<g:availability>${item.availability}</g:availability>

<g:price>${item.price}</g:price>

</item>
`;
  });

  xml += `</channel>\n`;
  xml += `</rss>`;

  return xml;
}