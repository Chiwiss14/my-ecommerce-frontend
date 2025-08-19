"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
// import ProductCard from "./ProductCard"; // ✅ The card for one product

const ProductCard = ({product}) => {
 console.log(product)
  

  return (
    <div className="product-grid">
      <div key={product.id} className="product-card">
           { product?.image&&<Image src={product.image} alt={product.name} height={100} width={100} />}
            <h3>{product?.name}</h3>
            <p>${product?.price}</p>
             </div>
    </div>
  );
};

export default ProductCard;
