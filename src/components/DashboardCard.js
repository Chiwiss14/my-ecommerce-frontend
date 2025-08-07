"use client";
import { motion } from "framer-motion";

export default function DashboardCard({ title, value, trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-gray-800 p-4 rounded-xl shadow text-white cursor-pointer"
    >
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-green-400 mt-1">{trend} from last week</div>
    </motion.div>
  );
}