import mongoose from "mongoose";
export default mongoose.model(
  "inputs",
  new mongoose.Schema(
    {
      type: { type: String, required: true },
    },
    { strict: false }
  )
);
