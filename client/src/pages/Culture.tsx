import { useState, useEffect } from "react";

export default function Culture() {
  const [animatedIn, setAnimatedIn] = useState(false);
  const [activeFoundation, setActiveFoundation] = useState(0);
  const [activePillar, setActivePillar] = useState(-1);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const visionMission = {
    vision: {
      title: "Vision",
      description: "To help ordinary people become extraordinary leaders—by unlocking purpose, building character, and creating meaningful impact."
    },
    mission: {
      title: "Mission", 
      description: "ZiNRAi exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment."
    }
  };

  const pillarSections = [
    {
      letter: "Z",
      title: "Zeal",
      description: "We pursue purpose with energy and urgency. Passion fuels our progress.",
      color: "orange"
    },
    {
      letter: "I",
      title: "Integrity",
      description: "We do what's right—especially when it's hard. Trust is our currency.",
      color: "red"
    },
    {
      letter: "N",
      title: "Nobility",
      description: "We elevate others with honor. Leadership is rooted in dignity and service.",
      color: "yellow"
    },
    {
      letter: "R",
      title: "Resilience",
      description: "We rise through challenge. Setbacks shape strength and long-term success.",
      color: "indigo"
    },
    {
      letter: "A",
      title: "Abundance",
      description: "We operate from overflow, not scarcity. There's always more to give, grow, and become.",
      color: "blue"
    },
    {
      letter: "I",
      title: "Innovation",
      description: "We adapt, evolve, and pioneer. Creativity unlocks new opportunity.",
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
          <div className="max-w-4xl mx-auto">
            {/* Main Header */}
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light mb-8 tracking-wide text-center">
              WHY ZiNRAi
            </h1>
            
            {/* Main Introduction */}
            <div className="text-white/80 text-lg leading-relaxed mb-16 space-y-4">
              <p>In a world full of noise, hype, and hustle, ZiNRAi<span className="text-xs align-super">™</span> exists to bring something different—something deeper.</p>
              
              <p>We're not just building another platform. We're creating a space where purpose-driven people can come to grow, lead, and live with clarity.</p>
              
              <p>Most companies sell products. We build people.</p>
              
              <p>ZiNRAi is for the builders. The dreamers. The leaders who care more about long-term impact than short-term gain. We exist to help people master their mindset, grow in their craft, and align with a community that actually cares.</p>
              
              <p>Whether you're here to start something new, scale something meaningful, or become someone worth following—ZiNRAi is your launch point.</p>
              
              <p>Because we believe that when people live with intention and lead with integrity, they don't just change their lives—they change the world around them.</p>
              
              <p>This is more than a subscription. It's a signal. A standard. A shift.</p>
              
              <p className="font-medium">This is ZiNRAi.</p>
            </div>

            {/* Vision Section */}
            <div className="mb-12">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                {visionMission.vision.title}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {visionMission.vision.description}
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-16">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                {visionMission.mission.title}
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">
                {visionMission.mission.description}
              </p>
            </div>

            {/* Core Values Section */}
            <div className="mb-8">
              <h2 className="text-white text-2xl md:text-3xl font-light mb-4">
                Core Values
              </h2>
              <p className="text-white/70 text-lg mb-12">
                Each letter of ZiNRAi represents a foundational value that shapes our culture and leadership DNA.
              </p>

              {/* Values List */}
              <div className="space-y-8">
                {pillarSections.map((pillar, index) => (
                  <div key={index} className="border-l-2 border-white/20 pl-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full ${getDotColor(pillar.color)} flex items-center justify-center text-black font-bold text-sm`}>
                          {pillar.letter}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-white text-xl font-medium mb-2">{pillar.title}</h3>
                        <p className="text-white/70 text-base leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}