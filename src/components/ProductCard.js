"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import PaystackCheckout from './PaystackCheckout'; // ✅ Import the component


const ProductCard = ({ product }) => {
  console.log(product);
   if (!product) {
    return null;
  }
  return (
    <div className="product-grid">
      <div key={product.id} className="product-card">
        {product?.image && (
          <Image
            src={product.image}
            alt={product.name}
            height={100}
            width={100}
          />
        )}
        <h3>{product?.name}</h3>
        <p>${product?.price}</p>
        {/* ✅ Add the PaystackCheckout component here, passing the product data */}
        <PaystackCheckout product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
