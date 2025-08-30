// app/admin/page.jsx

"use client";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DashboardCard from "@/components/DashboardCard";
import AdminProductsPage from "@/components/AdminProductsPage"; // ✅ Import the component

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Existing dashboard cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="Total Orders" value="1,587" trend="+11%" />
        <DashboardCard title="Revenue" value="$12,430" trend="+6%" />
        <DashboardCard title="Customers" value="3.2k" trend="-2%" />
        <DashboardCard title="Products" value="234" trend="+4%" />
      </div>

      {/* ✅ Add the list of all products here */}
      <AdminProductsPage />

      {/* Existing recent transactions table */}
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="py-2">Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-700/30">
                <td className="py-2">John Doe</td>
                <td>Sneakers</td>
                <td>18/07/2025</td>
                <td>$120</td>
                <td><span className="text-yellow-400">Pending</span></td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-gray-700/30">
                <td>Mary Jane</td>
                <td>Backpack</td>
                <td>17/07/2025</td>
                <td>$60</td>
                <td><span className="text-green-400">Delivered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}