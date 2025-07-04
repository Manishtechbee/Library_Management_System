import { useState, useEffect } from "react";
import { FaUser, FaLock, FaCogs } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    dark_mode: false,
    notifications: true,
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setAdmin(user);
  }, []);

  const handleProfileUpdate = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/admin/profile/${admin.id}`, {
        name: admin.name,
        email: admin.email,
      })
      .then(() => {
        toast.success("Profile updated successfully");
        localStorage.setItem("user", JSON.stringify(admin));
      })
      .catch(() => toast.error("Failed to update profile"))
      .finally(() => setLoading(false));
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) return toast.error("Passwords do not match");
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/admin/password/${admin.id}`, passwords)
      .then(() => {
        toast.success("Password updated");
        setPasswords({ current: "", new: "", confirm: "" });
      })
      .catch(() => toast.error("Failed to update password"))
      .finally(() => setLoading(false));
  };

  const handleToggle = (key) => {
    const updated = { ...admin, [key]: !admin[key] };
    setAdmin(updated);
    axios
      .put(`http://localhost:5000/api/admin/settings/${admin.id}`, { [key]: updated[key] })
      .then(() => {
        toast.success(`${key.replace("_", " ")} updated`);
        localStorage.setItem("user", JSON.stringify(updated));
      })
      .catch(() => toast.error("Failed to update preference"));
  };

  return (
    <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-6 gap-6">
      
      {/* Sidebar */}
      <div className="w-full md:w-1/4 space-y-2">
        {[
          { label: "Profile", icon: <FaUser />, key: "profile" },
          { label: "Security", icon: <FaLock />, key: "security" },
          { label: "Preferences", icon: <FaCogs />, key: "preferences" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg ${
              activeTab === tab.key ? "bg-[#1b365d] text-white" : "bg-gray-100 text-gray-700"
            } hover:bg-[#1b365d]/90 hover:text-white transition`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 relative">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-[#1b365d] mb-2">Profile Settings</h2>
              <input
                type="text"
                className="border px-3 py-2 rounded w-full"
                placeholder="Name"
                value={admin.name}
                onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
              />
              <input
                type="email"
                className="border px-3 py-2 rounded w-full"
                placeholder="Email"
                value={admin.email}
                onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              />
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 bg-[#1b365d] text-white rounded hover:bg-[#163054]"
                disabled={loading}
              >
                Save Changes
              </button>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div
              key="security"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-[#1b365d] mb-2">Change Password</h2>
              <input
                type="password"
                className="border px-3 py-2 rounded w-full"
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
              <input
                type="password"
                className="border px-3 py-2 rounded w-full"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
              <input
                type="password"
                className="border px-3 py-2 rounded w-full"
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-[#1b365d] text-white rounded hover:bg-[#163054]"
                disabled={loading}
              >
                Update Password
              </button>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-[#1b365d] mb-2">Preferences</h2>

              <div className="flex items-center justify-between border px-4 py-3 rounded">
                <span className="text-gray-700">Dark Mode</span>
                <button
                  onClick={() => handleToggle("dark_mode")}
                  className={`px-4 py-2 rounded ${
                    admin.dark_mode ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {admin.dark_mode ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className="flex items-center justify-between border px-4 py-3 rounded">
                <span className="text-gray-700">Notifications</span>
                <button
                  onClick={() => handleToggle("notifications")}
                  className={`px-4 py-2 rounded ${
                    admin.notifications ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {admin.notifications ? "Enabled" : "Disabled"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )}