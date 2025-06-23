// Folder structure suggestion:
// src/components -> Navbar.jsx, Sidebar.jsx
// src/pages -> DashboardLayout.jsx, AdminDashboard.jsx, LibrarianDashboard.jsx, StudentDashboard.jsx
// Reusable components: NotificationBell.jsx, StatsCard.jsx, BookTable.jsx, FileUpload.jsx

// Example: AdminDashboard.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import BookTable from "../components/BookTable";
import NotificationBell from "../components/NotificationBell";
import { useState } from "react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar role="admin" sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 space-y-6 overflow-auto">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-blue-900">Admin Dashboard</h2>
            <NotificationBell />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatsCard title="Total Books" value="1,250" color="blue" />
            <StatsCard title="Total Users" value="520" color="green" />
            <StatsCard title="Issued Today" value="43" color="purple" />
            <StatsCard title="Overdue Books" value="12" color="red" />
          </div>

          {/* Book Table */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Recent Book Activities</h3>
            <BookTable />
          </div>
        </main>
      </div>
    </div>
  );
}

// You can replicate similar structure for LibrarianDashboard.jsx and StudentDashboard.jsx with personalised StatsCard and content based on role.
// Sidebar.jsx should render links conditionally based on 'role' prop.
// NotificationBell.jsx can handle real-time alerts via WebSocket.
// Add Recharts or Chart.js inside Analytics.jsx page.

// Let me know, I can generate full Sidebar.jsx, StudentDashboard.jsx, or LibrarianDashboard.jsx next.
