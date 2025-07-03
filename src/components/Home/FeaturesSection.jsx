// Example applied to FeaturesSection.jsx with viewport trigger every time
import { motion } from 'framer-motion'
import { FaUserShield, FaBookOpen, FaChartBar, FaBarcode, FaCloudUploadAlt, FaMoon } from 'react-icons/fa'

export default function FeaturesSection({darkMode, toggleDarkMode}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20
      }
    }
  }

  return (
    <section id='features' className={`${darkMode ? "bg-gray-900" : "bg-white"} py-20`}>
  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.h2
      className={`text-3xl font-bold mb-10 ${darkMode ? "text-white" : "text-[#1b365d]"}`}
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.3 }}
    >
      Core Features
    </motion.h2>

    <motion.div
      className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      {[
        { icon: <FaUserShield size={28} />, title: "Secure Auth", desc: "Role-based login for Admins, Librarians & Students" },
        { icon: <FaBookOpen size={28} />, title: "One-Click Issue/Return", desc: "Manage books with lightning speed and accuracy" },
        { icon: <FaChartBar size={28} />, title: "Analytics Dashboard", desc: "Visual charts for issued books & user activity" },
        { icon: <FaBarcode size={28} />, title: "QR/Barcode System", desc: "Auto-generate & scan for easy tracking" },
        { icon: <FaCloudUploadAlt size={28} />, title: "eBook/Paper Uploads", desc: "Upload PDFs, notes, past papers & more" },
        { icon: <FaMoon size={28} />, title: "Dark Mode", desc: "Toggle modern light/dark themes anytime" }
      ].map(({ icon, title, desc }) => (
        <motion.div
          key={title}
          className={`p-6 rounded-xl transition shadow-md hover:shadow-lg ${
            darkMode ? "bg-gray-800 text-white" : "bg-[#f3f8fd] text-[#1b365d]"
          }`}
          variants={cardVariants}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.1 }}
        >
          <div className={`${darkMode ? "text-blue-300" : "text-[#1b365d]"} mb-4`}>{icon}</div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm`}>{desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

  )
}
