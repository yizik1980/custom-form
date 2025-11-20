import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);