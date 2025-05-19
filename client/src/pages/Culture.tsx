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
    <div className="bg-black min-h-screen w-full">
      {/* Grid Container */}
      <div className="h-screen grid grid-cols-2 grid-rows-4">
        {/* Grid Lines */}
        <div className="fixed inset-0 z-[5] pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/70"></div>
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/70"></div>
          <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/70"></div>
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/70"></div>
          <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/70"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/70"></div>
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/70"></div>
        </div>
        
        {/* Page Title - Top Left Box */}
        <div className="relative h-[25vh] flex items-center justify-center p-6 overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
              OUR CULTURE
            </h1>
          </div>
          <div className="absolute inset-0 z-0 bg-black"></div>
        </div>
        
        {/* Vision - Top Right Box */}
        <div className="relative h-[25vh] flex flex-col justify-center p-8 overflow-auto">
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-light mb-3 neon-text-glow">Vision</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              To help ordinary people become extraordinary leaders by mastering daily disciplines and timeless principles.
            </p>
          </div>
          <div className="absolute inset-0 z-0 bg-black"></div>
        </div>
        
        {/* Mission - Second Row Left */}
        <div className="relative h-[25vh] flex flex-col justify-center p-8 overflow-auto">
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-light mb-3 neon-text-glow">Mission</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              ZiNRAi exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment.
            </p>
          </div>
          <div className="absolute inset-0 z-0 bg-black"></div>
        </div>
        
        {/* Core Values Title - Second Row Right */}
        <div className="relative h-[25vh] flex flex-col justify-center p-8 overflow-auto">
          <div className="relative z-10">
            <h2 className="text-white text-2xl font-light mb-3 neon-text-glow">Core Values</h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Each letter of ZiNRAi reflects a foundational value that shapes our culture and leadership DNA.
            </p>
          </div>
          <div className="absolute inset-0 z-0 bg-black"></div>
        </div>
        
        {/* Core Values Grid - Bottom Half (spans two rows, two columns) */}
        <div className="col-span-2 row-span-2 h-[50vh] overflow-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 relative z-10">
            {cultureValues.map((value, index) => (
              <div 
                key={index}
                className="bg-black border border-white/20 hover:border-[var(--zinrai-blue-glow)] transition-all duration-300 overflow-hidden p-5"
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
          <div className="absolute inset-0 z-0 bg-black"></div>
        </div>
      </div>
    </div>
  );
}