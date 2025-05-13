import React, { useEffect } from "react";
import { useLocation } from "wouter";

export default function Profile() {
  // Import navigate for seamless navigation
  const [_, navigate] = useLocation();

  // Immediately show all elements when component mounts
  useEffect(() => {
    // Show all UI elements immediately
    document.querySelectorAll('.horizontal-line, .vertical-line, .border-line')
      .forEach(element => {
        element.classList.add('animate-in');
      });
  }, []);
  
  // Handle returning to home page
  const handleReturnToHome = () => {
    // Navigate to home page using wouter for seamless transition
    navigate('/');
  };
  
  return (
    <div className="bg-black min-h-screen w-full overflow-y-auto">
      {/* Grid Lines */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        {/* Horizontal grid lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></div>
        
        {/* Vertical grid lines */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10"></div>
      </div>
      
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="text-center max-w-md px-4">
          <h1 className="text-white text-3xl sm:text-4xl font-light mb-6 animate-content-glitch" style={{ animationDelay: '0.3s' }}>
            PROFILE
          </h1>
          
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-white/80 text-xl mb-6 animate-content-glitch" style={{ animationDelay: '0.5s' }}>
              Coming Soon
            </p>
            <p className="text-white/60 text-base animate-content-glitch" style={{ animationDelay: '0.7s' }}>
              User profile login and dashboard features will be available soon. Check back for updates.
            </p>
          </div>
          
          <div className="animate-content-glitch" style={{ animationDelay: '0.9s' }}>
            <button 
              className="border border-white/40 hover:border-white/70 px-8 py-3 text-white text-sm transition-all duration-300 bg-white/5 hover:bg-white/10"
              onClick={handleReturnToHome}
            >
              RETURN TO HOME
            </button>
          </div>
        </div>
        
        {/* Navigation has been removed */}
      </div>
    </div>
  );
}