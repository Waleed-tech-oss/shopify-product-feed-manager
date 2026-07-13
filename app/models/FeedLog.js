import mongoose from "mongoose";

const feedLogSchema = new mongoose.Schema(
  {
    shopDomain: {
      type: String,
      required: true,
      index: true,
    },

    event: {
      type: String,
      enum: [
        "PRODUCT_CREATE",
        "PRODUCT_UPDATE",
        "PRODUCT_DELETE",
      ],
      required: true,
    },

    productId: {
      type: String,
      required: true,
    },

    productTitle: {
      type: String,
      required: true,
    },

    vendor: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const FeedLog =
  mongoose.models.FeedLog ||
  mongoose.model("FeedLog", feedLogSchema);

export default FeedLog;