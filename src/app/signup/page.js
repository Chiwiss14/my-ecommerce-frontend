"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Make sure this is correctly changed!
import { User, Mail, Lock } from "lucide-react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // New state to track success/failure
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsSuccess(false); // Reset success state
    setIsLoading(true);

    try {
      const res = await fetch("https://my-ecommerce-backend-fzsl.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) { // Check for successful HTTP status (e.g., 200, 201)
        setMessage(data.message || "Sign up successful! Redirecting for email verification...");
        setIsSuccess(true); // Set to true on success
        router.push(`/verify-email?email=${encodeURIComponent(email)}`); // Redirect to verify email page
      } else {
        // Handle backend errors (e.g., validation failed, user exists)
        setMessage(data.message || "Sign up failed.");
        setIsSuccess(false); // Set to false on failure
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error("Signup error:", error);
      setMessage("An unexpected error occurred. Please try again.");
      setIsSuccess(false); // Set to false on error
    } finally {
      setIsLoading(false); // Reset loading state
    }
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
              required
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
              required
              minLength={8}
            />
            <Lock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Continue"}
          </button>
        </form>

        {message && (
          // Use the new isSuccess state for styling
          <p className={`text-sm mt-2 ${isSuccess ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}