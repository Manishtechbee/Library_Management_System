import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import LandingPageSection from '../components/LandingPageSection'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <>
    <div className="bg-white text-gray-800 min-h-screen">
        <Navbar/>
        <HeroSection/>
        <LandingPageSection/>
        <Footer/>
    </div>
    
    </>
  )
}
