import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StudentDashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [fines, setFines] = useState(0);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch student data from API (replace with real endpoints)
    setBorrowedBooks([
      { title: "Clean Code", dueDate: "2024-07-05" },
      { title: "Introduction to Algorithms", dueDate: "2024-07-10" },
    ]);
    setFines(50);
    setActivities([
      "Issued 'Clean Code'",
      "Returned 'Design Patterns'",
      "Paid fine of ₹50",
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar role="student" />
      <main className="ml-64 p-6">
        <motion.h2 
          className="text-2xl font-bold text-[#1b365d] mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to Your Dashboard
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-white p-4 rounded-lg shadow text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold text-blue-900">Books Borrowed</h4>
            <p className="text-2xl font-bold text-[#3a7ce1]">{borrowedBooks.length}</p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded-lg shadow text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold text-blue-900">Pending Fines</h4>
            <p className="text-2xl font-bold text-red-500">₹{fines}</p>
          </motion.div>
          <motion.div 
            className="bg-white p-4 rounded-lg shadow text-center"
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold text-blue-900">Due Alerts</h4>
            <p className="text-2xl font-bold text-[#3a7ce1]">
              {borrowedBooks.filter(book => new Date(book.dueDate) < new Date()).length}
            </p>
          </motion.div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-xl font-bold text-[#1b365d] mb-4">Recent Activities</h4>
          <ul className="text-gray-700 space-y-2">
            {activities.map((activity, index) => (
              <li key={index}>• {activity}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
