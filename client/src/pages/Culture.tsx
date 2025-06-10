import { useState, useEffect } from "react";

export default function Culture() {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeFoundation, setActiveFoundation] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const visionMission = {
    vision: {
      title: "Our Vision",
      subtitle: "The Future We're Creating",
      description: "A world where financial literacy is universal, where every person has the tools and knowledge to build generational wealth and create lasting impact.",
      details: "We envision communities where financial success is not limited by background, education, or circumstances. Our vision is a future where innovative technology and proven strategies converge to make wealth creation accessible to all."
    },
    mission: {
      title: "Our Mission", 
      subtitle: "How We Make It Happen",
      description: "To deliver world-class financial education through innovative digital platforms, building communities that support and accelerate individual success.",
      details: "Our mission is executed through comprehensive courses, cutting-edge technology, and authentic community building. We provide not just education, but transformation through practical application and ongoing support."
    }
  };

  const pillarSections = [
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
      color: "red"
    },
    {
      title: "N - Nurturing Growth",
      subtitle: "Cultivating Potential",
      description: "We create environments where individuals can flourish and reach their full potential. Growth is nurtured through education, mentorship, and community support.",
      details: "True growth happens when potential meets opportunity in a supportive environment. We provide the soil, sunlight, and nutrients for personal and financial growth to flourish.",
      color: "yellow"
    },
    {
      title: "R - Relentless Excellence",
      subtitle: "Unwavering Standards",
      description: "Excellence isn't a destination—it's a relentless pursuit. We maintain the highest standards in everything we create, teach, and deliver.",
      details: "Relentless excellence means never compromising on quality. Whether it's our educational content, community support, or platform experience, we pursue perfection in every detail.",
      color: "indigo"
    },
    {
      title: "A - Authentic Leadership",
      subtitle: "Genuine Influence",
      description: "We lead by example with authenticity and transparency. Our influence comes from genuine care for our community and unwavering commitment to their success.",
      details: "Authentic leadership means being real about challenges while maintaining unwavering optimism about possibilities. We lead with vulnerability, strength, and genuine care.",
      color: "blue"
    },
    {
      title: "I - Innovative Solutions",
      subtitle: "Creative Problem Solving",
      description: "We approach every challenge with innovative thinking. Our solutions combine proven principles with cutting-edge technology and creative approaches.",
      details: "Innovation isn't just about technology—it's about finding creative solutions to real problems. We constantly evolve our methods to better serve our community's needs.",
      color: "purple"
    }
  ];



  const handlePillarClick = (index: number) => {
    setActivePillar(index);
  };

  const getSectionColor = (color: string) => {
    const colors: { [key: string]: string } = {
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
    const colors: { [key: string]: string } = {
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
        <div className={`p-8 pt-[10vh] md:p-16 md:pt-[15vh] transition-all duration-700 ${animatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-wide text-center bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Why ZiNRAi<span className="text-xs align-super">™</span>
            </h1>
            <p className="text-white/70 text-lg mb-16 text-center max-w-2xl mx-auto">
              Our foundation is built on a clear vision and focused mission.
            </p>
            
            {/* Vision Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl md:text-3xl font-light mb-4 tracking-wide">
                  {visionMission.vision.title}
                </h2>
                <p className="text-white/60 text-lg italic mb-4">
                  {visionMission.vision.subtitle}
                </p>
                <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
                  {visionMission.vision.description}
                </p>
                <p className="text-white/70 text-base leading-relaxed max-w-3xl mx-auto">
                  {visionMission.vision.details}
                </p>
              </div>
            </div>

            {/* Mission Section */}
            <div className="mb-20">
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl md:text-3xl font-light mb-4 tracking-wide">
                  {visionMission.mission.title}
                </h2>
                <p className="text-white/60 text-lg italic mb-4">
                  {visionMission.mission.subtitle}
                </p>
                <p className="text-white/80 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
                  {visionMission.mission.description}
                </p>
                <p className="text-white/70 text-base leading-relaxed max-w-3xl mx-auto">
                  {visionMission.mission.details}
                </p>
              </div>
            </div>

            {/* Pillars Section */}
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-light mb-4 tracking-wide text-center">
              The ZiNRAi<span className="text-xs align-super">™</span> Pillars
            </h2>
            <p className="text-white/70 text-lg mb-16 text-center max-w-2xl mx-auto">
              Six foundational principles that guide our actions and define our character.
            </p>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {pillarSections.map((pillar, index) => (
                <div 
                  key={index}
                  onClick={() => handlePillarClick(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handlePillarClick(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={`cursor-pointer p-6 rounded-lg border transition-all duration-300 hover:scale-[1.02] min-h-[180px] ${
                    activePillar === index 
                      ? `bg-gradient-to-br ${getSectionColor(pillar.color)} shadow-lg`
                      : 'bg-gradient-to-br from-black/40 to-black/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${getDotColor(pillar.color)} mb-4`}></div>
                  <h3 className="text-white text-lg font-medium mb-2">{pillar.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Pillar Detail Panel */}
            <div className="bg-gradient-to-br from-black/80 to-black/95 border border-white/20 rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 rounded-full ${getDotColor(pillarSections[activePillar].color)} mr-3`}></div>
                <h3 className="text-white text-2xl font-medium">{pillarSections[activePillar].title}</h3>
              </div>
              <h4 className="text-white/80 text-lg font-medium mb-4">{pillarSections[activePillar].subtitle}</h4>
              <p className="text-white/70 text-base leading-relaxed">
                {pillarSections[activePillar].details}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}