import { useState, useEffect } from "react";

export default function Culture() {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const sections = [
    {
      title: "Our Vision",
      subtitle: "The Future We're Building",
      description: "To create a world where everyone has access to the tools, knowledge, and opportunities needed to achieve financial freedom and personal growth. We believe in democratizing success through education and innovation.",
      details: "ZiNRAi™ envisions a global community where traditional barriers to wealth creation are eliminated through cutting-edge technology and comprehensive education. We're building the bridge between where people are and where they want to be financially.",
      color: "blue"
    },
    {
      title: "Our Mission",
      subtitle: "What Drives Us Daily",
      description: "To empower individuals through innovative digital learning platforms, strategic investment education, and community-driven growth opportunities that transform lives and build generational wealth.",
      details: "Every course we create, every platform we build, and every community we foster is designed with one goal: helping people take control of their financial future. We combine proven strategies with modern technology to deliver results.",
      color: "purple"
    },
    {
      title: "Zeal",
      subtitle: "Passionate Pursuit",
      description: "We approach every challenge with unstoppable enthusiasm and determination. Our passion for excellence drives innovation and inspires others to reach beyond their perceived limitations.",
      details: "Zeal isn't just excitement—it's sustained energy directed toward meaningful goals. We channel this energy into creating solutions that genuinely impact lives and communities.",
      color: "orange"
    },
    {
      title: "Integrity",
      subtitle: "Unwavering Ethics",
      description: "Transparency, honesty, and ethical practices form the foundation of every decision we make. We build trust through consistent actions that align with our values.",
      details: "Integrity means doing the right thing even when no one is watching. We maintain the highest ethical standards in all our business practices, educational content, and community interactions.",
      color: "green"
    },
    {
      title: "Nobility",
      subtitle: "Elevated Purpose",
      description: "We operate with dignity, honor, and a commitment to uplifting others. Our success is measured by the positive impact we create in people's lives.",
      details: "Nobility is about elevating not just ourselves, but everyone we encounter. We believe in the inherent worth of every individual and their capacity for greatness.",
      color: "red"
    },
    {
      title: "Resilience",
      subtitle: "Strength Through Adversity",
      description: "We view challenges as opportunities for growth. Our ability to adapt, persist, and emerge stronger defines our character and ensures long-term success.",
      details: "Resilience is built through experience and strengthened through community. We teach and embody the mindset that setbacks are setups for comebacks.",
      color: "yellow"
    },
    {
      title: "Abundance",
      subtitle: "Limitless Thinking",
      description: "We believe in unlimited possibilities and work to create value for everyone. Our abundance mindset drives innovation and fosters collaborative success.",
      details: "Abundance thinking recognizes that success isn't a zero-sum game. When we help others succeed, we all benefit from the expanded opportunities and stronger communities.",
      color: "cyan"
    },
    {
      title: "Innovation",
      subtitle: "Forward Momentum",
      description: "We continuously evolve our methods, technologies, and approaches to stay ahead of industry trends and deliver cutting-edge solutions to our community.",
      details: "Innovation isn't just about technology—it's about finding better ways to serve our community, deliver education, and create opportunities for growth and success.",
      color: "indigo"
    }
  ];

  const handleSectionClick = (index: number) => {
    setActiveSection(index);
  };

  const getSectionColor = (color: string) => {
    const colors = {
      blue: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
      purple: "from-purple-500/20 to-purple-600/10 border-purple-500/30",
      orange: "from-orange-500/20 to-orange-600/10 border-orange-500/30",
      green: "from-green-500/20 to-green-600/10 border-green-500/30",
      red: "from-red-500/20 to-red-600/10 border-red-500/30",
      yellow: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
      cyan: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
      indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30"
    };
    return colors[color] || colors.blue;
  };

  const getDotColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      green: "bg-green-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      cyan: "bg-cyan-500",
      indigo: "bg-indigo-500"
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>

      {/* Content area */}
      <div className="relative z-10 page-content">
        <div className="flex flex-col md:flex-row p-0">
          {/* Left Side - Sections List */}
          <div className={`w-full md:w-1/2 p-8 pt-[10vh] pb-2 md:p-16 md:pl-20 md:pb-0 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-2 tracking-wide bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Why ZiNRAi<span className="text-xs align-super">™</span>
            </h1>
            <p className="text-white/70 text-lg mb-12 max-w-md">
              Discover our vision, mission, and the core principles that drive everything we do.
            </p>
            
            <div className="space-y-6 max-w-md mb-4">
              {sections.map((section, index) => (
                <div 
                  key={index}
                  onClick={() => handleSectionClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSectionClick(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`cursor-pointer p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${
                    activeSection === index 
                      ? `bg-gradient-to-r ${getSectionColor(section.color)} shadow-lg`
                      : 'bg-gradient-to-r from-black/40 to-black/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getDotColor(section.color)}`}></div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-medium mb-1">{section.title}</h3>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Section Detail (Desktop Only) */}
          <div className={`hidden md:block w-1/2 p-16 pt-[180px] pb-0 pr-20 transition-all duration-700 ${animatedIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
            <div className="rounded border overflow-hidden transition-all duration-500 bg-gradient-to-br from-black/80 to-black/95 border-white/20">
              <div className="p-10 pb-0 overflow-y-auto max-h-[70vh]">
                {/* Section header with animated dot */}
                <div className="flex items-center mb-8">
                  <div className={`w-3 h-3 rounded-full ${getDotColor(sections[activeSection].color)} mr-3`}></div>
                  <h3 className="text-white text-xl font-medium tracking-wide">{sections[activeSection].title}</h3>
                </div>
                
                {/* Section subtitle */}
                <h4 className="text-white/80 text-lg font-medium mb-6">{sections[activeSection].subtitle}</h4>
                
                {/* Section description */}
                <div className="text-white/70 text-base leading-relaxed mb-8">
                  {sections[activeSection].description}
                </div>
                
                {/* Section details */}
                <div className="text-white/60 text-base leading-relaxed mb-0">
                  {sections[activeSection].details}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}