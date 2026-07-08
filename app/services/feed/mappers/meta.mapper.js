export function mapMetaProducts(products, feed) {
  return products.map((product) => {
    const variant = product.variants.edges[0]?.node;

    return {
      id: product.id,

      title: product.title,

      description: product.description || "",

      link: `https://${feed.shopDomain}/products/${product.handle}`,

      image: product.featuredImage?.url || "",

      brand: product.vendor || "",

      condition: "new",

      availability: "in stock",

      price: `${variant?.price || "0.00"} ${feed.currency}`,
    };
  });
}