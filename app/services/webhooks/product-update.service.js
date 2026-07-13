import { saveWebhookLog } from "../webhook-log.service";
export async function handleProductUpdate(shop, payload) {
  try {
    console.log("🟡 Product Updated");
    console.log("Shop:", shop);
    console.log("Product ID:", payload.id);
    console.log("Title:", payload.title);
    console.log("Vendor:", payload.vendor);
    console.log("Status:", payload.status);
    await saveWebhookLog({
  shopDomain: shop,
  event: "PRODUCT_UPDATE",
  payload,
});

    // Future:
    // Update Feed Cache
    // Create Feed Log

    return true;
  } catch (error) {
    console.error("Update Webhook Error:", error);
    throw error;
  }
}