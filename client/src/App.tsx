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
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import ConfirmationPage from "@/pages/ConfirmationPage";

// Component for pages that need the header
function PageWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[48px]">
      {children}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/">
        {() => <Home />}
      </Route>
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
      <Route path="/checkout" component={Checkout} />
      <Route path="/confirmation" component={ConfirmationPage} />
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
      text: "$1 per subscription supports",
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
        
        {/* Header - Clean minimal design with dark gray background */}
        <header className="fixed top-0 left-0 right-0 h-[48px] bg-[#222222] z-[1000] flex items-center border-b border-white/10">
          {/* Brand logo - only shown on inner pages for navigation back to home */}
          {!isHomePage && (
            <a 
              className="ml-6 cursor-pointer flex items-center"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/');
              }}
              href="/"
            >
              <span className="text-white font-semibold tracking-wide text-lg">ZiNRAi</span>
            </a>
          )}
          {isHomePage && <div className="ml-6 w-8"></div>}
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/product"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/product');
              }}
            >
              Products
            </a>
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/partner"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/partner');
              }}
            >
              Brand Promoter
            </a>
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/leadership"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/leadership');
              }}
            >
              Leadership
            </a>
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/insights"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/insights');
              }}
            >
              Insights
            </a>
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/contact');
              }}
            >
              Contact
            </a>
          </nav>
          
          {/* Profile & Start Now for desktop */}
          <div className="hidden md:flex items-center mr-6">
            {isHomePage && (
              <a 
                className="h-[32px] px-5 mr-4 bg-[#222222] border border-white/20 rounded-sm flex items-center justify-center cursor-pointer hover:border-white/60 transition-colors duration-300"
                href="/subscribe"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/subscribe');
                }}
              >
                <span className="text-white/90 text-sm font-light tracking-wide hover:text-white">Start Now</span>
              </a>
            )}
            <a
              className="h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors duration-300 rounded-full"
              href="/profile"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/profile');
              }}
            >
              <FiUser className="text-white/70 h-4 w-4" />
            </a>
          </div>
          
          {/* Mobile menu toggle */}
          <div className="md:hidden ml-auto mr-4 relative z-10 h-[48px] flex items-center" ref={menuRef}>
            <button 
              className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className={`w-5 h-[1px] bg-white/90 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 w-5 translate-y-0' : '-translate-y-[4px]'}`}></div>
                <div className={`w-4 h-[1px] bg-white/90 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-5 h-[1px] bg-white/90 absolute transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 w-5 translate-y-0' : 'translate-y-[4px]'}`}></div>
              </div>
            </button>
            
            {/* Mobile menu */}
            {menuOpen && (
              <div className="fixed inset-0 bg-black text-white z-[1001] overflow-auto">
                <div className="w-full h-full flex flex-col">
                  {/* Header with ZiNRAi text and Start Now button */}
                  <div className="flex justify-between items-center p-6">
                    <div 
                      className="text-white text-2xl font-bold tracking-wide cursor-pointer hover:text-white/80 transition-colors"
                      onClick={() => {
                        setMenuOpen(false);
                        setLocation('/');
                      }}
                    >
                      ZiNRAi
                    </div>
                    <button 
                      onClick={() => {
                        setMenuOpen(false);
                        setLocation('/subscribe');
                      }}
                      className="px-4 py-2 border border-white/50 hover:border-white text-white/90 hover:text-white transition-all duration-200 uppercase text-sm tracking-wider font-medium group"
                    >
                      <span className="group-hover:font-bold transition-all duration-200">Start Now</span>
                    </button>
                  </div>
                  
                  {/* Main menu content with numbered items on left, video space on right */}
                  <div className="flex-1 px-8 md:px-16 pt-8 flex flex-col md:flex-row">
                    {/* Left side: Navigation */}
                    <nav className="space-y-6 md:space-y-8 max-w-xs flex-shrink-0">
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">01</div>
                          <button 
                            onClick={() => {
                              setLocation('/product');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Products
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">02</div>
                          <button 
                            onClick={() => {
                              setLocation('/partner');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Brand Promoter
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">03</div>
                          <button 
                            onClick={() => {
                              setLocation('/culture');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Why ZiNRAi
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">04</div>
                          <button 
                            onClick={() => {
                              setLocation('/leadership');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Leadership
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">05</div>
                          <button 
                            onClick={() => {
                              setLocation('/insights');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Insights
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">06</div>
                          <button 
                            onClick={() => {
                              setLocation('/contact');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            Contact
                          </button>
                        </div>
                      </div>
                    </nav>
                    
                    {/* Right side: Video area - only visible on desktop */}
                    <div className="hidden md:flex flex-1 items-center justify-center ml-12">
                      <div className="w-full max-w-xl h-[400px] bg-zinc-900 border border-white/20 rounded-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-black/50 border border-white/30 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-white/70 text-sm">Video will be loaded later</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Large ZiNRAi watermark in background - adjusted position */}
                    <div className="absolute inset-0 flex items-center z-[-1] opacity-5 pointer-events-none">
                      <h1 className="text-[20vw] font-bold tracking-tighter ml-[25%]">ZiNRAi</h1>
                    </div>
                  </div>
                  
                  {/* Info Center Section at bottom - simplified */}
                  <div className="py-6 border-t border-white/20 mt-auto">
                    <div className="max-w-3xl mx-auto px-8 md:px-16">
                      <button 
                        className="flex items-center justify-center mb-6 w-full focus:outline-none"
                        onClick={() => {
                          const infoContentEl = document.getElementById('info-content');
                          if (infoContentEl) {
                            if (infoContentEl.style.display === 'none' || infoContentEl.style.display === '') {
                              infoContentEl.style.display = 'block';
                              document.getElementById('info-arrow')?.classList.add('rotate-180');
                            } else {
                              infoContentEl.style.display = 'none';
                              document.getElementById('info-arrow')?.classList.remove('rotate-180');
                            }
                          }
                        }}
                      >
                        <h2 className="text-lg font-light text-white/90">Info Center</h2>
                        <svg id="info-arrow" className="w-5 h-5 text-white/70 ml-2 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div id="info-content" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" style={{ display: 'none' }}>
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-4">Legal</h3>
                          <ul className="space-y-3">
                            <li><button className="text-white/70 text-xs hover:text-white">Terms & Conditions</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Privacy Policy</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Brand Promoter Terms</button></li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-4">Support</h3>
                          <ul className="space-y-3">
                            <li><button className="text-white/70 text-xs hover:text-white">FAQ</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Help Center</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Contact Support</button></li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-4">Company</h3>
                          <ul className="space-y-3">
                            <li><button className="text-white/70 text-xs hover:text-white">About Us</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Our Mission</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Careers</button></li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-white/90 text-sm font-medium mb-4">Connect</h3>
                          <ul className="space-y-3">
                            <li><button className="text-white/70 text-xs hover:text-white">Instagram</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">Twitter</button></li>
                            <li><button className="text-white/70 text-xs hover:text-white">LinkedIn</button></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
        
        {/* Centered header text content */}
        {isHomePage && (
          <div className="fixed top-0 left-0 right-0 h-[48px] flex items-center justify-center pointer-events-none z-0">
            <div className="w-52 flex items-center justify-center">
              {headerTexts.map((header, index) => (
                <div 
                  key={index} 
                  className={`absolute flex items-center justify-center transition-opacity duration-1000 ${
                    index === headerTextIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-center text-[10px] whitespace-nowrap">
                    <span className={`${
                      index === 1 ? 'text-white text-shadow-blue' : 'text-white/80'
                    }`}>
                      {header.text}
                    </span>
                    {header.showHeart && (
                      <svg className="w-2.5 h-2.5 text-[var(--zinrai-red)] mx-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    )}
                    {header.showLink && (
                      <a 
                        href="#" 
                        className="font-bold text-white hover:text-[var(--zinrai-red)] transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
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
          </div>
        )}
        
        {/* Router Content */}
        <Router />
        
        {/* ZiNRAi Cares Modal */}
        {showCaresModal && (
          <div className="fixed inset-0 bg-black/90 z-[1100] overflow-y-auto flex items-start justify-center p-4 sm:p-8">
            <div className="bg-black border border-white/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button 
                className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
                onClick={() => setShowCaresModal(false)}
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