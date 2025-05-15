import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Define partner benefits
const benefits = [
  "BUSINESS TOOLS",
  "BRANDED ASSETS", 
  "COMPENSATION",
  "ONGOING TRAINING",
  "MENTORSHIP",
  "GLOBAL COMMUNITY"
];

// Define detailed partner information for Learn More modal
const partnerDetails = [
  {
    title: "Business Dashboard",
    description: "A personalized portal where you can track your referrals, earnings, customer activity, and rank progress in real time."
  },
  {
    title: "Commission Eligibility",
    description: "Unlock the ability to earn from both product referrals and team growth through ZiNRAi's structured compensation model."
  },
  {
    title: "Marketing Tools & Assets",
    description: "Professionally designed graphics, videos, and templates to help you share the brand with excellence—online and in person."
  },
  {
    title: "Training & Development",
    description: "Ongoing access to leadership calls, growth strategies, launch trainings, and mentorship from top leaders."
  },
  {
    title: "Private Community Access",
    description: "Connect with like-minded builders in private group chats, team events, and leadership forums."
  },
  {
    title: "Early Access Opportunities",
    description: "Be the first to hear about product releases, promotions, and upcoming campaigns."
  }
];

export default function Partner() {
  const [_, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  
  // Handle benefit item click
  const handleBenefitClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Handle close button click
  const handleClose = () => {
    navigate('/');
  };
  
  // Toggle Learn More modal
  const toggleLearnMoreModal = () => {
    setShowLearnMoreModal(!showLearnMoreModal);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('partner-learn-more-modal');
      if (modal && !modal.contains(event.target as Node) && showLearnMoreModal) {
        if (!(event.target as HTMLElement).closest('.partner-learn-more-btn')) {
          setShowLearnMoreModal(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLearnMoreModal]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showLearnMoreModal) {
        setShowLearnMoreModal(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showLearnMoreModal]);

  return (
    <div className="bg-black min-h-screen w-full overflow-hidden">
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
      
      {/* Learn More Modal */}
      {showLearnMoreModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay with grid lines matching the site*/}
          <div className="absolute inset-0 bg-black/95">
            {/* Grid lines in modal background */}
            <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-4 pointer-events-none opacity-30">
              <div className="border-r border-white/20"></div>
              <div className="border-l border-white/20"></div>
              <div className="border-b border-white/20 col-span-2"></div>
              <div className="border-b border-white/20 col-span-2"></div>
              <div className="border-b border-white/20 col-span-2"></div>
              <div className="col-span-2"></div>
            </div>
          </div>
          
          {/* Modal Container */}
          <div 
            id="partner-learn-more-modal"
            className="relative bg-black border border-white/20 w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto z-50 animate-in slide-up duration-500"
          >
            {/* Fixed Back button - better positioned and more visible */}
            <div className="sticky top-0 left-0 w-full bg-black/70 backdrop-blur-md p-4 z-50 flex border-b border-white/10">
              <button 
                className="flex items-center text-white/80 hover:text-white transition-all group" 
                onClick={toggleLearnMoreModal}
                aria-label="Go back"
              >
                <div className="relative h-10 w-10 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/70 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                <span className="text-white/70 group-hover:text-white text-sm font-medium tracking-wide">BACK</span>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-10 sm:p-12 pt-20">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-10 animate-in fade-in duration-300" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
                INDEPENDENT REPRESENTATIVE
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base mb-8 animate-in fade-in duration-300" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                Becoming a ZiNRAi Independent Representative means you're stepping into leadership with purpose, backed by powerful tools, training, and a global community.
              </p>
              
              <p className="text-white/80 text-sm sm:text-base mb-8 animate-in fade-in duration-300" style={{ animationDelay: '250ms', animationFillMode: 'forwards' }}>
                For $24.99/month, representatives gain access to:
              </p>
              
              <div className="space-y-10">
                {partnerDetails.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="border-b border-white/10 pb-10 last:border-b-0 animate-in fade-in duration-300" 
                    style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <h3 className="text-white text-lg sm:text-xl font-medium mb-4 flex items-center">
                      <span className="inline-block w-6 h-6 flex items-center justify-center border border-white/30 rounded-full text-sm mr-3">{index + 1}</span>
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed pl-9">{benefit.description}</p>
                  </div>
                ))}
              </div>
              
              <p className="text-white/80 text-sm sm:text-base italic mt-8 animate-in fade-in duration-300" style={{ animationDelay: `${200 + partnerDetails.length * 100}ms`, animationFillMode: 'forwards' }}>
                This is more than a role—it's a platform to lead, earn, and make an impact while being part of something that matters.
              </p>
              
              {/* JOIN NOW button - matching the Product page style */}
              <div 
                className="mt-12 flex justify-center animate-in fade-in duration-300"
                style={{ animationDelay: `${200 + partnerDetails.length * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="border border-white/40 hover:border-white/90 transition-all duration-300 bg-black hover:bg-black hover:translate-y-[-2px] transform hover:scale-[1.02]">
                  <a 
                    href="/subscribe"
                    className="block px-12 py-3 text-white text-sm tracking-wider no-underline font-medium font-bold !text-white"
                    style={{ color: 'white !important' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLearnMoreModal(false);
                      navigate('/subscribe');
                    }}
                  >
                    JOIN NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col relative z-10">
        
        {/* Partnership Title */}
        <div className="absolute top-[10vh] left-[10vw]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">
            INDEPENDENT REPRESENTATIVE
          </h1>
          <p className="text-white/80 text-base sm:text-lg mt-2 font-light">
            $24.99<span className="text-sm text-white/60">/month</span>
          </p>
        </div>
        
        {/* Benefits List */}
        <div className="absolute top-[25vh] sm:top-[30vh] md:top-[38vh] left-[5vw] sm:left-[10vw] space-y-4 sm:space-y-6 max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw]">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all duration-300 transform flex items-center ${activeIndex === index ? 'translate-x-4 opacity-100' : 'opacity-60 hover:opacity-80'}`}
              onClick={() => handleBenefitClick(index)}
            >
              {activeIndex === index && (
                <div className="mr-2">
                  <svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L5 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <h2 className={`text-white text-base sm:text-lg md:text-xl ${activeIndex === index ? 'font-medium' : 'font-light'}`}>
                {benefit}
              </h2>
            </div>
          ))}
        </div>
        

        {/* Action Buttons - Moved higher for better mobile visibility */}
        <div className="absolute bottom-[15vh] left-0 w-full p-6 md:p-0 md:bottom-[15vh] md:left-auto md:right-[10vw] md:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-center md:justify-end">
          {/* JOIN NOW button */}
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300 bg-white/5 hover:bg-white/10">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide"
              onClick={() => navigate('/subscribe')}
            >
              JOIN NOW
            </button>
          </div>
          
          {/* LEARN MORE button */}
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide partner-learn-more-btn"
              onClick={toggleLearnMoreModal}
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}