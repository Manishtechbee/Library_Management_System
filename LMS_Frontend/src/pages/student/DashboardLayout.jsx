import { useState, useEffect } from "react";
import Chatbot from "../../components/general/Chatbot";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({ chatOpen, setChatOpen ,darkMode,setDarkMode}) {

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setDarkMode(user?.dark_mode || false);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setDarkMode(updatedUser?.dark_mode || false);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-800 text-white" : "bg-[#f4f8fb] text-gray-900"
      }`}
    >
      <Sidebar darkMode={darkMode} />
      
      {/* Main Content */}
      <div
        className={`flex-1 shadow-inner ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <Outlet />
      </div>

      {/* Chatbot Fixed at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <Chatbot open={chatOpen} setOpen={setChatOpen} darkMode={darkMode} />
      </div>
    </div>
  );
}
