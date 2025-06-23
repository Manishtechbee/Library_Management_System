import { motion } from 'framer-motion';
import StatisticsSection from '../components/StatisticsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import RoleShowcaseSection from '../components/RoleShowcaseSection'
import FAQSection from '../components/FAQSection'
import ChatbotSection from '../components/Chatbotsection'
import Chatbot from '../components/Chatbot'
import { useState } from 'react';
import FeaturesSection from '../components/FeaturesSection'
import CTASection from '../components/CTASection'

export default function LandingPageSection() {
  
  const [chatOpen, setChatOpen] = useState(false);

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
    <section className="bg-white py-20">
      <motion.div 
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }} // triggers every time at 30% visibility
      >

        {/* LEFT TEXT SECTION */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1b365d]">
            Streamline library operations with ease
          </h2>
          <p className="text-gray-600 text-lg">
            Our platform simplifies book management, member tracking, and returns — saving time for both students and librarians. Experience an efficient and paperless workflow.
          </p>
          <ul className="space-y-2 text-gray-700 list-disc pl-6">
            <li>Issue and return books with one click</li>
            <li>Track due dates and send reminders</li>
            <li>Easy management of library inventory</li>
          </ul>
        </div>

        {/* RIGHT PLACEHOLDER */}
        <motion.div
          className="md:w-1/2 bg-[#e8f1fb] h-64 w-full rounded-lg shadow-inner flex items-center justify-center text-blue-800 text-lg font-medium"
          variants={rightBoxVariants}
        >
          Digital Workspace Preview (Coming soon)
        </motion.div>

      </motion.div>
    </section>
    <FeaturesSection/>
        <StatisticsSection/>
        <TestimonialsSection/>
        <CTASection/>
        
        <RoleShowcaseSection/>
        <FAQSection/>
        <ChatbotSection setOpen={setChatOpen}/>
        <Chatbot open={chatOpen} setOpen={setChatOpen}/>
        
        </>
  );
}
