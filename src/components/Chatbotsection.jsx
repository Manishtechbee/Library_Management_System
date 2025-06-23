import { FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function ChatbotSection({ setOpen }) {

  const containerVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96], when: "beforeChildren", staggerChildren: 0.15 } } };
  const iconVariants = { hidden: { rotate: -90, opacity: 0 }, visible: { rotate: 0, opacity: 1, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } } };
  const textVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const buttonVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } };

  return (
    <section className="bg-[#e8f1fb] py-20">
      <motion.div className="max-w-5xl mx-auto px-6 text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.4 }}>
        <motion.div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow mb-6" variants={iconVariants}>
          <FaRobot className="text-blue-700 text-3xl" />
        </motion.div>

        <motion.h2 className="text-3xl md:text-4xl font-bold text-[#1b365d] mb-4" variants={textVariants}>
          Need Help? Just Ask.
        </motion.h2>
        
        <motion.p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto" variants={textVariants}>
          Our AI-powered assistant can help you find books, check your status, or navigate the platform—24/7.
        </motion.p>
        
        <motion.button
          onClick={() => setOpen(true)}
          className="inline-block bg-[#3a7ce1] text-white font-semibold px-8 py-3 rounded-xl hover:bg-blue-800 transition"
          variants={buttonVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Try the Chat Assistant
        </motion.button>
      </motion.div>
    </section>
  );
}
