import React, { useState, useEffect } from "react";

// Define impact statistics
const impactStats = [
  { id: 1, value: 75000, prefix: "", suffix: "+", label: "Meals provided across the U.S., Pakistan, and Africa" },
  { id: 2, value: 8, prefix: "", suffix: "", label: "Clean water projects funded in West Africa" },
  { id: 3, value: 2000, prefix: "", suffix: "+", label: "Families impacted through decentralized giving" },
  { id: 4, value: 100, prefix: "", suffix: "%", label: "Transparency powered by blockchain technology" },
  { id: 5, value: 1, prefix: "$", suffix: "", label: "Donated per active subscription, every month" }
];

export default function Cares() {
  const [showLines, setShowLines] = useState(false);
  const [countersAnimated, setCountersAnimated] = useState(false);

  // Counter animation
  useEffect(() => {
    if (!countersAnimated) {
      const animateCounters = () => {
        setCountersAnimated(true);
        const counters = document.querySelectorAll('.impact-counter');
        
        counters.forEach((counter, index) => {
          const stat = impactStats[index];
          if (stat) {
            const target = stat.value;
            const prefix = stat.prefix;
            const suffix = stat.suffix;
            const formattedValue = target.toLocaleString();
            counter.textContent = `${prefix}${formattedValue}${suffix}`;
          }
        });
      };
      
      setTimeout(animateCounters, 800);
    }
  }, [countersAnimated]);

  // Show grid lines after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLines(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-white">
      {/* Main grid section */}
      <div className="min-h-screen relative">
        {/* Grid lines */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${showLines ? 'opacity-100' : 'opacity-0'}`}>
          {/* Vertical lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          
          {/* Horizontal lines */}
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-light mb-8 tracking-wider">
              ZiNRAi<span className="text-xs align-super">™</span> Cares
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Making a meaningful impact through education and direct assistance
            </p>
            
            {/* Impact Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {impactStats.map((stat, index) => (
                <div key={stat.id} className="bg-white/5 border border-white/20 rounded-lg p-6 backdrop-blur-sm">
                  <div className="impact-counter text-3xl font-light mb-2 text-white">
                    {stat.prefix}0{stat.suffix}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Areas Section */}
      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">Impact Areas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Food Security</h3>
              <p className="text-white/70">
                Supporting meal programs across underserved communities in the U.S., Pakistan, and Africa.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Clean Water</h3>
              <p className="text-white/70">
                Funding sustainable water projects in West African communities lacking access to clean water.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Education Access</h3>
              <p className="text-white/70">
                Providing educational resources and technology access to underserved populations.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Transparency</h3>
              <p className="text-white/70">
                Using blockchain technology to ensure 100% transparency in fund allocation and impact tracking.
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-light mb-4 text-center">Our Mission</h2>
            <p className="text-white/80 leading-relaxed text-center">
              ZiNRAi<span className="text-xs align-super">™</span> Cares represents our commitment to global impact through education 
              and direct assistance. Every subscription contributes to verified charitable initiatives, 
              with full transparency powered by blockchain technology.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-light mb-6 text-center">Our Impact in Action</h2>
            <div className="w-full">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/grmGGZjYIN0"
                title="ZiNRAi Cares Impact Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ minHeight: '400px', borderRadius: '8px' }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}