 "use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function DeleteProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await res.json();

        if (res.ok) {
          setProduct(data);
        } else {
          toast.error("Product not found.");
        }
      } catch (err) {
        toast.error("Failed to load product details.");
      }
    };

    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    if (!productId) return;

    try {
      setLoading(true);
      toast.loading("Deleting product...");

      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });

      toast.dismiss();

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.message || "Failed to delete product.");
        return;
      }

      toast.success("Product deleted successfully!");
      setProduct(null); // Clear product data after deletion
    } catch (err) {
      toast.dismiss();
      toast.error("Server error while deleting.");
    } finally {
      setLoading(false);
    }
  };

  if (!productId) {
    return (
      <div className="max-w-xl w-full mx-auto bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-md mt-6 text-center">
        <Toaster position="top-right" />
        <p>No product ID provided for deletion.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-xl w-full mx-auto bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-md mt-6 text-center">
        <Toaster position="top-right" />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl w-full mx-auto bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-md mt-6 text-center">
        <Toaster position="top-right" />
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl w-full mx-auto bg-gray-800 text-white p-4 sm:p-6 rounded-xl shadow-md mt-6">
      <Toaster position="top-right" />
      <h2 className="text-lg sm:text-xl font-semibold text-pink-400 mb-4 text-center">
        Delete Product
      </h2>
      <p className="mb-4 text-center">
        Are you sure you want to delete the product{" "}
        <span className="font-semibold">{product.name}</span>?
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
        >
          {loading ? "Deleting..." : "Delete Product"}
        </button>
      </div>
    </div>
  );
}