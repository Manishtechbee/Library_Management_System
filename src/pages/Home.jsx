import React from 'react';
import Navbar from '../components/general/Navbar';
import HeroSection from '../components/Home/HeroSection';
import LandingPageSection from '../components/Home/LandingPageSection';
import Footer from '../components/general/Footer';

export default function Home({chatOpen ,setChatOpen, darkMode, toggleDarkMode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800 ">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection darkMode={darkMode}/>
      <LandingPageSection chatOpen={chatOpen} setChatOpen={setChatOpen} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}
