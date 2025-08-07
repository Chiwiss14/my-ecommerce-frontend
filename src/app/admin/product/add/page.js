"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    ratings: "",
    comment: "",
    numberOfReviews: "",
    category: "",
    image: null, // file
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.description || !formData.image || !formData.category || !formData.ratings || !formData.comment || !formData.numberOfReviews) {
      toast.error("All fields are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("category", formData.category);
    data.append("ratings", formData.ratings);   
    data.append("comment", formData.comment);
    data.append("numberOfReviews", formData.numberOfReviews);

    try {
      setLoading(true);
      toast.loading("Adding product...");

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: data,
      });

      toast.dismiss();

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Something went wrong.");
        return;
      }

      toast.success("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        ratings: "",
        comment: "",
        numberOfReviews: "",
        image: null,
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-md mt-6">
      <Toaster position="top-right" />
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4 text-center">
        Add New Product
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter Product"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Price ($)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Input price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-600 file:text-white
              hover:file:bg-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Product details..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter category"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Ratings</label>
          <input
            name="ratings"
            type="number"
            value={formData.ratings}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Input ratings"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Comment</label>
          <input
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Input comment"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Number of Reviews</label>
          <input
            name="numberOfReviews"
            type="number"
            value={formData.numberOfReviews}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Input number of reviews"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white px-4 py-2 text-sm rounded-md hover:bg-pink-500 transition duration-200 flex items-center justify-center"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}