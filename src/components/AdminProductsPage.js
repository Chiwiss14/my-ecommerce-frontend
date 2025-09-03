"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { PackageCheck, PackageX } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; 

const AdminProductsPage = () => {
    // ✅ Get the token from your context
    const { token } = useAuth(); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://my-ecommerce-backend-fzsl.onrender.com/api/products");
            const fetchedData = response.data;
            setProducts(Array.isArray(fetchedData) ? fetchedData : fetchedData.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        // ✅ Add a check for the token
        if (!token) {
            toast.error("Authentication token not found. Please log in again.");
            return;
        }
        
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                // ✅ Add the authorization header to the delete request
                await axios.delete(
                    `https://my-ecommerce-backend-fzsl.onrender.com/api/admin/product/${productId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Product deleted successfully!");
                fetchProducts(); 
            } catch (error) {
                console.error("Error deleting product:", error);
                toast.error(error.response?.data?.message || "Failed to delete product.");
            }
        }
    };

    if (loading) {
        return <p className="text-center mt-8">Loading products...</p>;
    }

    if (!products || products.length === 0) {
        return <p className="text-center mt-8">No products found.</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <Toaster position="top-right" />
            <h1 className="text-3xl font-bold text-center mb-6">Manage Products</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Product Name</th>
                            <th className="py-2 px-4 border-b text-left">Price</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-700 transition-colors">
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">${product.price}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        <PackageX size={16} className="inline-block mr-1" /> Delete
                                    </button>
                                    <Link href={`/admin/product/update?id=${product._id}`}>
                                        <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors ml-2">
                                            <PackageCheck size={16} className="inline-block mr-1" /> Update
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductsPage;