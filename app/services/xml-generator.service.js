import { generateFeed } from "./feed/generator/feed-generator.service";

export function generateXMLFeed(products, feed) {
  return generateFeed(products, feed);
}