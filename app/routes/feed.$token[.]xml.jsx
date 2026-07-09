import { getShopifyProducts } from "../services/shopify-products.service";
import { generateXMLFeed } from "../services/xml-generator.service";

export async function loader({ params, request }) {
const { unauthenticated } = await import("../shopify.server"); 
 const { connectDB } = await import("../lib/mongodb.server");
  const { default: Feed } = await import("../models/Feed");

  await connectDB();

  const token = params.token;

  const feedDoc = await Feed.findOne({
    feedToken: token,
  }).lean();

  if (!feedDoc) {
    return new Response("Feed not found", {
      status: 404,
    });
  }

  const feed = {
    ...feedDoc,
    _id: feedDoc._id.toString(),
  };

const { admin } = await unauthenticated.admin(feed.shopDomain);
  const products = await getShopifyProducts(admin);

const feedContent = generateXMLFeed(products, feed);

const contentType =
  feed.channel === "tiktok"
    ? "text/csv"
    : "application/xml";

return new Response(feedContent, {
  headers: {
    "Content-Type": contentType,
  },
});
}