import { Link } from 'react-router-dom';
import logo from '../../assets/book-icon.png';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

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

  return (
    <motion.header 
      className={`${darkMode ? "bg-gray-800 text-white shadow-lg" : "bg-white text-blue-900 shadow-sm"} sticky top-0 z-50`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src={logo} alt="logo" className="h-10" />
          <h1 className="text-lg md:text-2xl font-semibold">Library Management</h1>
        </motion.div>

        {/* Navigation Links & Icon */}
        <nav className="flex items-center space-x-4 md:space-x-6 text-xl md:text-base font-medium">
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
  className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
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
      </div>
    </motion.header>
  );
}
