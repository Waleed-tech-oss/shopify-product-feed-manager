import FeedLog from "../models/FeedLog";
import { connectDB } from "../lib/mongodb.server";

export async function getFeedLogs(shopDomain) {
  await connectDB();

  return await FeedLog.find({
    shopDomain,
  })
    .sort({ createdAt: -1 })
    .lean();
}


export async function getRecentLogs(
  shopDomain,
  limit = 5
) {
  await connectDB();

  return await FeedLog.find({
    shopDomain,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}