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
  const [activeSection, setActiveSection] = useState<'vision' | 'mission' | 'values'>('vision');
  const [activeValue, setActiveValue] = useState<number | null>(null);
  
  // Function to scroll to element
  const scrollToSection = (section: 'vision' | 'mission' | 'values') => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
      <div className="w-full min-h-screen flex flex-col items-center pt-[15vh] pb-[10vh] px-[5vw] md:px-[10vw] relative z-10 overflow-hidden">
        {/* Header */}
        <div className="w-full text-center mb-14">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-light tracking-wide mb-6">
            OUR CULTURE
          </h1>
          <div className="h-[1px] w-20 bg-[var(--zinrai-blue-glow)] mx-auto"></div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="w-full max-w-4xl mx-auto mb-12 flex justify-center">
          <div className="inline-flex border border-white/20 p-1 bg-white/5 backdrop-blur-sm">
            <button 
              onClick={() => scrollToSection('vision')}
              className={`px-5 py-3 text-sm font-medium transition-all duration-300 ${activeSection === 'vision' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(104,172,255,0.3)]' : 'text-white/70 hover:text-white'}`}
            >
              VISION
            </button>
            <button 
              onClick={() => scrollToSection('mission')}
              className={`px-5 py-3 text-sm font-medium transition-all duration-300 ${activeSection === 'mission' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(104,172,255,0.3)]' : 'text-white/70 hover:text-white'}`}
            >
              MISSION
            </button>
            <button 
              onClick={() => scrollToSection('values')}
              className={`px-5 py-3 text-sm font-medium transition-all duration-300 ${activeSection === 'values' ? 'bg-white/10 text-white shadow-[0_0_10px_rgba(104,172,255,0.3)]' : 'text-white/70 hover:text-white'}`}
            >
              VALUES
            </button>
          </div>
        </div>
        
        {/* Content Container */}
        <div className="w-full max-w-4xl mx-auto overflow-y-auto">
          {/* Vision Section */}
          <section id="vision" className={`mb-20 ${activeSection === 'vision' ? 'block' : 'hidden'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-white text-3xl font-light mb-8">Vision</h2>
              <p className="text-white/90 text-xl leading-relaxed max-w-2xl font-light">
                To help ordinary people become extraordinary leaders by mastering daily disciplines and timeless principles.
              </p>
            </div>
          </section>
          
          {/* Mission Section */}
          <section id="mission" className={`mb-20 ${activeSection === 'mission' ? 'block' : 'hidden'}`}>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-white text-3xl font-light mb-8">Mission</h2>
              <p className="text-white/90 text-xl leading-relaxed max-w-2xl font-light">
                ZiNRAi exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment.
              </p>
            </div>
          </section>
          
          {/* Values Section */}
          <section id="values" className={`${activeSection === 'values' ? 'block' : 'hidden'}`}>
            <div className="text-center mb-12">
              <div className="w-24 h-24 rounded-full border border-white/30 flex items-center justify-center mb-8 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h2 className="text-white text-3xl font-light mb-6">Core Values</h2>
              <p className="text-white/90 text-lg leading-relaxed max-w-2xl mx-auto font-light mb-4">
                Each letter of ZiNRAi reflects a foundational value that shapes our culture and leadership DNA.
              </p>
            </div>
            
            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {cultureValues.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 rounded-sm overflow-hidden cursor-pointer"
                  onClick={() => handleValueClick(index)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="w-10 h-10 bg-[var(--zinrai-blue-glow)]/10 text-white rounded-full flex items-center justify-center mr-3 font-bold text-lg shadow-[0_0_15px_rgba(104,172,255,0.15)]">
                        {value.letter}
                      </span>
                      <h3 className="text-white text-xl font-medium">{value.title}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}