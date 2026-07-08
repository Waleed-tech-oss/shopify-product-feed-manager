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
  },
  {
    timestamps: true,
  }
);

const Feed =
  mongoose.models.Feed ||
  mongoose.model("Feed", feedSchema);

export default Feed;