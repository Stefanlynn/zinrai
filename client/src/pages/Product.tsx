import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Define services
const services = [
  "FOREIGN EXCHANGE COURSE + LEARN NOW LIVE CLASSROOM",
  "DIGITAL MARKETING COURSE + LEARN NOW LIVE CLASSROOM",
  "E-COMMERCE COURSE + LEARN NOW LIVE CLASSES",
  "ZINRAI TRAVEL CLUB MEMBERSHIP"
];

// Define detailed product information for Learn More modal
const productDetails = [
  {
    title: "Foreign Exchange Course + Learn Now Live Classroom",
    description: `Understand the global financial markets and learn how to analyze currencies with confidence. 

This Forex course is designed to give you a solid foundation in the world's largest and most liquid financial market—whether you're a complete beginner or looking to refine your strategy.

Through practical lessons, live chart analysis, and proven techniques, you'll gain the skills needed to understand market movements, manage risk, and develop a trading plan that suits your goals and lifestyle.

✦ What You'll Learn:
• Introduction to the Forex market and how it works
• Understanding currency pairs, pips, and leverage
• Fundamental and technical analysis
• Chart patterns, indicators, and trading tools
• Risk management and trading psychology
• Creating a personal trading strategy

✦ Who This Course Is For:
• Aspiring traders looking to enter the Forex market
• Beginners seeking a clear, structured learning path
• Anyone looking to understand how global currencies are traded

No prior experience required—just a willingness to learn and a passion for the markets.`
  },
  {
    title: "Digital Marketing Course + Learn Now Live Classroom",
    description: `In today's digital world, marketing is no longer optional—it's essential. 

This all-in-one Digital Marketing course is designed to equip you with the skills, tools, and strategies to grow your brand, attract the right audience, and drive consistent sales across major online channels.

Whether you're building a personal brand, launching a startup, or scaling an existing business, this course covers everything you need to become a confident and capable digital marketer.

✦ What You'll Learn:
• Digital marketing strategy and campaign planning
• Social media marketing (Instagram, Facebook, TikTok, LinkedIn)
• Paid advertising (Google Ads, Meta Ads)
• How to monetize social media with UGC (user generated content)
• SEO fundamentals & content marketing
• Analytics, tracking, and performance optimization
• Tools like Canva, ChatGPT, Meta Business Suite, Google Analytics, and more

✦ Who This Course Is For:
• Entrepreneurs, business owners, and freelancers
• Marketing beginners looking to break into the field
• Content creators, influencers, and personal brands
• Anyone who wants to master digital marketing and drive measurable results

No experience required. Just bring your ambition—this course will help you turn it into impact.`
  },
  {
    title: "E-Commerce Course + Learn Now Live Classes",
    description: `Ready to turn your product idea into a thriving online business? 

This comprehensive eCommerce course takes you from zero to sales—guiding you through every step of launching and scaling a successful online store.

Whether you're starting from scratch or looking to optimize an existing store, you'll learn the tools, strategies, and insider tactics used by top-performing eCommerce brands.

✦ What You'll Learn:
• Choosing the right product and niche
• Setting up your store
• Crafting high-converting product pages
• Payment gateways, shipping, and logistics
• Email marketing, SEO, and paid advertising
• Social media and influencer marketing
• Conversion optimization and customer retention

✦ Who It's For:
• Aspiring entrepreneurs
• Small business owners
• Anyone ready to build a scalable online business with real-world results

No tech skills or prior experience required—just your determination to succeed.`
  },
  {
    title: "ZiNRAi Travel Club Membership",
    description: `Unlock the world with exclusive perks, luxury experiences, and unbeatable savings.

ZiNRAi Travel Club Membership is your all-access pass to curated adventures, VIP treatment, and members-only discounts—designed for travelers who want more than just a getaway.

Whether you're booking a five-star hotel, setting sail on a dream cruise, or joining a transformative retreat, our membership turns ordinary travel into extraordinary journeys.

✦ Membership Benefits Include:
• Up to 70% off luxury hotels and resorts worldwide
• Exclusive cruise deals with premium lines and itineraries
• Access to private retreats and immersive excursions curated for ZiNRAi members only!
• Invites to VIP events and travel experiences you won't find anywhere else
• Priority customer support, insider travel tips, and surprise upgrades

✦ Perfect For:
• Frequent travelers
• Digital nomads
• Couples and families
• Experience-seekers who want to explore more—and pay less

Join the club and elevate every trip with unmatched value, access, and adventure.`
  }
];

