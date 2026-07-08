export function generateXMLFeed(products, feed) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;

  xml += `<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n`;
  xml += `<channel>\n`;

  xml += `<title>${feed.feedName}</title>\n`;
  xml += `<link>https://${feed.shopDomain}</link>\n`;
  xml += `<description>Product Feed</description>\n`;

  products.forEach((product) => {
    const variant = product.variants.edges[0]?.node;

    xml += `
<item>
  <g:id>${product.id}</g:id>
  <title><![CDATA[${product.title}]]></title>
  <description><![CDATA[${product.description || ""}]]></description>
  <link>https://${feed.shopDomain}/products/${product.handle}</link>
  <g:image_link>${product.featuredImage?.url || ""}</g:image_link>
  <g:brand>${product.vendor || ""}</g:brand>
  <g:condition>new</g:condition>
  <g:availability>in stock</g:availability>
  <g:price>${variant?.price || "0.00"} ${feed.currency}</g:price>
</item>
`;
  });

  xml += `</channel>\n`;
  xml += `</rss>`;

  return xml;
}