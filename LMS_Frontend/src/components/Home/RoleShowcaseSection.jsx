import { motion } from 'framer-motion';

export default function RoleShowcaseSection({darkMode}) {
  const roles = [
    {
      title: "📘 Student",
      desc: "Track borrowed books, due dates, fines, and receive smart book suggestions tailored for you.",
    },
    {
      title: "👩‍🏫 Faculty",
      desc: "Upload materials, monitor student reading patterns, and suggest essential resources for your department.",
    },
    {
      title: "🧑‍💼 Admin",
      desc: "Effortlessly manage users, books, inventory, and procurement—all from one streamlined dashboard.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section className={`${darkMode ? "bg-gradient-to-r from-[#0c1d33] to-[#162c4c]" : "bg-gradient-to-r from-[#e8f1fb] to-[#d7e4f7]"} py-20`}>
  <div className="max-w-6xl mx-auto px-6 text-center">
    
    <motion.h2
      className={`text-3xl md:text-4xl font-bold mb-12 ${
        darkMode ? "text-white" : "text-[#1b365d]"
      }`}
      initial={{ opacity: 0, y: -15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ amount: 0.3 }}
    >
      Built for Every Role
    </motion.h2>

    <motion.div
      className="grid md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      {roles.map(({ title, desc }) => (
        <motion.div
          key={title}
          className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-transform border cursor-pointer ${
            darkMode
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-[#1b365d] border-gray-100"
          }`}
          variants={cardVariants}
          whileHover={{ scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <h3 className={`text-xl font-semibold mb-3 ${
            darkMode ? "text-blue-400" : "text-[#3a7ce1]"
          }`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}>
            {desc}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

  );
}
