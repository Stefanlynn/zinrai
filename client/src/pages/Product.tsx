import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Onboarding Form Component for Product page
function OnboardingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch("https://dev.zinrai.com/api/onboarding?token=zXNN14tzDo2Z0cWqJQWchVg94pXtPSAwCo7EuHrr0581e2db", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage("Successfully submitted!");
        setFormData({ name: '', email: '', phone: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitMessage("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="product-name" className="block text-white/80 text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="product-name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="product-email" className="block text-white/80 text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="product-email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="product-phone" className="block text-white/80 text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="product-phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your phone number"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(104,172,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[var(--zinrai-blue-glow)]/50"
      >
        {isSubmitting ? 'Submitting...' : 'Join ZiNRAi™'}
      </button>

      {submitMessage && (
        <p className={`text-center text-sm mt-4 ${
          submitMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'
        }`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}

// Define services
const services = [
  "FOREIGN EXCHANGE COURSE + LEARN NOW LIVE CLASSROOM",
  "CRYPTOCURRENCY COURSE + LEARN NOW LIVE CLASSROOM",
  "DIGITAL MARKETING COURSE + LEARN NOW LIVE CLASSROOM",
  "E-COMMERCE COURSE + LEARN NOW LIVE CLASSES"
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
    title: "Cryptocurrency Course + Learn Now Live Classroom",
    description: `Dive into the dynamic world of cryptocurrency with this comprehensive course designed to equip you with the knowledge, tools, and strategies needed to navigate confidently in the digital asset markets.

Whether you're a complete beginner or looking to sharpen your skills, this course offers a structured learning path from foundational concepts to advanced technical analysis and risk management.

Through real-world examples, hands-on live insights, you'll learn how to analyze market trends, interpret charts, identify profitable trade setups, and execute trades across major exchanges. You'll also explore the psychological aspects of trading, portfolio management techniques, and how to navigate market volatility.

✦ What You'll Learn:
• Fundamentals of blockchain
• Variety of strategies: scalping, swing trading, arbitrage, and DeFi yield strategies
• How to use trading platforms and decentralized exchanges
• Psychology of trading: building discipline and avoiding emotional decisions

✦ Who This Course Is For:
• Anyone interested in understanding the mechanics behind cryptocurrency trading
• Aspiring traders looking to enter the cryptocurrency market

No prior experience required—just a willingness to learn and a passion for learning!`
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
  }
];

export default function Product() {
  const [_, navigate] = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  
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
      case 1: return 'from-purple-500/20 to-purple-500/5 border-purple-500/30';
      case 2: return 'from-blue-500/20 to-blue-500/5 border-blue-500/30';
      case 3: return 'from-green-500/20 to-green-500/5 border-green-500/30';
      case 4: return 'from-orange-500/20 to-orange-500/5 border-orange-500/30';
      default: return 'from-[var(--zinrai-blue-glow)]/20 to-[var(--zinrai-blue-glow)]/5 border-[var(--zinrai-blue-glow)]/30';
    }
  };
  
  const getProductIconColor = (index: number) => {
    switch(index) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-purple-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-green-500';
      case 4: return 'bg-orange-500';
      default: return 'bg-white';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Grid Lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-20">
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
              

            </div>
          </div>
        </div>
      )}
      
      {/* Content area - IMPORTANT: This div allows scrolling! */}
      <div className="relative z-10 page-content">
        <div className="flex flex-col md:flex-row p-0">
          {/* Left Side - Products List */}
          <div className={`w-full md:w-1/2 p-8 pt-[10vh] pb-2 md:p-16 md:pl-20 md:pb-0 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Our Courses
            </h1>
            <p className="text-white/70 text-lg mb-12 max-w-md">
              Discover our comprehensive suite of courses designed to elevate your personal and financial growth.
            </p>
            
            <div className="space-y-8 max-w-md mb-4">
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
          </div>
          
          {/* Right Side - Product Detail (Desktop Only) */}
          <div className={`hidden md:block w-1/2 p-16 pt-[180px] pb-0 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
            <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20">
              <div className="p-10 pb-0 overflow-y-auto max-h-[70vh]">
                {/* Product header with animated dot */}
                <div className="flex items-center mb-8">
                  <div className={`w-3 h-3 rounded-full ${getProductIconColor(activeIndex)} mr-3`}></div>
                  <h3 className="text-white text-xl font-medium tracking-wide">{productDetails[activeIndex].title}</h3>
                </div>
                
                {/* Product description with formatted content */}
                <div className="text-white/80 text-base leading-relaxed mb-0 whitespace-pre-line">
                  {productDetails[activeIndex].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Onboarding Modal for Product page */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-black/95 z-[1100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/20 rounded-lg max-w-md w-full relative shadow-2xl">
            <button 
              className="absolute top-3 left-3 text-white/60 hover:text-white/90 w-8 h-8 flex items-center justify-center z-10 transition-all rounded-full hover:bg-white/5"
              onClick={() => setShowOnboardingModal(false)}
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-white mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Join ZiNRAi
                </h2>
                <p className="text-white/60 text-sm">
                  Start with our products today
                </p>
              </div>
              
              <OnboardingForm onClose={() => setShowOnboardingModal(false)} />
            </div>
          </div>
        </div>
      )}
      
      {/* Pricing Section */}
      <div className="w-full bg-black/60 border-t border-white/10 mt-16">
        <div className="px-8 md:px-16 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                Choose Your <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-semibold">Access</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Select the membership plan that fits your learning goals and unlock your growth potential.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              
              {/* ALL ACCESS Starter */}
              <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    LIMITED TIME
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">ALL ACCESS</h3>
                  <p className="text-blue-300 font-medium mb-6">Starter</p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-white mb-2">$199.95</div>
                    <p className="text-white/60 text-sm">(till July first)</p>
                  </div>
                </div>
              </div>

              {/* ALL ACCESS Monthly */}
              <div className="relative bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">ALL ACCESS</h3>
                  <p className="text-green-300 font-medium mb-6">Monthly</p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-white mb-2">$184.95</div>
                    <p className="text-white/60 text-sm">per month</p>
                  </div>
                  
                  <div className="text-left space-y-3 mb-8">
                    <p className="text-white font-medium text-sm mb-3">ALL ACCESS MEMBERSHIP (28 DAYS)</p>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80 text-sm">ACCESS TO ALL LEARN NOW LIVE SESSIONS</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIP ACCESS Monthly */}
              <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300">
                <div className="absolute top-4 right-4">
                  <div className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    MOST POPULAR
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-2">VIP ACCESS</h3>
                  <p className="text-purple-300 font-medium mb-6">Monthly</p>
                  
                  <div className="mb-8">
                    <div className="text-4xl font-bold text-white mb-2">$249.95</div>
                    <p className="text-white/60 text-sm">(80 cv)</p>
                  </div>
                  
                  <div className="text-left space-y-3 mb-8">
                    <p className="text-white font-medium text-sm mb-3">VIP ACCESS MEMBERSHIP (28 DAYS)</p>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80 text-sm">ACCESS TO ALL LEARN NOW LIVE SESSIONS</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80 text-sm">ACCESS TO PRIVATE LEARNING COMMUNITY</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white/80 text-sm">EARLY ACCESS TO NEW PRODUCT LAUNCHES</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="w-full bg-black/40 border-t border-white/10">
        <div className="px-8 md:px-16 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-white text-2xl font-medium mb-6">Ready to get started?</h3>
            <p className="text-white/90 text-lg leading-relaxed mb-4">
              Connect with the Brand Promoter who introduced you to ZiNRAi to enroll today.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}