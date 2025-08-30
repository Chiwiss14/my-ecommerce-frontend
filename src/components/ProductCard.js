"use client";

import React from "react";
import Image from "next/image";
import PaystackCheckout from './PaystackCheckout';

const ProductCard = ({ product }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {product?.image && (
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="p-4"
          />
        </div>
      )}
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product?.name}</h3>
        <span className="text-sm text-gray-500 mb-2">{product?.category}</span>
        <p className="text-xl font-bold text-indigo-600 mb-4">${product?.price}</p>
        <PaystackCheckout product={product} />
      </div>
    </div>
  );
};

export default ProductCard;