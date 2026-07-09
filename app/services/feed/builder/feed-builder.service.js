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
`;

    // ✅ Additional Images
    item.additionalImages?.forEach((image) => {
      xml += `
<g:additional_image_link>${image}</g:additional_image_link>
`;
    });

    xml += `
<g:brand>${item.brand}</g:brand>

${item.productType
  ? `<g:product_type>${item.productType}</g:product_type>`
  : ""}


  ${item.googleProductCategory
  ? `<g:google_product_category>${item.googleProductCategory}</g:google_product_category>`
  : ""}


<g:gtin>${item.gtin}</g:gtin>

<g:mpn>${item.mpn}</g:mpn>

<g:identifier_exists>${item.identifierExists}</g:identifier_exists>

<g:condition>${item.condition}</g:condition>

<g:availability>${item.availability}</g:availability>

<g:price>${item.price}</g:price>
${item.salePrice
  ? `<g:sale_price>${item.salePrice}</g:sale_price>`
  : ""}

</item>
`;
  });

  xml += `</channel>\n`;
  xml += `</rss>`;

  return xml;
}