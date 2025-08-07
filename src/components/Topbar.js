import { Menu } from "lucide-react";

export default function Topbar({ onMenuClick }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 shadow md:px-6">
      <button
        className="md:hidden text-white"
        onClick={onMenuClick}
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-semibold text-pink-400">Admin Panel</h1>

      <div className="flex items-center gap-3">
        {/* Replace with actual Avatar or User Info */}
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          N
        </div>
        <div className="text-sm text-right">
          <div className="font-medium text-white">Goodnews Okeregbu</div>
          <div className="text-gray-400 text-xs">Super Admin</div>
        </div>
      </div>
    </div>
  );
}