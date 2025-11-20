import mongoose from "mongoose";
export default mongoose.model(
  "inputs",
  new mongoose.Schema(
    {
      type: { type: String, required: true },
      value: { type: String, required: true },
      label: { type: String, required: false },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { strict: false }
  )
);
