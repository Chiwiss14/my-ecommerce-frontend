// components/UpdateProductPage.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function UpdateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    if (!productId || !token) {
      setProductLoading(false);
      if (!token) {
        toast.error("Authentication required.");
      }
      return;
    }
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://my-ecommerce-backend-fzsl.onrender.com/api/products/${productId}`
        );
        const data = res.data;
        setFormData({
          name: data.name,
          price: data.price,
          description: data.description,
          image: null,
        });
        setExistingImage(data.image);
      } catch (err) {
        toast.error("Failed to load product details.");
      } finally {
        setProductLoading(false);
      }
    };
    fetchProduct();
  }, [productId, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // In your handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("You are not authorized to perform this action.");
      return;
    }

    if (!formData.name || !formData.price || !formData.description) {
      toast.error("Name, price, and description are required.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);

    if (formData.image) {
      data.append("image", formData.image);
    } else {
      data.append("image", existingImage);
    }

    try {
      setLoading(true);
      toast.loading("Updating product...");

      // ✅ Add the authorization header to the PUT request
      await axios.put(
        `https://my-ecommerce-backend-fzsl.onrender.com/api/admin/product/${productId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss();
      toast.success("Product updated successfully!");
      router.push("/admin");
    } catch (err) {
      toast.dismiss();
      console.error("Update error:", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Server error while updating."
      );
    } finally {
      setLoading(false);
    }
  };

  if (productLoading) {
    return (
      <div className="p-8 text-center text-white">
        Loading product details...
      </div>
    );
  }
  if (!productId) {
    return (
      <div className="p-8 text-center text-white">No product ID provided.</div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white shadow-md rounded-lg">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-pink-400 text-center">
        Update Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-400"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full border-gray-600 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-400"
          >
            Product Image
          </label>
          {existingImage && (
            <div className="mt-2">
              <p className="text-sm text-gray-400">Current Image:</p>
              <image
                src={existingImage}
                alt="Current Product"
                className="h-24 w-auto rounded-md object-cover"
              />
            </div>
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-2 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
