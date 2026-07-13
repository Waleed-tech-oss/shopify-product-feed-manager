import { saveWebhookLog } from "../webhook-log.service";
export async function handleProductCreate(shop, payload) {
  try {
    console.log("🟢 Product Created");
    console.log("Shop:", shop);
    console.log("Product ID:", payload.id);
    console.log("Title:", payload.title);
    console.log("Vendor:", payload.vendor);
    console.log("Status:", payload.status);
    await saveWebhookLog({
  shopDomain: shop,
  event: "PRODUCT_CREATE",
  payload,
});



    return true;
  } catch (error) {
    console.error("Create Webhook Error:", error);
    throw error;
  }
}