import React, { useEffect } from "react";

export default function Contact() {
  // Immediately show all elements when component mounts
  useEffect(() => {
    // Show all UI elements immediately
    document.querySelectorAll('.horizontal-line, .vertical-line, .border-line')
      .forEach(element => {
        element.classList.add('animate-in');
      });
  }, []);
  
  // Handle email button click
  const handleEmailClick = () => {
    window.location.href = 'mailto:support@zinrai.com'; // Email address unchanged for consistency
  };
  
  return (
    <div className="bg-black min-h-screen w-full overflow-y-auto">
      <div className="w-full">
        {/* Single section with contact information */}
        <section className="relative h-screen w-full page-content">
          {/* Grid for section */}
          <div className="grid grid-cols-2 grid-rows-4 h-screen w-full">
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
            <div className="border border-white/[0.03]"></div>
          </div>
          
          {/* Grid lines */}
          <div className="horizontal-line absolute top-1/4 left-0 w-full h-[1px] bg-white/[0.13]"></div>
          <div className="horizontal-line absolute top-1/2 left-0 w-full h-[1px] bg-white/[0.13]"></div>
          <div className="horizontal-line absolute top-3/4 left-0 w-full h-[1px] bg-white/[0.13]"></div>
          <div className="vertical-line absolute top-0 left-1/2 w-[1px] h-full bg-white/[0.13] transform -translate-x-[0.5px]"></div>
          
          {/* Border */}
          <div className="border-line absolute inset-0 border border-white/[0.13]"></div>
          
          {/* Navigation has been removed */}
          
          {/* Centered Contact Content */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-lg px-4 z-20">
            <h2 className="text-white text-2xl font-medium mb-4">Need assistance?</h2>
            <p className="text-white/80 text-lg mb-8">
              Contact our support team and we'll get you the help you need.
            </p>
            <button 
              className="bg-black border border-white/50 hover:border-white text-white py-3 px-8 transition-all duration-300 focus:outline-none hover:bg-white/10 mb-12"
              onClick={handleEmailClick}
            >
              <span className="text-sm uppercase tracking-wider">Send us an email</span>
            </button>
            
            {/* Company Information */}
            <div className="border-t border-white/20 pt-8">
              <div className="text-white/70 text-sm space-y-2">
                <div className="font-medium text-white/90">ZiNRAi LLC</div>
                <div className="text-white/60 text-xs leading-relaxed">
                  3333 Renaissance Blvd<br />
                  Suite #209<br />
                  Bonita Springs, FL 34134
                </div>
              </div>
            </div>
          </div>
          
          {/* SWIPE text has been removed */}
        </section>
      </div>
    </div>
  );
}