import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Onboarding Form Component for Partner page
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
        <label htmlFor="partner-name" className="block text-white/80 text-sm font-medium mb-2">
          Name *
        </label>
        <input
          type="text"
          id="partner-name"
          required
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="partner-email" className="block text-white/80 text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="partner-email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="partner-phone" className="block text-white/80 text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="partner-phone"
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
        {isSubmitting ? 'Submitting...' : 'Join ZiNRAi'}
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

// Define partner benefits
const benefits = [
  "BUSINESS TOOLS",
  "BRANDED ASSETS", 
  "COMPENSATION",
  "ONGOING TRAINING",
  "MENTORSHIP",
  "GLOBAL COMMUNITY"
];

// Define detailed partner information
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
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  
  // Check if screen is mobile and handle animation
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
  
  // Handle benefit item click
  const handleBenefitClick = (index: number) => {
    setActiveIndex(index);
    if (isMobile) {
      setShowDetailModal(true);
    }
  };
  
  // Close detail modal
  const closeDetailModal = () => {
    setShowDetailModal(false);
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showDetailModal) {
        setShowDetailModal(false);
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [showDetailModal]);

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
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vh] bg-pink-500/5 rounded-full filter blur-[80px] animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Mobile Benefit Detail Modal */}
      {showDetailModal && isMobile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="benefit-detail-title"
        >
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeDetailModal}
          ></div>
          
          <div className="relative z-[51] bg-black/80 rounded-sm border border-white/20 w-[90%] max-w-lg max-h-[80vh] overflow-y-auto">
            {/* Back button in top bar */}
            <div className="sticky top-0 left-0 right-0 z-[52] bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center">
              <button 
                className="text-white/70 hover:text-white flex items-center space-x-2 transition-colors py-1 px-3 border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-sm rounded-sm"
                onClick={closeDetailModal}
                aria-label="Go back"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-sm font-medium">BACK</span>
              </button>
            </div>
            
            <div className="p-6">
              {/* Benefit title with icon */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full ${
                  activeIndex === 0 ? 'bg-teal-500' : 
                  activeIndex === 1 ? 'bg-pink-500' : 
                  activeIndex === 2 ? 'bg-cyan-500' : 
                  activeIndex === 3 ? 'bg-amber-500' : 
                  activeIndex === 4 ? 'bg-emerald-500' : 
                  'bg-indigo-500'
                } mr-3`} aria-hidden="true"></div>
                <h2 id="benefit-detail-title" className="text-white text-xl font-medium">{partnerDetails[activeIndex].title}</h2>
              </div>
              
              {/* Benefit description */}
              <div className="text-white/80 text-sm leading-relaxed mb-8 whitespace-pre-line">
                {partnerDetails[activeIndex].description}
              </div>
              
              {/* Join now button */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => {
                    closeDetailModal();
                    navigate('/subscribe');
                  }}
                  className={`px-10 py-3 bg-gradient-to-r ${
                    activeIndex === 0 ? 'from-teal-600 to-teal-500' : 
                    activeIndex === 1 ? 'from-pink-600 to-pink-500' : 
                    activeIndex === 2 ? 'from-cyan-600 to-cyan-500' : 
                    activeIndex === 3 ? 'from-amber-600 to-amber-500' : 
                    activeIndex === 4 ? 'from-emerald-600 to-emerald-500' : 
                    'from-indigo-600 to-indigo-500'
                  } text-white font-medium rounded-sm hover:opacity-90 transition-opacity shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40`}
                  aria-label={`Join now with ${partnerDetails[activeIndex].title} benefits`}
                >
                  JOIN NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content area - IMPORTANT: This div allows scrolling! */}
      <div className="relative z-10 pb-16 overflow-auto" style={{ height: "100vh" }}>
        <div className="flex flex-col md:flex-row p-4">
          {/* Left Side - Benefits List */}
          <div className={`w-full md:w-1/2 p-8 pt-[10vh] md:p-16 md:pl-20 md:py-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              BRAND PROMOTER
            </h1>
            <p className="text-white/70 text-lg mb-4">
              $24.95<span className="text-sm text-white/60">/month</span>
            </p>
            <p className="text-white/70 text-lg mb-12 max-w-md">
              Join our global community of passionate leaders and build a business that matters.
            </p>
            
            <div className="space-y-8 max-w-md mb-16">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  onClick={() => handleBenefitClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleBenefitClick(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Learn more about ${partnerDetails[index].title}`}
                  className={`cursor-pointer p-4 transition-all duration-300 rounded border border-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                    activeIndex === index ? 
                    'bg-gradient-to-r shadow-lg' : 
                    'bg-white/5 hover:bg-white/10'
                  } ${
                    activeIndex === 0 && index === 0 ? 'from-teal-500/20 to-teal-500/5 border-teal-500/30' : 
                    activeIndex === 1 && index === 1 ? 'from-pink-500/20 to-pink-500/5 border-pink-500/30' : 
                    activeIndex === 2 && index === 2 ? 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' : 
                    activeIndex === 3 && index === 3 ? 'from-amber-500/20 to-amber-500/5 border-amber-500/30' : 
                    activeIndex === 4 && index === 4 ? 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30' : 
                    activeIndex === 5 && index === 5 ? 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div 
                      className={`w-4 h-4 rounded-full mt-1 ${
                        index === 0 ? 'bg-teal-500' : 
                        index === 1 ? 'bg-pink-500' : 
                        index === 2 ? 'bg-cyan-500' : 
                        index === 3 ? 'bg-amber-500' : 
                        index === 4 ? 'bg-emerald-500' : 
                        'bg-indigo-500'
                      } mr-3 flex-shrink-0`}
                      aria-hidden="true"
                    ></div>
                    <div>
                      <h2 className={`text-white text-lg font-medium mb-1`}>
                        {benefit}
                      </h2>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {partnerDetails[index].description.split('.')[0]}.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile action button */}
            <div className={`mt-8 mb-20 md:hidden transition-opacity duration-700 delay-300 ${animatedIn ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => setShowOnboardingModal(true)}
                className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm shadow-[0_0_15px_rgba(104,172,255,0.3)] hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Join as a Brand Promoter now"
              >
                JOIN NOW
              </button>
            </div>
          </div>
          
          {/* Right Side - Benefit Detail (Desktop Only) */}
          <div className={`hidden md:block w-1/2 p-16 pt-[300px] pb-20 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
            <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20">
              <div className="p-10 overflow-y-auto max-h-[70vh]">
                {/* Product header with animated dot */}
                <div className="flex items-center mb-8">
                  <div className={`w-3 h-3 rounded-full ${
                    activeIndex === 0 ? 'bg-teal-500' : 
                    activeIndex === 1 ? 'bg-pink-500' : 
                    activeIndex === 2 ? 'bg-cyan-500' : 
                    activeIndex === 3 ? 'bg-amber-500' : 
                    activeIndex === 4 ? 'bg-emerald-500' : 
                    'bg-indigo-500'
                  } mr-3`}></div>
                  <h3 className="text-white text-xl font-medium tracking-wide">{partnerDetails[activeIndex].title}</h3>
                </div>
                
                {/* Product description */}
                <div className="text-white/80 text-base leading-relaxed mb-10 whitespace-pre-line">
                  {partnerDetails[activeIndex].description}
                </div>
                
                {/* Extra partnership info */}
                <div className="text-white/70 border-t border-white/10 pt-6 mt-6 text-sm italic">
                  <p>This is more than a role—it's a platform to lead, earn, and make an impact while representing an innovative brand at the forefront of digital learning.</p>
                </div>
                
                {/* Join Now button */}
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => setShowOnboardingModal(true)}
                    className={`px-10 py-3 bg-gradient-to-r ${
                      activeIndex === 0 ? 'from-teal-600 to-teal-500' : 
                      activeIndex === 1 ? 'from-pink-600 to-pink-500' : 
                      activeIndex === 2 ? 'from-cyan-600 to-cyan-500' : 
                      activeIndex === 3 ? 'from-amber-600 to-amber-500' : 
                      activeIndex === 4 ? 'from-emerald-600 to-emerald-500' : 
                      'from-indigo-600 to-indigo-500'
                    } text-white font-medium rounded-sm shadow-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/40`}
                  >
                    JOIN NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Onboarding Modal for Partner page */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-black/95 z-[1100] overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/20 rounded-lg max-w-md w-full relative shadow-2xl">
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10 transition-colors"
              onClick={() => setShowOnboardingModal(false)}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-light text-white mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  Join ZiNRAi
                </h2>
                <p className="text-white/60 text-sm">
                  Become a Brand Promoter today
                </p>
              </div>
              
              <OnboardingForm onClose={() => setShowOnboardingModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}