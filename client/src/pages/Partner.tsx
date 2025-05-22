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
    title: "Business Tools",
    description: "Everything you need to launch and grow—at your fingertips. From your personal back office to smart tracking systems, we equip you with tools that simplify your business and amplify your results. No guesswork. Just clarity, control, and momentum."
  },
  {
    title: "Branded Assets",
    description: "You'll get instant access to high-quality, on-brand visuals designed to help you promote with professionalism. Social graphics, presentation templates, logos, videos—everything is done for you so you can focus on showing up and sharing confidently."
  },
  {
    title: "Compensation",
    description: "We believe great work deserves great reward. Our compensation plan is designed to be simple, generous, and sustainable—whether you're just getting started or building a global team. Earn through customer referrals, team growth, rank bonuses, and more."
  },
  {
    title: "Ongoing Training",
    description: "You're never left to figure it out alone. From your first day, you'll have access to expert-led education designed to help you grow with confidence. Our training includes weekly calls, business playbooks, personal development sessions, and essential compliance training—so you can build with clarity, integrity, and excellence. Whether you're launching your business or leading a team, we've got the support you need every step of the way."
  },
  {
    title: "Mentorship",
    description: "The best part? You don't have to do this by yourself. You'll be surrounded by mentors who have walked the path before you—leaders who believe in your potential and are invested in your growth. This isn't just business; it's personal development with a compass."
  },
  {
    title: "Global Community",
    description: "When you partner with ZiNRAi, you join a movement that stretches across borders. Our community is filled with like-minded leaders, dreamers, and doers—from all over the world—who are building, growing, and rising together. This is connection that multiplies impact."
  }
];

export default function Partner() {
  const [_, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    // Initial check
    handleResize();
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      {/* Grid Lines with Animation */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        {/* Horizontal grid lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 animate-grid-horizontal" style={{ animationDelay: '0.1s' }}></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-horizontal" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-horizontal" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-horizontal" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 animate-grid-horizontal" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Vertical grid lines */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10 animate-grid-vertical" style={{ animationDelay: '0.6s' }}></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10 animate-grid-vertical" style={{ animationDelay: '0.7s' }}></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/10 animate-grid-vertical" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10 animate-grid-vertical" style={{ animationDelay: '0.9s' }}></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10 animate-grid-vertical" style={{ animationDelay: '1.0s' }}></div>
      </div>
      
      {/* Learn More Modal */}
      {showLearnMoreModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="partner-modal-title"
        >
          {/* Overlay with grid lines matching the site*/}
          <div 
            className="absolute inset-0 bg-black/95"
            onClick={toggleLearnMoreModal}
          >
            {/* Grid lines in modal background */}
            <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-4 pointer-events-none opacity-30" aria-hidden="true">
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
            {/* Back button with improved visibility */}
            <button 
              className="fixed top-6 left-6 text-white hover:text-white transition-all group z-[60] flex items-center bg-black/90 px-4 py-2 border border-white/30 hover:border-white/70 focus:outline-none focus:ring-2 focus:ring-white/40" 
              onClick={toggleLearnMoreModal}
              aria-label="Close modal and go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-white font-medium">BACK</span>
            </button>
            
            {/* Modal Content */}
            <div className="p-10 sm:p-12 pt-20">
              <h2 id="partner-modal-title" className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-10 animate-in fade-in duration-300" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>
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
                    tabIndex={0}
                  >
                    <h3 
                      id={`benefit-title-${index}`} 
                      className="text-white text-lg sm:text-xl font-medium mb-4 flex items-center"
                    >
                      <span className="inline-block w-6 h-6 flex items-center justify-center border border-white/30 rounded-full text-sm mr-3" aria-hidden="true">{index + 1}</span>
                      {benefit.title}
                    </h3>
                    <p 
                      className="text-white/70 text-sm sm:text-base leading-relaxed pl-9"
                      aria-labelledby={`benefit-title-${index}`}
                    >
                      {benefit.description}
                    </p>
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
            BRAND PROMOTER
          </h1>
          <p className="text-white/80 text-base sm:text-lg mt-2 font-light">
            $24.95<span className="text-sm text-white/60">/month</span>
          </p>
        </div>
        
        {/* Benefits List - adjusted width for desktop */}
        <div className={`absolute top-[20vh] sm:top-[25vh] md:top-[28vh] left-[5vw] sm:left-[10vw] space-y-4 sm:space-y-6 ${isMobile ? 'max-w-[90vw] sm:max-w-[80vw]' : 'max-w-[35vw]'}`}>
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all duration-300 transform flex items-center ${activeIndex === index ? 'translate-x-4 opacity-100' : 'opacity-60 hover:opacity-80'}`}
              onClick={() => handleBenefitClick(index)}
            >
              <div className="mr-3 flex-shrink-0">
                <div 
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    index === 0 ? 'bg-teal-500' : 
                    index === 1 ? 'bg-pink-500' : 
                    index === 2 ? 'bg-cyan-500' : 
                    index === 3 ? 'bg-amber-500' : 
                    index === 4 ? 'bg-emerald-500' : 
                    'bg-indigo-500'
                  } ${activeIndex === index ? 'opacity-100 shadow-glow' : 'opacity-60'}`}
                ></div>
              </div>
              <h2 className={`text-white text-base sm:text-lg md:text-xl ${activeIndex === index ? 'font-medium' : 'font-light'}`}>
                {benefit}
              </h2>
            </div>
          ))}
        </div>
        
        {/* Benefit Description - With blue box background and fixed size to match Product page */}
        {!isMobile && (
          <div className="hidden md:block absolute top-[33vh] right-[15vw] w-[40vw] max-w-[600px] mx-auto transition-opacity duration-500">
            <div className="animate-fadeIn neon-blue-box p-6 h-[300px] overflow-y-auto">
              <h3 className="text-white text-xl font-medium mb-4">{partnerDetails[activeIndex].title}</h3>
              <p className="text-white/90 leading-relaxed">{partnerDetails[activeIndex].description}</p>
              
              {/* Extra info for partnership */}
              {activeIndex === 0 && (
                <div className="mt-6 text-white/90 border-t border-white/20 pt-4">
                  <p className="mb-2">Becoming a ZiNRAi Independent Representative means you're stepping into leadership with purpose, backed by powerful tools, training, and a global community.</p>
                  <p className="italic">This is more than a role—it's a platform to lead, earn, and make an impact while being part of something that matters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons - Show Learn More only on mobile */}
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
          
          {/* LEARN MORE button - only visible on mobile */}
          {isMobile && (
            <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300">
              <button 
                className="w-full px-6 py-3 text-white text-sm tracking-wide partner-learn-more-btn"
                onClick={toggleLearnMoreModal}
              >
                LEARN MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}