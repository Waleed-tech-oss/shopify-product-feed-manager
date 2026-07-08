import crypto from "crypto";
import Feed from "../models/Feed";
import { connectDB } from "../lib/mongodb.server";

export async function createFeed(feedData) {
  await connectDB();

  const existingFeed = await Feed.findOne({
    shopDomain: feedData.shopDomain,
    feedName: feedData.feedName,
    format: feedData.format,
  });

  if (existingFeed) {
    return {
      success: false,
      message: "A feed with this name already exists.",
    };
  }

  const feed = await Feed.create({
    ...feedData,
    feedToken: crypto.randomUUID(),
  });

  return {
    success: true,
    message: "Feed created successfully.",
    data: feed,
  };
}

export async function getFeeds(shopDomain) {
  await connectDB();

  return await Feed.find({ shopDomain }).sort({
    createdAt: -1,
  })
  .lean();
}

export async function getFeedById(id) {
  await connectDB();

  return await Feed.findById(id);
}

export async function updateFeed(id, data) {
  await connectDB();

  return await Feed.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteFeed(id) {
  await connectDB();

  return await Feed.findByIdAndDelete(id);
}