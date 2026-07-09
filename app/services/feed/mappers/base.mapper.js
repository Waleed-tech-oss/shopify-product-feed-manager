export function mapBaseProducts(products, feed) {
  return products.map((product) => {
    const variant = product.variants.edges[0]?.node;

    const hasIdentifier =
      !!variant?.barcode || !!variant?.sku;

    return {
      id: product.id,

      title: product.title,

      description: product.description || "",

      link: `https://${feed.shopDomain}/products/${product.handle}`,

      image: product.featuredImage?.url || "",

      additionalImages: product.images.edges
        .map((img) => img.node.url)
        .filter(
          (url) => url !== product.featuredImage?.url
        ),

      brand: product.vendor || "",

      productType: product.productType || "",

      googleProductCategory:
        feed.googleProductCategory || "",

      condition: "new",

      availability:
        variant?.inventoryQuantity > 0 ||
        variant?.inventoryPolicy === "CONTINUE"
          ? "in stock"
          : "out of stock",

      price: `${variant?.price || "0.00"} ${feed.currency}`,

      salePrice:
        variant?.compareAtPrice &&
        Number(variant.compareAtPrice) >
          Number(variant.price)
          ? `${variant.price} ${feed.currency}`
          : "",

      gtin: variant?.barcode || "",

      mpn: variant?.sku || "",

      identifierExists: hasIdentifier
        ? "yes"
        : "no",
    };
  });
}