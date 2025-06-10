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
            Brand Promoter
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto px-6">
            Turn your passion for purpose into powerful impact.
          </p>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="mb-16 text-center">
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
                At ZiNRAi<span className="text-xs align-super">™</span>, Brand Promoters are more than marketers—they're movement leaders. 
                As a promoter, you'll help share educational tools that equip people to grow personally, lead confidently, and live with purpose.
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mt-4">
                Whether you're building a side passion or pursuing long-term leadership, we offer a flexible path for growth.
              </p>
            </div>

            {/* What You'll Gain Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-8 text-center">What You'll Gain</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Training & Mentorship
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      You'll get access to exclusive training, content resources, and leadership calls designed to help you grow—personally and professionally.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Community Support
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      You'll join a powerful network of like-minded individuals committed to personal growth, financial literacy, and generational impact.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Flexible Path
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      Work on your schedule. Whether you engage part-time or full-time, your voice makes a difference.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 flex items-center">
                      <span className="text-green-400 mr-3">✅</span>
                      Tools to Lead
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      We equip you with creative content, branding assets, and a marketing toolkit to amplify your message and help you reach your goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What You're Not Promising Section */}
            <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-6 text-center">What You're Not Promising</h2>
              <p className="text-white/80 text-lg leading-relaxed text-center">
                We're not here to sell hype. ZiNRAi<span className="text-xs align-super">™</span> does not guarantee income or results—your success is based on your own effort, consistency, and leadership.
              </p>
            </div>

            {/* Who Should Join Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 mb-16">
              <h2 className="text-3xl font-light text-white mb-8 text-center">Who Should Join?</h2>
              <p className="text-white/80 text-lg mb-6 text-center">You might be a great fit if you:</p>
              
              <div className="max-w-2xl mx-auto">
                <ul className="space-y-4 text-white/70">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>Love empowering others with knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>Believe in the value of financial education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>Want to build something meaningful alongside your current commitments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>Are hungry to grow as a leader</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button
                onClick={() => window.location.href = 'mailto:brandpromoter@zinrai.com'}
                className="px-8 py-4 bg-blue-600 border border-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Join Our Movement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}