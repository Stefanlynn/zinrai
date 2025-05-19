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
    <div className="bg-black min-h-screen">
      {/* Grid Lines */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/70"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/70"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-white/70"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-white/70"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-white/70"></div>
      </div>
      
      {/* Page Content */}
      <div className="container mx-auto py-16 px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-2">
            OUR CULTURE
          </h1>
          <div className="h-[1px] w-20 bg-[var(--zinrai-blue-glow)] mx-auto mt-4"></div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureValues.map((value, index) => (
              <div 
                key={index}
                className="bg-black border border-white/20 hover:border-[var(--zinrai-blue-glow)] transition-all duration-300 overflow-hidden p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center mr-3 text-white">
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