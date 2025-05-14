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
            
            {/* Extremely simplified menu with basic HTML styles for maximum visibility */}
            {menuOpen && (
              <div className="fixed inset-0 bg-white z-[1001] overflow-auto" style={{fontFamily: 'Arial, sans-serif'}}>
                {/* Ultra-simple header */}
                <div style={{padding: '20px', backgroundColor: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{color: '#fff', fontSize: '28px', fontWeight: 'bold'}}>ZiNRAi</div>
                  <button 
                    onClick={() => setMenuOpen(false)} 
                    style={{color: '#fff', padding: '10px', border: 'none', background: 'none', cursor: 'pointer'}}
                  >
                    <span style={{fontSize: '24px'}}>✕</span>
                  </button>
                </div>
                
                {/* Main navigation - pure HTML styling for cross-browser compatibility */}
                <div style={{padding: '30px', backgroundColor: '#fff'}}>
                  <h2 style={{color: '#000', fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', paddingBottom: '10px', borderBottom: '2px solid #000'}}>
                    MAIN MENU
                  </h2>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/product');
                        toggleMenu();
                      }}
                    >
                      PRODUCTS
                    </a>
                    
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/partner');
                        toggleMenu();
                      }}
                    >
                      PARTNER
                    </a>
                    
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/culture');
                        toggleMenu();
                      }}
                    >
                      WHY ZiNRAi
                    </a>
                    
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/leadership');
                        toggleMenu();
                      }}
                    >
                      LEADERSHIP
                    </a>
                    
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/insights');
                        toggleMenu();
                      }}
                    >
                      INSIGHTS
                    </a>
                    
                    <a 
                      style={{
                        backgroundColor: '#000', 
                        color: '#fff', 
                        padding: '15px 20px', 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        textAlign: 'center',
                        cursor: 'pointer',
                        display: 'block',
                        borderRadius: '5px'
                      }}
                      onClick={() => {
                        setLocation('/zinrai-cares');
                        toggleMenu();
                      }}
                    >
                      ZiNRAi CARES
                    </a>
                  </div>
                </div>
                
                {/* Info Center - simple HTML styling */}
                <div style={{backgroundColor: '#f1f1f1', padding: '30px'}}>
                  <h2 style={{color: '#000', fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center'}}>
                    INFO CENTER
                  </h2>
                  
                  <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                      <h3 style={{color: '#000', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>Terms & Policies</h3>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>IBO Terms</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Member Terms</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Policies & Procedures</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Refund Policy</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Income Disclosure</a>
                      </div>
                    </div>
                    
                    <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                      <h3 style={{color: '#000', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>Legal & Regional</h3>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Japan Information</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Global Compliance Notice</a>
                      </div>
                    </div>
                    
                    <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                      <h3 style={{color: '#000', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>Privacy & Usage</h3>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Privacy Policy</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Terms of Use</a>
                        <a href="#" style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}>Employee Privacy</a>
                      </div>
                    </div>
                    
                    <div style={{backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                      <h3 style={{color: '#000', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px'}}>Support</h3>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <a 
                          href="/contact" 
                          style={{color: '#000', fontSize: '16px', fontWeight: 'normal', textDecoration: 'none'}}
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
                
                {/* Simple footer */}
                <div style={{padding: '20px', borderTop: '1px solid #ddd', backgroundColor: '#fff', textAlign: 'center'}}>
                  <div style={{color: '#000', fontSize: '14px', marginBottom: '10px'}}>
                    © 2025 ZiNRAi. All rights reserved.
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
