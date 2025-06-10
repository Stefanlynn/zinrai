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
    <div className="min-h-screen bg-black">
      {/* Grid container - 2x4 grid like home page */}
      <div className="grid grid-cols-2 grid-rows-4 h-screen">
        {/* Top Left - Brand Promoter Title */}
        <div className="relative border-r border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
              Brand Promoter
            </h1>
            <p className="text-lg text-white/70">
              Turn your passion for purpose into powerful impact.
            </p>
          </div>
        </div>

        {/* Top Right - Movement Leaders */}
        <div className="relative border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Movement Leaders
            </h2>
            <p className="text-sm text-white/70">
              At ZiNRAi<span className="text-xs align-super">™</span>, Brand Promoters are more than marketers—they're movement leaders who share educational tools.
            </p>
          </div>
        </div>

        {/* Second Row Left - Training & Mentorship */}
        <div className="relative border-r border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3">
              Training & Mentorship
            </h3>
            <p className="text-sm text-white/60">
              Access exclusive training, content resources, and leadership calls designed to help you grow.
            </p>
          </div>
        </div>

        {/* Second Row Right - Community Support */}
        <div className="relative border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3">
              Community Support
            </h3>
            <p className="text-sm text-white/60">
              Join a powerful network committed to personal growth, financial literacy, and generational impact.
            </p>
          </div>
        </div>

        {/* Third Row Left - Flexible Path */}
        <div className="relative border-r border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3">
              Flexible Path
            </h3>
            <p className="text-sm text-white/60">
              Work on your schedule. Whether part-time or full-time, your voice makes a difference.
            </p>
          </div>
        </div>

        {/* Third Row Right - Tools to Lead */}
        <div className="relative border-b border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3">
              Tools to Lead
            </h3>
            <p className="text-sm text-white/60">
              Creative content, branding assets, and marketing toolkit to amplify your message.
            </p>
          </div>
        </div>

        {/* Fourth Row Left - Reality Check */}
        <div className="relative border-r border-gray-700 flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-3">
              Reality Check
            </h3>
            <p className="text-sm text-white/60">
              We don't sell hype. Success is based on your effort, consistency, and leadership.
            </p>
          </div>
        </div>

        {/* Fourth Row Right - Join Movement */}
        <div className="relative flex items-center justify-center p-8">
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-light text-white mb-6">
              Ready to Lead?
            </h3>
            <button
              onClick={() => window.location.href = 'mailto:brandpromoter@zinrai.com'}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-colors"
            >
              Join Our Movement
            </button>
          </div>
        </div>
      </div>

      {/* Grid lines overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Horizontal lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20"></div>
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/20"></div>
        <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/20"></div>
        <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/20"></div>
        
        {/* Vertical lines */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-white/20"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-white/20"></div>
      </div>
    </div>
  );
}