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
                
                {/* Redesigned premium menu layout */}
                <div className="w-full max-w-5xl p-4 md:p-12 h-full flex flex-col">
                  {/* ZiNRAi logo at the top */}
                  <div className="text-center mb-8 md:mb-12 mt-4 md:mt-8">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white">ZiNRAi</h2>
                    <div className="h-[1px] w-24 bg-white/20 mx-auto mt-3"></div>
                  </div>
                  
                  {/* Main menu container with two-column layout on larger screens */}
                  <div className="flex-grow flex flex-col md:flex-row">
                    {/* Main navigation items */}
                    <div className="md:w-1/2 space-y-8 px-10 md:px-16 flex flex-col justify-center mb-8 md:mb-0">
                      <a 
                        href="/product" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/product');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">Products</span>
                      </a>
                      
                      <a 
                        href="/partner" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/partner');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">Partner</span>
                      </a>
                      
                      <a 
                        href="/culture" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/culture');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">Why ZiNRAi</span>
                      </a>
                      
                      <a 
                        href="/leadership" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/leadership');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">Leadership</span>
                      </a>
                    </div>
                    
                    <div className="md:w-1/2 space-y-8 px-10 md:px-16 flex flex-col justify-center">
                      <a 
                        href="/insights" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/insights');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">Insights</span>
                      </a>
                      
                      <a 
                        href="/zinrai-cares" 
                        className="group text-white/80 text-xl md:text-2xl hover:text-white cursor-pointer transition-colors relative pl-4 overflow-hidden"
                        onClick={(e) => {
                          e.preventDefault();
                          setLocation('/zinrai-cares');
                          toggleMenu();
                        }}
                      >
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-0 bg-white group-hover:h-4 transition-all duration-300 ease-out"></span>
                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">ZiNRAi Cares</span>
                      </a>
                    </div>
                  </div>
                  
                  {/* Info Center at the bottom */}
                  <div className="px-6 md:px-10 pt-6 pb-4 border-t border-white/10 mt-6 md:mt-12">
                    {/* Info Center toggle */}
                    <div 
                      className="flex items-center justify-center space-x-2 cursor-pointer group"
                      onClick={() => {
                        const infoContainer = document.getElementById('info-center-container');
                        if (infoContainer) {
                          infoContainer.classList.toggle('h-0');
                          infoContainer.classList.toggle('h-[320px]');
                          infoContainer.classList.toggle('opacity-0');
                          infoContainer.classList.toggle('opacity-100');
                          
                          // Toggle arrow rotation
                          const arrow = document.getElementById('info-center-arrow');
                          if (arrow) {
                            arrow.classList.toggle('rotate-180');
                          }
                        }
                      }}
                    >
                      <p className="text-white/70 text-sm tracking-wider uppercase font-medium group-hover:text-white transition-colors">Info Center</p>
                      <svg id="info-center-arrow" className="w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    {/* Expandable info content */}
                    <div id="info-center-container" className="h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 pt-6">
                        {/* Terms & Policies */}
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-3 tracking-wide">Terms & Policies</h3>
                          <div className="space-y-2">
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">IBO Terms</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Member Terms</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Policies & Procedures</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Refund Policy</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Income Disclosure</a>
                          </div>
                        </div>
                        
                        {/* Legal & Regional Notices */}
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-3 tracking-wide">Legal & Regional Notices</h3>
                          <div className="space-y-2">
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Japan Information</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Global Compliance Notice</a>
                          </div>
                          
                          <h3 className="text-white/90 text-sm font-medium mt-6 mb-3 tracking-wide">Privacy & Usage</h3>
                          <div className="space-y-2">
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Privacy Policy</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Terms of Use</a>
                            <a href="#" className="text-white/60 text-xs hover:text-white transition-colors block">Employee/Applicant Privacy Notice</a>
                          </div>
                          
                          <h3 className="text-white/90 text-sm font-medium mt-6 mb-3 tracking-wide">Support</h3>
                          <div className="space-y-2">
                            <a 
                              href="/contact" 
                              className="text-white/60 text-xs hover:text-white transition-colors block"
                              onClick={(e) => {
                                e.preventDefault();
                                setLocation('/contact');
                                toggleMenu();
                              }}
                            >
                              Contact Us
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Minimal design elements - horizontal lines */}
                <div className="absolute left-[10%] right-[10%] top-1/3 h-[1px]" style={{background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.03), transparent)'}}></div>
                <div className="absolute left-[10%] right-[10%] top-2/3 h-[1px]" style={{background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.03), transparent)'}}></div>
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
