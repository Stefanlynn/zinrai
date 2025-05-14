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
import ZiNRAiCares from "@/pages/ZiNRAiCares";
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
      <Route path="/zinrai-cares">
        {() => <PageWithHeader><ZiNRAiCares /></PageWithHeader>}
      </Route>
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
              {/* Two-line hamburger menu */}
              <div className={`w-5 h-[1.5px] bg-black/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 w-5' : '-translate-y-[2px] group-hover:bg-black'}`}></div>
              <div className={`w-5 h-[1.5px] bg-black/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 w-5' : 'translate-y-[2px] group-hover:bg-black'}`}></div>
            </button>
            
            {/* Menu page exactly matching the reference image */}
            {menuOpen && (
              <div className="fixed inset-0 bg-black text-white z-[1001] overflow-auto">
                <div className="w-full h-full flex flex-col">
                  {/* Header with ZiNRAi logo and close button */}
                  <div className="flex justify-between items-center p-6">
                    <div className="text-white text-2xl font-bold tracking-wide">ZiNRAi</div>
                    <button 
                      onClick={() => setMenuOpen(false)}
                      className="p-2 text-white"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Main menu content with numbered items */}
                  <div className="flex-1 pl-16 pt-8 pr-16">
                    <nav className="space-y-10">
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">01</div>
                          <button 
                            onClick={() => {
                              setLocation('/product');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            PRODUCTS
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">02</div>
                          <button 
                            onClick={() => {
                              setLocation('/partner');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            PARTNER
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">03</div>
                          <button 
                            onClick={() => {
                              setLocation('/culture');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            CULTURE
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">04</div>
                          <button 
                            onClick={() => {
                              setLocation('/insights');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            INSIGHTS
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">05</div>
                          <button 
                            onClick={() => {
                              setLocation('/leadership');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            LEADERSHIP
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">06</div>
                          <button 
                            onClick={() => {
                              setLocation('/zinrai-cares');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            ZiNRAi CARES
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-sm font-light mr-4 mt-1">07</div>
                          <button 
                            onClick={() => {
                              setLocation('/contact');
                              toggleMenu();
                            }}
                            className="text-white text-xl md:text-2xl font-light hover:text-white/80 transition-colors"
                          >
                            CONTACT
                          </button>
                        </div>
                      </div>
                    </nav>
                    
                    {/* Info Center Section */}
                    <div className="mt-16 border-t border-white/20 pt-10">
                      <div className="flex items-start mb-10">
                        <div className="text-white/50 text-sm font-light mr-4">08</div>
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
                          const infoContent = document.getElementById('info-content');
                          if (infoContent) {
                            infoContent.classList.toggle('hidden');
                          }
                        }}>
                          <h2 className="text-xl font-light text-white">INFO CENTER</h2>
                          <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Info Center Content - Hidden by default */}
                      <div id="info-content" className="hidden ml-8 pl-4 pb-20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div>
                            <h3 className="text-base font-medium mb-4 text-white/90">Terms & Policies</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">IBO Terms</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Member Terms</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Policies & Procedures</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Refund Policy</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Income Disclosure</a></li>
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-base font-medium mb-4 text-white/90">Legal & Regional</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Japan Information</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Global Compliance Notice</a></li>
                            </ul>
                            
                            <h3 className="text-base font-medium mb-4 mt-8 text-white/90">Privacy & Usage</h3>
                            <ul className="space-y-3">
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Privacy Policy</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Terms of Use</a></li>
                              <li><a href="#" className="text-white/80 text-sm hover:text-white transition-colors">Employee Privacy Notice</a></li>
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-base font-medium mb-4 text-white/90">Support</h3>
                            <ul className="space-y-3">
                              <li>
                                <a 
                                  href="/contact" 
                                  className="text-white/80 text-sm hover:text-white transition-colors"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setLocation('/contact');
                                    toggleMenu();
                                  }}
                                >
                                  Contact Us
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Large ZiNRAi watermark in background */}
                    <div className="absolute inset-0 flex items-center justify-center z-[-1] opacity-5 pointer-events-none">
                      <h1 className="text-[20vw] font-bold tracking-tighter">ZiNRAi</h1>
                    </div>
                  </div>
                </div>
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
          <div style={{overflowY: 'auto', maxHeight: '100vh', height: '100vh'}} className="fixed inset-0 bg-black/95 z-[2000]">
            <div className="bg-black text-white">
              {/* Close button for the modal */}
              <button 
                onClick={() => setShowCaresModal(false)}
                className="fixed top-4 right-4 text-white/70 hover:text-white transition-colors z-[2100]"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Use the same component for both modal and route */}
              <div className="pt-8">
                <ZiNRAiCares />
              </div>
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
