import { useLoaderData } from "react-router";


export async function loader({ request }) {

  const { authenticate } = await import("../shopify.server");
  const { connectDB } = await import("../lib/mongodb.server");
  const { default: Feed } = await import("../models/Feed");

  await connectDB();

  const { session } = await authenticate.admin(request);

  const url = new URL(request.url);
  const feedId = url.searchParams.get("feedId");

  const feedDoc = await Feed.findById(feedId).lean();

  if (!feedDoc) {
    throw new Response("Feed not found", {
      status: 404,
    });
  }

  return {
    feed: {
      ...feedDoc,
      _id: feedDoc._id.toString(),
    },
  };
}
export default function FeedDetails() {

  const { feed } = useLoaderData();

  return (

    <div style={{ padding: "30px" }}>

      <h1>{feed.feedName}</h1>

      <p>
  <strong>Channel:</strong>{" "}
  {feed.channel === "meta"
    ? "🔵 Meta Commerce"
    : "🟢 Google Merchant"}
</p>

<p>
  <strong>Format:</strong> {feed.format}
</p>

      <p>
        <strong>Currency:</strong> {feed.currency}
      </p>

      <p>
        <strong>Country:</strong> {feed.country}
      </p>

      <p>
        <strong>Status:</strong>

        {feed.isActive
          ? " Active"
          : " Inactive"}

      </p>

    </div>

  );
}