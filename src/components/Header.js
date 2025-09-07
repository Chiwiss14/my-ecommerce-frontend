"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false); // 👈 state for mobile menu

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">QuickBuy</div>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>

          <Link href="/contact" className="hover:text-indigo-600">
            Contact
          </Link>

          {user?.role === "admin" && (
            <Link href="/admin">
              <span className="text-gray-800 hover:text-blue-600 font-semibold cursor-pointer">
                Dashboard
              </span>
            </Link>
          )}
        </nav>

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button className="relative">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 5M17 13l1.4 5M6 21h.01M18 21h.01"
              />
            </svg>
            <span className="absolute -top-2 -right-2 text-white text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>

          {/* Auth buttons */}
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="text-sm font-medium text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
          >
            Sign Up
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link
            href="/contact"
            className="block text-gray-700 hover:text-indigo-600"
          >
            Contact
          </Link>
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="block text-gray-800 hover:text-blue-600 font-semibold"
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
