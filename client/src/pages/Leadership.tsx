import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Leadership() {
  const [pageLoaded, setPageLoaded] = useState(false);
  const [_, navigate] = useLocation();

  // Handle animations on page load
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Handle returning to home page
  const handleReturnToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen w-full pb-32">
      {/* Main content */}
      <div className="relative min-h-screen w-full flex items-center justify-center page-content">
        
        {/* Coming Soon Content */}
        <div className={`flex flex-col items-center justify-center text-center px-4 transition-all duration-1000 ${pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-white text-5xl md:text-7xl font-thin tracking-widest mb-6">LEADERSHIP</h1>
          
          <div className="w-[1px] h-12 bg-white/30 my-6"></div>
          
          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl">
            Our leadership team information is coming soon.
          </p>
          
          <p className="text-white/50 text-sm md:text-base mt-8 max-w-xl">
            We're carefully crafting profiles for each of our visionary leaders who are guiding ZiNRAi™'s transformative journey.
          </p>
          
          {/* Pulsing dot */}
          <div className="mt-16 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse"></div>
            <span className="text-white/50 text-xs uppercase tracking-wider">Coming Q3 2025</span>
          </div>
        </div>
        
        {/* Grid lines with animations */}
        <div className={`absolute top-[25vh] left-0 w-full h-[1px] bg-white/[0.13] transition-all duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-[50vh] left-0 w-full h-[1px] bg-white/[0.13] transition-all duration-700 delay-100 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-[75vh] left-0 w-full h-[1px] bg-white/[0.13] transition-all duration-700 delay-200 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute top-0 left-1/2 w-[1px] h-full bg-white/[0.13] transform -translate-x-[0.5px] transition-all duration-700 delay-300 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Border */}
        <div className={`absolute inset-0 border border-white/[0.13] transition-all duration-700 delay-400 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
}