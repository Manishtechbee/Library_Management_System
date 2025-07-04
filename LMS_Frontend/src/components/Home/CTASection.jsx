import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function CTASection({darkMode}) {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.4 }
    }
  };

  return (
   <section className={`${darkMode ? "bg-gradient-to-r from-[#020e1f] to-[#08213e]" : "bg-[#1b365d]"} text-white py-20`}>
  <motion.div
    className="max-w-4xl mx-auto px-6 text-center"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ amount: 0.3 }}
  >
    <h2 className="text-3xl font-bold mb-4">Ready to transform your library?</h2>
    <p className={`mb-6 text-lg ${
      darkMode ? "text-gray-300" : "text-gray-300"
    }`}>
      Join hundreds of students and faculty using our system to manage their digital library experience with ease.
    </p>

    <motion.a
      onClick={handleGetStarted}
      className={`inline-block font-semibold px-6 py-3 rounded-lg transition ${
        darkMode
          ? "bg-white text-[#091a2f] hover:bg-gray-200"
          : "bg-white text-[#1b365d] hover:bg-gray-200"
      }`}
      variants={buttonVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Started Now
    </motion.a>
  </motion.div>
</section>

  );
}
