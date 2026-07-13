export async function getShopifyProducts(admin) {
  const response = await admin.graphql(`
    query GetProducts {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            vendor
            productType
            description

            featuredImage {
              url
            }

            images(first: 10) {
              edges {
                node {
                  url
                }
              }
            }

            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  sku
                  barcode
                  price
                  compareAtPrice
                  inventoryQuantity
                  inventoryPolicy

                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await response.json();

  return data.data.products.edges.map(({ node }) => node);
}

export async function getProductCount(admin) {
  const response = await admin.graphql(`
    query {
      productsCount {
        count
      }
    }
  `);

  const data = await response.json();

  return data.data.productsCount.count;
}