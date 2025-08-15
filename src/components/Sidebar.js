"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  LogOut,
  PackagePlus,
  PackageCheck,
  PackageX,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react"; // Arrow icons

export default function Sidebar() {
  const [showProduct, setShowProduct] = useState(false);
<div></div>
  return (
    <aside className="w-64 bg-gray-800 p-4 space-y-4">
      <div className="text-xl font-bold text-pink-400">🛒 ShopAdmin</div>

      <nav className="flex flex-col gap-2">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-white hover:text-pink-400"
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {/* Product Dropdown */}
        <button
          onClick={() => setShowProduct(!showProduct)}
          className="flex items-center justify-between text-white hover:text-pink-400 focus:outline-none w-full"
        >
          <span className="flex items-center gap-2">
            <Package size={18} /> Products
          </span>
          {showProduct ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showProduct && (
          <div className="ml-6 flex flex-col gap-2 text-sm">
            <Link
              href="/admin/product/add"
              className="flex items-center gap-2 text-white hover:text-pink-300"
            >
              <PackagePlus size={16} /> Add Product
            </Link>
            <Link
              href="/admin/product/update"
              className="flex items-center gap-2 text-white hover:text-pink-300"
            >
              <PackageCheck size={16} /> Update Product
            </Link>
            <Link
              href="/admin/product/delete"
              className="flex items-center gap-2 text-white hover:text-pink-300"
            >
              <PackageX size={16} /> Delete Product
            </Link>
          </div>
        )}

        <Link
          href="/admin/transaction"
          className="flex items-center gap-2 text-white hover:text-pink-400"
        >
          <CreditCard size={18} /> Transactions
        </Link>

        <button className="flex items-center gap-2 text-white hover:text-red-400 mt-10">
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
}