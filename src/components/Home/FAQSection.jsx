import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "Is the Library Management System free to use?",
    answer: "Yes, the platform offers a free trial. After that, authorized users can access all features through their institutional credentials.",
  },
  {
    question: "Can I upload my own books, documents, or notes?",
    answer: "Absolutely! Admins and faculty members can upload books, PDFs, lecture materials, and past papers for students.",
  },
  {
    question: "Is there a dark mode or theme customization?",
    answer: "Yes, you can seamlessly switch between light and dark themes. The system remembers your last preference.",
  },
  {
    question: "Can students track borrowed books and due dates?",
    answer: "Yes, students can easily view their borrowed books, return dates, and pending fines through their dashboard.",
  },
  {
    question: "Is the system accessible on mobile devices?",
    answer: "Definitely. The Library Management System is responsive and works smoothly on desktops, tablets, and smartphones.",
  },
];

export default function FAQSection({darkMode}) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`${darkMode ? "bg-gray-900" : "bg-white"} py-20 h-fit`}>
  <div className="max-w-4xl mx-auto px-6">
    
    {/* Section Title Animation */}
    <motion.h2
      className={`text-3xl font-bold mb-10 text-center ${
        darkMode ? "text-white" : "text-[#1b365d]"
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      viewport={{ amount: 0.3 }}
    >
      Frequently Asked Questions
    </motion.h2>

    <div className="space-y-4">
      {faqs.map(({ question, answer }, index) => (
        <motion.div
          key={index}
          className={`border rounded-xl p-5 shadow hover:shadow-lg transition-all cursor-pointer ${
            darkMode
              ? openIndex === index
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-gray-800 border-gray-700 text-white"
              : openIndex === index
              ? "bg-gray-50"
              : "bg-white"
          }`}
          onClick={() => toggle(index)}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center">
            <h4 className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-[#1b365d]"
            }`}>
              {question}
            </h4>
            <motion.span
              className={`text-2xl ${
                darkMode ? "text-white" : "text-[#1b365d]"
              }`}
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {openIndex === index ? '−' : '+'}
            </motion.span>
          </div>

          {/* Smooth Expand/Collapse */}
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 0.5 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <p className={`mt-3 leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                  {answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
}
