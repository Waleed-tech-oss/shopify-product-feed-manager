import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    shopDomain: {
      type: String,
      required: true,
      index: true,
    },

    feedName: {
      type: String,
      required: true,
      trim: true,
    },

    channel: {
  type: String,
  enum: [
    "google",
    "meta",
    "tiktok",
    "pinterest",
    "snapchat",
  ],
  default: "google",
  required: true,
},

    feedToken: {
      type: String,
      required: true,
      unique: true,
    },

    format: {
      type: String,
      enum: ["XML", "CSV"],
      required: true,
    },

    currency: {
      type: String,
      required: true,
      default: "USD",
    },

    language: {
      type: String,
      default: "en",
    },

    defaultCategory: {
      type: String,
      default: "",
    },

    googleProductCategory: {
    type: String,
    default: "",
    },

    includeOutOfStock: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    country: {
      type: String,
      default: "US",
    },

    targetMarket: {
      type: String,
      default: "Google Shopping",
    },
    schedule: {
  type: String,
  enum: [
    "15min",
    "30min",
    "1hour",
    "6hour",
    "12hour",
    "daily",
  ],
  default: "1hour",
},

lastGeneratedAt: {
  type: Date,
  default: null,
},
cachedContent: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

const Feed =
  mongoose.models.Feed ||
  mongoose.model("Feed", feedSchema);

export default Feed;