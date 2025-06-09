import { useState, useEffect } from "react";

export default function Partner() {
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimatedIn(true);
    }, 100);
  }, []);

  const partnerships = [
    {
      id: 1,
      title: "Business Promoter",
      subtitle: "Revenue Sharing",
      description: "Join our affiliate program and earn commissions by promoting ZiNRAi educational content.",
      benefits: ["20-40% commission rates", "Marketing materials provided", "Monthly payouts", "Performance bonuses"],
      color: "blue"
    },
    {
      id: 2,
      title: "Educational Partner",
      subtitle: "Content Collaboration",
      description: "Collaborate with us to create and distribute high-quality financial education content.",
      benefits: ["Co-branded content", "Revenue sharing", "Platform access", "Expert networking"],
      color: "purple"
    },
    {
      id: 3,
      title: "Technology Partner",
      subtitle: "Platform Integration",
      description: "Integrate your fintech solutions with our educational platform for mutual growth.",
      benefits: ["API access", "Technical support", "Joint marketing", "User base expansion"],
      color: "green"
    },
    {
      id: 4,
      title: "Community Leader",
      subtitle: "Influence & Impact",
      description: "Lead educational initiatives and build communities around financial literacy.",
      benefits: ["Leadership recognition", "Exclusive events", "Direct support", "Community tools"],
      color: "orange"
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
            Partner With Us
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6">
            Join the ZiNRAi<span className="text-xs align-super">™</span> ecosystem and grow your business 
            while helping others achieve financial literacy and independence.
          </p>
        </div>

        {/* Partnership Options */}
        <div className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {partnerships.map((partnership, index) => (
                <div
                  key={partnership.id}
                  className={`
                    ${getColorClasses(partnership.color, 'bg')} 
                    ${getColorClasses(partnership.color, 'border')}
                    border rounded-lg p-8
                    hover:scale-105 transition-all duration-300
                    transform ${animatedIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-light text-white mb-2">
                      {partnership.title}
                    </h3>
                    <p className={`text-sm ${getColorClasses(partnership.color, 'text')} mb-4`}>
                      {partnership.subtitle}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {partnership.description}
                    </p>
                    <div className="text-left">
                      <p className="text-white/50 text-xs mb-2">Key Benefits:</p>
                      <ul className="text-white/60 text-xs space-y-1">
                        {partnership.benefits.slice(0, 2).map((benefit, idx) => (
                          <li key={idx}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-light text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Join thousands of partners who are already building successful businesses with ZiNRAi<span className="text-xs align-super">™</span>.
              </p>
              <button
                onClick={() => window.location.href = 'mailto:partnerships@zinrai.com'}
                className="px-8 py-3 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}