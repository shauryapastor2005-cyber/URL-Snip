import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // used as a named counter e.g. "url_counter"
  seq: { type: Number, default: 0 },
});

export const Counter = mongoose.model("Counter", counterSchema);
