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
            
            {/* Completely redesigned menu page */}
            {menuOpen && (
              <div className="fixed inset-0 bg-black z-[1001] overflow-auto">
                {/* Header area with logo and close button */}
                <div className="w-full py-6 px-8 flex justify-between items-center border-b border-white/20">
                  <div className="flex items-center">
                    <h1 className="text-white text-3xl font-bold">ZiNRAi</h1>
                  </div>
                  
                  <button 
                    onClick={() => setMenuOpen(false)} 
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                {/* Main content area */}
                <div className="container mx-auto px-8 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    
                    {/* Navigation links - left column */}
                    <div className="md:col-span-6 lg:col-span-5">
                      <h2 className="text-white text-xl font-medium mb-10 pb-2 border-b border-white/20">Menu</h2>
                      
                      <nav className="space-y-8">
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/product');
                              toggleMenu();
                            }}
                          >
                            Products
                          </a>
                        </div>
                        
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/partner');
                              toggleMenu();
                            }}
                          >
                            Partner
                          </a>
                        </div>
                        
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/culture');
                              toggleMenu();
                            }}
                          >
                            Why ZiNRAi
                          </a>
                        </div>
                        
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/leadership');
                              toggleMenu();
                            }}
                          >
                            Leadership
                          </a>
                        </div>
                        
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/insights');
                              toggleMenu();
                            }}
                          >
                            Insights
                          </a>
                        </div>
                        
                        <div>
                          <a 
                            className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 cursor-pointer block"
                            onClick={() => {
                              setLocation('/zinrai-cares');
                              toggleMenu();
                            }}
                          >
                            ZiNRAi Cares
                          </a>
                        </div>
                      </nav>
                    </div>
                    
                    {/* Info Center - right column */}
                    <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
                      <h2 className="text-white text-xl font-medium mb-10 pb-2 border-b border-white/20">Info Center</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                        {/* Terms & Policies */}
                        <div>
                          <h3 className="text-white text-base font-medium mb-4">Terms & Policies</h3>
                          <div className="space-y-3">
                            <a href="#" className="text-white text-sm block hover:underline">IBO Terms</a>
                            <a href="#" className="text-white text-sm block hover:underline">Member Terms</a>
                            <a href="#" className="text-white text-sm block hover:underline">Policies & Procedures</a>
                            <a href="#" className="text-white text-sm block hover:underline">Refund Policy</a>
                            <a href="#" className="text-white text-sm block hover:underline">Income Disclosure</a>
                          </div>
                        </div>
                        
                        {/* Legal & Regional Notices */}
                        <div>
                          <h3 className="text-white text-base font-medium mb-4">Legal & Regional</h3>
                          <div className="space-y-3">
                            <a href="#" className="text-white text-sm block hover:underline">Japan Information</a>
                            <a href="#" className="text-white text-sm block hover:underline">Global Compliance Notice</a>
                          </div>
                        </div>
                        
                        {/* Privacy & Usage */}
                        <div>
                          <h3 className="text-white text-base font-medium mb-4">Privacy & Usage</h3>
                          <div className="space-y-3">
                            <a href="#" className="text-white text-sm block hover:underline">Privacy Policy</a>
                            <a href="#" className="text-white text-sm block hover:underline">Terms of Use</a>
                            <a href="#" className="text-white text-sm block hover:underline">Employee/Applicant Privacy</a>
                          </div>
                        </div>
                        
                        {/* Support */}
                        <div>
                          <h3 className="text-white text-base font-medium mb-4">Support</h3>
                          <div className="space-y-3">
                            <a 
                              href="/contact" 
                              className="text-white text-sm block hover:underline"
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
                
                {/* Footer area */}
                <div className="mt-auto border-t border-white/20 py-8 px-8">
                  <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                      <div className="text-white mb-4 md:mb-0">
                        © 2025 ZiNRAi. All rights reserved.
                      </div>
                      <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-white/80 transition-colors">
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                          </svg>
                        </a>
                        <a href="#" className="text-white hover:text-white/80 transition-colors">
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-white hover:text-white/80 transition-colors">
                          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
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
