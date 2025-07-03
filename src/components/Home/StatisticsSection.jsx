import { motion } from 'framer-motion';

export default function StatisticsSection({darkMode}) {
  const stats = [
    { value: "20,000+", label: "Books Issued" },
    { value: "1,200+", label: "Active Users" },
    { value: "99%", label: "Uptime" },
    { value: "98%", label: "User Satisfaction" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className={`${darkMode ? "bg-gray-800" : "bg-[#f0f6fd]"} py-20`}>
  <div className="max-w-7xl mx-auto px-6 text-center">
    
    <motion.h2
      className={`text-3xl md:text-4xl font-bold mb-10 ${
        darkMode ? "text-white" : "text-[#1b365d]"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ amount: 0.3 }}
    >
      Our Impact
    </motion.h2>

    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      {stats.map(({ value, label }) => (
        <motion.div
          key={label}
          className={`shadow-md rounded-lg py-8 px-4 hover:shadow-lg transition ${
            darkMode ? "bg-gray-900 text-white" : "bg-white"
          }`}
          variants={statVariants}
          whileHover={{ scale: 1.05 }}
        >
          <p className={`text-3xl md:text-4xl font-bold ${
            darkMode ? "text-blue-400" : "text-[#3a7ce1]"
          }`}>
            {value}
          </p>
          <p className={`mt-2 text-sm md:text-base ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            {label}
          </p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

  );
}
