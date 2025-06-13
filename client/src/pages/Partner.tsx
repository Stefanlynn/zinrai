import { useState, useEffect } from "react";

export default function Partner() {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const benefits = [
    {
      title: "Training & Mentorship",
      color: "blue",
      description: "At ZiNRAi™, Brand Promoters are more than marketers—they're movement leaders. As a promoter, you'll help share educational tools that equip people to grow personally, lead confidently, and live with purpose.\n\nYou'll get access to exclusive training, content resources, and leadership calls designed to help you grow—personally and professionally. Our comprehensive training program includes:\n\n• Weekly leadership development calls\n• Access to our complete content library\n• Personal mentorship opportunities\n• Marketing and communication training\n• Brand development workshops",
      shortDesc: "Access exclusive training, content resources, and leadership calls designed to help you grow."
    },
    {
      title: "Community Support", 
      color: "green",
      description: "Join a powerful network of like-minded individuals committed to personal growth, financial literacy, and generational impact.\n\nOur community provides:\n\n• Monthly mastermind sessions\n• Peer-to-peer support groups\n• Success story sharing\n• Collaborative problem-solving\n• Networking opportunities with other promoters\n• Access to exclusive community events\n\nWhether you're building a side passion or pursuing long-term leadership, we offer a flexible path for growth.",
      shortDesc: "Join a powerful network committed to personal growth and generational impact."
    },
    {
      title: "Flexible Path",
      color: "purple", 
      description: "Work on your schedule. Whether you engage part-time or full-time, your voice makes a difference.\n\nOur flexible approach includes:\n\n• No minimum time commitments\n• Work from anywhere\n• Choose your own hours\n• Scale up or down as needed\n• Multiple income streams available\n• Support for all experience levels\n\nReality Check: We're not here to sell hype. ZiNRAi™ does not guarantee income or results—your success is based on your own effort, consistency, and leadership.",
      shortDesc: "Work on your schedule. Whether part-time or full-time, your voice makes a difference."
    },
    {
      title: "Tools to Lead",
      color: "orange",
      description: "We equip you with creative content, branding assets, and a marketing toolkit to amplify your message and help you reach your goals.\n\nYour toolkit includes:\n\n• Professional branding materials\n• Social media content templates\n• Email marketing resources\n• Video and audio content\n• Sales presentation materials\n• Analytics and tracking tools\n• Customer relationship management system\n\nWho Should Join? You might be a great fit if you:\n• Love empowering others with knowledge\n• Believe in the value of financial education\n• Want to build something meaningful alongside your current commitments\n• Are hungry to grow as a leader",
      shortDesc: "Creative content, branding assets, and marketing toolkit to amplify your message."
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-400",
      green: "bg-green-400", 
      purple: "bg-purple-400",
      orange: "bg-orange-400"
    };
    return colors[color as keyof typeof colors] || "bg-blue-400";
  };

  const handleBenefitClick = (index: number) => {
    setActiveIndex(index);
    setModalContent(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

      {/* Main content - Two Column Layout like Product page */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Brand Promoter Content */}
          <div className={`w-full md:w-1/2 p-8 pt-[5vh] md:p-16 md:pl-20 md:pb-0 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Brand Promoter
            </h1>
            <p className="text-white/70 text-lg mb-12 max-w-md">
              Turn your passion for purpose into powerful impact.
            </p>
            
            <div className="space-y-8 max-w-md mb-8">
              {/* Benefits List */}
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  onClick={() => handleBenefitClick(index)}
                  onTouchEnd={() => handleBenefitClick(index)}
                  className={`cursor-pointer p-4 transition-all duration-300 rounded border border-white/5 hover:border-white/20 active:scale-95 ${
                    activeIndex === index ? 
                    'bg-gradient-to-r from-blue-600/20 to-blue-500/20 shadow-lg' : 
                    'bg-black/30 hover:bg-black/40 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`w-4 h-4 rounded-full mt-1 ${getColorClasses(benefit.color)} mr-3 flex-shrink-0`}></div>
                    <div>
                      <h2 className="text-white text-lg font-medium mb-1">
                        {benefit.title}
                      </h2>
                      <p className="text-white/60 text-sm">
                        {benefit.shortDesc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Brand Promoter How It Works */}
            <div className="relative z-10 max-w-md mx-auto bg-black/30 rounded-lg p-4 md:p-6 border border-white/20 mb-8 shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold text-white text-center mb-4 md:mb-6">How ZiNRAi™ Brand Promoter Works</h3>
              <div className="text-white/90 space-y-4">
                <div className="bg-green-900/30 rounded-lg p-3 md:p-4 border border-green-400/30">
                  <p className="text-sm md:text-base leading-relaxed font-medium text-green-300 mb-2">Step 1: Brand Promoter Enrollment</p>
                  <p className="text-xs md:text-sm leading-relaxed text-white/80">
                    Pay a one-time enrollment fee of $24.95 to join the ZiNRAi™ Brand Promoter program and start earning commissions by sharing our educational products.
                  </p>
                </div>
                
                <div className="bg-blue-900/30 rounded-lg p-3 md:p-4 border border-blue-400/30">
                  <p className="text-sm md:text-base leading-relaxed font-medium text-blue-300 mb-2">Step 2: Choose Your Monthly Access Plan</p>
                  <p className="text-xs md:text-sm leading-relaxed text-white/80">
                    After enrollment, select either ALL ACCESS Monthly ($184.95) or VIP ACCESS Monthly ($249.95) to access educational content. Your first monthly billing begins 28 days after enrollment.
                  </p>
                </div>
                
                <div className="border-t border-white/20 pt-3 mt-4">
                  <p className="text-white/60 text-xs md:text-sm text-center">
                    Brand Promoters earn commissions while accessing the same high-quality educational content with 28-day billing cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Detail Panel (Desktop Only) */}
          <div className={`hidden md:block w-1/2 p-16 pt-[120px] pb-0 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
            <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20">
              <div className="p-10 overflow-y-auto max-h-[70vh]">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <div className={`w-3 h-3 rounded-full ${getColorClasses(benefits[activeIndex].color)} mr-3`}></div>
                  <h3 className="text-white text-xl font-medium tracking-wide">{benefits[activeIndex].title}</h3>
                </div>
                
                {/* Description */}
                <div className="text-white/80 text-base leading-relaxed mb-10 whitespace-pre-line">
                  {benefits[activeIndex].description}
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => window.location.href = 'mailto:brandpromoter@zinrai.com'}
                    className="px-6 py-3 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Join Our Movement
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing and Contact Section - Combined */}
      <div className="w-full bg-red-900/20 border-2 border-red-500 p-8">
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-bold mb-4">Investment: $24.95/month</h2>
          <p className="text-white/80 text-lg mb-6">
            Includes complete training, marketing materials, ongoing support, and access to our exclusive community.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-white text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-white text-xl">
            Connect with the Brand Promoter who introduced you to ZiNRAi<span className="text-xs align-super">™</span> to join today.
          </p>
        </div>
      </div>

      {/* Modal for benefit details */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/95 z-[1100] overflow-y-auto flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/20 rounded-lg max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 left-3 text-white/70 hover:text-white/90 flex items-center space-x-2 transition-colors py-1 px-3 border border-white/10 hover:border-white/30 bg-black/40 backdrop-blur-sm rounded-sm"
              onClick={closeModal}
              aria-label="Go back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">Back</span>
            </button>
            
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 rounded-full ${getColorClasses(benefits[modalContent].color)} mr-3`}></div>
                <h2 className="text-2xl font-light text-white bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  {benefits[modalContent].title}
                </h2>
              </div>
              
              <div className="text-white/80 text-base leading-relaxed whitespace-pre-line">
                {benefits[modalContent].description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}