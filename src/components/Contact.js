"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    query: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, query } = formData;

    if (!name || !email || !query) {
      toast.error("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      toast.loading("Sending your message...");

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, query }),
      });

      toast.dismiss();

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to send.");
        return;
      }

      toast.success("Your message has been sent!");
      setFormData({ name: "", email: "", query: "" });
    } catch (err) {
      toast.dismiss();
      toast.error("Server or network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b to-blue-200 px-4">
      <Toaster position="top-right" />
      <div className="bg-[#0D1B2A] text-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">CONTACT US</h2>
        <p className="mb-6 text-sm text-gray-300">
          Let us know your queries and we will get back to you in 1–3 business
          days!
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-xs font-medium text-gray-300 mb-1"
              htmlFor="name"
            >
              FULL NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border-b border-gray-500 text-sm outline-none placeholder-gray-400"
              autoComplete="name"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium text-gray-300 mb-1"
              htmlFor="email"
            >
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border-b border-gray-500 text-sm outline-none placeholder-gray-400"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium text-gray-300 mb-1"
              htmlFor="query"
            >
              QUERY
            </label>
            <textarea
              id="query"
              name="query"
              rows="3"
              placeholder="Tell us about your query"
              value={formData.query}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border-b border-gray-500 text-sm outline-none placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-[#0D1B2A] font-semibold py-2 rounded-full hover:bg-gray-200 transition"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
