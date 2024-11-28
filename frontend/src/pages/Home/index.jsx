import React from 'react'
import heroVideo from "../../assets/videos/herovideo.mp4"
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <header className="relative max-w-screen h-screen overflow-hidden">
        <Navbar />
      {/* Video Background */}
      <video
        className="fixed -z-20 top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
      />
      {/* Color Overlay */}
      <div className="absolute z-0 top-0 left-0 w-full h-full bg-primaryColor bg-opacity-10"></div>
      {/* Centered Text */}
      <div className="relative pt-[4.5rem] flex items-center justify-center h-full text-center text-white">
        <div className="w-2/5 flex flex-col gap-8">
          <h1>
            Satellite Insights for a Greener Karachi
          </h1>
          <p className="text-lg md:text-xl font-medium">
            Using satellite imagery and machine learning to identify and
            transform underutilized spaces into thriving green areas.
          </p>
          <div className='w-full mt-4 text-center'>
            <button className="btn-gradient">Dashboard</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
