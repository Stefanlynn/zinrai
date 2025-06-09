import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Insights() {
  const [_, navigate] = useLocation();
  const [animatedIn, setAnimatedIn] = useState(false);
  
  // Animate component on mount
  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Grid Lines */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-20">
        {/* Horizontal grid lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal" style={{ animationDelay: '0.4s' }}></div>
        
        {/* Vertical grid lines */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/30 animate-grid-vertical" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/30 animate-grid-vertical" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/30 animate-grid-vertical" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/30 animate-grid-vertical" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/30 animate-grid-vertical" style={{ animationDelay: '0.9s' }}></div>
      </div>
      
      {/* Glow effects */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vh] bg-[var(--zinrai-blue-glow)]/5 rounded-full filter blur-[100px] animate-pulse opacity-30"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vh] bg-purple-500/5 rounded-full filter blur-[80px] animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Content area - IMPORTANT: This div allows scrolling! */}
      <div className="relative z-10 pb-16 page-content">
        <div className="flex flex-col justify-center items-center min-h-screen px-4">
          <div className={`text-center max-w-2xl transition-all duration-1000 ${animatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Coming Soon Header */}
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-8 tracking-wide">
              INSIGHTS
            </h1>
            
            {/* Coming Soon Message */}
            <div className="relative mb-10">
              <div className="text-[var(--zinrai-blue-glow)] text-lg md:text-xl font-medium mb-2 tracking-wide">
                COMING SOON
              </div>
              <div className="h-[1px] w-16 bg-[var(--zinrai-blue-glow)]/50 mx-auto"></div>
            </div>
            
            {/* Description */}
            <p className="text-white/70 text-base md:text-lg mb-10 leading-relaxed">
              Our Insights section is currently in development. Soon, you'll be able to access exclusive video content, testimonials, 
              training materials, and promotional resources right here.
            </p>
            
            {/* Visual element */}
            <div className="w-16 h-16 mx-auto mb-10 relative">
              <div className="absolute inset-0 rounded-full border border-[var(--zinrai-blue-glow)]/30 animate-ping"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-[var(--zinrai-blue-glow)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" fill="currentColor" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            
            {/* Check back note */}
            <p className="text-white/50 text-sm italic">
              Please check back soon for updates. We're working to bring you valuable content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}