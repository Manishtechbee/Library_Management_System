import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-6xl font-bold text-[#1b365d] mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-[#3b82f6] text-white px-4 py-2 rounded hover:bg-[#2563eb] transition">
        Go to Home
      </Link>
    </motion.div>
  );
}
