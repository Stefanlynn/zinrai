import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function ConfirmationPage() {
  const [, setLocation] = useLocation();
  const [animateIn, setAnimateIn] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, []);

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[var(--zinrai-blue)]/10 to-transparent"></div>
      </div>
      
      {/* Subtle animated grid lines */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/30 animate-grid-vertical"></div>
        <div className="absolute left-2/4 top-0 bottom-0 w-[1px] bg-white/30 animate-grid-vertical"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/30 animate-grid-vertical"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/30 animate-grid-horizontal"></div>
      </div>
      
      {/* Content card with animation */}
      <div 
        className={`relative z-10 max-w-lg w-full bg-black border border-white/10 rounded-sm p-8 md:p-12 transition-all duration-1000 transform ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* ZiNRAi logo */}
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
            ZiNRAi
          </h1>
        </div>
        
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Welcome to ZiNRAi
        </h2>
        
        {/* Free enrollment confirmation */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-4 h-4 rounded-full bg-[var(--zinrai-blue-glow)] mr-3"></div>
          <p className="text-lg md:text-xl font-medium">Enrollment Complete. You're In.</p>
        </div>
        
        {/* Confirmation paragraph with free until June 1st message */}
        <p className="text-white/80 text-center mb-6">
          Thank you for joining ZiNRAi. Your free enrollment has been successfully processed, and your account is now active. You'll receive an email confirmation shortly with additional details.
        </p>
        
        <div className="bg-[var(--zinrai-blue-glow)]/10 border border-[var(--zinrai-blue-glow)]/30 p-4 rounded-sm mb-8">
          <p className="text-white/90 text-center text-sm">
            <span className="font-medium">FREE UNTIL JUNE 1ST, 2025</span> - On June 1st, a one-time activation fee of $200 will be charged. Then 28 days later, your monthly subscription will begin. No credit card required now. You'll be notified before any charges begin.
          </p>
        </div>
        
        {/* Backoffice setup instruction */}
        <p className="text-white/80 text-center mb-6">
          Click next to setup your backoffice
        </p>
        
        {/* Next button */}
        <div className="flex justify-center mb-10">
          <button 
            onClick={() => setLocation('/')}
            className="px-8 py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm hover:bg-[var(--zinrai-blue-glow)]/80 transition-colors duration-300 shadow-[0_0_15px_rgba(104,172,255,0.5)]"
          >
            <div className="flex items-center">
              <span className="mr-2">NEXT</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>
        
        {/* Support text */}
        <p className="text-white/60 text-sm text-center">
          If you have any issues accessing your account, contact <a href="mailto:support@zinrai.com" className="text-[var(--zinrai-blue-glow)] hover:underline">support@zinrai.com</a>
        </p>
      </div>
      
      {/* Subtle celebratory elements - glowing dots */}
      <div className={`absolute w-2 h-2 rounded-full bg-blue-400 blur-sm transition-all duration-1500 delay-500 ${animateIn ? 'opacity-70' : 'opacity-0'}`} style={{ top: '30%', left: '20%' }}></div>
      <div className={`absolute w-3 h-3 rounded-full bg-blue-500 blur-sm transition-all duration-1500 delay-700 ${animateIn ? 'opacity-70' : 'opacity-0'}`} style={{ top: '60%', left: '70%' }}></div>
      <div className={`absolute w-2 h-2 rounded-full bg-blue-300 blur-sm transition-all duration-1500 delay-900 ${animateIn ? 'opacity-70' : 'opacity-0'}`} style={{ top: '20%', left: '80%' }}></div>
      <div className={`absolute w-2 h-2 rounded-full bg-blue-400 blur-sm transition-all duration-1500 delay-1100 ${animateIn ? 'opacity-70' : 'opacity-0'}`} style={{ top: '70%', left: '30%' }}></div>
    </div>
  );
}