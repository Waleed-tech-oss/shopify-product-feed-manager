import { saveWebhookLog } from "../webhook-log.service";
export async function handleProductDelete(shop, payload) {
  try {
    console.log("🔴 Product Deleted");
    console.log("Shop:", shop);
    console.log("Product ID:", payload.id);
    await saveWebhookLog({
  shopDomain: shop,
  event: "PRODUCT_DELETE",
  payload,
});

    // Future:
    // Remove from cache
    // Create Feed Log

    return true;
  } catch (error) {
    console.error("Delete Webhook Error:", error);
    throw error;
  }
}