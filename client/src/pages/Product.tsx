import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Define services
const services = [
  "FOREIGN EXCHANGE COURSE + LEARN NOW LIVE CLASSROOM",
  "DIGITAL MARKETING COURSE + LEARN NOW LIVE CLASSROOM",
  "CRYPTOCURRENCY",
  "E-COMMERCE COURSE + LEARN NOW LIVE CLASSES",
  "SOCIAL MEDIA",
  "LEARN NOW",
  "ZINRAI TRAVEL CLUB MEMBERSHIP"
];

// Define detailed product information for Learn More modal
const productDetails = [
  {
    title: "Foreign Exchange Course + Learn Now Live Classroom",
    description: "Understand the global financial markets and learn how to analyze currencies with confidence. This Forex course is designed to give you a solid foundation in the world's largest and most liquid financial market—whether you're a complete beginner or looking to refine your strategy. Through practical lessons, live chart analysis, and proven techniques, you'll gain the skills needed to understand market movements, manage risk, and develop a trading plan that suits your goals and lifestyle. What You'll Learn: Introduction to the Forex market and how it works, understanding currency pairs, pips, and leverage, fundamental and technical analysis, chart patterns, indicators, and trading tools, risk management and trading psychology, creating a personal trading strategy. Who This Course Is For: Aspiring traders looking to enter the Forex market, beginners seeking a clear, structured learning path, anyone looking to understand how global currencies are traded. No prior experience required—just a willingness to learn and a passion for the markets."
  },
  {
    title: "Digital Marketing Course + Learn Now Live Classroom",
    description: "In today's digital world, marketing is no longer optional—it's essential. This all-in-one Digital Marketing course is designed to equip you with the skills, tools, and strategies to grow your brand, attract the right audience, and drive consistent sales across major online channels. Whether you're building a personal brand, launching a startup, or scaling an existing business, this course covers everything you need to become a confident and capable digital marketer. What You'll Learn: Digital marketing strategy and campaign planning, social media marketing (Instagram, Facebook, TikTok, LinkedIn), paid advertising (Google Ads, Meta Ads), how to monetize social media with UGC (user generated content), SEO fundamentals & content marketing, analytics, tracking, and performance optimization, tools like Canva, ChatGPT, Meta Business Suite, Google Analytics, and more. Who This Course Is For: Entrepreneurs, business owners, and freelancers, marketing beginners looking to break into the field, content creators, influencers, and personal brands, anyone who wants to master digital marketing and drive measurable results. No experience required. Just bring your ambition—this course will help you turn it into impact."
  },
  {
    title: "Cryptocurrency",
    description: "Go beyond the hype and understand the world of digital assets. From Bitcoin to blockchain, this course simplifies crypto and helps you discover how to engage the future of finance with wisdom, safety, and skill."
  },
  {
    title: "E-Commerce Course + Learn Now Live Classes",
    description: "Ready to turn your product idea into a thriving online business? This comprehensive eCommerce course takes you from zero to sales—guiding you through every step of launching and scaling a successful online store. Whether you're starting from scratch or looking to optimize an existing store, you'll learn the tools, strategies, and insider tactics used by top-performing eCommerce brands. What You'll Learn: Choosing the right product and niche, setting up your store, crafting high-converting product pages, payment gateways, shipping, and logistics, email marketing, SEO, and paid advertising, social media and influencer marketing, conversion optimization and customer retention. Who It's For: Aspiring entrepreneurs, small business owners, or anyone ready to build a scalable online business with real-world results. No tech skills or prior experience required—just your determination to succeed."
  },
  {
    title: "Social Media",
    description: "Transform your scroll time into strategy. Learn how to grow your personal brand, monetize content, and build community on platforms like Instagram, TikTok, and YouTube. Whether you're a beginner or a builder, this course gives you the playbook to show up and stand out."
  },
  {
    title: "Learn Now",
    description: "Our digital learning hub with live and on-demand education from top-tier instructors, entrepreneurs, and experts across every industry we teach. It's your all-access pass to growth—available anytime, anywhere. From trading to marketing to leadership, this is where the learning never stops."
  },
  {
    title: "ZiNRAi Travel Club Membership",
    description: "Unlock the world with exclusive perks, luxury experiences, and unbeatable savings. ZiNRAi Travel Club Membership is your all-access pass to curated adventures, VIP treatment, and members-only discounts—designed for travelers who want more than just a getaway. Whether you're booking a five-star hotel, setting sail on a dream cruise, or joining a transformative retreat, our membership turns ordinary travel into extraordinary journeys. Membership Benefits Include: Up to 70% off luxury hotels and resorts worldwide, exclusive cruise deals with premium lines and itineraries, access to private retreats and immersive excursions curated for ZiNRAi members only!, invites to VIP events and travel experiences you won't find anywhere else, priority customer support, insider travel tips, and surprise upgrades. Perfect For: Frequent travelers, digital nomads, couples, families, and experience-seekers who want to explore more—and pay less. Join the club and elevate every trip with unmatched value, access, and adventure."
  }
];

