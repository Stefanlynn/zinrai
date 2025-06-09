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
            Our Culture
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6">
            The values that drive innovation, guide decisions, and shape our impact on the global financial education landscape.
          </p>
        </div>

        {/* Values Grid */}
        <div className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {cultureValues.map((value, index) => (
                <div
                  key={value.id}
                  className={`
                    ${getColorClasses(value.color, 'bg')} 
                    ${getColorClasses(value.color, 'border')}
                    border rounded-lg p-8
                    hover:scale-105 transition-all duration-300
                    transform ${animatedIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-light text-white mb-2">
                      {value.title}
                    </h3>
                    <p className={`text-sm ${getColorClasses(value.color, 'text')} mb-4`}>
                      {value.subtitle}
                    </p>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-lg p-8">
              <h2 className="text-3xl font-light text-white text-center mb-6">
                Our Mission
              </h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                To democratize financial education and empower individuals worldwide through innovative technology, 
                transparent practices, and community-driven learning experiences that create lasting positive impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}