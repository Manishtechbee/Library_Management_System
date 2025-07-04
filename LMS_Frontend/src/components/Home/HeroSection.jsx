import { motion } from "framer-motion";
import monitorImg from "../../assets/monitor.png";
import booksImg from "../../assets/book.png";

import darkMonitor from "../../assets/dark_monitor.png";
import darkBook from "../../assets/dark_book.png";
import { useNavigate } from "react-router-dom";

export default function HeroSection({darkMode}) {
  const navigate = useNavigate();

const handleGetStarted = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/login");
    return;
  }

  const role = user.role;
  if (role === "admin") navigate("/dashboard/admin");
  else if (role === "student") navigate("/dashboard/student");
  else if (role === "faculty") navigate("/dashboard/faculty");
  else if (role === "librarian") navigate("/dashboard/librarian");
  else navigate("/");
};


  return (
    <section className={`${darkMode ? "bg-[#0c1d33]" : "bg-[#e8f1fb]"} py-10 pb-40 relative overflow-hidden`}>
  <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-16">

    {/* LEFT CONTENT */}
    <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
      <motion.h1
        className={`text-[2.5rem] md:text-5xl font-bold leading-tight ${
          darkMode ? "text-white" : "text-[#1b365d]"
        }`}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        viewport={{ amount: 0.3 }}
      >
        Library<br />Management<br />System
      </motion.h1>

      <motion.p
        className={`text-lg md:text-base ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
        viewport={{ amount: 0.3 }}
      >
        Streamline library operations with ease.<br />Manage books, members, issuance, and returns efficiently.
      </motion.p>

      <motion.button
        onClick={handleGetStarted}
        className={`inline-block font-bold px-6 py-3 rounded-lg transition duration-200 ${
          darkMode
            ? "bg-blue-800 hover:bg-blue-700 text-white"
            : "bg-[#5F97CD] hover:bg-[#3a7ce1] text-white"
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      >
        Get Started
      </motion.button>
    </div>

    {/* RIGHT IMAGES */}
    <div className="md:w-1/2 relative z-10 flex justify-center">
      <motion.img
        src={darkMode?darkMonitor:monitorImg}
        alt="Library Monitor"
        className="w-[70%] max-w-md z-20"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      />
      <motion.img
        src={darkMode?darkBook:booksImg}
        alt="Book Stack"
        className="absolute -bottom-20 -left-40 w-140 md:w-64 z-30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        viewport={{ amount: 0.3 }}
      />
    </div>
  </div>

  {/* Decorative Bottom Shape */}
  <div
    className={`absolute bottom-0 left-0 w-full h-36 z-0 ${
      darkMode ? "bg-[#0a1528]" : "bg-[#d1e3f4]"
    }`}
  />
</section>

  );
}
