import React from 'react';
import Navbar from '../components/general/Navbar';
import HeroSection from '../components/Home/HeroSection';
import LandingPageSection from '../components/Home/LandingPageSection';
import Footer from '../components/general/Footer';

export default function Home({chatOpen ,setChatOpen}) {
  return (
    <div className="min-h-screen bg-white text-gray-800 ">
      <Navbar />
      <HeroSection />
      <LandingPageSection chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <Footer />
    </div>
  );
}
