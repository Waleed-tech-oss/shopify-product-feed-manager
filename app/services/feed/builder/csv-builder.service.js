export function buildCSVFeed(items) {
  const headers = [
    "sku_id",
    "title",
    "description",
    "availability",
    "condition",
    "price",
    "link",
    "image_link",
    "brand",
    "product_type",
    "google_product_category",
  ];

  const rows = items.map((item) => [
  item.skuId || item.id,
  item.title || "",
  item.description || "",
  item.availability || "in stock",
  item.condition || "new",
  item.price || "",
  item.link || "",
  item.image || "",
  item.brand || "",
  item.productType || "",
  item.googleProductCategory || "",
]);

  return [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) =>
          `"${String(value ?? "").replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");
}