import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiToggleRight, FiPlay, FiPower, FiEye, FiCircle, FiPlus, FiRotateCw } from "react-icons/fi";

// Import flicker images
import beachImage from "../assets/flicker-images/beach.jpg";
import cryptoImage from "../assets/flicker-images/crypto.jpg";
import runnerImage from "../assets/flicker-images/runner.jpg";
import womanImage from "../assets/flicker-images/woman.jpg";
import { RiFilmLine, RiVideoLine } from "react-icons/ri";

// Define all the content items for swiping
const contentItems = [
  { number: "01", title: "PRODUCTS" },
  { number: "02", title: "PARTNER" },
  { number: "03", title: "CULTURE" },
  { number: "04", title: "INSIGHTS" },
  { number: "05", title: "LEADERSHIP" },
  { number: "06", title: "ZiNRAi CARES" },
  { number: "07", title: "CONTACT" },
];

export default function Home() {
  // State to track the current content index
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track whether menu is open
  const [menuOpen, setMenuOpen] = useState(false);
  // State to manage the YouTube video popup
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  // State for grid animation
  const [gridAnimationComplete, setGridAnimationComplete] = useState(false);
  // State for toggling between header texts
  const [headerToggle, setHeaderToggle] = useState(false);
  
  // Navigation function
  const [, navigate] = useLocation();
  
  // Reference to the page content for handling wheel events
  const pageRef = useRef<HTMLDivElement>(null);
  
  // Function to toggle the menu state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Function to handle page navigation
  const handleNavigate = (path: string) => {
    if (path === '/cares') {
      navigate('/zinrai-cares');
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };
  
  // Effect to toggle the header text every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeaderToggle(prev => !prev);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Effect to handle the grid animation on initial load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setGridAnimationComplete(true);
    }, 1500); // Grid animation takes 1.5s
    
    return () => clearTimeout(timeout);
  }, []);
  
  // Effect to handle wheel events for content swiping
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (menuOpen || videoPopupOpen) return; // Don't handle wheel events when menu or video is open
      
      // Throttle the wheel event
      const delta = e.deltaY;
      if (Math.abs(delta) < 50) return; // Ignore small delta changes
      
      if (delta > 0) {
        // Scrolling down - go to next item
        setCurrentIndex(prev => (prev + 1) % contentItems.length);
      } else {
        // Scrolling up - go to previous item
        setCurrentIndex(prev => (prev - 1 + contentItems.length) % contentItems.length);
      }
      
      // Prevent default scroll behavior
      e.preventDefault();
    };
    
    // Add event listener to the specific content area, not the whole window
    if (pageRef.current) {
      pageRef.current.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    // Prevent body scrolling
    const preventScroll = (e: Event) => e.preventDefault();
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    
    // Handle touch events for mobile
    const preventTouchDefault = (e: TouchEvent) => {
      if (menuOpen || videoPopupOpen) return; // Don't handle touch events when menu is open
      e.preventDefault();
    };
    document.body.addEventListener('touchmove', preventTouchDefault, { passive: false });
    
    return () => {
      if (pageRef.current) {
        pageRef.current.removeEventListener('wheel', handleWheel);
      }
      document.body.removeEventListener('wheel', preventScroll);
      document.body.removeEventListener('touchmove', preventTouchDefault);
    };
  }, [currentIndex, menuOpen, videoPopupOpen]);
  
  // Define flickering images for the visual effects
  const flickerImages = [
    beachImage,
    cryptoImage,
    runnerImage,
    womanImage,
  ];
  
  // Initialize the YouTube player
  useEffect(() => {
    // Load the YouTube iframe API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div ref={pageRef} className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Top bar with contrasting color and menu button */}
      <div className={`absolute top-0 left-0 right-0 h-8 bg-[#f7f5f0] flex justify-between items-center z-30 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
        {/* Left side with alternating messages */}
        <div className="relative h-full overflow-hidden flex items-center ml-4">
          <div className={`absolute transition-opacity duration-500 ${headerToggle ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-black text-xs sm:text-sm tracking-wider">$1 of every subscription fuels global impact through ❤️ ZiNRAi Cares</span>
          </div>
          <div className={`absolute transition-opacity duration-500 ${headerToggle ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-black text-xs sm:text-sm tracking-wider">Live With Passion. Lead With Purpose.</span>
          </div>
        </div>
        
        {/* Right side with menu button - removed as requested */}
        <div className="h-full flex items-center mr-4">
          <button 
            onClick={toggleMenu} 
            className="flex flex-col justify-center items-center h-full px-2"
            aria-label="Toggle menu"
            onTouchStart={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <div className="flex flex-col space-y-1">
              <div className="w-5 h-[1px] bg-black"></div>
              <div className="w-5 h-[1px] bg-black"></div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Main grid container */}
      <div className="grid grid-cols-2 grid-rows-4 h-screen">
        {/* Grid animations: horizontal lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid-line horizontal top-1/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
          <div className="grid-line horizontal top-2/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
          <div className="grid-line horizontal top-3/4 left-0 right-0 h-[1.5px] bg-white/70"></div>
        </div>
        
        {/* Grid animations: vertical line */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid-line vertical top-0 bottom-0 left-1/2 w-[1.5px] bg-white/70"></div>
        </div>
        
        {/* Top Left - Logo */}
        <div className="h-[25vh] flex flex-col justify-center items-center p-6 relative">
          <div className={`flex flex-col justify-center items-center transition-opacity duration-500 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest mb-2 flicker-text"
              onClick={() => navigate('/')}
              onTouchStart={(e) => {
                e.stopPropagation();
                navigate('/');
              }}
            >
              ZiNRAi
            </h1>
            <div className="text-xs tracking-widest flex items-center">
              <span>FEEL THE WAVE</span>
            </div>
          </div>
        </div>
        
        {/* Top Right - "START NOW" text */}
        <div className="h-[25vh] flex flex-col justify-center items-center p-6 relative">
          <div className={`transition-opacity duration-500 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <div 
              className="text-xl md:text-2xl tracking-widest font-light cursor-pointer border border-red-500 rounded-full px-6 py-3 hover:bg-red-500 hover:text-white transition-colors duration-300"
              onClick={() => navigate('/product')}
              onTouchStart={(e) => {
                e.stopPropagation();
                navigate('/product');
              }}
            >
              START NOW
            </div>
          </div>
        </div>
        
        {/* Center Left - Content navigation */}
        <div className="h-[25vh] col-start-1 row-start-2 flex flex-col justify-center items-center p-6">
          <div className={`transition-opacity duration-500 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold mb-2">{contentItems[currentIndex].number}</div>
              <div 
                className="text-xl tracking-widest cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => navigate(`/${contentItems[currentIndex].title.toLowerCase().replace(' ', '-')}`)}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  navigate(`/${contentItems[currentIndex].title.toLowerCase().replace(' ', '-')}`);
                }}
              >
                {contentItems[currentIndex].title}
              </div>
            </div>
          </div>
        </div>
        
        {/* Center Right - Flickering images */}
        <div className="h-[25vh] col-start-2 row-start-2 relative overflow-hidden">
          <div className={`transition-opacity duration-500 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
            {/* Flickering effect for images */}
            <div className="absolute inset-0 flicker-image-container">
              {flickerImages.map((image, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${index === currentIndex % flickerImages.length ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    backgroundImage: `url(${image})`,
                  }}
                >
                  {/* Dark overlay for better text contrast */}
                  <div className="absolute inset-0 bg-black/95"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Left - WATCH button to open video */}
        <div className="h-[25vh] col-start-1 row-start-3 flex flex-col justify-center items-center p-6">
          <div 
            className={`cursor-pointer hover:text-red-500 transition-colors flex items-center space-x-4 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
            onClick={() => setVideoPopupOpen(true)}
            onTouchStart={(e) => {
              e.stopPropagation();
              setVideoPopupOpen(true);
            }}
          >
            {/* Play icon */}
            <div className="p-3 rounded-full border border-white/50 hover:border-red-500 transition-colors">
              <RiFilmLine className="w-5 h-5" />
            </div>
            
            {/* Updated to side-by-side with line between */}
            <div className="flex items-center space-x-3">
              <div className="text-lg tracking-widest">
                WATCH
              </div>
              {/* Horizontal line between text */}
              <div className="w-6 h-[1px] bg-white/70"></div>
              <div className="text-lg tracking-widest">
                Why
              </div>
            </div>
          </div>
        </div>
        
        {/* YouTube Video Popup */}
        {videoPopupOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setVideoPopupOpen(false)}>
            <div 
              className="relative w-full max-w-4xl aspect-video bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button 
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                onClick={() => setVideoPopupOpen(false)}
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Redesigned Menu Overlay - only visible when menu is open */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/95 menu-overlay flex flex-col items-center justify-between">
            {/* Stylish close button for menu */}
            <button 
              onClick={toggleMenu} 
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-all z-50 group"
              aria-label="Close menu"
            >
              <div className="relative h-12 w-12 flex items-center justify-center overflow-hidden">
                {/* Circular background that appears on hover */}
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transform scale-0 group-hover:scale-100 transition-all duration-300"></div>
                
                {/* Animated X icon */}
                <div className="relative">
                  {/* Line 1 - animates to create X */}
                  <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform rotate-45 transition-all duration-300"></div>
                  {/* Line 2 - animates to create X */}
                  <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform -rotate-45 transition-all duration-300"></div>
                </div>
              </div>
            </button>
            
            {/* Modern minimalist menu layout - centered vertically */}
            <div className="w-full max-w-4xl p-8 md:p-12 flex-1 flex items-center">
              {/* Main menu grid - 3 columns for main pages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8">
                {/* Column 1 */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/product")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/product");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">PRODUCTS</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/partner")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/partner");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">PARTNER</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/culture")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/culture");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">CULTURE</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/insights")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/insights");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">INSIGHTS</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/leadership")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/leadership");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">LEADERSHIP</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/zinrai-cares")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/zinrai-cares");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">ZiNRAi CARES</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                {/* Column 3 */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => handleNavigate("/contact")}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      handleNavigate("/contact");
                    }}
                  >
                    <h3 className="text-xl md:text-2xl font-medium">CONTACT</h3>
                    <div className="w-8 h-[1px] bg-white/30 group-hover:bg-white/90 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  {/* Social links */}
                  <div className="pt-8">
                    <h4 className="text-white/50 uppercase text-sm tracking-widest mb-4">Follow Us</h4>
                    <div className="flex space-x-4">
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <FaInstagram size={20} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <FaFacebook size={20} />
                      </a>
                      <a href="#" className="text-white/70 hover:text-white transition-colors">
                        <FaYoutube size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright footer */}
            <div className="w-full border-t border-white/10 p-4 text-center text-white/30 text-xs">
              © 2023 ZiNRAi. All Rights Reserved.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}