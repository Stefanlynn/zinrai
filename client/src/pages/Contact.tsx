import { useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleEmailClick = () => {
    window.location.href = 'mailto:support@zinrai.com';
  };
  
  return (
    <div className="w-full">
      {/* Main content area */}
      <div className="relative min-h-[calc(100vh-96px)]">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 w-full">
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
          <div className="border border-white/[0.03]"></div>
        </div>
        
        {/* Centered contact content */}
        <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-96px)]">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-light text-white">
              Get In Touch
            </h1>
            <p className="text-xl text-white/70 max-w-md mx-auto">
              Ready to start your journey? Reach out to our team.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleEmailClick}
                className="block w-full px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                support@zinrai.com
              </button>
              
              <div className="text-white/60 text-sm">
                <p>ZiNRAi<span className="text-xs align-super">™</span> LLC</p>
                <p>3333 Renaissance Blvd, Suite #209</p>
                <p>Bonita Springs, FL 34134</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}