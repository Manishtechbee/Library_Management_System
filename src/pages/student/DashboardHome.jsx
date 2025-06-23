import { motion } from "framer-motion";

export default function DashboardHome() {
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-2">Welcome, Admin!</h2>
        <p className="text-gray-600 text-lg">Here’s what’s happening in your library today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Total Books", value: "1,250", color: "#3a7ce1" },
          { label: "Issued Today", value: "43", color: "#3a7ce1" },
          { label: "Overdue Books", value: "12", color: "#ef4444" },
          { label: "Registered Users", value: "520", color: "#3a7ce1" },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            className="bg-white shadow-md p-4 rounded-lg text-center hover:shadow-lg transition"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.1 }}
          >
            <h4 className="text-lg font-semibold text-blue-900">{label}</h4>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Activity Log */}
      <motion.div
        className="bg-white shadow-md p-6 rounded-lg"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h4 className="text-xl font-bold mb-4 text-[#1b365d]">Recent Activities</h4>
        <ul className="text-gray-700 space-y-2 text-sm">
          <li>📚 John issued <strong>“Clean Code”</strong></li>
          <li>📦 New book <strong>“AI for Beginners”</strong> added</li>
          <li>⚠️ Priya’s book is overdue by <strong>3 days</strong></li>
        </ul>
      </motion.div>
    </div>
  );
}
