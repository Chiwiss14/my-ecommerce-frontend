"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayoutClient({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

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