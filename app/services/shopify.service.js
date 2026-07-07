export async function getProducts(admin) {
  const response = await admin.graphql(`
    query GetProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            vendor
            status

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

  return data.data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    vendor: node.vendor,
    status: node.status,
    image: node.featuredImage?.url || null,
    variant: node.variants.edges[0]?.node || null,
  }));
}