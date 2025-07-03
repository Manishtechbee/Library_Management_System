import { motion } from 'framer-motion';
import StatisticsSection from './StatisticsSection'
import TestimonialsSection from './TestimonialsSection'
import RoleShowcaseSection from './RoleShowcaseSection'
import FAQSection from './FAQSection'
import ChatbotSection from './Chatbotsection'
import Chatbot from '../general/Chatbot'
import { useEffect, useState } from 'react';
import FeaturesSection from './FeaturesSection'
import CTASection from './CTASection'

export default function LandingPageSection({chatOpen, setChatOpen, darkMode ,toggleDarkMode}) {
  
  
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const rightBoxVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' }
    }
  };


  return (
    <>
    <section className={`${darkMode ? "bg-gray-900" : "bg-white"} py-20`}>
  <motion.div 
    className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center"
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ amount: 0.3 }} // triggers every time at 30% visibility
  >

    {/* LEFT TEXT SECTION */}
    <div className="md:w-1/2 space-y-6">
      <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-[#1b365d]"}`}>
        Streamline library operations with ease
      </h2>
      <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        Our platform simplifies book management, member tracking, and returns — saving time for both students and librarians. Experience an efficient and paperless workflow.
      </p>
      <ul className={`space-y-2 list-disc pl-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        <li>Issue and return books with one click</li>
        <li>Track due dates and send reminders</li>
        <li>Easy management of library inventory</li>
      </ul>
    </div>

    {/* RIGHT PLACEHOLDER */}
    <motion.div
      className={`md:w-1/2 h-64 w-full rounded-lg shadow-inner flex items-center justify-center text-lg font-medium ${
        darkMode ? "bg-gray-800 text-blue-300" : "bg-[#e8f1fb] text-blue-800"
      }`}
      variants={rightBoxVariants}
    >
      Digital Workspace Preview (Coming soon)
    </motion.div>

  </motion.div>
</section>

    <FeaturesSection darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        <StatisticsSection darkMode={darkMode}/>
        <TestimonialsSection darkMode={darkMode}/>
        <CTASection darkMode={darkMode}/>
        
        <RoleShowcaseSection darkMode={darkMode}/>
        <FAQSection darkMode={darkMode}/>
        <ChatbotSection setOpen={setChatOpen} darkMode={darkMode}/>
        <Chatbot open={chatOpen} setOpen={setChatOpen} darkMode={darkMode}/>
        
        </>
  );
}
