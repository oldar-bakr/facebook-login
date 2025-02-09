import dbConnect from "@/lib/db";
import User from "@/models/user";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const { email, password } = req.body;

    // Save password as plain text
    const user = new User({ email, password });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res
      .status(500)
      .json({ error: "Failed to create user", details: error.message });
  }
}
