import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/general/Navbar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">

      {/* Sidebar for Desktop */}
      <div className={`hidden md:block ${sidebarOpen ? "w-64" : "w-64"}`}>
        <Sidebar role="admin" />
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-white shadow-lg">
            <Sidebar role="admin" closeSidebar={() => setSidebarOpen(false)} />
          </div>
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar>
          <button
            className="md:hidden p-2 text-blue-900 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
        </Navbar>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-[#f5f8fc] overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
