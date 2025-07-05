import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaCog,
  FaSearch,
  FaChartBar,
  FaFilePdf,
  FaBookmark,
  FaMoneyBillWave,
  FaBell,
  FaExclamationTriangle,
  FaUsers,
  FaPlusCircle,
  FaListAlt,
  FaLock,
  FaGlobe
} from "react-icons/fa";

export default function Sidebar({darkMode}) {
  const [booksMenuOpen, setBooksMenuOpen] = useState(false);
  
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const librarianName = user?.name || "Librarian";
  const role = user?.role || "librarian";
  const name=user?.name || role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
    {darkMode?(<><motion.div
  initial={{ x: -200, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className={`w-64 min-h-screen flex flex-col justify-between border-r shadow-sm ${
    darkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-[#f0f7fc] border-[#d7e4f2] text-gray-900"
  }`}
>
  {/* Top Section */}
  <div className="p-6">
    <div className="flex items-center gap-3 mb-6">
      <img
        src={`https://ui-avatars.com/api/?name=${name}&background=3a7ce1&color=fff`}
        alt="Avatar"
        className="w-10 h-10 rounded-full"
      />
      <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-[#1b365d]"}`}>
        {librarianName}
      </h2>
    </div>

    <nav className="space-y-3">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaGlobe />
        Home
      </NavLink>

      <NavLink
        to={`/dashboard/${role}`}
        end
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink
        to={`books`}
        state={{ tab: "book" }}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaBook />
        Books Management
      </NavLink>

      {/* User Handling */}
      <div className={`mt-4 mb-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        User Handling
      </div>

      <NavLink
        to={`/dashboard/${role}/users`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 pl-5 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaUsers />
        View Members
      </NavLink>

      <NavLink
        to={`/dashboard/${role}/borrowed-books`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 pl-5 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaBook />
        User Borrowed Books
      </NavLink>

      <NavLink
        to={`/dashboard/${role}/issue-history`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 pl-5 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaListAlt />
        Issue History
      </NavLink>

      <NavLink
        to={`/dashboard/${role}/block-user`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 pl-5 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaLock />
        Block User
      </NavLink>

      {/* Reports */}
      <div className={`mt-4 mb-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        Reports & Records
      </div>

      <NavLink
        to={`reports`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaChartBar />
        Reports & Status
      </NavLink>

      <NavLink
        to={`settings`}
        className={({ isActive }) =>
          `flex items-center gap-3 p-2 mt-4 rounded-lg transition ${
            isActive
              ? "bg-[#3a7ce1] text-white"
              : darkMode
              ? "hover:bg-gray-700 text-gray-200"
              : "hover:bg-[#dceafb] text-gray-700"
          }`
        }
      >
        <FaCog />
        Profile Settings
      </NavLink>
    </nav>
  </div>

  {/* Logout Button */}
  <div className="p-6">
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="flex items-center justify-center gap-3 w-full p-2 rounded-lg transition bg-[#3a7ce1] text-white hover:bg-[#285dad]"
    >
      <FaSignOutAlt />
      Logout
    </motion.button>
  </div>
</motion.div>
</>):(<><motion.div
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 bg-[#f0f7fc] border-r border-[#d7e4f2] shadow-sm min-h-screen flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${name}&background=3a7ce1&color=fff`}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold text-[#1b365d]">{librarianName}</h2>
        </div>

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
          {/* Dashboard */}
          <NavLink
            to={`/dashboard/${role}`}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          {/* Notifications *
          <NavLink
            to={`/dashboard/${role}/notifications`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBell />
            Notifications
          </NavLink>*/}

          {/* Book Management */}
          {/*<div className="mt-4 mb-1 text-gray-500 text-sm">Book Management</div>*/}

          <NavLink
            to={`books`}
            state={{ tab: "book" }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2  rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBook />
            Books Management
          </NavLink>

          {/*<NavLink
            to={`books`}
            state={{ tab: "all" }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaSearch />
            Search & Filter
          </NavLink>

          <NavLink
            to={`books`}
            
            state={{ tab: "request" }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaPlusCircle />
            Request to Add Book
          </NavLink>

          <NavLink
            to={`books`}
            
            state={{ tab: "report" }}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaExclamationTriangle />
            Report Lost/Damaged
          </NavLink>*/}

          {/* Student & User Handling */}
          <div className="mt-4 mb-1 text-gray-500 text-sm">User Handling</div>

          <NavLink
            to={`/dashboard/librarian/users`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaUsers />
            View Members
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/borrowed-books`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBook />
            User Borrowed Books
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/issue-history`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaListAlt />
            Issue History
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/block-user`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaLock />
            Block User
          </NavLink>

          {/* Issue & Return Operations */}
          {/*<div className="mt-4 mb-1 text-gray-500 text-sm">Issue & Return</div>*/}

          <NavLink
            to={`issue-requests`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBookmark />
            Issue & Return
          </NavLink>

          {/*<NavLink
            to={`/dashboard/${role}/returned-books`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBook />
            Mark as Returned
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/overdue`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaExclamationTriangle />
            Overdue List
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/manual-fine`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 pl-5 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaMoneyBillWave />
            Manual Fine Entry
          </NavLink>*/}

          {/* Reports */}
          <div className="mt-4 mb-1 text-gray-500 text-sm">Reports & Records</div>

          <NavLink
            to={`reports`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaChartBar />
            Reports & Status
          </NavLink>

          {/* Profile Settings */}
          <NavLink
            to={`settings`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 mt-4 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaCog />
            Profile Settings
          </NavLink>
        </nav>
      </div>

      {/* Logout Button */}
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
    </motion.div></>)}
    </>
  );
}
