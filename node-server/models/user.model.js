import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("users", UserSchema);