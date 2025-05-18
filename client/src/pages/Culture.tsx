import React, { useState } from "react";
import { useLocation } from "wouter";

// Define culture values
const cultureValues = [
  {
    letter: "Z",
    title: "Zenith",
    description: "We pursue the highest standard in everything we do. Excellence isn't optional—it's our baseline."
  },
  {
    letter: "I",
    title: "Integrity",
    description: "We choose what's right over what's easy. Character leads every decision."
  },
  {
    letter: "N",
    title: "Network",
    description: "We grow by connecting, collaborating, and championing one another."
  },
  {
    letter: "R",
    title: "Respect",
    description: "We honor every person—every voice, every story—regardless of title or background."
  },
  {
    letter: "A",
    title: "Accountability",
    description: "We take ownership of our growth, our decisions, and the future we're building."
  },
  {
    letter: "I",
    title: "Impact",
    description: "We don't just show up—we leave a mark. Everything we build is meant to last."
  }
];

export default function Culture() {
  const [_, navigate] = useLocation();
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  
  const toggleView = () => {
    setShowIntro(!showIntro);
  };

  const handleValueClick = (index: number) => {
    setActiveValue(index === activeValue ? null : index);
  };

  return (
    <div className="bg-black min-h-screen w-full overflow-hidden">
      {/* Grid Lines */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-2/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-white/10"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/10"></div>
      </div>
      
      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col relative z-10">
        <div className="absolute top-[10vh] left-[10vw]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">
            OUR CULTURE
          </h1>
        </div>
        
        <div className="absolute top-[20vh] bottom-[15vh] left-[10vw] right-[10vw] overflow-y-auto">
          {showIntro ? (
            <div className="text-white/80 space-y-6 pr-4">
              <p className="text-base sm:text-lg">
                We're not just building a brand—we're shaping a culture. At ZiNRAi, how we move matters just as much as where we're going. Our community is built on more than vision—it's built on values.
              </p>
              <p className="text-base sm:text-lg">
                The letters in ZiNRAi represent the principles we live by. These values guide how we lead, serve, collaborate, and grow—individually and together. They define our decisions, shape our environment, and anchor our movement in something deeper than hype.
              </p>
              <p className="text-base sm:text-lg">
                Because at the end of the day, culture isn't just a page on a website.
                It's how people feel when they show up, contribute, and belong.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto md:mx-0">
              {cultureValues.map((value, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer group transition-all duration-300 border border-transparent hover:border-white/20 p-4 ${activeValue === index ? 'bg-white/5' : ''}`}
                  onClick={() => handleValueClick(index)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-white text-sm font-bold w-7 h-7 flex items-center justify-center border border-white/30 rounded-full group-hover:border-white/50 transition-colors">
                      {value.letter}
                    </span>
                    <h2 className={`text-lg font-medium tracking-wide ${activeValue === index ? 'neon-text-glow' : 'text-white'}`}>{value.title}</h2>
                    {activeValue === index && (
                      <div className="ml-1">
                        <svg width="12" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4L5 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className={`mt-3 pl-10 text-white/80 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${activeValue === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {value.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="absolute bottom-[5vh] left-0 w-full p-6 md:p-0 md:bottom-[15vh] md:left-auto md:right-[10vw] md:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-center justify-center md:justify-end">
          <div className="w-full sm:w-auto border border-white/40 hover:border-white/60 transition-colors duration-300">
            <button 
              className="w-full px-6 py-3 text-white text-sm tracking-wide"
              onClick={toggleView}
            >
              {showIntro ? "EXPLORE OUR VALUES" : "BACK TO INTRODUCTION"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}