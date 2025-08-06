"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://my-ecommerce-backend-fzsl.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message , name, subject }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      setEmail("");
      setMessage("");
      setName("");
      setSubject("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-xl space-y-6 border border-gray-200"
    >
      {submitted ? (
        <p className="text-green-600 text-lg font-semibold text-center">
          ✅ Thank you for your message!
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-indigo-600 text-center">
            📬 Contact Us
          </h2>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              👤 Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              📝 Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              📧 Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              💬 Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-300"
          >
            🚀 Send Message
          </button>
        </>
      )}
    </form>
  );
}
