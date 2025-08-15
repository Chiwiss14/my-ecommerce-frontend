"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useAuth } from "@/context/AuthContext"; // Import your AuthContext

export default function AdminLayoutClient({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, loading } = useAuth(); // Get user and loading state from context
  const router = useRouter(); // Initialize the Next.js router

  // Effect to check user role and redirect
  useEffect(() => {
    // Wait until the user data has finished loading
    if (loading) {
      return;
    }

    // Redirect if the user is not an admin
    if (!user || user.role !== "admin") {
      router.push("/"); // Redirect to the landing page or login page
    }
  }, [user, loading, router]); // Re-run this effect when user, loading, or router changes

  // Only render the layout if the user is an admin
  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching user data
  }

  if (!user || user.role !== "admin") {
    return <div>Access Denied</div>; // Show an access denied message before redirection
  }

  // Render the admin layout and its children if the user is an admin
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white md:flex-row">
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-full md:w-64 bg-gray-800 z-50 md:relative fixed top-0 left-0 h-full`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setShowSidebar(!showSidebar)} />
        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}