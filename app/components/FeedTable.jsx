import { Form } from "react-router";
import { useNavigate } from "react-router";

export default function FeedTable({ feeds, onEdit }) {
  const navigate = useNavigate();

  if (!feeds || feeds.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Feeds Found</h3>
        <p>Create your first product feed.</p>
      </div>
    );
  }

  return (
    <div className="feed-table-container">
      <h2>Created Feeds ({feeds.length})</h2>

      <table className="feed-table">
        <thead>
          <tr>
            <th>Feed Name</th>
            <th>Channel</th>
            <th>Format</th>
            <th>Currency</th>
            <th>Country</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {feeds.map((feed) => (
            <tr key={feed._id}>
              <td>{feed.feedName}</td>

             <td>
  <span
    className={`channel-badge ${
      feed.channel === "google"
        ? "google"
        : feed.channel === "meta"
        ? "meta"
        : feed.channel === "tiktok"
        ? "tiktok"
        : "pinterest"
    }`}
  >
    {feed.channel === "google"
      ? "🟢 Google"
      : feed.channel === "meta"
      ? "🔵 Meta"
      : feed.channel === "tiktok"
      ? "⚫ TikTok"
      : "📌 Pinterest"}
  </span>
</td>

              <td>{feed.format}</td>

              <td>{feed.currency}</td>

              <td>{feed.country}</td>

              <td>
                <span
                  className={
                    feed.isActive
                      ? "status active"
                      : "status inactive"
                  }
                >
                  {feed.isActive
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>

              <td>
                {new Date(
                  feed.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                <button
                  className="edit-btn"
                  type="button"
                  onClick={() => onEdit(feed)}
                >
                  Edit
                </button>

                <button
                  className="preview-btn"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/app/feed-preview?feedId=${feed._id}`
                    )
                  }
                >
                  Preview
                </button>

                <button
                  className="preview-btn"
                  onClick={() =>
                    navigate(
                      `/app/feed-details?feedId=${feed._id}`
                    )
                  }
                >
                  Details
                </button>

                <Form method="post">
                  <input
                    type="hidden"
                    name="action"
                    value="delete"
                  />

                  <input
                    type="hidden"
                    name="feedId"
                    value={feed._id}
                  />

                  <button
                    type="submit"
                    className="delete-btn"
                    onClick={(e) => {
                      if (
                        !window.confirm(
                          "Delete this feed?"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </Form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}