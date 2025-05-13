import React, { useEffect, useState } from 'react';
import '../styles/logo.css';
import logoImage from '@assets/Untitled design.png';

export default function Logo() {
  const [showContent, setShowContent] = useState(false);

  // Animation effect for content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white/80 overflow-y-auto relative flex items-center justify-center py-12">
      {/* Extremely subtle grid lines */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 z-0 pointer-events-none opacity-50">
        <div className="border-r border-white/5"></div>
        <div className="border-l border-white/5"></div>
        <div className="border-b border-white/5 col-span-2"></div>
        <div className="border-b border-white/5 col-span-2"></div>
        <div className="border-b border-white/5 col-span-2"></div>
        <div className="col-span-2"></div>
      </div>
      
      {/* Main content wrapper with single column layout */}
      <div className="relative z-10 max-w-3xl px-4">
        {/* Logo and title */}
        <div className={`flex flex-col items-center mb-10 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <img src={logoImage} alt="ZiNRAi Logo" className="w-[140px] mb-4" />
          <h1 className="text-base uppercase font-light tracking-[0.2em] text-white/70">The Brand</h1>
        </div>
        
        {/* Introduction */}
        <div className={`transition-all duration-1000 delay-300 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Simple, elegant intro with minimal design */}
          <div className="text-center mb-16">
            <p className="text-base text-white mb-8">
              In a world full of noise, we're building something that actually matters.
            </p>
            
            <p className="text-xs text-white/70 max-w-lg mx-auto mb-6 leading-relaxed">
              ZiNRAi was created for those who want to grow with clarity, lead with integrity, and build a life that stands for something.
            </p>
            
            <p className="text-xs text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
              We're more than a company—we're a global initiative made up of people who are serious about purpose, committed to community, and focused on lasting impact.
            </p>
          </div>
          
          {/* Core values - ultra clean layout */}
          <div className="mb-16 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs text-white/70 leading-relaxed">
                  We believe opportunity should be available to anyone willing to grow.
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  We believe education should be clear, actionable, and real-world.
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-xs text-white/70 leading-relaxed">
                  We believe leadership should be built on trust, humility, and strength of character—not charisma alone.
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  And we believe that true success never asks you to trade your values to reach your goals.
                </p>
              </div>
            </div>
          </div>
          
          {/* "With clarity" section */}
          <div className="text-center mb-16">
            <p className="text-xs text-white/70 mb-4 leading-relaxed">
              Whether you're just getting started or ready to take things to the next level, ZiNRAi equips you with the tools, the training, and the team to help you move forward—
            </p>
            
            <div className="flex flex-col items-center space-y-1 mb-0">
              <p className="text-xs text-white/80 font-light">With clarity, with excellence, and with a purpose that runs deeper than personal gain.</p>
            </div>
          </div>
          
          {/* Final manifesto */}
          <div className="text-center mb-16">
            <p className="text-xs text-white/80 mb-1">This isn't about hype.</p>
            <p className="text-xs text-white/80 mb-1">It's about building a future you're proud of.</p>
            <p className="text-xs text-white/80 mb-1">It's about legacy.</p>
            <p className="text-xs text-white/80">And it starts here.</p>
          </div>
          
          {/* Brand elements - extremely minimalist three column grid */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <h3 className="text-[10px] uppercase mb-4 text-white/50 tracking-widest">The Logo</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-2">
                  The woven pattern inside the circle is inspired by the Japanese kanji 網 (Ra) — meaning "net," "weave," or "connection."
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                  It represents shared growth, interdependence, and a reminder that what we build should endure.
                </p>
              </div>
              
              <div>
                <h3 className="text-[10px] uppercase mb-4 text-white/50 tracking-widest">The Name</h3>
                <p className="text-xs text-white/60 leading-relaxed mb-3">
                  ZiNRAi (迅雷) is a Japanese compound word:
                </p>
                <div className="space-y-1 text-left px-3">
                  <p className="text-xs text-white/60"><span className="text-white/80">迅 (Zin)</span> – swift, rapid movement</p>
                  <p className="text-xs text-white/60"><span className="text-white/80">雷 (Rai)</span> – thunder, lightning</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-[10px] uppercase mb-4 text-white/50 tracking-widest">The Meaning</h3>
                <p className="text-xs text-white/80 mb-2">"Swift Thunder"</p>
                <p className="text-xs text-white/60 italic mb-3">— a symbol of decisive action and undeniable impact.</p>
                <p className="text-xs text-white/60 leading-relaxed">
                  In our world, that means moving with clarity, acting with intention, and building something that lasts.
                </p>
                <p className="text-xs text-white/70 italic mt-3">
                  ZiNRAi isn't just a name—it's how we move.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}