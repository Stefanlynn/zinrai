import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Define culture values with colors
const cultureValues = [
  {
    letter: "Z",
    title: "Zeal",
    description: "We pursue purpose with energy and urgency. Passion fuels our progress.",
    color: "purple"
  },
  {
    letter: "I",
    title: "Integrity",
    description: "We do what's right—especially when it's hard. Trust is our currency.",
    color: "cyan"
  },
  {
    letter: "N",
    title: "Nobility",
    description: "We elevate others with honor. Leadership is rooted in dignity and service.",
    color: "teal"
  },
  {
    letter: "R",
    title: "Resilience",
    description: "We rise through challenge. Setbacks shape strength and long-term success.",
    color: "amber"
  },
  {
    letter: "A",
    title: "Abundance",
    description: "We operate from overflow, not scarcity. There's always more to give, grow, and become.",
    color: "pink"
  },
  {
    letter: "I",
    title: "Innovation",
    description: "We adapt, evolve, and pioneer. Creativity unlocks new opportunity.",
    color: "emerald"
  }
];

export default function Culture() {
  const [_, navigate] = useLocation();
  const [activeValue, setActiveValue] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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
    
    // Force document body to be scrollable
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    
    // Force immediate scroll to top
    window.scrollTo(0, 0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Reset when unmounting
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    };
  }, []);
  
  // Handle value click
  const handleValueClick = (index: number) => {
    setActiveValue(index);
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

  // Get value details
  const getValueDetail = (index: number) => {
    const value = cultureValues[index];
    
    // Extended descriptions for each value
    const extendedDescriptions = [
      "At ZiNRAi, we don't just work—we're driven by something deeper. Zeal is about bringing your whole heart to whatever you do. It's the fire that turns ideas into action and challenges into opportunities.\n\nWe believe that genuine enthusiasm is contagious. When you move with purpose and passion, you inspire others to join the journey. That's why we celebrate the go-getters, the early risers, and the \"just five more minutes\" kind of people who pour themselves into their mission.\n\nZeal doesn't mean burnout—it means sustainable drive that comes from alignment with your deeper purpose. When your work matters, energy follows naturally.",
      
      "In a world where corners are often cut and ethics sometimes bend, integrity stands as our non-negotiable foundation. It's about alignment—making sure our actions match our words and our words reflect our values.\n\nIntegrity at ZiNRAi means that we choose what's right over what's easy or expedient. We believe that how you do anything is how you do everything, which is why we maintain the same standards whether someone is watching or not.\n\nWe know that trust is earned in drops but lost in buckets. That's why we protect it fiercely—in how we treat each other, serve our community, and build our business. When integrity leads, everything else follows.",
      
      "Nobility isn't about titles or status—it's about how we treat people. At ZiNRAi, we believe that true leadership begins with service and that everyone deserves to be treated with dignity, regardless of position or circumstance.\n\nWe lead by lifting others. This means creating space for voices to be heard, recognizing the unique value each person brings, and ensuring that success is shared, not hoarded. Noble leadership is generous with credit and sparing with blame.\n\nTrue nobility carries itself with both confidence and humility—strong enough to stand firm in principles yet humble enough to put others first. This balance shapes how we build relationships, resolve conflicts, and make decisions that affect our community.",
      
      "Resilience is the capacity to not just survive challenges but to grow stronger through them. At ZiNRAi, we don't avoid obstacles—we embrace them as opportunities to develop grit, wisdom, and character.\n\nWe understand that progress isn't always linear. There are peaks, valleys, and plateaus along any worthwhile journey. Resilience means having the flexibility to adapt to changing circumstances while maintaining unwavering commitment to core values and goals.\n\nResilient leaders don't just bounce back—they bounce forward. They turn lessons from setbacks into fuel for future growth. This mindset shapes our approach to personal development, business challenges, and community building.",
      
      "The abundance mindset is about recognizing that success isn't a limited resource—there's more than enough to go around. At ZiNRAi, we reject zero-sum thinking in favor of a perspective that sees potential for growth and opportunity everywhere.\n\nLiving from abundance means we lead with generosity. We freely share knowledge, connections, and support because we believe that what we circulate returns multiplied. This applies to how we develop our team, serve our community, and grow our business.\n\nAbundance doesn't mean ignoring practical realities—it means approaching challenges with the confidence that solutions exist and that we have (or can develop) the resources to find them. When we live from overflow rather than scarcity, we unlock creativity, collaboration, and possibility.",
      
      "Innovation isn't just about creating something new—it's about creating something better. At ZiNRAi, innovation means constantly asking: \"How can we serve more effectively? How can we solve problems more elegantly? How can we create more value?\"\n\nWe believe innovation happens at the intersection of diverse perspectives, disciplines, and experiences. That's why we cultivate environments where ideas can cross-pollinate and conventional thinking can be respectfully challenged.\n\nInnovation requires both creativity and execution—imagination to envision new possibilities and discipline to turn those visions into reality. This balance of creative thinking and practical implementation guides how we approach product development, community building, and organizational growth."
    ];

    // Quotes for each value
    const quotes = [
      "Passion is energy. Feel the power that comes from focusing on what excites you.",
      "Real integrity is doing the right thing, knowing that nobody's going to know whether you did it or not.",
      "A noble leader answers not to the trumpet calls of self-promotion, but to the quiet voice of conscience.",
      "The oak fought the wind and was broken, the willow bent when it must and survived.",
      "The key to abundance is meeting limited circumstances with unlimited thoughts.",
      "Innovation is taking two things that already exist and putting them together in a new way."
    ];

    // Practical examples for each value
    const practices = [
      [
        "Bringing full energy to every endeavor",
        "Leading with enthusiasm that inspires others",
        "Finding joy in the journey, not just the destination",
        "Pursuing excellence through passionate commitment"
      ],
      [
        "Honoring commitments and keeping promises",
        "Communicating with transparency and honesty",
        "Taking responsibility for mistakes and learning from them",
        "Making decisions that align with our core values"
      ],
      [
        "Treating everyone with dignity and respect",
        "Leading through service rather than authority",
        "Giving credit generously and accepting responsibility fully",
        "Making decisions that honor and elevate those we serve"
      ],
      [
        "Embracing challenges as opportunities for growth",
        "Maintaining optimism and perspective during difficulties",
        "Adapting to change while staying true to our mission",
        "Developing systems and habits that support consistent progress"
      ],
      [
        "Approaching opportunities with an abundant perspective",
        "Practicing generosity as a fundamental business principle",
        "Celebrating others' success as community wins",
        "Investing in growth and development even when resources seem limited"
      ],
      [
        "Maintaining curiosity and openness to new ideas",
        "Balancing creativity with practical implementation",
        "Creating safe spaces for experimentation and calculated risk-taking",
        "Continuously improving and refining our approaches"
      ]
    ];

    return {
      title: value.title,
      letter: value.letter,
      description: value.description,
      extendedDescription: extendedDescriptions[index],
      quote: quotes[index],
      practices: practices[index],
      color: value.color
    };
  };

  // Helper to get color classes
  const getColorClass = (colorName: string, type: 'bg' | 'text' | 'border' | 'from' | 'to') => {
    const colors: Record<string, Record<string, string>> = {
      purple: {
        bg: 'bg-purple-500',
        text: 'text-purple-500',
        border: 'border-purple-500/30',
        from: 'from-purple-500/20',
        to: 'to-purple-500/5'
      },
      cyan: {
        bg: 'bg-cyan-500',
        text: 'text-cyan-500',
        border: 'border-cyan-500/30',
        from: 'from-cyan-500/20',
        to: 'to-cyan-500/5'
      },
      teal: {
        bg: 'bg-teal-500',
        text: 'text-teal-500',
        border: 'border-teal-500/30',
        from: 'from-teal-500/20',
        to: 'to-teal-500/5'
      },
      amber: {
        bg: 'bg-amber-500',
        text: 'text-amber-500',
        border: 'border-amber-500/30',
        from: 'from-amber-500/20',
        to: 'to-amber-500/5'
      },
      pink: {
        bg: 'bg-pink-500',
        text: 'text-pink-500',
        border: 'border-pink-500/30',
        from: 'from-pink-500/20',
        to: 'to-pink-500/5'
      },
      emerald: {
        bg: 'bg-emerald-500',
        text: 'text-emerald-500',
        border: 'border-emerald-500/30',
        from: 'from-emerald-500/20',
        to: 'to-emerald-500/5'
      }
    };
    
    return colors[colorName][type];
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
        <div className="absolute bottom-[10%] right-[5%] w-[25vw] h-[25vh] bg-purple-500/5 rounded-full filter blur-[80px] animate-pulse opacity-20" style={{animationDelay: '1s'}}></div>
      </div>
      
      {/* Mobile Value Detail Modal */}
      {showDetailModal && isMobile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="value-detail-title"
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
              {/* Value title with letter */}
              <div className="flex items-center mb-6">
                <div className={`w-8 h-8 rounded-full ${getColorClass(cultureValues[activeValue].color, 'bg')} flex items-center justify-center mr-3 text-white font-bold`} aria-hidden="true">
                  {cultureValues[activeValue].letter}
                </div>
                <h2 id="value-detail-title" className="text-white text-xl font-medium">{getValueDetail(activeValue).title}</h2>
              </div>
              
              {/* Value description */}
              <div className="text-white/80 text-sm leading-relaxed mb-8 whitespace-pre-line">
                {getValueDetail(activeValue).description}
                
                <div className="mt-4">
                  {getValueDetail(activeValue).extendedDescription}
                </div>
              </div>
              
              {/* Quote */}
              <div className="italic text-white/70 border-l-2 pl-4 my-6">
                <p>"{getValueDetail(activeValue).quote}"</p>
              </div>
              
              {/* Value principles */}
              <div className="mt-6">
                <h3 className="text-white text-md font-medium mb-3">How We Live This Value:</h3>
                <ul className="list-disc pl-5 text-white/80 text-sm space-y-2">
                  {getValueDetail(activeValue).practices.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Content area - IMPORTANT: This div allows scrolling! */}
      <div className="relative z-10 pb-16 overflow-auto" style={{ height: "100vh" }}>
        <div className="flex flex-col p-4">
          {/* Why ZiNRAi Section - Full width for both mobile and desktop */}
          <div className={`w-full mb-12 pt-[8vh] p-6 md:p-16 md:pt-[10vh] transition-all duration-700 ${animatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-6 tracking-wide">
              WHY ZiNRAi
            </h1>
            
            <div className="text-white/90 space-y-4 text-left max-w-3xl">
              <p className="text-base">
                In a world full of noise, hype, and hustle, ZiNRAi exists to bring something different—something deeper.
              </p>
              
              <p className="text-base">
                We're not just building another platform. We're creating a space where purpose-driven people can come to grow, lead, and live with clarity.
              </p>
              
              <div className="text-base font-medium my-6">
                Most companies sell products. We build people.
              </div>
              
              <p className="text-base">
                ZiNRAi is for the builders. The dreamers. The leaders who care more about long-term impact than short-term gain.
                We exist to help people master their mindset, grow in their craft, and align with a community that actually cares.
              </p>
              
              <p className="text-base">
                Whether you're here to start something new, scale something meaningful, or become someone worth following—ZiNRAi is your launch point.
              </p>
              
              <p className="text-base">
                Because we believe that when people live with intention and lead with integrity, they don't just change their lives—they change the world around them.
              </p>
              
              <div className="text-base font-medium my-6">
                This is more than a subscription. It's a signal. A standard. A shift.
              </div>
              
              <p className="text-base font-medium">
                This is ZiNRAi.
              </p>
            </div>
          </div>
          
          {/* Vision & Mission Section - Full width for both mobile and desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 px-6 md:px-16">
            {/* Vision */}
            <div 
              className="bg-black/30 border border-white/20 p-8 hover:border-[var(--zinrai-blue-glow)] hover:shadow-[0_0_15px_rgba(104,172,255,0.15)] focus-within:border-[var(--zinrai-blue-glow)] focus-within:shadow-[0_0_15px_rgba(104,172,255,0.15)] transition-all duration-300 backdrop-blur-sm"
              tabIndex={0}
            >
              <h2 id="vision-title" className="text-white text-2xl font-light mb-4">Vision</h2>
              <p className="text-white/90 text-base leading-relaxed" aria-labelledby="vision-title">
                To help ordinary people become extraordinary leaders—by unlocking purpose, building character, and creating meaningful impact.
              </p>
            </div>
            
            {/* Mission */}
            <div 
              className="bg-black/30 border border-white/20 p-8 hover:border-[var(--zinrai-blue-glow)] hover:shadow-[0_0_15px_rgba(104,172,255,0.15)] focus-within:border-[var(--zinrai-blue-glow)] focus-within:shadow-[0_0_15px_rgba(104,172,255,0.15)] transition-all duration-300 backdrop-blur-sm"
              tabIndex={0}
            >
              <h2 id="mission-title" className="text-white text-2xl font-light mb-4">Mission</h2>
              <p className="text-white/90 text-base leading-relaxed" aria-labelledby="mission-title">
                ZiNRAi exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment.
              </p>
            </div>
          </div>
          
          {/* Core Values Section - 2-column layout on desktop */}
          <div className="mt-8 mb-20 flex flex-col md:flex-row p-4">
            {/* Left Side - Values List */}
            <div className={`w-full md:w-1/2 p-6 pt-0 md:p-16 md:pt-0 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
              <h2 className="text-white text-2xl font-light mb-6">Core Values</h2>
              <p className="text-white/80 text-base leading-relaxed mb-6 max-w-xl">
                Each letter of ZiNRAi represents a foundational value that shapes our culture and leadership DNA.
              </p>
              
              <div className="space-y-4 max-w-xl">
                {cultureValues.map((value, index) => (
                  <div 
                    key={index}
                    onClick={() => handleValueClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleValueClick(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Learn more about ${value.title}`}
                    className={`cursor-pointer p-4 transition-all duration-300 rounded border border-white/5 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                      activeValue === index ? 
                      'bg-gradient-to-r shadow-lg' : 
                      'bg-black/30 hover:bg-black/40 backdrop-blur-sm'
                    } ${
                      activeValue === index ? 
                      `${getColorClass(value.color, 'from')} ${getColorClass(value.color, 'to')} ${getColorClass(value.color, 'border')}` : 
                      ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div 
                        className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-white font-bold ${getColorClass(value.color, 'bg')}`}
                        aria-hidden="true"
                      >
                        {value.letter}
                      </div>
                      <div>
                        <h3 className={`text-white text-lg font-medium mb-1`}>
                          {value.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Side - Value Detail (Desktop Only) */}
            <div className={`hidden md:block w-1/2 p-16 py-0 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
              <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20 h-full">
                <div className="p-10 overflow-y-auto h-full">
                  {/* Value header with animated dot */}
                  <div className="flex items-center mb-8">
                    <div className={`w-3 h-3 rounded-full ${getColorClass(cultureValues[activeValue].color, 'bg')} mr-3`}></div>
                    <h3 className="text-white text-xl font-medium tracking-wide">{getValueDetail(activeValue).title}</h3>
                  </div>
                  
                  {/* Value description */}
                  <div className="text-white/80 text-base leading-relaxed mb-10 whitespace-pre-line">
                    {getValueDetail(activeValue).description}
                    
                    <div className="mt-6">
                      {getValueDetail(activeValue).extendedDescription}
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="italic text-white/70 border-l-2 pl-4 my-8">
                    <p>"{getValueDetail(activeValue).quote}"</p>
                  </div>
                  
                  {/* Value principles */}
                  <div className="mt-8 border-t border-white/10 pt-8">
                    <h3 className="text-white text-md font-medium mb-4">How We Live This Value:</h3>
                    <ul className="list-disc pl-5 text-white/80 space-y-3">
                      {getValueDetail(activeValue).practices.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="mt-8 mx-6 md:mx-16 mb-20">
            <h2 className="text-white text-2xl font-light mb-4">Our Story</h2>
            <div 
              className="w-full aspect-video bg-black border border-white/20 flex items-center justify-center relative overflow-hidden rounded-sm shadow-lg"
              role="img" 
              aria-label="Video about ZiNRAi culture - coming soon"
              tabIndex={0}
            >
              <div className="absolute inset-0 bg-black/90"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-black/50 border border-white/30 flex items-center justify-center mx-auto mb-4 hover:border-white/50 transition-colors" aria-hidden="true">
                  <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm">Video will be added soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}