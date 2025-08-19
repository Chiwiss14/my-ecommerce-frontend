"use client"; // ✅ This must be the very first line of the file

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userEmailFromQuery = searchParams.get("email") || "";
  const [email, setEmail] = useState(userEmailFromQuery || "");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sendCodeLoading, setSendCodeLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  useEffect(() => {
    if (userEmailFromQuery && !isCodeSent && !sendCodeLoading) {
      handleSendVerificationCode(userEmailFromQuery);
    }
    if (userEmailFromQuery && userEmailFromQuery !== email) {
      setEmail(userEmailFromQuery);
    }
  }, [userEmailFromQuery, isCodeSent, sendCodeLoading, email]);

  const handleSendVerificationCode = async (targetEmail) => {
    if (!targetEmail) {
      setMessage("Please provide an email to send the code.");
      return;
    }

    setSendCodeLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `https://my-ecommerce-backend-fzsl.onrender.com/api/auth/send-verification-code`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: targetEmail }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Verification code sent! Check your inbox.");
        setIsCodeSent(true);
      } else {
        setMessage(data.message || "Failed to send verification code.");
        setIsCodeSent(false);
      }
    } catch (err) {
      setMessage("Network error: Could not send verification code.");
      setIsCodeSent(false);
    } finally {
      setSendCodeLoading(false);
    }
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!email || !code) {
      setMessage("Please enter both email and verification code.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://my-ecommerce-backend-fzsl.onrender.com/api/auth/verify-verification-code`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage("Email verified successfully! You can now log in.");
      } else {
        setMessage(
          data.message ||
            "Verification failed. Please check your code and email."
        );
      }
    } catch (err) {
      setMessage("Something went wrong during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
           {" "}
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md space-y-4 text-center">
               {" "}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Verify Your Email
        </h2>
               {" "}
        <p className="text-sm text-gray-600 dark:text-gray-400">
                    A verification code has been sent to{" "}
          {userEmailFromQuery || "your email"}.           If you dont see it,
          check your spam folder.        {" "}
        </p>
               {" "}
        <form
          onSubmit={handleSubmitVerification}
          className="space-y-4 text-left"
        >
                   {" "}
          <div className="relative">
                       {" "}
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
                       {" "}
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none"
              required
              readOnly={!!userEmailFromQuery}
            />
                       {" "}
            <Mail
              className="absolute top-3 left-3 text-gray-400 dark:text-gray-300"
              size={18}
            />
                     {" "}
          </div>
                   {" "}
          <div className="relative">
                       {" "}
            <label htmlFor="code" className="sr-only">
              Verification Code:
            </label>
                       {" "}
            <input
              type="text"
              id="code"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-full py-2.5 px-4 pl-11 text-sm outline-none"
              required
            />
                       {" "}
            <Lock
              className="absolute top-3 left-3 text-gray-400 dark:text-gray-300"
              size={18}
            />
                     {" "}
          </div>
                   {" "}
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold"
            disabled={loading || !isCodeSent}
          >
                        {loading ? "Verifying..." : "Verify Email"}         {" "}
          </button>
                 {" "}
        </form>
               {" "}
        {message && (
          <p
            className={`text-sm mt-2 ${
              message.includes("success") || message.includes("sent")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
                        {message}         {" "}
          </p>
        )}
               {" "}
        {!isCodeSent && !sendCodeLoading && userEmailFromQuery && (
          <button
            onClick={() => handleSendVerificationCode(userEmailFromQuery)}
            className="mt-4 text-sm text-blue-500 hover:underline"
            disabled={sendCodeLoading}
          >
                          Resend Code            {" "}
          </button>
        )}
               {" "}
        {sendCodeLoading && (
          <p className="text-sm mt-2 text-gray-500">Sending code...</p>
        )}
             {" "}
      </div>
         {" "}
    </div>
  );
}
