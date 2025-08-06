"use client";

import { useState } from "react";
import { User, Mail, Lock } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://my-ecommerce-backend-fzsl.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setMessage(data.message || "Sign up complete");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
      

          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none"
            />
            <Mail className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none"
            />
            <Lock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold"
          >
            Continue
          </button>
        </form>

        {message && <p className="text-sm mt-2 text-green-500">{message}</p>}
      </div>
    </div>
  );
}
