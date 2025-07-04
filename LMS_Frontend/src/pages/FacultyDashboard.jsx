import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function FacultyDashboard() {
  const [activeTab, setActiveTab] = useState("materials");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar role="faculty" />

      <main className="ml-64 p-6">
        <h2 className="text-3xl font-bold text-[#1b365d] mb-6">Faculty Dashboard</h2>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded-lg font-medium border transition ${
              activeTab === "materials"
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300 text-blue-900 hover:bg-gray-100"
            }`}
          >
            Course Materials
          </button>

          <button
            onClick={() => setActiveTab("performance")}
            className={`px-4 py-2 rounded-lg font-medium border transition ${
              activeTab === "performance"
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300 text-blue-900 hover:bg-gray-100"
            }`}
          >
            Student Performance
          </button>

          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-4 py-2 rounded-lg font-medium border transition ${
              activeTab === "suggestions"
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300 text-blue-900 hover:bg-gray-100"
            }`}
          >
            Book Suggestions
          </button>
        </div>

        {activeTab === "materials" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#1b365d]">
              Upload Course Materials
            </h3>
            <p className="text-gray-600 mb-4">
              Upload PDFs, lecture slides, and other resources for your students.
            </p>
            <input type="file" className="border p-2 rounded w-full" />
          </motion.div>
        )}

        {activeTab === "performance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#1b365d]">
              Student Performance Overview
            </h3>
            <p className="text-gray-600">
              View reading statistics and participation data to monitor student engagement.
            </p>
            {/* Placeholder for charts or table */}
          </motion.div>
        )}

        {activeTab === "suggestions" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-[#1b365d]">
              Suggest New Books
            </h3>
            <p className="text-gray-600 mb-4">
              Recommend useful books or resources for students.
            </p>
            <input
              type="text"
              placeholder="Book Title or Author"
              className="border p-2 rounded w-full mb-4"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Suggestion
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
