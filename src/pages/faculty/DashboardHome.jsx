import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import NotificationBell from "../../components/general/NotificationBell";

import {
  FaBook,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaSearch,
  FaPlus,
  FaFilePdf,
  FaLightbulb,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function FacultyDashboard() {
  const [facultyName, setFacultyName] = useState("Faculty Member");
  const [stats, setStats] = useState({
    issuedBooks: 0,
    dueSoon: 0,
    unpaidFines: 0,
    recommendationsMade: 0,
  });
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [systemNotifications, setSystemNotifications] = useState([]);
  const navigate = useNavigate();

  const getBarColor = () => {
    if (profileCompletion < 50) return "bg-red-500";
    if (profileCompletion < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setFacultyName(user.name);

    if (!user?.id) return;

    fetch(`http://localhost:5000/api/faculty/stats/${user.id}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:5000/api/faculty/activity/${user.id}`)
      .then(res => res.json())
      .then(data => setActivityList(data))
      .catch(err => console.error(err));

    fetch(`http://localhost:5000/api/system-notifications`)
      .then(res => res.json())
      .then(data => {
        setSystemNotifications(data);
        data.forEach(note => {
          const toastId = `system-${note.id}`;
          if (!toast.isActive(toastId)) {
            toast.warn(note.message, {
              toastId,
              autoClose: false,
              theme: "light",
            });
          }
        });
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:5000/api/announcements?role=faculty`)
      .then(res => res.json())
      .then(data => setAnnouncements(data))
      .catch(err => console.error(err));

    // Mock Profile Completion Calculation
    setProfileCompletion(75); // You can replace with real logic
  }, []);

  return (
    <div className="space-y-8 p-6 pl-10">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-start mb-4"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">
            Welcome, {facultyName}!
          </h2>
          <p className="text-gray-600 text-lg">Here’s your quick overview for today.</p>
        </div>

        <NotificationBell userId={JSON.parse(localStorage.getItem("user"))?.id} />
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { icon: <FaBook className="text-blue-500 text-2xl" />, label: "My Books Issued", value: stats.issuedBooks },
          { icon: <FaClock className="text-yellow-500 text-2xl" />, label: "Books Due Soon", value: stats.dueSoon },
          { icon: <FaMoneyBillWave className="text-red-500 text-2xl" />, label: "Unpaid Fines", value: `₹${stats.unpaidFines}` },
          { icon: <FaCheckCircle className="text-green-500 text-2xl" />, label: "Recommendations Made", value: stats.recommendationsMade },
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
        className="bg-white shadow rounded-lg p-4 relative"
      >
        <p className="text-gray-700 font-medium mb-2">Profile Completion</p>
        <div className="w-full bg-gray-200 h-4 rounded-full relative group">
          <motion.div
            className={`h-4 rounded-full ${getBarColor()}`}
            style={{ width: `${profileCompletion}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${profileCompletion}%` }}
            transition={{ duration: 0.8 }}
          />
          {profileCompletion < 100 && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              Complete your profile to access full features
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">{profileCompletion}% completed</p>
      </motion.div>

      {/* Recent Activity & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2 flex flex-col h-full"
        >
          <div className="bg-white shadow rounded-lg p-4 flex flex-col h-full">
            <h2 className="font-semibold text-gray-700 mb-2">Recent Activity</h2>
            <ul className="space-y-2 text-sm text-gray-600 flex-grow">
              {activityList.length === 0 ? (
                <li>No recent activity found.</li>
              ) : (
                activityList.map((item, index) => (
                  <li key={index}>
                    {item.activity}
                    <span className="text-gray-400 text-xs"> ({new Date(item.timestamp).toLocaleString()})</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col h-full"
        >
          <div className="bg-white shadow rounded-lg p-4 flex flex-col h-full">
            <h2 className="font-semibold text-gray-700 mb-2">Announcements</h2>
            {announcements.length === 0 ? (
              <p className="text-gray-500 flex-grow">No announcements available.</p>
            ) : (
              <ul className="space-y-2 text-sm text-gray-600 flex-grow">
                {announcements.map((ann) => (
                  <li key={ann.id}>{ann.title} - {ann.message}</li>
                ))}
              </ul>
            )}
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
            onClick={() => navigate("/dashboard/faculty/catalog")}
          >
            <FaSearch /> Search Catalog
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => navigate("/dashboard/faculty/recommend")}
          >
            <FaLightbulb /> Recommend Books
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded"
            onClick={() => navigate("/dashboard/faculty/e-resources")}
          >
            <FaFilePdf /> E-Resources
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => navigate("/dashboard/faculty/MyBooks")}
          >
            <FaBook /> My Issued Books
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
            <a href="/dashboard/faculty/support" className="text-blue-500 hover:underline">
              FAQs or Support
            </a>
          </li>
          <li>
            <a href="/dashboard/faculty/profile" className="text-blue-500 hover:underline">
              Profile or Settings
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
