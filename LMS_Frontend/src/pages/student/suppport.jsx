import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaComments, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Support({darkMode}) {
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
      window.location.href = "#chat-widget";
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-start p-5 ${
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
    }`}>
      <div className="w-full max-w-5xl space-y-10">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold">Support & Help Center</h1>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} max-w-xl`}>
            Need assistance? Explore FAQs or contact us — we're happy to help!
          </p>
        </motion.div>

        {/* Contact Options */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold">Contact Support</h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Email */}
            <div
              onClick={() => handleRedirect("email")}
              className={`flex flex-col items-start p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition ${
                darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-[#eef5ff] text-gray-800"
              }`}
            >
              <FaEnvelope className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold">Email</h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>support@librarysystem.com</p>
            </div>

            {/* Phone */}
            <div
              onClick={() => handleRedirect("phone")}
              className={`flex flex-col items-start p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition ${
                darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-[#eef5ff] text-gray-800"
              }`}
            >
              <FaPhone className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold">Phone</h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>+91 98765 43210</p>
            </div>

            {/* Chat */}
            <div
              onClick={() => handleRedirect("chat")}
              className={`flex flex-col items-start p-6 rounded-xl shadow hover:shadow-lg cursor-pointer transition ${
                darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-[#eef5ff] text-gray-800"
              }`}
            >
              <FaComments className="text-[#3a7ce1] text-2xl mb-3" />
              <h3 className="font-semibold">Live Chat</h3>
              <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>Available via chat widget.</p>
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
          <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`rounded-xl shadow ${
                darkMode ? "bg-gray-700 text-white" : "bg-white"
              }`}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center p-4 text-left transition rounded-t-xl ${
                    darkMode ? "hover:bg-gray-600" : "hover:bg-[#eef5ff]"
                  }`}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openFAQ === index ? (
                    <FaChevronUp className={`${darkMode ? "text-gray-300" : "text-gray-500"}`} />
                  ) : (
                    <FaChevronDown className={`${darkMode ? "text-gray-300" : "text-gray-500"}`} />
                  )}
                </button>
                {openFAQ === index && (
                  <div className={`p-4 border-t rounded-b-xl ${
                    darkMode ? "bg-gray-800 border-gray-600 text-gray-300" : "bg-[#f9fbff] border-gray-200 text-gray-600"
                  }`}>
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
