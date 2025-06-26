import { motion } from 'framer-motion';

export default function CTASection() {

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
    <section className="bg-[#1b365d] text-white py-20">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }} // Triggers every time at 30% visibility
      >
        <h2 className="text-3xl font-bold mb-4">Ready to transform your library?</h2>
        <p className="mb-6 text-gray-300 text-lg">
          Join hundreds of students and faculty using our system to manage their digital library experience with ease.
        </p>

        <motion.a
          href="/dashboard"
          className="inline-block bg-white text-[#1b365d] font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
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
