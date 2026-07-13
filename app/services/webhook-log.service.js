import FeedLog from "../models/FeedLog";
import { connectDB } from "../lib/mongodb.server";

export async function saveWebhookLog({
  shopDomain,
  event,
  payload,
}) {
  try {
    await connectDB();

    await FeedLog.create({
      shopDomain,
      event,
      productId: String(payload.id),
      productTitle: payload.title || "Unknown Product",
      vendor: payload.vendor || "",
      status: payload.status || "",
    });

    console.log("✅ Feed Log Saved");
  } catch (error) {
    console.error("Feed Log Error:", error);
    throw error;
  }
}