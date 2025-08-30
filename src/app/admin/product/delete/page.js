"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios"; // ✅ Use axios for cleaner requests

export default function DeleteProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://my-ecommerce-backend-fzsl.onrender.com/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        toast.error("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (!productId) return;

    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      setLoading(true);
      toast.loading("Deleting product...");

      const res = await axios.delete(`https://my-ecommerce-backend-fzsl.onrender.com/admin/product/${productId}`);
      toast.dismiss();

      if (res.status === 200) {
        toast.success("Product deleted successfully!");
        router.push("/admin"); // Redirect to the admin dashboard
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Server error while deleting.");
    } finally {
      setLoading(false);
    }
  };

  if (!productId) return <div className="text-center mt-6">No product ID provided.</div>;
  if (!product) return <div className="text-center mt-6">Loading or Product not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-gray-800 text-white rounded-xl shadow-md mt-6 text-center">
      <Toaster position="top-right" />
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4">Delete Product</h2>
      <p className="mb-4">Are you sure you want to delete the product <span className="font-semibold">{product.name}</span>?</p>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
      >
        {loading ? "Deleting..." : "Delete Product"}
      </button>
    </div>
  );
}