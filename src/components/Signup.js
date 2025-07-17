"use client";

import { User, Mail, Lock } from "lucide-react";

export default function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-md dark:shadow-gray-700 space-y-4 text-center transition-colors">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Sign Up</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Hello there, sign up to continue.</p>

        <form className="space-y-4 text-left">
          {/* Name Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none transition-colors"
            />
            <User className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none transition-colors"
            />
            <Mail className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none transition-colors"
            />
            <Lock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              placeholder="Re-enter your password"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none transition-colors"
            />
            <Lock className="absolute top-3 left-3 text-gray-400 dark:text-gray-300" size={18} />
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold"
          >
            Continue
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center space-x-2 my-3">
          <hr className="w-1/4 border-gray-300 dark:border-gray-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <hr className="w-1/4 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google icon"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="Facebook"
            className="w-6 h-6 cursor-pointer"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/95/Twitter_new_X_logo.png"
            alt="X icon"
            className="w-6 h-6 cursor-pointer"
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          By continuing you confirm that you agree with our{" "}
          <span className="text-gray-600 dark:text-gray-300">Term &amp; Condition</span>
        </p>
      </div>
    </div>
  );
}
