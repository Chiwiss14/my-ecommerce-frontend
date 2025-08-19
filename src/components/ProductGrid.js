'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';


const ProductGrid = () => {
  const [products, setProducts] = useState([]);

   useEffect(() => {

    axios
      .get("https://my-ecommerce-backend-fzsl.onrender.com/api/products")
      .then((response) => {
        console.log("API response:", response.data); // 👀 Check what comes back
        setProducts(
          Array.isArray(response.data)
            ? response.data
            : response.data.products || []
        );
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]); // so it doesn't stay stuck loading
      });
  }, []);

    // if (!products || !Array.isArray(products)) return <p>No products found.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;