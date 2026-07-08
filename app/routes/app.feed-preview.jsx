import { useLoaderData } from "react-router";

import { authenticate } from "../shopify.server";
import { getShopifyProducts } from "../services/shopify-products.service";
import { generateXMLFeed } from "../services/xml-generator.service";


// export async function loader({ request }) {
//   await connectDB();

//   const url = new URL(request.url);

//   const feedId = url.searchParams.get("feedId");

//   if (!feedId) {
//     throw new Response("Feed ID is required", {
//       status: 400,
//     });
//   }

//   const feedDoc = await Feed.findById(feedId).lean();

// if (!feedDoc) {
//   throw new Response("Feed not found", {
//     status: 404,
//   });
// }

// const feed = {
//   ...feedDoc,
//   _id: feedDoc._id.toString(),
// };


//   const { admin } = await authenticate.admin(request);

//   const products = await getShopifyProducts(admin);

//   const xml = generateXMLFeed(products, feed);

//   return {
//     feed,
//     xml,
//   };
// }


export async function loader({ request }) {

  // Dynamic imports (server only)
  const { connectDB } = await import("../lib/mongodb.server");
  const { default: Feed } = await import("../models/Feed");

  await connectDB();

  const url = new URL(request.url);

  const feedId = url.searchParams.get("feedId");

  if (!feedId) {
    throw new Response("Feed ID is required", {
      status: 400,
    });
  }

  const feedDoc = await Feed.findById(feedId).lean();

  if (!feedDoc) {
    throw new Response("Feed not found", {
      status: 404,
    });
  }

  const feed = {
    ...feedDoc,
    _id: feedDoc._id.toString(),
  };

  const { admin } = await authenticate.admin(request);

  const products = await getShopifyProducts(admin);

  const xml = generateXMLFeed(products, feed);

  const productCount = products.length;

  return {
    feed,
    xml,
    productCount,
  };
}



// export default function FeedPreview() {
//   const { feed, xml } = useLoaderData();

//   return (
//     <div
//       style={{
//         padding: "30px",
//       }}
//     >
//       <h1>Feed Preview</h1>

//       <h2>{feed.feedName}</h2>

//       <pre
//         style={{
//           background: "#f4f4f4",
//           padding: "20px",
//           borderRadius: "8px",
//           overflowX: "auto",
//           maxHeight: "700px",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         {xml}
//       </pre>
//     </div>
//   );
// }




export default function FeedPreview() {

  const {
  feed,
  xml,
  productCount,
} = useLoaderData();

  return (
    <div style={{ padding: "30px" }}>

      <h1>Feed Preview</h1>

      <h2>{feed.feedName}</h2>

      <div
  style={{
    background: "#f8f8f8",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "25px",
  }}
>
  <h2>{feed.feedName}</h2>

  <p><strong>Status:</strong> {feed.isActive ? "Active" : "Inactive"}</p>

  <p>
  <strong>Channel:</strong>{" "}
  {feed.channel === "meta"
    ? "🔵 Meta Commerce"
    : "🟢 Google Merchant"}
</p>

  <p><strong>Format:</strong> {feed.format}</p>

  <p><strong>Currency:</strong> {feed.currency}</p>

  <p><strong>Country:</strong> {feed.country}</p>

  <p><strong>Total Products:</strong> {productCount}</p>
  <p>
  <strong>Feed Token:</strong>
  <br />
  {feed.feedToken}
</p>
</div>



      <button
  onClick={() => {
    const blob = new Blob([xml], {
      type: "application/xml",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${feed.feedName}.xml`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }}
  style={{
    marginBottom: "20px",
    padding: "10px 20px",
    background: "#008060",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Download XML
</button>


<h3
  style={{
    marginTop: "30px",
    marginBottom: "10px",
  }}
>
  XML Preview
</h3>

<button
  onClick={() => {
    const url =
      `${window.location.origin}/feed/${feed.feedToken}.xml`;

    navigator.clipboard.writeText(url);

    alert("Feed URL copied.");
  }}
  style={{
    marginLeft: "10px",
    padding: "10px 20px",
    cursor: "pointer",
  }}
>
  Copy Feed URL
</button>


      <pre
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          overflow: "auto",
          maxHeight: "700px",
          whiteSpace: "pre-wrap",
          fontSize: "14px",
        }}
      >
        {xml}
      </pre>

    </div>
  );
}