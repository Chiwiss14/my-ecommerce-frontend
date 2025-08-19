"use client";

import { Menu } from "lucide-react";
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow md:px-6">
      <button
        className="md:hidden text-white"
        onClick={onMenuClick}
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-6">
        <Link href="/" className="text-white hover:text-pink-400 font-semibold text-lg">
          Home
        </Link>
        <h1 className="text-lg font-semibold text-pink-400">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* ✅ Use the first letter of the user's email for the avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
          {user?.email ? user.email.charAt(0).toUpperCase() : 'N'}
        </div>
        <div className="text-sm text-right">
          {/* ✅ Display the user's email dynamically */}
          <div className="font-medium text-pink-400">{user?.email || "Admin"}</div>
          {/* ✅ Display the user's role dynamically */}
          <div className="text-gray-400 text-xs">{user?.role || "Admin"}</div>
        </div>
      </div>
    </div>
  );
}