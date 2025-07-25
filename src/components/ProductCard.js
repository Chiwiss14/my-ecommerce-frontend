import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md shadow hover:shadow-lg transition p-4 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="h-48 w-full object-cover rounded mb-4" 
      />
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-gray-500 mb-2">{product.description}</p>
      <div className="mt-auto flex justify-between items-center">
        <span className="text-green-600 font-bold">₦{product.price}</span>
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;