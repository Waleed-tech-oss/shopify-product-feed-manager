import { buildXMLFeed } from "../builder/feed-builder.service";
import { mapGoogleProducts } from "../mappers/google.mapper";
import { mapMetaProducts } from "../mappers/meta.mapper";

export function generateFeed(products, feed) {
  let items = [];

  switch (feed.channel) {
    case "meta":
      items = mapMetaProducts(products, feed);
      break;

    case "google":
    default:
      items = mapGoogleProducts(products, feed);
      break;
  }

  return buildXMLFeed({
    title: feed.feedName,
    link: `https://${feed.shopDomain}`,
    description: `${feed.channel} Product Feed`,
    items,
  });
}