import { useLoaderData } from "react-router";
import { useMemo, useState } from "react";
import "../styles/logs.css";

import { authenticate } from "../shopify.server";
import { getFeedLogs } from "../services/feed-log.service";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);

  const logs = await getFeedLogs(session.shop);

  const formattedLogs = logs.map((log) => ({
    ...log,
    _id: log._id.toString(),
  }));

  const stats = {
    total: formattedLogs.length,

    created: formattedLogs.filter(
      (log) => log.event === "PRODUCT_CREATE"
    ).length,

    updated: formattedLogs.filter(
      (log) => log.event === "PRODUCT_UPDATE"
    ).length,

    deleted: formattedLogs.filter(
      (log) => log.event === "PRODUCT_DELETE"
    ).length,
  };

  return {
    logs: formattedLogs,
    stats,
  };
}

export default function Logs() {
  const { logs, stats } = useLoaderData();

  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] =
    useState("ALL");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.productTitle
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesEvent =
        eventFilter === "ALL"
          ? true
          : log.event === eventFilter;

      return matchesSearch && matchesEvent;
    });
  }, [logs, search, eventFilter]);

  return (
    <div className="logs-container">

      <h1 className="logs-title">
        Feed Activity Logs
      </h1>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Events</h3>
          <h1>{stats.total}</h1>
        </div>

        <div className="stat-card created">
          <h3>Created</h3>
          <h1>{stats.created}</h1>
        </div>

        <div className="stat-card updated">
          <h3>Updated</h3>
          <h1>{stats.updated}</h1>
        </div>

        <div className="stat-card deleted">
          <h3>Deleted</h3>
          <h1>{stats.deleted}</h1>
        </div>

      </div>

      {/* Toolbar */}

      <div className="logs-toolbar">

        <input
          type="text"
          placeholder="🔍 Search Product..."
          className="search-input"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="filter-select"
          value={eventFilter}
          onChange={(e) =>
            setEventFilter(e.target.value)
          }
        >
          <option value="ALL">
            All Events
          </option>

          <option value="PRODUCT_CREATE">
            Created
          </option>

          <option value="PRODUCT_UPDATE">
            Updated
          </option>

          <option value="PRODUCT_DELETE">
            Deleted
          </option>

        </select>

      </div>

      {filteredLogs.length === 0 ? (

        <div className="empty-log">
          No activity found.
        </div>

      ) : (

        <table className="logs-table">

          <thead>

            <tr>
              <th>Time</th>
              <th>Event</th>
              <th>Product</th>
              <th>Vendor</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredLogs.map((log) => {

              let badgeClass = "";
              let badgeText = "";

              switch (log.event) {

                case "PRODUCT_CREATE":
                  badgeClass = "event-create";
                  badgeText = "Created";
                  break;

                case "PRODUCT_UPDATE":
                  badgeClass = "event-update";
                  badgeText = "Updated";
                  break;

                case "PRODUCT_DELETE":
                  badgeClass = "event-delete";
                  badgeText = "Deleted";
                  break;

                default:
                  badgeText = log.event;
              }

              return (

                <tr key={log._id}>

                  <td>
                    {new Date(
                      log.createdAt
                    ).toLocaleString()}
                  </td>

                  <td>
                    <span
                      className={`event-badge ${badgeClass}`}
                    >
                      {badgeText}
                    </span>
                  </td>

                  <td>{log.productTitle}</td>

                  <td>{log.vendor}</td>

                  <td
                    className={
                      log.status === "active"
                        ? "status-active"
                        : "status-draft"
                    }
                  >
                    {log.status}
                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      )}

    </div>
  );
}