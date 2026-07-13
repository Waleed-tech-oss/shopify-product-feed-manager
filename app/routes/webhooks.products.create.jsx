import { authenticate } from "../shopify.server";
import { handleProductCreate } from "../services/webhooks/product-create.service";

export async function action({ request }) {
  try {
    const { topic, shop, payload } =
      await authenticate.webhook(request);

    console.log("========== WEBHOOK ==========");
    console.log("Topic:", topic);

    await handleProductCreate(shop, payload);

    console.log("=============================");

    return new Response(null, { status: 200 });

  } catch (error) {
    console.error(error);

    return new Response("Webhook Error", {
      status: 500,
    });
  }
}