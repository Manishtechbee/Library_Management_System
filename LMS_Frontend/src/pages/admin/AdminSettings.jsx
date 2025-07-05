import { useState, useEffect } from "react";
import { FaUser, FaLock, FaCogs, FaCamera } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminSettings({ darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("https://ui-avatars.com/api/?name=Admin&background=cccccc&color=000&size=128");

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState(true);

  const storedUser = JSON.parse(localStorage.getItem("user"));

useEffect(() => {
  if (storedUser?.id) {
    fetch(`http://localhost:5000/api/student/${storedUser.id}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        const fallbackName = data.name || "Student";
        
        const ProfileImage = data.profileImage==null?
        `https://ui-avatars.com/api/?name=${encodeURIComponent(fallbackName)}&background=cccccc&color=000&size=128`:
        `http://localhost:5000${data.profileImage}`;
        console.log(ProfileImage);
        
        
          setAvatar(ProfileImage);
        
      })
      .catch(err => console.error(err));
  }
}, []);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);

      const formData = new FormData();
      formData.append("profileImage", file);
      fetch(`http://localhost:5000/api/student/upload-profile/${storedUser.id}`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setAvatar(`http://localhost:5000${data.imagePath}`);
          toast.success("Profile Image Updated!");
        })
        .catch(err => console.error(err));
    }
  };

  const handleSave = () => {
  fetch(`http://localhost:5000/api/student/${storedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, address })
  })
    .then(res => res.json())
    .then(data => {
      toast.success("Profile Updated Successfully!");

      // Update name in localStorage
      const updatedUser = { ...storedUser, name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    })
    .catch(err => console.error(err));
};


  const handleProfileUpdate = () => {
    setLoading(true);
    axios.put(`http://localhost:5000/api/admin/profile/${storedUser.id}`, {
      name, phone, address
    })
      .then(() => {
        toast.success("Profile updated successfully");
        const updatedUser = { ...storedUser, name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      })
      .catch(() => toast.error("Failed to update profile"))
      .finally(() => setLoading(false));
  };

  const handlePasswordChange = async () => {
  if (passwords.new !== passwords.confirm) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await fetch(`http://localhost:5000/api/student/update-password/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: passwords.current,
        newPassword: passwords.new,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } else {
      toast.error(data.message || "Incorrect current password.");
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while updating the password.");
  } finally {
    setLoading(false);
  }
};


  const handleToggleNotifications = () => {
    const updated = !notifications;
    setNotifications(updated);
    {/*axios.put(`http://localhost:5000/api/admin/settings/${storedUser.id}`, { notifications: updated })
      .then(() => {
        toast.success(`Notifications ${updated ? "enabled" : "disabled"}`);
      })
      .catch(() => toast.error("Failed to update notifications"));*/}
  };

  return (
    <div className={`flex flex-col md:flex-row max-w-5xl mx-auto p-6 gap-6 rounded-2xl ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
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
              activeTab === tab.key
                ? darkMode
                  ? "bg-blue-700 text-white"
                  : "bg-[#1b365d] text-white"
                : darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-100 text-gray-700"
            } hover:opacity-90 transition`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={`flex-1 rounded-lg shadow p-6 relative ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
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
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full border-2 border-gray-400 object-cover" />
                  <button
                    onClick={() => document.getElementById("avatarInput").click()}
                    className="absolute bottom-0 right-0 p-2 bg-gray-700 text-white rounded-full hover:bg-gray-500 transition"
                  >
                    <FaCamera />
                  </button>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <input
                type="text"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Email"
                value={email}
                disabled
              />
              <input
                type="text"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
              <h2 className="text-xl font-semibold mb-2">Change Password</h2>
              <input
                type="password"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Current Password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              />
              <input
                type="password"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              />
              <input
                type="password"
                className={`border px-3 py-2 rounded w-full ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900"}`}
                placeholder="Confirm New Password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
              <button
                onClick={handlePasswordChange}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
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
              <h2 className="text-xl font-semibold mb-2">Preferences</h2>

              <div className={`flex items-center justify-between border px-4 py-3 rounded ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <span>Dark Mode</span>
                <button
                  onClick={() => toggleDarkMode(!darkMode)}
                  className={`px-4 py-2 rounded ${darkMode ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  {darkMode ? "Enabled" : "Disabled"}
                </button>
              </div>

              <div className={`flex items-center justify-between border px-4 py-3 rounded ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <span>Notifications</span>
                <button
                  onClick={handleToggleNotifications}
                  className={`px-4 py-2 rounded ${notifications ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                  {notifications ? "Enabled" : "Disabled"}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
