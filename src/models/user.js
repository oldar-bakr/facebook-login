import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }, // Stored as plain text
});

export default mongoose.models.User || mongoose.model("User", UserSchema);