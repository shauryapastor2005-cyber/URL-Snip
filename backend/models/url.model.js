import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    expiresAt: {
      type: Date,
      default: null, // null means no expiry
    },
  },
  { timestamps: true },
);

export const URL = mongoose.model("URL", urlSchema);
