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
        <div className="fixed top-0 left-0 right-0 h-[36px] bg-[#f7f5f0] z-[1000] flex items-center shadow-sm">
          {/* Menu icon and dropdown */}
          <div className="relative z-10" ref={menuRef}>
            <button 
              className="ml-4 h-[32px] flex items-center justify-center cursor-pointer group relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {/* Two parallel lines for menu icon */}
              {menuOpen ? (
                // X shape when menu is open
                <>
                  <div className="absolute w-5 h-[2.5px] bg-black top-1/2 left-0 transform -translate-y-1/2 rotate-45"></div>
                  <div className="absolute w-5 h-[2.5px] bg-black top-1/2 left-0 transform -translate-y-1/2 -rotate-45"></div>
                </>
              ) : (
                // Two parallel lines when menu is closed
                <div className="flex flex-col justify-center items-center">
                  <div className="w-5 h-[2.5px] bg-black mb-[4px]"></div>
                  <div className="w-5 h-[2.5px] bg-black"></div>
                </div>
              )}
            </button>
            
            {/* Stylish Dropdown menu with new navigation */}
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
                
                {/* Main navigation links with a sleek design */}
                <div className="w-full max-w-xl p-10 my-8">
                  <div className="flex flex-col items-center justify-center">
                    {/* Dynamic line above menu */}
                    <div className="w-12 h-[2px] bg-white/30 mb-10 opacity-0 animate-fade-in animate-delay-100"></div>
                    
                    {/* Menu items - sleek, modern design */}
                    <nav className="text-center w-full">
                      <ul className="space-y-6 relative">
                        {/* Products */}
                        <li className="opacity-0 animate-fade-in animate-delay-100">
                          <a 
                            href="/product" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/product');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">01</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">PRODUCTS</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                        
                        {/* Partner */}
                        <li className="opacity-0 animate-fade-in animate-delay-150">
                          <a 
                            href="/partner" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/partner');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">02</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">PARTNER</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                        
                        {/* Insights */}
                        <li className="opacity-0 animate-fade-in animate-delay-200">
                          <a 
                            href="/insights" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/insights');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">03</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">INSIGHTS</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                        
                        {/* Leadership */}
                        <li className="opacity-0 animate-fade-in animate-delay-250">
                          <a 
                            href="/leadership" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/leadership');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">04</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">LEADERSHIP</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                        
                        {/* Why ZiNRAi (Culture) */}
                        <li className="opacity-0 animate-fade-in animate-delay-300">
                          <a 
                            href="/culture" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/culture');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">05</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">WHY ZiNRAi</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                        
                        {/* ZiNRAi CARES */}
                        <li className="opacity-0 animate-fade-in animate-delay-350">
                          <a 
                            href="/zinrai-cares" 
                            className="group flex flex-col items-center"
                            onClick={(e) => {
                              e.preventDefault();
                              setMenuOpen(false);
                              setLocation('/zinrai-cares');
                            }}
                          >
                            <span className="text-[var(--zinrai-red)] text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -top-5">06</span>
                            <span className="text-2xl sm:text-3xl md:text-4xl text-white/80 hover:text-white transition-all duration-300 tracking-widest font-thin">ZiNRAi CARES</span>
                            <div className="w-0 group-hover:w-full h-[1px] bg-white/40 mt-1 transition-all duration-300"></div>
                          </a>
                        </li>
                      </ul>
                    </nav>
                    
                    {/* Dynamic line below menu */}
                    <div className="w-12 h-[2px] bg-white/30 mt-10 opacity-0 animate-fade-in animate-delay-400"></div>
                  </div>
                </div>
                
                {/* Diagonal accent line */}
                <div className="absolute left-0 right-0 top-0 bottom-0 opacity-20 pointer-events-none overflow-hidden">
                  <div className="absolute w-[1px] h-[200%] top-0 left-[35%] transform -translate-x-1/2 -rotate-45 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
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
