import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaCog,
  FaSearch,
  FaQuestionCircle,
  FaFilePdf,
  FaMoneyBillWave,
  FaGlobe,
} from "react-icons/fa";

export default function Sidebar({darkMode}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.name || "Student";
  const role = user?.role || "student";

  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-64 min-h-screen flex flex-col justify-between border-r shadow-sm ${
        darkMode
          ? "bg-gray-900 border-gray-700"
          : "bg-[#f0f7fc] border-[#d7e4f2]"
      }`}
    >
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${studentName}&background=3a7ce1&color=fff`}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-white" : "text-[#1b365d]"
            }`}
          >
            {studentName}
          </h2>
        </div>

        <nav className="space-y-3">
          <SidebarLink
            to="/"
            icon={<FaGlobe />}
            label="Home"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}`}
            icon={<FaHome />}
            label="Dashboard"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}/MyBooks`}
            icon={<FaBook />}
            label="My Books"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}/catalog`}
            icon={<FaSearch />}
            label="Book Catalog"
            role={role}
            darkMode={darkMode}
          />
          {/*<SidebarLink
            to={`/dashboard/${role}/e-resources`}
            icon={<FaFilePdf />}
            label="E-Resources"
            role={role}
            darkMode={darkMode}
          />*/}
          <SidebarLink
            to={`/dashboard/${role}/fines`}
            icon={<FaMoneyBillWave />}
            label="Fines"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}/profile`}
            icon={<FaUser />}
            label="Profile"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}/settings`}
            icon={<FaCog />}
            label="Settings"
            role={role}
            darkMode={darkMode}
          />
          <SidebarLink
            to={`/dashboard/${role}/support`}
            icon={<FaQuestionCircle />}
            label="Support"
            role={role}
            darkMode={darkMode}
          />
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className={`flex items-center justify-center gap-3 w-full p-2 rounded-lg transition ${
            darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-[#3a7ce1] text-white hover:bg-[#285dad]"
          }`}
        >
          <FaSignOutAlt />
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
}

function SidebarLink({ to, icon, label, role, darkMode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg transition ${
          isActive
            ? darkMode
              ? "bg-gray-700 text-white font-medium"
              : "bg-[#dceafb] text-[#1b365d] font-medium"
            : darkMode
            ? "text-gray-300 hover:bg-gray-800"
            : "text-gray-700 hover:bg-[#dceafb]"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
