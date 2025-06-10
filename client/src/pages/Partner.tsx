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
        {/* Hero Section */}
        <div className="text-center py-20 md:py-32">
          <h1 className="text-6xl md:text-8xl font-thin text-white mb-8 tracking-tight">
            Brand Promoter
          </h1>
          <p className="text-2xl md:text-3xl font-light text-white/80 max-w-4xl mx-auto px-6 leading-relaxed">
            Turn your passion for purpose into powerful impact.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="px-6 pb-20">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed mb-12">
              At ZiNRAi<span className="text-xs align-super">™</span>, Brand Promoters are more than marketers—they're movement leaders.
            </p>
            <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-4xl mx-auto">
              As a promoter, you'll help share educational tools that equip people to grow personally, lead confidently, and live with purpose. Whether you're building a side passion or pursuing long-term leadership, we offer a flexible path for growth.
            </p>
          </div>
        </div>

        {/* What You'll Gain Section */}
        <div className="px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-thin text-white text-center mb-20 tracking-tight">
              What You'll Gain
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Training & Mentorship
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Access exclusive training, content resources, and leadership calls designed to help you grow—personally and professionally.
                  </p>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Community Support
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Join a powerful network of like-minded individuals committed to personal growth, financial literacy, and generational impact.
                  </p>
                </div>
              </div>
              
              <div className="space-y-12">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Flexible Path
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    Work on your schedule. Whether you engage part-time or full-time, your voice makes a difference.
                  </p>
                </div>
                
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                    Tools to Lead
                  </h3>
                  <p className="text-lg text-white/70 leading-relaxed">
                    We equip you with creative content, branding assets, and a marketing toolkit to amplify your message and help you reach your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reality Check Section */}
        <div className="px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 tracking-tight">
              Reality Check
            </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-white/10">
              <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
                We're not here to sell hype. ZiNRAi<span className="text-xs align-super">™</span> does not guarantee income or results—your success is based on your own effort, consistency, and leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Who Should Join Section */}
        <div className="px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-16 tracking-tight">
              Who Should Join?
            </h2>
            <p className="text-xl md:text-2xl font-light text-white/80 mb-16">
              You might be a great fit if you:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-white/80">Love empowering others with knowledge</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-white/80">Believe in the value of financial education</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-white/80">Want to build something meaningful alongside your current commitments</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-3 mr-4 flex-shrink-0"></div>
                  <p className="text-lg text-white/80">Are hungry to grow as a leader</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="px-6 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => window.location.href = 'mailto:brandpromoter@zinrai.com'}
              className="bg-white text-black px-12 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Join Our Movement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}