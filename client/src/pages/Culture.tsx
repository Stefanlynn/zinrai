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
      title: "Our Story",
      subtitle: "Where It All Began",
      description: "Born from the belief that everyone deserves access to financial education and opportunity. ZiNRAi™ was created to bridge the gap between traditional education and real-world wealth building.",
      details: "In a world full of noise, we're building something that actually matters. ZiNRAi™ was created by entrepreneurs who understood that the biggest barrier to financial success isn't ability—it's access to the right education and community support.",
      color: "blue"
    },
    {
      title: "Our Purpose",
      subtitle: "Why We Exist",
      description: "To democratize wealth creation through education, technology, and community. We exist to transform how people learn, earn, and build lasting financial success.",
      details: "We believe financial literacy should be accessible to everyone, regardless of background or starting point. Our purpose is to create pathways to prosperity that were previously available only to a select few.",
      color: "purple"
    },
    {
      title: "Z - Zenith Mindset",
      subtitle: "Peak Performance Thinking",
      description: "We operate from the highest level of thinking and performance. Every challenge is approached with the mindset of reaching the zenith of possibility.",
      details: "Zenith thinking means never settling for 'good enough.' We consistently push ourselves and our community to reach new heights of achievement and impact.",
      color: "orange"
    },
    {
      title: "I - Impactful Action",
      subtitle: "Meaningful Movement",
      description: "Every action we take is designed to create meaningful, lasting impact. We don't just talk about change—we create it through deliberate, strategic action.",
      details: "Impact isn't about grand gestures—it's about consistent, purposeful actions that compound over time. We measure success by the positive changes we create in people's lives.",
      color: "green"
    },
    {
      title: "N - Nurturing Growth",
      subtitle: "Cultivating Potential",
      description: "We create environments where individuals can flourish and reach their full potential. Growth is nurtured through education, mentorship, and community support.",
      details: "True growth happens when potential meets opportunity in a supportive environment. We provide the soil, sunlight, and nutrients for personal and financial growth to flourish.",
      color: "red"
    },
    {
      title: "R - Relentless Excellence",
      subtitle: "Unwavering Standards",
      description: "Excellence isn't a destination—it's a relentless pursuit. We maintain the highest standards in everything we create, teach, and deliver.",
      details: "Relentless excellence means never compromising on quality. Whether it's our educational content, community support, or platform experience, we pursue perfection in every detail.",
      color: "yellow"
    },
    {
      title: "A - Authentic Leadership",
      subtitle: "Genuine Influence",
      description: "We lead by example with authenticity and transparency. Our influence comes from genuine care for our community and unwavering commitment to their success.",
      details: "Authentic leadership means being real about challenges while maintaining unwavering optimism about possibilities. We lead with vulnerability, strength, and genuine care.",
      color: "cyan"
    },
    {
      title: "I - Innovative Solutions",
      subtitle: "Creative Problem Solving",
      description: "We approach every challenge with innovative thinking. Our solutions combine proven principles with cutting-edge technology and creative approaches.",
      details: "Innovation isn't just about technology—it's about finding creative solutions to real problems. We constantly evolve our methods to better serve our community's needs.",
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