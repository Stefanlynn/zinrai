import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Define services
const services = [
  "FOREX MASTERY",
  "STOCK & EDUCATION",
  "CRYPTOCURRENCY",
  "E-COMMERCE",
  "SOCIAL MEDIA",
  "MEMBER PERKS"
];

// Define detailed product information for Learn More modal
const productDetails = [
  {
    title: "Foreign Exchange (Forex) Course + goLIVE Classrooms",
    description: "Master the global currency market with real-time strategies, expert insights, and interactive learning. Whether you're brand new or ready to scale, our Forex program equips you to trade with clarity and confidence."
  },
  {
    title: "Stocks & Options Course + goLIVE Education",
    description: "Learn to navigate the stock market and leverage the power of options. From long-term investing to short-term strategies, this course simplifies complex concepts and shows you how to grow wealth on your terms."
  },
  {
    title: "Cryptocurrency Course + goLIVE Education",
    description: "Understand the future of finance. This course breaks down blockchain, crypto assets, and real-time market movements—so you can make informed decisions in a fast-moving space."
  },
  {
    title: "E-Commerce Course + goLIVE Education",
    description: "Launch, scale, or streamline your own online business. Our E-Commerce track covers product sourcing, brand building, and marketing automation—giving you everything you need to build a digital storefront that sells."
  },
  {
    title: "Digital Marketing Course + goLIVE Education",
    description: "From content strategy to paid ads, learn how to grow a brand and convert attention into income. This course teaches modern marketing skills that are relevant, repeatable, and ready to use."
  },
  {
    title: "Member Perks Access",
    description: "Get exclusive benefits like discounts, partner tools, and early access to future offerings. Member Perks are designed to reward your growth and keep you connected to what's next."
  }
];

export default function Product() {
  const [_, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
  
  // Handle service item click
  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };
  
  // Handle close button click - using direct navigation for better reliability
  const handleClose = () => {
    window.location.href = '/';
  };

  // Toggle Learn More modal
  const toggleLearnMoreModal = () => {
    setShowLearnMoreModal(!showLearnMoreModal);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.getElementById('learn-more-modal');
      if (modal && !modal.contains(event.target as Node) && showLearnMoreModal) {
        if (!(event.target as HTMLElement).closest('.learn-more-btn')) {
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
      
      {/* Learn More Modal - Redesigned to match site style */}
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
            id="learn-more-modal"
            className="relative bg-black border border-white/20 w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto z-50 animate-in slide-up duration-500"
          >
            {/* Back button instead of close X */}
            <button 
              className="absolute top-6 left-6 text-white/80 hover:text-white transition-all group z-10 flex items-center" 
              onClick={toggleLearnMoreModal}
              aria-label="Go back"
            >
              <div className="relative h-10 w-10 flex items-center justify-center mr-2">
                <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm group-hover:bg-black/70 transform scale-75 group-hover:scale-100 transition-all duration-300"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-white/70 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <span className="text-white/70 group-hover:text-white text-sm font-light">BACK</span>
            </button>
            
            {/* Modal Content */}
            <div className="p-10 sm:p-12 pt-20">
              <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-10 animate-in fade-in duration-300" style={{ animationDelay: '150ms', animationFillMode: 'forwards' }}>OUR PRODUCTS</h2>
              
              <div className="space-y-10">
                {productDetails.map((product, index) => (
                  <div 
                    key={index} 
                    className="border-b border-white/10 pb-10 last:border-b-0 animate-in fade-in duration-300" 
                    style={{ animationDelay: `${200 + index * 100}ms`, animationFillMode: 'forwards' }}
                  >
                    <h3 className="text-white text-lg sm:text-xl font-medium mb-4 flex items-center">
                      <span className="inline-block w-6 h-6 flex items-center justify-center border border-white/30 rounded-full text-sm mr-3">{index + 1}</span>
                      {product.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed pl-9">{product.description}</p>
                  </div>
                ))}
              </div>
              
              {/* START NOW button - original styling with white text */}
              <div 
                className="mt-12 flex justify-center animate-in fade-in duration-300"
                style={{ animationDelay: `${200 + productDetails.length * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="border border-white/40 hover:border-white/90 transition-all duration-300 bg-black hover:bg-black hover:translate-y-[-2px] transform hover:scale-[1.02]">
                  <a 
                    href="/subscribe"
                    className="block px-12 py-3 text-white text-sm tracking-wider no-underline font-medium font-bold !text-white"
                    style={{ color: 'white !important' }}
                    onClick={() => {
                      setShowLearnMoreModal(false);
                    }}
                  >
                    START NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col relative z-10">
        
        {/* Services List */}
        <div className="absolute top-[20vh] sm:top-[25vh] md:top-[35vh] left-[5vw] sm:left-[10vw] space-y-4 sm:space-y-6 max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw]">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all duration-300 transform flex items-center ${activeIndex === index ? 'translate-x-4 opacity-100' : 'opacity-60 hover:opacity-80'}`}
              onClick={() => handleServiceClick(index)}
            >
              {activeIndex === index && (
                <div className="mr-2">
                  <svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L5 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <h2 className={`text-white text-base sm:text-lg md:text-xl ${activeIndex === index ? 'font-medium' : 'font-light'}`}>
                {service}
              </h2>
            </div>
          ))}
        </div>
        
        {/* Action Buttons - Bottom - Styled exactly like Partner page */}
        <div className="absolute bottom-[5vh] left-0 w-full p-6 md:p-0 md:bottom-[15vh] md:left-auto md:right-[10vw] md:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-center md:justify-end">
          {/* START NOW button */}
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300 bg-white/5 hover:bg-white/10">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide"
              onClick={() => navigate('/subscribe')}
            >
              START NOW
            </button>
          </div>
          
          {/* LEARN MORE button */}
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide learn-more-btn"
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