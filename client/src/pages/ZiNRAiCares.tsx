import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

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
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [_, navigate] = useLocation();

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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden pt-[32px]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-light tracking-wider text-white mb-12 text-center">
          ZiNRAi <span className="font-normal">Cares</span>
        </h1>
        
        {/* Impact Statement */}
        <div className="mb-16 text-center">
          <p className="text-base md:text-lg text-white/90 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            For every active subscription, we donate $1 to sustainable impact projects globally.
          </p>
        </div>
        
        {/* Two column layout for Impact Areas and Testimonial */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          {/* Impact Areas */}
          <div className="w-full md:w-3/5">
            <h2 className="text-xs uppercase tracking-widest mb-6 text-white/70">Impact Areas</h2>
            <div className="space-y-6">
              {impactAreas.map(area => (
                <div 
                  key={area.id}
                  className={`py-3 border-b border-white/10 cursor-pointer transition-all group`}
                  onClick={() => setActiveArea(activeArea === area.id ? null : area.id)}
                >
                  <h3 className="text-sm font-light tracking-wide text-white/80 group-hover:text-white transition-colors flex items-center">
                    <span className="mr-3 text-xs opacity-50">0{area.id}</span>
                    {area.title}
                    <span className="ml-auto text-xs opacity-50">{activeArea === area.id ? '–' : '+'}</span>
                  </h3>
                  {activeArea === area.id && (
                    <p className="text-xs text-white/60 mt-4 pl-6 pr-4 animate-fade-in font-light">
                      {area.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="w-full md:w-2/5">
            <div className="border-l-2 border-white/20 pl-6 py-4">
              <p className="text-sm italic text-white/80 mb-4 font-light leading-relaxed">
                "The water well project funded by ZiNRAi has transformed our village. For the first time, our children don't have to walk miles for clean water."
              </p>
              <p className="text-xs text-white/50">— Community Leader, Burkina Faso</p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-xs uppercase tracking-widest mb-10 text-white/70 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full max-w-4xl mx-auto">
            {impactStats.map(stat => (
              <div key={stat.id} className="text-center">
                <div className="text-2xl md:text-3xl font-light text-white mb-3">
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
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/subscribe')}
            className="px-8 py-3 border border-white/30 text-white text-xs tracking-widest uppercase hover:bg-white/5 transition-colors"
          >
            Subscribe to Make an Impact
          </button>
        </div>
      </div>
    </div>
  );
}