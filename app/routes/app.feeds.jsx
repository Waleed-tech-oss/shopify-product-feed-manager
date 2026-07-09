import { useActionData, useLoaderData } from "react-router";

import { authenticate } from "../shopify.server";
import EditFeedModal from "../components/EditFeedModal";
import FeedForm from "../components/FeedForm";
import FeedTable from "../components/FeedTable";
import "../styles/feed-table.css";
import { createFeed, getFeeds,deleteFeed,
  updateFeed} from "../services/feed.service";
import { validateFeed } from "../validators/feed.validator";

import { useState, useEffect } from "react";
import "../styles/feed-form.css";


// ---------------- Loader ----------------

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  const feeds = await getFeeds(session.shop);

  return {
    feeds: feeds.map((feed) => ({
      ...feed,
      _id: feed._id.toString(),
    })),
  };
}


// ---------------- Action ----------------

export async function action({ request }) {
  try {
    // Authenticate user first
    const { session } = await authenticate.admin(request);

    // Read form data
    const formData = Object.fromEntries(
      await request.formData()
    );

    // ==========================
    // DELETE FEED
    // ==========================
    if (formData.action === "delete") {
      await deleteFeed(formData.feedId);

      return {
        success: true,
        message: "Feed deleted successfully.",
      };
    }



    // ==========================
// UPDATE FEED
// ==========================
if (formData.action === "edit") {

  const result = await updateFeed(
  formData.feedId,
  {
    feedName: formData.feedName,
    channel: formData.channel,
    format: formData.format,
    currency: formData.currency,
    language: formData.language,
    country: formData.country,
    defaultCategory: formData.defaultCategory,

    // ✅ NEW
    googleProductCategory:
      formData.googleProductCategory,

    includeOutOfStock:
      formData.includeOutOfStock === "on",

    isActive:
      formData.isActive === "on",
  }
);

  return {
    success: true,
    message: "Feed updated successfully.",
    data: result,
  };
}




    // ==========================
    // VALIDATE CREATE FEED
    // ==========================
    const validation = validateFeed(formData);

    if (!validation.isValid) {
      return {
        success: false,
        message: "Please fill all required fields.",
        errors: validation.errors,
      };
    }

    // ==========================
    // CREATE FEED
    // ==========================
    const result = await createFeed({
  shopDomain: session.shop,
  feedName: formData.feedName,
  channel: formData.channel,
  format: formData.format,
  currency: formData.currency,
  language: formData.language,
  country: formData.country,
  defaultCategory: formData.defaultCategory,

  // ✅ NEW
  googleProductCategory:
    formData.googleProductCategory,

  includeOutOfStock:
    formData.includeOutOfStock === "on",

  isActive:
    formData.isActive === "on",
});

    return result;

  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
}


// ---------------- Component ----------------

export default function Feeds() {

  const actionData = useActionData();
  const { feeds } = useLoaderData();

    const [editingFeed, setEditingFeed] = useState(null);
    console.log("Editing Feed:", editingFeed);


    useEffect(() => {
  if (actionData?.success && editingFeed) {
    setEditingFeed(null);
  }
}, [actionData, editingFeed]);


  return (
    <div style={{ padding: "20px" }}>

      <h1>Feed Management</h1>

      {actionData?.message && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: actionData.success
              ? "#dcfce7"
              : "#fee2e2",
            color: actionData.success
              ? "#166534"
              : "#991b1b",
          }}
        >
          {actionData.message}
        </div>
      )}

      <FeedForm/>

      <EditFeedModal
  feed={editingFeed}
  onClose={() => setEditingFeed(null)}
/>
      
      <hr style={{ margin: "40px 0" }} />

<FeedTable feeds={feeds} onEdit={setEditingFeed} />

    </div>
  );
}