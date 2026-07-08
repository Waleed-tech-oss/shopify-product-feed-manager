import { connectDB } from "../lib/mongodb.server";
import Feed from "../models/Feed";

import { generateXMLFeed } from "../services/xml-generator.service";
import { getShopifyProducts } from "../services/shopify-products.service";

import { authenticate } from "../shopify.server";

export async function loader({ request, params }) {

  await connectDB();

  const { token } = params;

  const feed = await Feed.findOne({
    feedToken: token,
    isActive: true,
  }).lean();

  if (!feed) {
    return new Response("Feed not found", {
      status: 404,
    });
  }

  const { admin } = await authenticate.admin(request);

  const products = await getShopifyProducts(admin);

  const xml = generateXMLFeed(products, feed);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}