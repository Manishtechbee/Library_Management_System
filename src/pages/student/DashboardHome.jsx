import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaClock,
  FaMoneyBillWave,
  FaBookmark,
  FaSearch,
  FaPlus,
  FaFilePdf,
} from "react-icons/fa";

export default function DashboardHome() {
  const [profileCompletion] = useState(80);
  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.name || "Student";

  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">
          Welcome, {studentName}!
        </h2>
        <p className="text-gray-600 text-lg">Here's your overview for today.</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: <FaBook className="text-blue-500 text-2xl" />, label: "Total Books Issued", value: "12" },
          { icon: <FaClock className="text-yellow-500 text-2xl" />, label: "Books Due Soon", value: "3" },
          { icon: <FaMoneyBillWave className="text-red-500 text-2xl" />, label: "Unpaid Fines", value: "₹150" },
          { icon: <FaBookmark className="text-green-500 text-2xl" />, label: "Reservations Made", value: "2" },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="bg-white shadow rounded-lg p-4 flex items-center gap-4"
            whileHover={{ y: -2 }}
          >
            {card.icon}
            <div>
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white shadow rounded-lg p-4"
      >
        <p className="text-gray-700 font-medium mb-2">Profile Completion</p>
        <div className="w-full bg-gray-200 h-4 rounded-full">
          <motion.div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${profileCompletion}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${profileCompletion}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">{profileCompletion}% completed</p>
      </motion.div>

      {/* Recent Activity & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Recent Activity</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📕 Recently Issued: "Data Structures & Algorithms"</li>
              <li>📥 Recently Reserved: "Clean Code"</li>
              <li>✅ Recently Returned: "Database Systems"</li>
              <li>💳 Fine Paid: ₹50 for "Operating Systems"</li>
            </ul>
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="font-semibold text-gray-700 mb-2">Announcements</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📢 Library closed on 5th July</li>
              <li>📚 New books added to catalog</li>
              <li>⚙️ Maintenance scheduled for next weekend</li>
              <li>🎉 Book Reading Workshop on 10th July</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white shadow rounded-lg p-4"
      >
        <h2 className="font-semibold text-gray-700 mb-4">Quick Access</h2>
        <div className="flex flex-wrap gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/reservations")}
          >
            <FaPlus /> Reserve a Book
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/catalog")}
          >
            <FaSearch /> Search Catalog
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/fines")}
          >
            <FaMoneyBillWave /> Pay Fines
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/e-resources")}
          >
            <FaFilePdf /> View E-Resources
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => navigate("/dashboard/student/MyBooks")}
          >
            <FaBook /> My Books
          </motion.button>
        </div>
      </motion.div>

      {/* Helpful Resources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="bg-white shadow rounded-lg p-4"
      >
        <h2 className="font-semibold text-gray-700 mb-4">Helpful Resources</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>
            <a href="/dashboard/student/support" className="text-blue-500 hover:underline">
              FAQs or Support
            </a>
          </li>
          <li>
            <a href="/dashboard/student/profile" className="text-blue-500 hover:underline">
              Profile or Settings
            </a>
          </li>
          <li>
            <span className="text-gray-700">Chatbot available in bottom corner</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
