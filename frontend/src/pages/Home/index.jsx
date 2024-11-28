import React from 'react'
import heroVideo from "../../assets/videos/herovideo.mp4"

const Home = () => {
  return (
    <header className="relative max-w-screen h-[120vh] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
      />
      {/* Color Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-primaryColor bg-opacity-20"></div>
      {/* Centered Text */}
      <div className="relative flex items-center justify-center h-full text-center text-white">
        <div className="w-2/5 flex flex-col gap-6">
          <h1>
            Satellite Insights for a Greener Karachi
          </h1>
          <p className="text-lg md:text-[1.375rem] font-medium">
            Using satellite imagery and machine learning to identify and
            transform underutilized spaces into thriving green areas.
          </p>
          <div className='w-full mt-8 text-center'>
            <button className="btn-gradient">Dashboard</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
