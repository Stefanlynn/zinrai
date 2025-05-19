import React, { useState } from "react";
import { useLocation } from "wouter";

// Define culture values
const cultureValues = [
  {
    letter: "Z",
    title: "Zeal",
    description: "We pursue purpose with energy and urgency. Passion fuels our progress."
  },
  {
    letter: "I",
    title: "Integrity",
    description: "We do what's right—especially when it's hard. Trust is our currency."
  },
  {
    letter: "N",
    title: "Nobility",
    description: "We elevate others with honor. Leadership is rooted in dignity and service."
  },
  {
    letter: "R",
    title: "Resilience",
    description: "We rise through challenge. Setbacks shape strength and long-term success."
  },
  {
    letter: "A",
    title: "Abundance",
    description: "We operate from overflow, not scarcity. There's always more to give, grow, and become."
  },
  {
    letter: "I",
    title: "Innovation",
    description: "We adapt, evolve, and pioneer. Creativity unlocks new opportunity."
  }
];

export default function Culture() {
  const [_, navigate] = useLocation();
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const handleValueClick = (index: number) => {
    setActiveValue(index === activeValue ? null : index);
  };

  return (
    <div className="bg-black min-h-screen overflow-y-auto">
      {/* Grid Lines */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/10"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-white/10"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1.5px] bg-white/10"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1.5px] bg-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-white/10"></div>
      </div>
      
      {/* Page Content */}
      <div className="container mx-auto pt-[8vh] pb-32 px-4 relative z-10">
        {/* Video Section */}
        <div className="mb-16 w-full">
          <div className="w-full aspect-video bg-black border border-white/20 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/90"></div>
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-black/50 border border-white/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white/70 text-sm">Video will be added soon</p>
            </div>
          </div>
        </div>
        
        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <div className="bg-black border border-white/20 p-8">
            <h2 className="text-white text-2xl font-light mb-4 neon-text-glow">Vision</h2>
            <p className="text-white/90 text-base leading-relaxed">
              To help ordinary people become extraordinary leaders by mastering daily disciplines and timeless principles.
            </p>
          </div>
          
          {/* Mission */}
          <div className="bg-black border border-white/20 p-8">
            <h2 className="text-white text-2xl font-light mb-4 neon-text-glow">Mission</h2>
            <p className="text-white/90 text-base leading-relaxed">
              ZiNRAi exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment.
            </p>
          </div>
        </div>
        
        {/* Core Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-white text-2xl font-light mb-4 neon-text-glow">Core Values</h2>
            <p className="text-white/90 text-base leading-relaxed max-w-2xl mx-auto">
              Each letter of ZiNRAi reflects a foundational value that shapes our culture and leadership DNA.
            </p>
          </div>
          
          {/* Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-visible">
            {cultureValues.map((value, index) => (
              <div 
                key={index}
                className="bg-black border border-white/20 hover:border-[var(--zinrai-blue-glow)] transition-all duration-300 overflow-hidden p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--zinrai-blue-glow)]/10 border border-white/30 flex items-center justify-center mr-3 text-white shadow-[0_0_15px_rgba(104,172,255,0.15)]">
                    {value.letter}
                  </div>
                  <h3 className="text-white text-xl font-medium">{value.title}</h3>
                </div>
                <p className="text-white/80 text-sm leading-relaxed pl-2">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}