export default function Product() {
  const [_, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check and animation trigger
    handleResize();
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleProductClick = (index: number) => {
    setActiveIndex(index);
    if (isMobile) {
      setShowProductDetail(true);
    }
  };
  
  const closeProductDetail = () => {
    setShowProductDetail(false);
  };

  const getProductColorClass = (index: number) => {
    switch(index) {
      case 0: return 'from-red-500/20 to-red-500/5 border-red-500/30';
      case 1: return 'from-blue-500/20 to-blue-500/5 border-blue-500/30';
      case 2: return 'from-green-500/20 to-green-500/5 border-green-500/30';
      case 3: return 'from-orange-500/20 to-orange-500/5 border-orange-500/30';
      default: return 'from-[var(--zinrai-blue-glow)]/20 to-[var(--zinrai-blue-glow)]/5 border-[var(--zinrai-blue-glow)]/30';
    }
  };
  
  const getProductIconColor = (index: number) => {
    switch(index) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-blue-500';
      case 2: return 'bg-green-500';
      case 3: return 'bg-orange-500';
      default: return 'bg-white';
    }
  };

  return (
    <div className="bg-black min-h-screen">
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
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vh] bg-red-500/5 rounded-full filter blur-[80px] animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Mobile Product Detail Modal */}
      {showProductDetail && isMobile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-detail-title"
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeProductDetail}
          ></div>
          
          <div className="relative z-[51] bg-black/80 rounded-sm border border-white/20 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto">
            {/* Back button in top bar */}
            <div className="sticky top-0 left-0 right-0 z-[52] bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center">
              <button 
                className="text-white/70 hover:text-white flex items-center space-x-2 transition-colors py-1 px-3 border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-sm rounded-sm"
                onClick={closeProductDetail}
                aria-label="Go back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">BACK</span>
              </button>
            </div>
            
            <div className="p-6">
              {/* Product title with icon */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full ${getProductIconColor(activeIndex)} mr-3`} aria-hidden="true"></div>
                <h2 id="product-detail-title" className="text-white text-xl font-medium">{productDetails[activeIndex].title}</h2>
              </div>
              
              {/* Product description */}
              <div className="text-white/80 text-sm leading-relaxed mb-8 whitespace-pre-line">
                {productDetails[activeIndex].description}
              </div>
              
              {/* Sign up button */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => {
                    closeProductDetail();
                    navigate('/subscribe');
                  }}
                  className={`px-10 py-3 bg-gradient-to-r ${
                    activeIndex === 0 ? 'from-red-600 to-red-500' : 
                    activeIndex === 1 ? 'from-blue-600 to-blue-500' : 
                    activeIndex === 2 ? 'from-green-600 to-green-500' : 
                    'from-orange-600 to-orange-500'
                  } text-white font-medium rounded-sm hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40`}
                  aria-label={`Start your ZiNRAi membership with ${productDetails[activeIndex].title}`}
                >
                  START NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content area - IMPORTANT: This div allows scrolling! */}
      <div className="relative z-10 pb-16 overflow-auto" style={{ height: "100vh" }}>
        <div className="flex flex-col md:flex-row p-4">
          {/* Left Side - Products List */}
          <div className={`w-full md:w-1/2 p-8 pt-[10vh] md:p-16 md:pl-20 md:py-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              OUR PRODUCTS
            </h1>
            <p className="text-white/70 text-lg mb-12 max-w-md">
              Discover our comprehensive suite of products designed to elevate your personal and financial growth.
            </p>
            
            <div className="space-y-8 max-w-md mb-16">
              {services.map((service, index) => (
                <div 
                  key={index}
                  onClick={() => handleProductClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProductClick(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${productDetails[index].title}`}
                  className={`cursor-pointer p-4 transition-all duration-300 rounded border border-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                    activeIndex === index ? 
                    'bg-gradient-to-r shadow-lg' : 
                    'bg-black/30 hover:bg-black/40 backdrop-blur-sm'
                  } ${
                    activeIndex === index ? `${getProductColorClass(index)}` : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div 
                      className={`w-4 h-4 rounded-full mt-1 ${getProductIconColor(index)} mr-3 flex-shrink-0`}
                      aria-hidden="true"
                    ></div>
                    <div>
                      <h2 className={`text-white text-lg font-medium mb-1`}>
                        {service}
                      </h2>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {productDetails[index].description.split('\n')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile action button */}
            <div className={`mt-8 mb-20 md:hidden transition-opacity duration-700 delay-300 ${animatedIn ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => navigate('/subscribe')}
                className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm shadow-[0_0_15px_rgba(104,172,255,0.3)] hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Start your ZiNRAi membership now"
              >
                START NOW
              </button>
            </div>
          </div>
          
          {/* Right Side - Product Detail (Desktop Only) */}
          <div className={`hidden md:block w-1/2 p-16 pt-[180px] pb-20 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
            <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20">
              <div className="p-10 overflow-y-auto max-h-[70vh]">
                {/* Product header with animated dot */}
                <div className="flex items-center mb-8">
                  <div className={`w-3 h-3 rounded-full ${getProductIconColor(activeIndex)} mr-3`}></div>
                  <h3 className="text-white text-xl font-medium tracking-wide">{productDetails[activeIndex].title}</h3>
                </div>
                
                {/* Product description with formatted content */}
                <div className="text-white/80 text-base leading-relaxed mb-10 whitespace-pre-line">
                  {productDetails[activeIndex].description}
                </div>
                
                {/* Action button */}
                <div className="mt-10 flex justify-center mb-8">
                  <button
                    onClick={() => navigate('/subscribe')}
                    className={`px-12 py-3 bg-gradient-to-r ${
                      activeIndex === 0 ? 'from-red-600 to-red-500' : 
                      activeIndex === 1 ? 'from-blue-600 to-blue-500' : 
                      activeIndex === 2 ? 'from-green-600 to-green-500' : 
                      'from-orange-600 to-orange-500'
                    } text-white font-medium rounded-sm hover:opacity-90 transition-opacity shadow-lg transform hover:scale-105 transition-transform duration-300`}
                  >
                    START NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}