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
  FaQuestionCircle,
  FaFilePdf,
  FaBookmark,
  FaMoneyBillWave,
  FaGlobe,
  FaBullhorn,
  FaClipboardList,
  FaLightbulb,
  FaChartBar,
  FaGraduationCap
} from "react-icons/fa";

export default function Sidebar() {
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const studentName = user?.name || "User";
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
      className="w-64 bg-[#f0f7fc] border-r border-[#d7e4f2] shadow-sm min-h-screen flex flex-col justify-between"
    >
      {/* Top Section */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${studentName.replace(" ", "+")}&background=3a7ce1&color=fff`}
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-xl font-bold text-[#1b365d]">{studentName}</h2>
        </div>

        {/* Common Navigation */}
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

          <NavLink
            to={`/dashboard/${role}/catalog`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaSearch />
            Book Catalog
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/e-resources`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaFilePdf />
            E-Resources
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/announcements`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaBullhorn />
            Announcements
          </NavLink>
        </nav>

        {/* Role Specific Links */}
        <div className="mt-6 space-y-3">
          
          {/* Student Specific */}
          {role === "student" && (
            <>
              <NavLink
                to={`/dashboard/${role}/MyBooks`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaBook />
                My Books
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/reservations`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaBookmark />
                Reservations
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/fines`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaMoneyBillWave />
                Fines
              </NavLink>
            </>
          )}

          {/* Faculty Specific */}
          {role === "faculty" && (
            <>
              <NavLink
                to={`/dashboard/${role}/issued-books`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaClipboardList />
                Issued Books
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/student-supervision`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaGraduationCap />
                Student Supervision
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/fines`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaMoneyBillWave />
                My Fines
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/recommendations`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaLightbulb />
                Recommendations
              </NavLink>

              <NavLink
                to={`/dashboard/${role}/reports`}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                    isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
                  }`
                }
              >
                <FaChartBar />
                Reports & Insights
              </NavLink>
            </>
          )}

          {/* Common to All */}
          <NavLink
            to={`/dashboard/${role}/profile`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaUser />
            Profile
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/settings`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaCog />
            Settings
          </NavLink>

          <NavLink
            to={`/dashboard/${role}/support`}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition hover:bg-[#dceafb] ${
                isActive ? "bg-[#dceafb] font-medium text-[#1b365d]" : "text-gray-700"
              }`
            }
          >
            <FaQuestionCircle />
            Support
          </NavLink>
        </div>
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
    </motion.div>
  );
}
