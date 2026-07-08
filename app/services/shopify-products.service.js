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

            variants(first: 1) {
              edges {
                node {
                  id
                  sku
                  barcode
                  price
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await response.json();

  return data.data.products.edges.map(
    ({ node }) => node
  );
}