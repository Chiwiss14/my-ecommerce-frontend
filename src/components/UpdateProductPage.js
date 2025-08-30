"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function UpdateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState({ name: "", description: "", price: 0, category: "", image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://my-ecommerce-backend-fzsl.onrender.com/api/products/${productId}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load product details.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Updating product...");
      await axios.put(`https://my-ecommerce-backend-fzsl.onrender.com/api/products/${productId}`, product);
      toast.dismiss();
      toast.success("Product updated successfully!");
      router.push("/admin"); // Redirect back to admin dashboard
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to update product.");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading product details...</p>;
  if (!product.name) return <p className="text-center mt-8">Product not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-gray-800 text-white rounded-xl shadow-md mt-6">
      <Toaster position="top-right" />
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 mt-1 bg-gray-700 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 mt-1 bg-gray-700 rounded-md" rows="3" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 mt-1 bg-gray-700 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} className="w-full p-2 mt-1 bg-gray-700 rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400">Image URL</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} className="w-full p-2 mt-1 bg-gray-700 rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200">
          Update Product
        </button>
      </form>
    </div>
  );
}