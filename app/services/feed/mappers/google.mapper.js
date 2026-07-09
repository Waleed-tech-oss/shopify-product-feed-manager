import { mapBaseProducts } from "./base.mapper";

export function mapGoogleProducts(products, feed) {
  return mapBaseProducts(products, feed);
}