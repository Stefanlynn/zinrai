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
      <Route path="/checkout" component={Checkout} />
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
        {/* Larger header bar with menu - changed to dark gray */}
        <div className="fixed top-0 left-0 right-0 h-[48px] bg-[#222222] z-[1000] flex items-center">
          {/* Menu icon and dropdown - increased tap target for mobile and desktop */}
          <div className="relative z-10 h-[48px] flex items-center" ref={menuRef}>
            <button 
              className="ml-4 h-[48px] w-[120px] flex items-center cursor-pointer group relative"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              style={{ touchAction: 'manipulation' }}
            >
              {/* Expanded invisible hit area that covers more space */}
              <div className="w-full h-full absolute top-0 left-0 hover:bg-white/5 transition-colors duration-300"></div>
              {/* The visible hamburger lines (3 lines) stay centered */}
              <div className="relative w-5 h-6 ml-4 flex items-center justify-center">
                <div className={`w-5 h-[1.5px] bg-white/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 w-5 translate-y-0' : '-translate-y-[5px] group-hover:bg-white'}`}></div>
                <div className={`w-5 h-[1.5px] bg-white/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100 group-hover:bg-white'}`}></div>
                <div className={`w-5 h-[1.5px] bg-white/80 absolute transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 w-5 translate-y-0' : 'translate-y-[5px] group-hover:bg-white'}`}></div>
              </div>
              {/* No text label */}
            </button>
            
            {/* Menu page exactly matching the reference image */}
            {menuOpen && (
              <div className="fixed inset-0 bg-black text-white z-[1001] overflow-auto">
                <div className="w-full h-full flex flex-col">
                  {/* Header with ZiNRAi logo and Start Now button */}
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
                  
                  {/* Main menu content with numbered items - moved to the left */}
                  <div className="flex-1 px-8 md:px-16 pt-8">
                    <nav className="space-y-6 md:space-y-8 max-w-xs">
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
                            Partner
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
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">05</div>
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
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">06</div>
                          <button 
                            onClick={() => {
                              setLocation('/zinrai-cares');
                              toggleMenu();
                            }}
                            className="text-white text-lg md:text-xl font-light hover:text-white/80 transition-colors"
                          >
                            ZiNRAi Cares
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-start">
                          <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">07</div>
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
                      
                      {/* Info Center Content - Initially hidden with scrollability */}
                      <div id="info-content" style={{display: 'none'}} className="py-4 max-h-[40vh] md:max-h-60 overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                          <div>
                            <h3 className="text-sm font-medium mb-3 text-white/90">Terms & Policies</h3>
                            <ul className="space-y-2">
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">IBO Terms</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Member Terms</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Policies & Procedures</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Refund Policy</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Income Disclosure</a></li>
                            </ul>
                            
                            <h3 className="text-sm font-medium mb-3 mt-6 text-white/90">Legal & Regional Notices</h3>
                            <ul className="space-y-2">
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Japan Information</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Global Compliance Notice</a></li>
                            </ul>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-3 text-white/90">Privacy & Usage</h3>
                            <ul className="space-y-2">
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Privacy Policy</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Cookie Policy</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Accessibility</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Data Usage Notice</a></li>
                            </ul>
                            
                            <h3 className="text-sm font-medium mb-3 mt-6 text-white/90">Support Resources</h3>
                            <ul className="space-y-2">
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">FAQs</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Help Center</a></li>
                              <li><a href="#" className="text-white/80 text-xs hover:text-white transition-colors block">Contact Support</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Conditional Content: Impact text on home page or ZiNRAi on other pages */}
          {isHomePage ? (
            /* Alternating header texts - only on home page - fixed width to prevent shifting */
            <div className="absolute left-0 right-0 flex items-center justify-center h-full pointer-events-none z-0">
              <div className="w-52 flex items-center justify-center">
                {headerTexts.map((header, index) => (
                  <div 
                    key={index} 
                    className={`absolute flex items-center justify-center transition-opacity duration-1000 ${
                      index === headerTextIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex items-center text-[10px] text-white/80 whitespace-nowrap">
                      <span>{header.text}</span>
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
            </div>
          ) : (
            /* ZiNRAi text on other pages - absolutely centered */
            <div className="absolute left-0 right-0 flex items-center justify-center h-full z-0">
              <a 
                href="/" 
                className="text-sm font-semibold text-white/90 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/');
                }}
              >
                ZiNRAi
              </a>
            </div>
          )}
          
          {/* Profile icon on the right side - same for all pages */}
          <div className="ml-auto h-[48px] mr-4 flex items-center z-10">
            <button
              className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors duration-300"
              aria-label="Profile"
              onClick={() => setLocation('/profile')}
            >
              <FiUser className="text-white/80 h-4 w-4" />
            </button>
          </div>
        </div>
        
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