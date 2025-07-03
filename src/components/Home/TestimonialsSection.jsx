import { motion } from 'framer-motion';

export default function TestimonialsSection({darkMode}) {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Librarian, UIET",
      text: "This system saved hours of manual work every week. The QR integration is a game changer!",
    },
    {
      name: "Rahul Mehta",
      role: "Student, CSE Department",
      text: "Easy to track my borrowed books and due dates. I love the dark mode and the clean UI!",
    },
    {
      name: "Dr. Kavita Sen",
      role: "Faculty, ECE Department",
      text: "Recommending books and uploading resources is so easy now. Very helpful for my students.",
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className={`${darkMode ? "bg-gray-900" : "bg-white"} py-20`}>
  <div className="max-w-6xl mx-auto px-6 text-center">

    <motion.h2
      className={`text-3xl font-bold mb-10 ${darkMode ? "text-white" : "text-[#1b365d]"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ amount: 0.3 }}
    >
      What Users Say
    </motion.h2>

    <motion.div
      className="grid gap-8 md:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3 }}
    >
      {testimonials.map(({ name, role, text }) => (
        <motion.div
          key={name}
          className={`shadow-md p-6 rounded-lg text-left border hover:shadow-lg transition ${
            darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-[#f3f8fd] text-[#1b365d] border-gray-200"
          }`}
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <p className={`italic mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            “{text}”
          </p>
          <div className="text-sm font-semibold">{name}</div>
          <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {role}
          </div>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

  );
}
