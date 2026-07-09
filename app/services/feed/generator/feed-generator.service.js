import { buildXMLFeed } from "../builder/feed-builder.service";
import { mapGoogleProducts } from "../mappers/google.mapper";
import { mapMetaProducts } from "../mappers/meta.mapper";
import { mapTikTokProducts } from "../mappers/tiktok.mapper";
import { buildCSVFeed } from "../builder/csv-builder.service";
export function generateFeed(products, feed) {
  let items = [];

  switch (feed.channel) {

  case "meta":
    items = mapMetaProducts(products, feed);
    break;

  case "tiktok":
    items = mapTikTokProducts(products, feed);
    break;

  case "google":
  default:
    items = mapGoogleProducts(products, feed);
    break;
}

if (feed.channel === "tiktok") {
  return buildCSVFeed(items);
}

return buildXMLFeed({
  title: feed.feedName,
  link: `https://${feed.shopDomain}`,
  description:
    feed.channel === "meta"
      ? "Meta Product Feed"
      : "Google Product Feed",
  items,
});
}