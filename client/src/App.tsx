import { Switch, Route, useRoute, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from "react";
import { FiUser } from "react-icons/fi";
import zinraiLogo from "./assets/zinrai-circle-logo.png";

import Footer from "./components/Footer";
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
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import IboTerms from "@/pages/IboTerms";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import TermsConditions from "@/pages/TermsConditions";
import TermsOfUse from "@/pages/TermsOfUse";
import TestPage from "@/pages/TestPage";
import StartNow from "@/pages/StartNow";
import Documents from "@/pages/Documents";
import BrandPromoterAgreement from "@/pages/BrandPromoterAgreement";
import JapanStatutoryMatters from "@/pages/JapanStatutoryMatters";

// Onboarding Form Component
function OnboardingForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    refid: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Extract referral ID from URL on component mount
  useEffect(() => {
    function getParameterByName(name: string, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    const refValue = getParameterByName('ref');
    if (refValue) {
      setFormData(prev => ({ ...prev, refid: refValue }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch("https://dev.zinrai.com/api/onboarding?token=zXNN14tzDo2Z0cWqJQWchVg94pXtPSAwCo7EuHrr0581e2db", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitMessage("Successfully submitted!");
        setFormData({ firstname: '', lastname: '', email: '', phone: '', refid: '' });
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitMessage("Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      setSubmitMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" id="refid" name="refid" value={formData.refid} />
      
      <div>
        <label htmlFor="firstname" className="block text-white/80 text-sm font-medium mb-2">
          First Name *
        </label>
        <input
          type="text"
          id="firstname"
          required
          value={formData.firstname}
          onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <label htmlFor="lastname" className="block text-white/80 text-sm font-medium mb-2">
          Last Name *
        </label>
        <input
          type="text"
          id="lastname"
          required
          value={formData.lastname}
          onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your last name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
          placeholder="Enter your phone number"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(104,172,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[var(--zinrai-blue-glow)]/50"
      >
        {isSubmitting ? 'Joining...' : 'Join ZiNRAi'}
      </button>

      {submitMessage && (
        <p className={`text-center text-sm mt-4 ${
          submitMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'
        }`}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}

// Component for pages that need the header
function PageWithHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="pt-[48px] flex-1">
        {children}
      </div>
      <Footer />
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
      <Route path="/brand-promoter">
        {() => <PageWithHeader><Partner /></PageWithHeader>}
      </Route>
      <Route path="/culture">
        {() => <PageWithHeader><Culture /></PageWithHeader>}
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
      <Route path="/subscribe">
        {() => <PageWithHeader><Subscribe /></PageWithHeader>}
      </Route>
      <Route path="/checkout">
        {() => <PageWithHeader><Checkout /></PageWithHeader>}
      </Route>
      <Route path="/confirmation">
        {() => <PageWithHeader><ConfirmationPage /></PageWithHeader>}
      </Route>
      <Route path="/test">
        {() => <PageWithHeader><TestPage /></PageWithHeader>}
      </Route>
      <Route path="/privacy-policy">
        {() => <PageWithHeader><PrivacyPolicy /></PageWithHeader>}
      </Route>
      <Route path="/ibo-terms">
        {() => <PageWithHeader><IboTerms /></PageWithHeader>}
      </Route>
      <Route path="/bp-terms">
        {() => <PageWithHeader><IboTerms /></PageWithHeader>}
      </Route>
      <Route path="/brand-promoter-agreement">
        {() => <PageWithHeader><BrandPromoterAgreement /></PageWithHeader>}
      </Route>
      <Route path="/cookie-policy">
        {() => <PageWithHeader><CookiePolicy /></PageWithHeader>}
      </Route>
      <Route path="/refund-policy">
        {() => <PageWithHeader><RefundPolicy /></PageWithHeader>}
      </Route>
      <Route path="/terms-conditions">
        {() => <PageWithHeader><TermsConditions /></PageWithHeader>}
      </Route>
      <Route path="/terms-of-use">
        {() => <PageWithHeader><TermsOfUse /></PageWithHeader>}
      </Route>
      <Route path="/documents">
        {() => <PageWithHeader><Documents /></PageWithHeader>}
      </Route>
      <Route path="/japan-statutory-matters">
        {() => <PageWithHeader><JapanStatutoryMatters /></PageWithHeader>}
      </Route>
      <Route path="/startnow">
        {() => <PageWithHeader><StartNow /></PageWithHeader>}
      </Route>
      <Route>
        {() => <PageWithHeader><NotFound /></PageWithHeader>}
      </Route>
    </Switch>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCaresModal, setShowCaresModal] = useState(false);
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);

  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
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
        <header className="fixed top-0 left-0 right-0 h-[48px] bg-[#222222] z-[1000] flex items-center justify-between border-b border-white/10" role="banner">
          {/* Brand logo and Watch Now button - shown on all pages except home page and when menu is open */}
          <div className="flex items-center space-x-4">
            {!menuOpen && !isHomePage && (
              <a 
                className="ml-6 cursor-pointer flex items-center space-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  setLocation('/');
                }}
                href="/"
                aria-label="ZiNRAi™ Home"
              >
                <img 
                  src={zinraiLogo} 
                  alt="ZiNRAi™ Logo" 
                  className="w-6 h-6 object-contain"
                />
                <span className="text-white font-semibold tracking-wide text-lg">ZiNRAi<span className="text-xs align-super">™</span></span>
              </a>
            )}
            {menuOpen && <div className="ml-6 w-8"></div>}
            
            {/* Watch Now button for desktop - only on home page */}
            {!menuOpen && isHomePage && (
              <button
                onClick={() => setVideoPopupOpen(true)}
                className="hidden md:flex ml-6 h-[32px] px-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-sm items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                aria-label="Watch ZiNRAi introduction video"
              >
                <span className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors">Watch Now</span>
              </button>
            )}
            
            {/* Login and Watch Now buttons on left side for mobile home page */}
            {isHomePage && !menuOpen && (
              <div className="md:hidden ml-6 flex items-center space-x-2">
                <a 
                  href="http://app.zinrai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[32px] px-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-sm flex items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                  aria-label="Login to ZiNRAi app"
                >
                  <span className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors">Login</span>
                </a>
                <button
                  onClick={() => {
                    setVideoPopupOpen(true);
                  }}
                  className="h-[32px] px-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-sm flex items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                  aria-label="Watch ZiNRAi introduction video"
                >
                  <span className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors">Watch Now</span>
                </button>
              </div>
            )}
            


          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto" role="navigation" aria-label="Main Navigation">
            <a 
              className="text-white/70 text-sm font-light hover:text-white transition-colors"
              href="/product"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/product');
              }}
            >
              Courses
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
              href="/culture"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/culture');
              }}
            >
              Why ZiNRAi
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
              href="/zinrai-cares"
              onClick={(e) => {
                e.preventDefault();
                setLocation('/zinrai-cares');
              }}
            >
              ZiNRAi Cares
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
          
          {/* Login button for desktop */}
          <div className="hidden md:flex items-center mr-6">
            {!menuOpen && (
              <a 
                href="http://app.zinrai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[32px] px-5 bg-black/40 backdrop-blur-sm border border-white/20 rounded-sm flex items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                aria-label="Login to ZiNRAi app"
              >
                <span className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors">Login</span>
              </a>
            )}
          </div>
          

            
          {/* Mobile menu toggle - left side */}
          <div className="md:hidden" ref={menuRef}>
            <button 
              className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer ml-8 z-10"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={menuOpen ? "true" : "false"}
              aria-controls="mobile-menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className={`w-5 h-[1px] bg-white absolute transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 w-5 translate-y-0' : '-translate-y-[4px]'}`}></div>
                <div className={`w-4 h-[1px] bg-white absolute transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`w-5 h-[1px] bg-white absolute transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 w-5 translate-y-0' : 'translate-y-[4px]'}`}></div>
              </div>
            </button>
            
            {/* Mobile menu */}
            {menuOpen && (
              <div id="mobile-menu" className="fixed inset-0 bg-black text-white z-[1001] overflow-auto" role="dialog" aria-modal="true" aria-label="Main Menu">
                <div className="w-full h-full flex flex-col">
                  {/* Header with ZiNRAi text and Login button */}
                  <div className="flex justify-between items-center p-6">
                    <div 
                      className="text-white text-2xl font-bold tracking-wide cursor-pointer hover:text-white/80 transition-colors"
                      onClick={() => {
                        setMenuOpen(false);
                        setLocation('/');
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label="Go to ZiNRAi home page"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setMenuOpen(false);
                          setLocation('/');
                        }
                      }}
                    >
                      ZiNRAi
                    </div>
                    
                    {/* Login button on right side of menu */}
                    <a 
                      href="http://app.zinrai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[36px] px-6 bg-black/20 backdrop-blur-sm border border-white/20 rounded-sm flex items-center justify-center cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all duration-300 group"
                      aria-label="Login to ZiNRAi app"
                    >
                      <span className="text-white/80 text-sm font-light tracking-wide group-hover:text-white transition-colors">Login</span>
                    </a>
                  </div>
                  
                  {/* Main menu content with numbered items on left, video space on right */}
                  <div className="flex-1 px-6 md:px-16 pt-6 flex flex-col md:flex-row">
                    {/* Left side: Navigation */}
                    <nav className="space-y-4 md:space-y-8 max-w-xs flex-shrink-0">
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
                            Courses
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
                  
                  {/* Social Media Links */}
                  <div className="px-6 md:px-16 mt-6">
                    <div className="border-t border-white/10 pt-4 pb-3">
                      <div className="text-white/80 text-xs font-medium mb-3">
                        Follow ZiNRAi
                      </div>
                      <div className="flex space-x-4">
                        <a 
                          href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white/90 transition-colors"
                          aria-label="Follow ZiNRAi on Instagram"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://facebook.com/zinrai" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white/90 transition-colors"
                          aria-label="Follow ZiNRAi on Facebook"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                        </a>
                        <a 
                          href="https://www.youtube.com/@ZiNRAi.official" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white/90 transition-colors"
                          aria-label="Subscribe to ZiNRAi on YouTube"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Policy Links at bottom */}
                  <div className="px-6 md:px-16 pb-4">
                    <div className="border-t border-white/10 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 text-xs">
                        <button 
                          onClick={() => {
                            setLocation('/ibo-terms');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          BP Terms & Conditions
                        </button>
                        <button 
                          onClick={() => {
                            setLocation('/cookie-policy');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          Cookie Policy
                        </button>
                        <button 
                          onClick={() => {
                            setLocation('/privacy-policy');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          Privacy Policy
                        </button>
                        <button 
                          onClick={() => {
                            setLocation('/refund-policy');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          Refund Policy
                        </button>
                        <button 
                          onClick={() => {
                            setLocation('/terms-conditions');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          Terms & Conditions
                        </button>
                        <button 
                          onClick={() => {
                            setLocation('/terms-of-use');
                            toggleMenu();
                          }}
                          className="text-white/60 hover:text-white/90 transition-colors text-left"
                        >
                          Terms of Use
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Company Legal Information */}
                  <div className="px-6 md:px-16 pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <div className="text-white/50 text-xs space-y-1">
                        <div className="font-medium text-white/70">ZiNRAi LLC</div>
                        <div className="text-white/40 text-[10px] leading-relaxed">
                          3333 Renaissance Blvd<br />
                          Suite #209<br />
                          Bonita Springs, FL 34134
                        </div>
                        <div className="text-white/40 text-[10px] mt-2">
                          © 2025 All rights reserved.
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
        
        {/* Onboarding Modal */}
        {showOnboardingModal && (
          <div className="fixed inset-0 bg-black/95 z-[1100] overflow-y-auto flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-black border border-white/20 rounded-lg max-w-md w-full relative shadow-2xl">
              <button 
                className="absolute top-3 left-3 text-white/60 hover:text-white/90 w-8 h-8 flex items-center justify-center z-10 transition-all rounded-full hover:bg-white/5"
                onClick={() => setShowOnboardingModal(false)}
                aria-label="Go back"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-white mb-2 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Join ZiNRAi
                  </h2>
                  <p className="text-white/60 text-sm">
                    Start your journey with us today
                  </p>
                </div>
                
                <OnboardingForm onClose={() => setShowOnboardingModal(false)} />
              </div>
            </div>
          </div>
        )}
        
        {/* YouTube Video Popup - only show on home page */}
        {isHomePage && videoPopupOpen && (
          <div 
            className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/95 backdrop-blur-md" 
            onClick={() => setVideoPopupOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-title"
          >
            <div 
              className="relative w-[90vw] max-w-4xl animate-fadeIn" 
              onClick={(e) => e.stopPropagation()}
              style={{ animation: 'fadeIn 0.3s ease-out' }}
            >
              {/* Stylish close button for video popup */}
              <button 
                className="absolute -top-16 right-0 text-white/80 hover:text-white transition-all group" 
                onClick={() => setVideoPopupOpen(false)}
                aria-label="Close video"
              >
                <div className="relative h-12 w-12 flex items-center justify-center overflow-hidden">
                  {/* Circular background that appears on hover */}
                  <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm group-hover:bg-black/70 transform scale-75 group-hover:scale-100 transition-all duration-300"></div>
                  
                  {/* Animated X icon */}
                  <div className="relative">
                    {/* Line 1 - animates to create X */}
                    <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform rotate-45 transition-all duration-300"></div>
                    {/* Line 2 - animates to create X */}
                    <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform -rotate-45 transition-all duration-300"></div>
                  </div>
                </div>
              </button>
              
              {/* Hidden title for screen readers */}
              <h2 id="video-title" className="sr-only">ZiNRAi Introduction Video</h2>
              
              {/* YouTube video embed */}
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl border border-white/10">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/aB19kSzMGxo?autoplay=1&rel=0&modestbranding=1"
                  title="ZiNRAi Introduction Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
        

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;