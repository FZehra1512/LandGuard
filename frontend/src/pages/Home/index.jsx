import React from 'react'
import heroVideo from "../../assets/videos/herovideo.mp4"
import Navbar from '../../components/Navbar';
import { Button } from "@/components/ui/button"
import ContactPage from '@/components/ContactForm';

const Home = () => {
  return (
    <>
      <header className="relative w-full max-w-screen h-screen overflow-hidden">
        <Navbar />
        {/* Video Background */}
        <video
          className="fixed -z-40 top-0 left-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
        />
        {/* Color Overlay */}
        <div className="absolute -z-30 top-0 left-0 w-full h-full bg-primaryColor bg-opacity-10"></div>
        {/* Centered Text */}
        <div className="relative z-0 pt-6 sm:pt-[4.5rem] flex items-center justify-center h-full text-center text-white">
          <div className="w-full px-6 sm:px-12 lg:px-0  md:w-4/5 lg:w-2/5 flex flex-col gap-8">
            <h1>
              Satellite Insights for a Greener Karachi
            </h1>
            <p className="text-xl font-medium">
              Using satellite imagery and machine learning to identify and
              transform underutilized spaces into thriving green areas.
            </p>
            <div className='w-full mt-4 text-center'>
              <Button variant="secondary" size="lg">Dashboard</Button>
            </div>
          </div>
        </div>
      </header>
      <ContactPage />
    </>
  );
}

export default Home;
