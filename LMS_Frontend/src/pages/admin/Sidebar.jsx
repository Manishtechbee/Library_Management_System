import { useNavigate, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaBook,
  FaPlus,
  FaUsers,
  FaUserShield,
  FaExchangeAlt,
  FaClock,
  FaChartBar,
  FaCog,
  FaFileExport,
  FaDatabase,
  FaBell,
  FaFileAlt,
  FaSignOutAlt,
  FaGlobe,
} from "react-icons/fa";

export default function AdminSidebar({darkMode}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const adminName = user?.name || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
    {darkMode?(<motion.div
  initial={{ x: -200, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className={`w-64 min-h-screen flex flex-col justify-between shadow-sm border-r ${
    darkMode
      ? "bg-gray-900 border-gray-700"
      : "bg-[#f0f7fc] border-[#d7e4f2]"
  }`}
>
  {/* Top Section */}
  <div className="p-6">
    <div className="flex items-center gap-3 mb-6">
      <img
        src={`https://ui-avatars.com/api/?name=${adminName.replace(
          " ",
          "+"
        )}&background=3a7ce1&color=fff`}
        alt="Avatar"
        className="w-10 h-10 rounded-full"
      />
      <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#1b365d]"}`}>
        {adminName}
      </h2>
    </div>

    {/* Navigation */}
    <nav className="space-y-3">
      {[
        { to: "/", icon: <FaGlobe />, label: "Home" },
        { to: "/dashboard/admin", icon: <FaTachometerAlt />, label: "Dashboard" },
        { to: "/dashboard/admin/books", icon: <FaBook />, label: "Books Management" },
        { to: "/dashboard/admin/users", icon: <FaUsers />, label: "All Users" },
        { to: "/dashboard/admin/librarians", icon: <FaUserShield />, label: "Manage Librarians" },
        { to: "/dashboard/admin/issue-requests", icon: <FaExchangeAlt />, label: "Issue Requests" },
        { to: "/dashboard/admin/overdue", icon: <FaClock />, label: "Overdue & Fines" },
        { to: "/dashboard/admin/reports", icon: <FaChartBar />, label: "Reports & Logs" },
        { to: "/dashboard/admin/backup", icon: <FaDatabase />, label: "Backup & Control" },
        { to: "/dashboard/admin/no-dues", icon: <FaFileAlt />, label: "No-Dues Panel" },
        { to: "/dashboard/admin/complaints", icon: <FaBell />, label: "Complaints" },
        { to: "/dashboard/admin/settings", icon: <FaCog />, label: "Settings" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition ${
              isActive
                ? darkMode
                  ? "bg-gray-800 text-white font-medium"
                  : "bg-[#dceafb] text-[#1b365d] font-medium"
                : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-[#dceafb]"
            }`
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  </div>

  {/* Logout */}
  <div className="p-6">
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className={`flex items-center justify-center gap-3 w-full p-2 rounded-lg transition ${
        darkMode
          ? "bg-blue-600 hover:bg-blue-500 text-white"
          : "bg-[#3a7ce1] hover:bg-[#285dad] text-white"
      }`}
    >
      <FaSignOutAlt />
      Logout
    </motion.button>
  </div>
</motion.div>
):(<motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 bg-[#f0f7fc] border-r border-[#d7e4f2] shadow-sm min-h-screen flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${adminName.replace(" ", "+")}&background=3a7ce1&color=fff`}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold text-[#1b365d]">{adminName}</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaGlobe />
            Home
          </NavLink>
          <NavLink
            to="/dashboard/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

         {/* {/* Books Management 
          <NavLink
            to="/dashboard/admin/books"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBook />
            All Books
          </NavLink>

          <NavLink
            to="/dashboard/admin/add-book"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaPlus />
            Add New Book
          </NavLink>*/}
          {/* Books Management */}
<NavLink
  to="/dashboard/admin/books"
  className={({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
      isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
    }`
  }
>
  <FaBook />
  Books Management
</NavLink>


          {/* Users Management */}
          <NavLink
            to="/dashboard/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaUsers />
            All Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/librarians"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaUserShield />
            Manage Librarians
          </NavLink>

          {/* Issue & Return */}
          <NavLink
            to="/dashboard/admin/issue-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaExchangeAlt />
            Issue Requests
          </NavLink>

          <NavLink
            to="/dashboard/admin/overdue"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaClock />
            Overdue & Fines
          </NavLink>

          {/* Reports */}
          <NavLink
            to="/dashboard/admin/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaChartBar />
            Reports & Logs
          </NavLink>

          {/* System Controls */}
          {/*<NavLink
            to="/dashboard/admin/export"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaFileExport />
            Export Data
          </NavLink>*/}

          <NavLink
            to="/dashboard/admin/backup"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaDatabase />
            Backup & Control
          </NavLink>

          <NavLink
            to="/dashboard/admin/no-dues"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaFileAlt />
            No-Dues Panel
          </NavLink>

          <NavLink
            to="/dashboard/admin/complaints"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBell />
            Complaints
          </NavLink>

          <NavLink
            to="/dashboard/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaCog />
            Settings
          </NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full p-2 bg-[#3a7ce1] text-white rounded-lg hover:bg-[#285dad] transition"
        >
          <FaSignOutAlt />
          Logout
        </motion.button>
      </div>
    </motion.div>)}
    </>
  );
}
