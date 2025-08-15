"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // ✅ The card for one product

const ProductsGrid = () => {
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

  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductsGrid;
