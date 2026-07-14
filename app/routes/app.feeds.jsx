import { useActionData, useLoaderData } from "react-router";
import { authenticate } from "../shopify.server";
import EditFeedModal from "../components/EditFeedModal";
import FeedForm from "../components/FeedForm";
import FeedTable from "../components/FeedTable";
import "../styles/feed-table.css";
import { createFeed, getFeeds, deleteFeed, updateFeed } from "../services/feed.service";
import { validateFeed } from "../validators/feed.validator";
import { useState, useEffect } from "react";
import "../styles/feed-form.css";
import "../styles/feeds-page.css"; // 👈 NEW

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

// ---------------- Action (SAME - NO CHANGES) ----------------
export async function action({ request }) {
  try {
    const { session } = await authenticate.admin(request);
    const formData = Object.fromEntries(await request.formData());

    if (formData.action === "delete") {
      await deleteFeed(formData.feedId);
      return { success: true, message: "Feed deleted successfully." };
    }

    if (formData.action === "edit") {
      const result = await updateFeed(formData.feedId, {
        feedName: formData.feedName,
        channel: formData.channel,
        format: formData.format,
        currency: formData.currency,
        language: formData.language,
        country: formData.country,
        defaultCategory: formData.defaultCategory,
        googleProductCategory: formData.googleProductCategory,
        schedule: formData.schedule,
        includeOutOfStock: formData.includeOutOfStock === "on",
        isActive: formData.isActive === "on",
      });
      return { success: true, message: "Feed updated successfully.", data: result };
    }

    const validation = validateFeed(formData);
    if (!validation.isValid) {
      return {
        success: false,
        message: "Please fill all required fields.",
        errors: validation.errors,
      };
    }

    const result = await createFeed({
      shopDomain: session.shop,
      feedName: formData.feedName,
      channel: formData.channel,
      format: formData.format,
      currency: formData.currency,
      language: formData.language,
      country: formData.country,
      defaultCategory: formData.defaultCategory,
      googleProductCategory: formData.googleProductCategory,
      schedule: formData.schedule,
      includeOutOfStock: formData.includeOutOfStock === "on",
      isActive: formData.isActive === "on",
    });
    return result;

  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

// ---------------- Component ----------------
export default function Feeds() {
  const actionData = useActionData();
  const { feeds } = useLoaderData();
  const [editingFeed, setEditingFeed] = useState(null);

  useEffect(() => {
    if (actionData?.success && editingFeed) {
      setEditingFeed(null);
    }
  }, [actionData, editingFeed]);

  return (
    <div className="feeds-page">
      <h1 className="feeds-title">Feed Management</h1>

      {actionData?.message && (
        <div
          className={`feeds-alert ${
            actionData.success ? "alert-success" : "alert-error"
          }`}
        >
          {actionData.message}
        </div>
      )}

      <FeedForm />

      <EditFeedModal
        feed={editingFeed}
        onClose={() => setEditingFeed(null)}
      />

      <div className="feeds-divider"></div>

      <FeedTable feeds={feeds} onEdit={setEditingFeed} />
    </div>
  );
}