export default function Product() {
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
            {/* Back button with improved visibility */}
            <button 
              className="fixed top-6 left-6 text-white hover:text-white transition-all group z-[60] flex items-center bg-black/90 px-4 py-2 border border-white/30 hover:border-white/70" 
              onClick={toggleLearnMoreModal}
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-white font-medium">BACK</span>
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
      
        {/* Product Title - matching the Partner page header */}
        <div className="absolute top-[10vh] left-[10vw]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">
            OUR PRODUCTS
          </h1>
          <p className="text-white/80 text-base sm:text-lg mt-2 font-light">
            $185<span className="text-sm text-white/60">/month</span>
          </p>
        </div>
        
        {/* Services List - adjusted positioning for header */}
        <div className={`absolute top-[20vh] sm:top-[25vh] md:top-[28vh] left-[5vw] sm:left-[10vw] space-y-4 sm:space-y-6 ${isMobile ? 'max-w-[90vw] sm:max-w-[80vw]' : 'max-w-[35vw]'}`}>
          {services.map((service, index) => (
            <div 
              key={index}
              className={`cursor-pointer transition-all duration-300 transform flex items-center ${activeIndex === index ? 'translate-x-4 opacity-100' : 'opacity-60 hover:opacity-80'}`}
              onClick={() => handleServiceClick(index)}
            >
              <div className="mr-3 flex-shrink-0">
                <div 
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    index === 0 ? 'bg-red-500' : 
                    index === 1 ? 'bg-blue-500' : 
                    index === 2 ? 'bg-green-500' : 
                    index === 3 ? 'bg-yellow-500' : 
                    index === 4 ? 'bg-purple-500' : 
                    index === 5 ? 'bg-pink-500' : 
                    'bg-orange-500'
                  } ${activeIndex === index ? 'opacity-100 shadow-glow' : 'opacity-60'}`}
                ></div>
              </div>
              <h2 className={`text-white text-base sm:text-lg md:text-xl ${activeIndex === index ? 'font-medium' : 'font-light'}`}>
                {service}
              </h2>
            </div>
          ))}
        </div>
        
        {/* Product Description - With blue box background and fixed size */}
        {!isMobile && (
          <div className="hidden md:block absolute top-[33vh] right-[15vw] w-[40vw] max-w-[600px] mx-auto transition-opacity duration-500">
            <div className="animate-fadeIn neon-blue-box p-6 h-[300px] overflow-y-auto">
              <h3 className="text-white text-xl font-medium mb-4">{productDetails[activeIndex]?.title || ""}</h3>
              <p className="text-white/90 leading-relaxed">{productDetails[activeIndex]?.description || ""}</p>
            </div>
          </div>
        )}
        
        {/* Action Buttons - Show Learn More only on mobile */}
        <div className="absolute bottom-[15vh] left-0 w-full p-6 md:p-0 md:bottom-[15vh] md:left-auto md:right-[10vw] md:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-center md:justify-end">
          {/* START NOW button */}
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300 bg-white/5 hover:bg-white/10">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide"
              onClick={() => navigate('/subscribe')}
            >
              START NOW
            </button>
          </div>
          
          {/* LEARN MORE button - only visible on mobile */}
          {isMobile && (
            <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300">
              <button 
                className="w-full px-6 py-3 text-white text-sm tracking-wide learn-more-btn"
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