import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBook, FaClock, FaMoneyBillWave, FaCheckCircle, FaUser, FaFilePdf } from "react-icons/fa";

export default function FacultyDashboard() {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const [facultyName, setFacultyName] = useState("Faculty Member");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setFacultyName(user?.name || "Faculty Member");
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto p-4">
      
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">
          Welcome, {facultyName}!
        </h2>
        <p className="text-gray-600 text-lg">
          Here’s your quick overview for today.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "My Books Issued", value: "4", color: "#3a7ce1", icon: <FaBook /> },
          { label: "Books Due Soon", value: "1", color: "#f59e0b", icon: <FaClock /> },
          { label: "Unpaid Fines", value: "₹50", color: "#ef4444", icon: <FaMoneyBillWave /> },
          { label: "Recommendations Made", value: "2", color: "#10b981", icon: <FaCheckCircle /> },
        ].map(({ label, value, color, icon }, i) => (
          <motion.div
            key={label}
            className="bg-white shadow-md p-4 rounded-lg flex items-center gap-4 hover:shadow-lg transition"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.1 }}
          >
            <div className="text-2xl" style={{ color }}>{icon}</div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-xl font-bold" style={{ color }}>{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Issued Books Table */}
      <motion.div
        className="bg-white shadow-md p-6 rounded-lg space-y-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h4 className="text-xl font-bold text-[#1b365d]">My Issued Books</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Due Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Database Systems</td>
                <td className="p-2">25 June 2024</td>
                <td className="p-2 text-green-600">On Time</td>
              </tr>
              <tr>
                <td className="p-2">AI Fundamentals</td>
                <td className="p-2">28 June 2024</td>
                <td className="p-2 text-yellow-500">Due Soon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="bg-white shadow-md p-6 rounded-lg space-y-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h4 className="text-xl font-bold text-[#1b365d]">Book Recommendations Status</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>📖 "Clean Code" - <span className="text-green-600 font-medium">Approved</span></li>
          <li>📖 "AI in Education" - <span className="text-yellow-500 font-medium">Pending</span></li>
        </ul>
      </motion.div>

      {/* Announcements */}
      <motion.div
        className="bg-white shadow-md p-6 rounded-lg space-y-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h4 className="text-xl font-bold text-[#1b365d]">Library Announcements</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>📢 Library closed on 1st July</li>
          <li>📚 New books on Machine Learning added</li>
          <li>🎉 Workshop: "Academic Research Skills" on 5th July</li>
        </ul>
      </motion.div>

      {/* E-Resources */}
      <motion.div
        className="bg-white shadow-md p-6 rounded-lg space-y-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h4 className="text-xl font-bold text-[#1b365d]">Quick Access - E-Resources</h4>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3a7ce1] text-white rounded hover:bg-[#285dad]">
            <FaFilePdf /> Download PDFs
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3a7ce1] text-white rounded hover:bg-[#285dad]">
            📁 View Bookmarked Resources
          </button>
        </div>
      </motion.div>

    </div>
  );
}
