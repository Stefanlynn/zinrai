import { Switch, Route, useRoute, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import Home from "@/pages/Home";
import Logo from "@/pages/Logo";
import Product from "@/pages/Product";
import Partner from "@/pages/Partner";
import Culture from "@/pages/Culture";
import Insights from "@/pages/Insights";
import Leadership from "@/pages/Leadership";
// Import removed as we'll integrate cares content directly
import Profile from "@/pages/Profile";
import Contact from "@/pages/Contact";
import Subscribe from "@/pages/Subscribe";
import NotFound from "@/pages/not-found";

// Component for pages that need the header
function PageWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[32px]">
      {children}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/logo">
        {() => <PageWithHeader><Logo /></PageWithHeader>}
      </Route>
      <Route path="/product">
        {() => <PageWithHeader><Product /></PageWithHeader>}
      </Route>
      <Route path="/partner">
        {() => <PageWithHeader><Partner /></PageWithHeader>}
      </Route>
      <Route path="/culture">
        {() => <PageWithHeader><Culture /></PageWithHeader>}
      </Route>
      <Route path="/insights">
        {() => <PageWithHeader><Insights /></PageWithHeader>}
      </Route>
      <Route path="/leadership">
        {() => <PageWithHeader><Leadership /></PageWithHeader>}
      </Route>
      {/* ZiNRAi Cares will be shown as a modal instead of a separate route */}
      <Route path="/profile">
        {() => <PageWithHeader><Profile /></PageWithHeader>}
      </Route>
      <Route path="/contact">
        {() => <PageWithHeader><Contact /></PageWithHeader>}
      </Route>
      <Route path="/subscribe" component={Subscribe} />
      <Route>
        {() => <PageWithHeader><NotFound /></PageWithHeader>}
      </Route>
    </Switch>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCaresModal, setShowCaresModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isHome] = useRoute("/");
  const isHomePage = isHome;
  const [, setLocation] = useLocation();
  const [headerTextIndex, setHeaderTextIndex] = useState(0);
  const headerTexts = [
    { 
      text: "$1 of every subscription fuels global impact through",
      showHeart: true,
      showLink: true
    },
    { 
      text: "Live With Passion. Lead With Purpose.",
      showHeart: false,
      showLink: false
    }
  ];

  useEffect(() => {
    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Header text rotation effect
  useEffect(() => {
    if (isHomePage) {
      const timer = setInterval(() => {
        setHeaderTextIndex(prev => (prev === 0 ? 1 : 0));
      }, 5000); // Switch every 5 seconds
      
      return () => clearInterval(timer);
    }
  }, [isHomePage]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Larger header bar with menu */}
        <div className="fixed top-0 left-0 right-0 h-[32px] bg-[#f7f5f0] z-[1000] flex items-center">
          {/* Menu icon and dropdown */}
          <div className="relative z-10" ref={menuRef}>
            <button 
              className="ml-4 h-[32px] flex items-center justify-center cursor-pointer group relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {/* Asymmetric hamburger menu with offset top line */}
              <div className={`w-4 h-[1.5px] bg-black/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 w-5' : '-translate-y-1 -translate-x-[3px] group-hover:bg-black'}`}></div>
              <div className={`w-5 h-[1.5px] bg-black/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100 group-hover:bg-black'}`}></div>
              <div className={`w-5 h-[1.5px] bg-black/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 w-5' : 'translate-y-1 group-hover:bg-black'}`}></div>
            </button>
            
            {/* Redesigned Dropdown menu */}
            {menuOpen && (
              <div className="fixed inset-0 bg-black/95 z-[1001] flex items-center justify-center transition-all duration-300 animate-fade-in overflow-y-auto">
                {/* Close button for menu - positioned at the absolute top right */}
                <button 
                  onClick={() => setMenuOpen(false)} 
                  className="absolute top-0 right-0 text-white/70 hover:text-white transition-colors p-3"
                >
                  <div className="relative h-6 w-6 flex items-center justify-center overflow-hidden">
                    {/* Animated X icon */}
                    <div className="relative">
                      {/* Line 1 - for X */}
                      <div className="w-6 h-[1.5px] bg-white/70 hover:bg-white absolute top-0 left-0 transform rotate-45 transition-all duration-300"></div>
                      {/* Line 2 - for X */}
                      <div className="w-6 h-[1.5px] bg-white/70 hover:bg-white absolute top-0 left-0 transform -rotate-45 transition-all duration-300"></div>
                    </div>
                  </div>
                </button>
                
                {/* Minimalist menu layout */}
                <div className="w-full max-w-4xl p-10 my-8">
                  {/* Menu content with animations */}
                  <div className="text-white/90 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {/* Terms & Policies */}
                    <div className="opacity-0 animate-slide-up animate-delay-100">
                      <h3 className="text-white font-extralight mb-4 text-lg tracking-wide border-b border-white/10 pb-2">Terms & Policies</h3>
                      <div className="space-y-3 mt-4">
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          IBO Terms
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Member Terms
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Policies & Procedures
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Refund Policy
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Income Disclosure
                        </div>
                      </div>
                    </div>
                    
                    {/* Legal & Regional Notices */}
                    <div className="opacity-0 animate-slide-up animate-delay-150">
                      <h3 className="text-white font-extralight mb-4 text-lg tracking-wide border-b border-white/10 pb-2">Legal & Regional Notices</h3>
                      <div className="space-y-3 mt-4">
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Japan Information
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Global Compliance Notice
                        </div>
                      </div>
                    </div>
                    
                    {/* Privacy & Usage */}
                    <div className="opacity-0 animate-slide-up animate-delay-200">
                      <h3 className="text-white font-extralight mb-4 text-lg tracking-wide border-b border-white/10 pb-2">Privacy & Usage</h3>
                      <div className="space-y-3 mt-4">
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Privacy Policy
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Terms of Use
                        </div>
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Employee/Applicant Privacy Notice
                        </div>
                      </div>
                    </div>
                    
                    {/* Support */}
                    <div className="opacity-0 animate-slide-up animate-delay-250">
                      <h3 className="text-white font-extralight mb-4 text-lg tracking-wide border-b border-white/10 pb-2">Support</h3>
                      <div className="space-y-3 mt-4">
                        <div className="text-sm text-white/70 hover:text-white cursor-pointer transition-colors hover:translate-x-1 transform duration-300 block">
                          Contact Us
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Minimal design elements - just a single subtle line */}
                <div className="absolute left-[15%] right-[15%] top-1/2 h-[1px]" style={{background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)'}}></div>
              </div>
            )}
          </div>
          
          {/* Conditional Content: Impact text on home page or ZiNRAi on other pages */}
          {isHomePage ? (
            /* Alternating header texts - only on home page */
            <div className="flex-1 flex items-center justify-center h-full text-center px-4 relative">
              {headerTexts.map((header, index) => (
                <div 
                  key={index} 
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                    index === headerTextIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-center text-[10px] text-black/80 whitespace-nowrap">
                    <span>{header.text}</span>
                    {header.showHeart && (
                      <svg className="w-2.5 h-2.5 text-[var(--zinrai-red)] mx-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                    {header.showLink && (
                      <a 
                        href="#" 
                        className="font-medium text-black/90 hover:text-[var(--zinrai-red)] transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Opening ZiNRAi Cares modal");
                          setShowCaresModal(true);
                        }}
                      >
                        ZiNRAi Cares
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ZiNRAi text on other pages */
            <div className="flex-1 flex justify-center">
              <a 
                href="/" 
                className="text-sm font-semibold text-black/90 hover:text-black transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/');
                }}
              >
                ZiNRAi
              </a>
            </div>
          )}
          
          {/* Profile icon in the far right corner */}
          <div className="ml-auto">
            <a
              href="/profile"
              className="flex items-center h-full px-4"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/profile');
              }}
            >
              <FiUser size={16} className="text-black/80 hover:text-black transition-colors" />
            </a>
          </div>
        </div>
        
        {/* No grain effect for minimalist look */}
        <Router />
        
        {/* ZiNRAi Cares Modal */}
        {showCaresModal && (
          <div className="fixed inset-0 bg-black/95 z-[2000] overflow-auto">
            <div className="min-h-screen bg-black text-white">
              {/* Grid lines overlay */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 pointer-events-none opacity-70">
                <div className="border-r border-white/20"></div>
                <div className="border-l border-white/20"></div>
                <div className="border-r border-white/20 border-t"></div>
                <div className="border-l border-white/20 border-t"></div>
                <div className="border-r border-white/20 border-t"></div>
                <div className="border-l border-white/20 border-t"></div>
                <div className="border-r border-white/20 border-t"></div>
                <div className="border-l border-white/20 border-t"></div>
              </div>
              
              <div className="grid grid-cols-2 grid-rows-4 min-h-screen">
                {/* Top Row - Header */}
                <div className="col-span-2 flex items-center justify-between px-8 py-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-white">ZiNRAi Cares</h1>
                  <button 
                    onClick={() => setShowCaresModal(false)}
                    className="text-white/70 hover:text-white transition-colors text-xl h-10 w-10 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Second Row - Intro */}
                <div className="row-span-1 col-span-2 flex items-center justify-center p-6">
                  <div className="text-center max-w-4xl">
                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-6">
                      At ZiNRAi, we believe technology should be a force for good. For every active subscription, we donate $1 to sustainable impact projects around the globe.
                    </p>
                    <p className="text-xl text-white/70">
                      Our blockchain-powered platform ensures 100% transparency in giving.
                    </p>
                  </div>
                </div>
                
                {/* Center Rows - Content */}
                <div className="p-6 flex items-center">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4 uppercase tracking-wide">Impact Areas</h2>
                    <ul className="space-y-3">
                      <li className="p-3 border border-white/30 cursor-pointer transition-all hover:bg-white/5">
                        <h4 className="text-lg font-medium">Food Security</h4>
                        <p className="text-white/70 mt-2">
                          We partner with food banks and community kitchens to combat hunger in urban and rural communities globally.
                        </p>
                      </li>
                      <li className="p-3 border border-white/30 cursor-pointer transition-all hover:bg-white/5">
                        <h4 className="text-lg font-medium">Clean Water Access</h4>
                        <p className="text-white/70 mt-2">
                          Our initiatives focus on building sustainable water infrastructure in water-scarce regions of West Africa.
                        </p>
                      </li>
                      <li className="p-3 border border-white/30 cursor-pointer transition-all hover:bg-white/5">
                        <h4 className="text-lg font-medium">Tech Education</h4>
                        <p className="text-white/70 mt-2">
                          We provide resources and mentorship for underrepresented communities to access quality tech education.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-6 flex items-center">
                  {/* Testimonial */}
                  <div className="bg-black/50 p-6 border border-white/30">
                    <p className="text-lg italic text-white/90 mb-4">
                      "The water well project funded by ZiNRAi has transformed our village. For the first time, our children don't have to walk miles for clean water."
                    </p>
                    <p className="text-white/70">— Community Leader, Burkina Faso</p>
                  </div>
                </div>
                
                {/* Bottom Row - Stats & CTA */}
                <div className="col-span-2 p-6">
                  <h2 className="text-2xl font-semibold mb-6 uppercase tracking-wide text-center">Our Impact</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-black/30 p-4 border border-white/30 text-center">
                      <div className="text-3xl font-bold text-white mb-2">75,000+</div>
                      <p className="text-white/70 text-sm">Meals provided across the U.S. and Pakistan</p>
                    </div>
                    <div className="bg-black/30 p-4 border border-white/30 text-center">
                      <div className="text-3xl font-bold text-white mb-2">8</div>
                      <p className="text-white/70 text-sm">Clean water projects funded in West Africa</p>
                    </div>
                    <div className="bg-black/30 p-4 border border-white/30 text-center">
                      <div className="text-3xl font-bold text-white mb-2">2,000+</div>
                      <p className="text-white/70 text-sm">Families impacted through decentralized giving</p>
                    </div>
                    <div className="bg-black/30 p-4 border border-white/30 text-center">
                      <div className="text-3xl font-bold text-white mb-2">100%</div>
                      <p className="text-white/70 text-sm">Transparency powered by blockchain technology</p>
                    </div>
                    <div className="bg-black/30 p-4 border border-white/30 text-center">
                      <div className="text-3xl font-bold text-white mb-2">$1</div>
                      <p className="text-white/70 text-sm">Donated per active subscription, every month</p>
                    </div>
                  </div>
                  
                  <div className="mt-10 text-center">
                    <button 
                      onClick={() => {
                        setShowCaresModal(false);
                        setLocation('/subscribe');
                      }}
                      className="px-8 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors"
                    >
                      SUBSCRIBE TO MAKE AN IMPACT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
