import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaComments, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password from the Account Settings page under 'Change Password.'"
    },
    {
      question: "How can I reserve a book?",
      answer: "Visit the Book Catalog, select your desired book, and click 'Reserve' if it's available."
    },
    {
      question: "Who do I contact for account-related issues?",
      answer: "For account or login issues, contact our support team using the options provided above."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleRedirect = (type) => {
    if (type === "email") {
      window.location.href = "mailto:support@librarysystem.com";
    } else if (type === "phone") {
      window.location.href = "tel:+919876543210";
    } else if (type === "chat") {
      window.location.href = "#chat-widget"; // Replace with actual chat section ID or URL
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start ">
      <div className="w-full max-w-5xl space-y-10">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-[#1b365d]">Support & Help Center</h1>
          <p className="text-gray-600 max-w-xl">Need assistance? Explore FAQs or contact us — we're happy to help!</p>
        </motion.div>

        {/* Contact Options */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-[#1b365d]">Contact Support</h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <div
              onClick={() => handleRedirect("email")}
              className="flex flex-col items-start bg-white p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#eef5ff] cursor-pointer transition"
            >
              <FaEnvelope className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold text-gray-700 mb-1">Email</h3>
              <p className="text-gray-500 text-sm">support@librarysystem.com</p>
            </div>

            <div
              onClick={() => handleRedirect("phone")}
              className="flex flex-col items-start bg-white p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#eef5ff] cursor-pointer transition"
            >
              <FaPhone className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold text-gray-700 mb-1">Phone</h3>
              <p className="text-gray-500 text-sm">+91 98765 43210</p>
            </div>

            <div
              onClick={() => handleRedirect("chat")}
              className="flex flex-col items-start bg-white p-6 rounded-xl shadow hover:shadow-lg hover:bg-[#eef5ff] cursor-pointer transition"
            >
              <FaComments className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold text-gray-700 mb-1">Live Chat</h3>
              <p className="text-gray-500 text-sm">Available via chat widget.</p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-[#1b365d]">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left hover:bg-[#eef5ff] transition rounded-t-xl"
                >
                  <span className="font-medium text-gray-700">{faq.question}</span>
                  {openFAQ === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="p-4 bg-[#f9fbff] text-gray-600 border-t border-gray-200 rounded-b-xl">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
