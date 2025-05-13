import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FiArrowLeft } from "react-icons/fi";

// Define impact statistics with more concise labels for minimalist design
const impactStats = [
  { id: 1, value: 75000, prefix: "", suffix: "+", label: "Meals provided" },
  { id: 2, value: 8, prefix: "", suffix: "", label: "Water projects" },
  { id: 3, value: 2000, prefix: "", suffix: "+", label: "Families impacted" },
  { id: 4, value: 100, prefix: "", suffix: "%", label: "Transparency" },
  { id: 5, value: 1, prefix: "$", suffix: "", label: "Per subscription" }
];

// Define impact areas
const impactAreas = [
  {
    id: 1,
    title: "Food Security",
    description: "We partner with food banks and community kitchens to combat hunger in urban and rural communities globally."
  },
  {
    id: 2,
    title: "Clean Water Access",
    description: "Our initiatives focus on building sustainable water infrastructure in water-scarce regions."
  },
  {
    id: 3,
    title: "Tech Education",
    description: "We provide resources and mentorship for underrepresented communities to access quality tech education."
  }
];

export default function ZiNRAiCares() {
  const [activeArea, setActiveArea] = useState<number | null>(null);
  const [showLines, setShowLines] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [_, navigate] = useLocation();

  // Handle back button click
  const handleBack = () => {
    navigate('/');
  };

  // Counter animation
  useEffect(() => {
    if (!countersAnimated) {
      const timer = setTimeout(() => {
        setCountersAnimated(true);
        const counters = document.querySelectorAll('.impact-counter');
        
        counters.forEach((counter: any) => {
          const target = +counter.getAttribute('data-target');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const duration = 1500; // ms
          const steps = 60;
          const stepTime = duration / steps;
          const stepValue = target / steps;
          let current = 0;
          
          const updateCounter = () => {
            current += stepValue;
            if (current < target) {
              const formattedValue = Math.ceil(current).toLocaleString();
              counter.textContent = `${prefix}${formattedValue}${suffix}`;
              setTimeout(updateCounter, stepTime);
            } else {
              const formattedValue = target.toLocaleString();
              counter.textContent = `${prefix}${formattedValue}${suffix}`;
            }
          };
          
          updateCounter();
        });
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [countersAnimated]);

  // Show grid lines after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLines(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Grid lines overlay - same as main site for visual consistency */}
      <div className={`absolute inset-0 grid grid-cols-2 grid-rows-4 pointer-events-none transition-opacity duration-1000 ${showLines ? 'opacity-70' : 'opacity-0'}`}>
        <div className="border-r border-white/20"></div>
        <div className="border-l border-white/20"></div>
        <div className="border-r border-white/20 border-t"></div>
        <div className="border-l border-white/20 border-t"></div>
        <div className="border-r border-white/20 border-t"></div>
        <div className="border-l border-white/20 border-t"></div>
        <div className="border-r border-white/20 border-t"></div>
        <div className="border-l border-white/20 border-t"></div>
      </div>
      
      <div className="grid grid-cols-2 grid-rows-4 min-h-screen">
        {/* Top Row - Header with minimalist design */}
        <div className="col-span-2 flex items-center px-8 py-6">
          <button 
            onClick={handleBack}
            className="text-white/70 hover:text-white transition-colors flex items-center group"
            aria-label="Go back"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs uppercase tracking-widest">Back</span>
          </button>
          <h1 className="text-2xl md:text-4xl font-light tracking-wider text-white absolute left-1/2 transform -translate-x-1/2">
            ZiNRAi <span className="font-normal">Cares</span>
          </h1>
        </div>
        
        {/* Second Row - Impact Statement */}
        <div className="row-span-1 col-span-2 flex items-center justify-center px-8 py-4">
          <div className="text-center max-w-xl">
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-light tracking-wide">
              For every active subscription, we donate $1 to sustainable impact projects globally.
            </p>
          </div>
        </div>
        
        {/* Third Row - Impact Areas and Testimonial */}
        <div className="border-t border-r border-white/20 p-6 flex items-center">
          <div className="w-full">
            <h2 className="text-xs uppercase tracking-widest mb-6 text-white/70">Impact Areas</h2>
            <div className="space-y-4">
              {impactAreas.map(area => (
                <div 
                  key={area.id}
                  className={`py-3 border-b border-white/10 cursor-pointer transition-all ${activeArea === area.id ? 'bg-white/5' : ''}`}
                  onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                >
                  <h3 className="text-sm font-light tracking-wide text-white/80 hover:text-white transition-colors flex items-center">
                    <span className="mr-2 text-xs opacity-50">0{area.id}</span>
                    {area.title}
                    <span className="ml-auto text-xs opacity-50">{activeArea === area.id ? '–' : '+'}</span>
                  </h3>
                  {activeArea === area.id && (
                    <p className="text-xs text-white/60 mt-3 pl-6 pr-4 animate-fade-in font-light">
                      {area.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-l border-white/20 p-8 flex items-center">
          <div className="border-l border-white/30 pl-4">
            <p className="text-sm italic text-white/80 mb-3 font-light">
              "The water well project funded by ZiNRAi has transformed our village. For the first time, our children don't have to walk miles for clean water."
            </p>
            <p className="text-xs text-white/50">— Community Leader, Burkina Faso</p>
          </div>
        </div>
        
        {/* Bottom Row - Stats & CTA */}
        <div className="col-span-2 border-t border-white/20 p-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xs uppercase tracking-widest mb-8 text-white/70">Our Impact</h2>
            
            <div className="grid grid-cols-5 gap-6 w-full max-w-3xl mx-auto mb-12">
              {impactStats.map(stat => (
                <div key={stat.id} className="text-center">
                  <div className="text-lg md:text-xl font-light text-white mb-2">
                    <span 
                      className="impact-counter" 
                      data-target={stat.value}
                      data-prefix={stat.prefix}
                      data-suffix={stat.suffix}
                    >
                      {stat.prefix}0{stat.suffix}
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/subscribe')}
              className="px-6 py-2 border border-white/30 text-white text-xs tracking-widest uppercase hover:bg-white/5 transition-colors"
            >
              Subscribe to Make an Impact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}