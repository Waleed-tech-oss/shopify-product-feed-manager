

import { useLoaderData } from "react-router";

import { authenticate } from "../shopify.server";

import { getFeedStats } from "../services/feed.service";
import { getRecentLogs } from "../services/feed-log.service";
import { getProductCount } from "../services/shopify-products.service";

import "../styles/dashboard.css";

export async function loader({ request }) {

  const { session, admin } =
    await authenticate.admin(request);

  const productCount =
    await getProductCount(admin);

  const feedStats =
    await getFeedStats(session.shop);

  const recentLogs =
    await getRecentLogs(session.shop);

  return {
    productCount,
    feedStats,
    recentLogs,
  };

}
export default function Dashboard() {

  const {
    productCount,
    feedStats,
    recentLogs,
  } = useLoaderData();

  return (

    <div className="dashboard">

      <h1 className="dashboard-title">
        Shopify Product Feed Manager
      </h1>

      <p className="dashboard-subtitle">
        Monitor feeds, products and webhook activity.
      </p>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>Total Products</h3>

          <h1>{productCount}</h1>

        </div>

        <div className="dashboard-card">

          <h3>Total Feeds</h3>

          <h1>
            {feedStats.totalFeeds}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>Active Feeds</h3>

          <h1>
            {feedStats.activeFeeds}
          </h1>

        </div>

        <div className="dashboard-card">

          <h3>Channels</h3>

          <h1>
            {feedStats.totalChannels}
          </h1>

        </div>

      </div>
            {/* Recent Activity */}

      <div className="dashboard-grid">

        <div className="dashboard-panel">

          <h2>Recent Activity</h2>

          {recentLogs.length === 0 ? (

            <p>No recent activity.</p>

          ) : (

            recentLogs.map((log) => {

              let badge = "";

              switch (log.event) {

                case "PRODUCT_CREATE":
                  badge = "🟢";
                  break;

                case "PRODUCT_UPDATE":
                  badge = "🟡";
                  break;

                case "PRODUCT_DELETE":
                  badge = "🔴";
                  break;

                default:
                  badge = "⚪";
              }

              return (

                <div
                  key={log._id}
                  className="activity-item"
                >

                  <div>

                    <strong>
                      {badge} {log.productTitle}
                    </strong>

                    <p>
                      {log.event.replace(
                        "PRODUCT_",
                        ""
                      )}
                    </p>

                  </div>

                  <small>
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </small>

                </div>

              );

            })

          )}

        </div>

        <div className="dashboard-panel">

          <h2>Feed Channels</h2>

          {feedStats.channels.map(
            (channel) => (

              <div
                key={channel}
                className="channel-item"
              >

                <span>

                  {channel === "google" &&
                    "🟢 Google"}

                  {channel === "meta" &&
                    "🔵 Meta"}

                  {channel === "tiktok" &&
                    "⚫ TikTok"}

                  {channel === "pinterest" &&
                    "📌 Pinterest"}

                  {channel === "snapchat" &&
                    "👻 Snapchat"}

                </span>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}