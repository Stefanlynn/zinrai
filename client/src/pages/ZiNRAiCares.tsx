import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Define impact statistics
const impactStats = [
  { id: 1, value: 75000, prefix: "", suffix: "+", label: "Meals provided across the U.S. and Pakistan" },
  { id: 2, value: 8, prefix: "", suffix: "", label: "Clean water projects funded in West Africa" },
  { id: 3, value: 2000, prefix: "", suffix: "+", label: "Families impacted through decentralized giving" },
  { id: 4, value: 100, prefix: "", suffix: "%", label: "Transparency powered by blockchain technology" },
  { id: 5, value: 1, prefix: "$", suffix: "", label: "Donated per active subscription, every month" }
];

export default function ZiNRAiCares() {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [_, navigate] = useLocation();

  // Counter animation
  useEffect(() => {
    if (!countersAnimated) {
      const animateCounters = () => {
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
              // Format the number with commas for thousands
              const formattedValue = Math.ceil(current).toLocaleString();
              counter.textContent = `${prefix}${formattedValue}${suffix}`;
              setTimeout(updateCounter, stepTime);
            } else {
              // Format the final value with commas
              const formattedValue = target.toLocaleString();
              counter.textContent = `${prefix}${formattedValue}${suffix}`;
            }
          };
          
          updateCounter();
        });
      };
      
      setTimeout(animateCounters, 800);
    }
  }, [countersAnimated]);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden pt-[32px]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8">ZiNRAi Cares</h1>
        
        {/* Impact Statement */}
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
            At ZiNRAi, we believe technology should be a force for good. For every active subscription, we donate $1 to sustainable impact projects around the globe.
          </p>
          <p className="text-xl text-white/70">
            Our blockchain-powered platform ensures 100% transparency in giving.
          </p>
        </div>
        
        {/* Two column layout for Impact Areas and Testimonial */}
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Impact Areas */}
          <div className="w-full md:w-3/5">
            <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wide">Impact Areas</h2>
            <ul className="space-y-3">
              <li 
                className={`p-3 border border-white/30 cursor-pointer transition-all ${activeTab === 1 ? 'bg-white/10 border-white' : 'hover:bg-white/5'}`}
                onClick={() => setActiveTab(activeTab === 1 ? null : 1)}
              >
                <h4 className="text-lg font-medium">Food Security</h4>
                {activeTab === 1 && (
                  <p className="text-white/70 mt-2 animate-fade-in">
                    We partner with food banks and community kitchens to combat hunger in urban and rural communities globally.
                  </p>
                )}
              </li>
              <li 
                className={`p-3 border border-white/30 cursor-pointer transition-all ${activeTab === 2 ? 'bg-white/10 border-white' : 'hover:bg-white/5'}`}
                onClick={() => setActiveTab(activeTab === 2 ? null : 2)}
              >
                <h4 className="text-lg font-medium">Clean Water Access</h4>
                {activeTab === 2 && (
                  <p className="text-white/70 mt-2 animate-fade-in">
                    Our initiatives focus on building sustainable water infrastructure in water-scarce regions of West Africa.
                  </p>
                )}
              </li>
              <li 
                className={`p-3 border border-white/30 cursor-pointer transition-all ${activeTab === 3 ? 'bg-white/10 border-white' : 'hover:bg-white/5'}`}
                onClick={() => setActiveTab(activeTab === 3 ? null : 3)}
              >
                <h4 className="text-lg font-medium">Tech Education</h4>
                {activeTab === 3 && (
                  <p className="text-white/70 mt-2 animate-fade-in">
                    We provide resources and mentorship for underrepresented communities to access quality tech education.
                  </p>
                )}
              </li>
            </ul>
          </div>
          
          {/* Testimonial */}
          <div className="w-full md:w-2/5 flex items-center">
            <div className="bg-black/50 p-6 border border-white/30 w-full">
              <p className="text-lg italic text-white/90 mb-4">
                "The water well project funded by ZiNRAi has transformed our village. For the first time, our children don't have to walk miles for clean water."
              </p>
              <p className="text-white/70">— Community Leader, Burkina Faso</p>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 uppercase tracking-wide text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {impactStats.map(stat => (
              <div key={stat.id} className="bg-black/30 p-4 border border-white/30 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  <span 
                    className="impact-counter" 
                    data-target={stat.value}
                    data-prefix={stat.prefix}
                    data-suffix={stat.suffix}
                  >
                    {stat.prefix}0{stat.suffix}
                  </span>
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/subscribe')}
            className="px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            SUBSCRIBE TO MAKE AN IMPACT
          </button>
        </div>
      </div>
    </div>
  );
}