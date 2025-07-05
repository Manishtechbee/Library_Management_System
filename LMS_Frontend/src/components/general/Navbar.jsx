import { Link } from 'react-router-dom';
import logo from '../../assets/book-icon.png';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar({ darkMode, toggleDarkMode }) {

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const linkHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };
  const [mobileMenuOpen,setMobileMenuOpen]=useState(false);

  return (
    <motion.header 
  className={`${darkMode ? "bg-gray-800 text-white shadow-lg" : "bg-white text-blue-900 shadow-sm"} sticky top-0 z-50`}
  variants={navVariants}
  initial="hidden"
  animate="visible"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

    {/* Logo Section */}
    <motion.div 
      className="flex items-center space-x-2"
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <img src={logo} alt="logo" className="h-8 sm:h-10" />
      <h1 className="text-base sm:text-lg md:text-2xl font-semibold">Learning Management</h1>
    </motion.div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 text-sm md:text-base font-medium">
      <motion.a href="#features" className={`hover:${darkMode ? "text-blue-400" : "text-blue-600"}`} {...linkHover}>Features</motion.a>
      <motion.a href="#pricing" className={`hover:${darkMode ? "text-blue-400" : "text-blue-600"}`} {...linkHover}>Pricing</motion.a>
      
      <motion.div {...linkHover}>
        <Link 
          to="/login" 
          className={`border ${darkMode ? "border-white text-white hover:bg-white hover:text-black" : "border-blue-600 text-blue-900 hover:bg-blue-500 hover:text-white"} rounded-md px-4 py-1 transition`}
        >
          Log in
        </Link>
      </motion.div>

      {/* Dark Mode Toggle */}
      <motion.div 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-black-700" />
        )}
      </motion.div>
    </nav>

    {/* Mobile Menu Toggle */}
    <div className="md:hidden flex items-center space-x-3">
      {/* Dark Mode Toggle for mobile */}
      <div 
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <FaSun className="text-yellow-400" />
        ) : (
          <FaMoon className="text-black-700" />
        )}
      </div>

      {/* Mobile Menu Icon (hamburger) */}
      <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Menu Overlay */}
  {mobileMenuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
      <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-blue-900"} w-3/4 max-w-xs h-full p-6 space-y-6 shadow-lg`}>
        <button onClick={() => setMobileMenuOpen(false)} className="text-xl absolute top-4 right-4">
          &times;
        </button>

        <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block">Features</a>
        <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block">Pricing</a>
        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block border px-4 py-1 mt-4 rounded text-center">
          Log in
        </Link>
      </div>
    </div>
  )}
</motion.header>

  );
}
