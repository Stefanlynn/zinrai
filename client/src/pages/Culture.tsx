import { useState, useEffect } from "react";

export default function Culture() {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const cultureValues = [
    {
      id: 1,
      title: "Innovation",
      subtitle: "Pioneering Excellence",
      description: "We constantly push boundaries in financial technology and educational platforms.",
      color: "blue"
    },
    {
      id: 2,
      title: "Integrity",
      subtitle: "Transparent Leadership",
      description: "Every decision is made with complete transparency and ethical consideration.",
      color: "purple"
    },
    {
      id: 3,
      title: "Education",
      subtitle: "Empowering Growth",
      description: "Knowledge sharing is at the heart of everything we build and deliver.",
      color: "green"
    },
    {
      id: 4,
      title: "Community",
      subtitle: "Building Together",
      description: "Success is measured by the positive impact we create for our global community.",
      color: "orange"
    },
    {
      id: 5,
      title: "Excellence",
      subtitle: "Quality Focus",
      description: "We deliver exceptional results through meticulous attention to detail.",
      color: "red"
    },
    {
      id: 6,
      title: "Impact",
      subtitle: "Meaningful Change",
      description: "Every initiative contributes to positive global transformation.",
      color: "teal"
    }
  ];

  const getColorClasses = (colorName: string, type: 'bg' | 'border' | 'text' = 'bg') => {
    const colors: Record<string, Record<string, string>> = {
      blue: {
        bg: 'bg-blue-500/20',
        border: 'border-blue-400/30',
        text: 'text-blue-300'
      },
      purple: {
        bg: 'bg-purple-500/20',
        border: 'border-purple-400/30',
        text: 'text-purple-300'
      },
      green: {
        bg: 'bg-green-500/20',
        border: 'border-green-400/30',
        text: 'text-green-300'
      },
      orange: {
        bg: 'bg-orange-500/20',
        border: 'border-orange-400/30',
        text: 'text-orange-300'
      },
      red: {
        bg: 'bg-red-500/20',
        border: 'border-red-400/30',
        text: 'text-red-300'
      },
      teal: {
        bg: 'bg-teal-500/20',
        border: 'border-teal-400/30',
        text: 'text-teal-300'
      }
    };
    
    return colors[colorName][type];
  };

  return (
    <div className="min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-black to-transparent"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center py-16">
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
            Why ZiNRAi<span className="text-xs align-super">™</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6">
            Because the world doesn't just need more products.
          </p>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6 mt-2">
            It needs more people who know who they are and what they're here to do.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-16 text-center">
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                ZiNRAi<span className="text-xs align-super">™</span> isn't just a platform—it's a purpose-driven movement. We exist to awaken leadership, inspire integrity, and build legacy through education, community, and character-based growth.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-6 text-center flex items-center justify-center">
                <span className="mr-3">🔭</span>
                Our Vision
              </h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                To help ordinary people become extraordinary leaders—by unlocking purpose, building character, and creating meaningful impact.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-6 text-center flex items-center justify-center">
                <span className="mr-3">🎯</span>
                Our Mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                ZiNRAi<span className="text-xs align-super">™</span> exists to teach people how to live better, lead stronger, and serve deeper—through character, clarity, and commitment.
              </p>
            </div>

            {/* Our Pillars Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-6 text-center flex items-center justify-center">
                <span className="mr-3">🏛️</span>
                Our Pillars
              </h2>
              <p className="text-white/80 text-lg mb-8 text-center">These aren't just values—they're the foundation of how we move:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Zeal:</span>
                        <span className="text-white/70 ml-2">We show up with passion, energy, and urgency.</span>
                      </div>
                    </h3>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Integrity:</span>
                        <span className="text-white/70 ml-2">We do what's right, not what's easy.</span>
                      </div>
                    </h3>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Nobility:</span>
                        <span className="text-white/70 ml-2">We lead with honor, humility, and courage.</span>
                      </div>
                    </h3>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Resilience:</span>
                        <span className="text-white/70 ml-2">We bounce back stronger and press forward no matter what.</span>
                      </div>
                    </h3>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Abundance:</span>
                        <span className="text-white/70 ml-2">We believe there's more than enough—for you, for others, for the world.</span>
                      </div>
                    </h3>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                      <span className="text-blue-400 mr-3 mt-1">•</span>
                      <div>
                        <span className="font-semibold">Innovation:</span>
                        <span className="text-white/70 ml-2">We don't copy culture—we help create it.</span>
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* What Makes Us Different Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <h2 className="text-3xl font-light text-white mb-6 text-center flex items-center justify-center">
                <span className="mr-3">💡</span>
                What Makes Us Different
              </h2>
              <p className="text-white/80 text-lg mb-8 text-center">
                We're not your typical company—and that's intentional. ZiNRAi<span className="text-xs align-super">™</span> was built to disrupt the norm and raise the standard.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold">We don't sell hype—we build depth.</span>
                    </div>
                  </h3>
                  <p className="text-white/70 ml-6">We prioritize education, transformation, and long-term value over quick wins.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold">We don't create followers—we empower leaders.</span>
                    </div>
                  </h3>
                  <p className="text-white/70 ml-6">Our focus is helping people discover who they are and lead with clarity and character.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold">We don't chase trends—we move with purpose.</span>
                    </div>
                  </h3>
                  <p className="text-white/70 ml-6">Everything we do is rooted in values, not vanity.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold">We don't just offer opportunity—we develop identity.</span>
                    </div>
                  </h3>
                  <p className="text-white/70 ml-6">You're not here to fit a mold. You're here to rise in your own unique lane.</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-white mb-2 flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <div>
                      <span className="font-semibold">We don't just grow businesses—we grow people.</span>
                    </div>
                  </h3>
                  <p className="text-white/70 ml-6">Because when people grow, everything around them changes—homes, communities, and legacies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}