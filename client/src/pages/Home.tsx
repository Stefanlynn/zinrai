import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiToggleRight, FiPlay, FiPower, FiEye, FiCircle, FiPlus, FiRotateCw } from "react-icons/fi";

// Import flicker images
import beachImage from "../assets/flicker-images/beach.jpg";
import cryptoImage from "../assets/flicker-images/crypto.jpg";
import runnerImage from "../assets/flicker-images/runner.jpg";
import womanImage from "../assets/flicker-images/woman.jpg";
import zinraiLogoImage from "../assets/zinrai-new-logo.png";
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
  // State for content item cycling
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for handling video popup
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  
  // State for tracking menu open/closed
  const [menuOpen, setMenuOpen] = useState(false);
  
  // State for tracking touch start and end coordinates
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  
  // Get current location for navigation-aware behavior
  const [location] = useLocation();
  
  // Flicker images state - track multiple active boxes
  const [activeFlickerBoxes, setActiveFlickerBoxes] = useState<Record<number, string>>({});
  const [isFlickering, setIsFlickering] = useState(false);
  const flickerImages = [beachImage, cryptoImage, runnerImage, womanImage];
  
  // State for tracking header text
  const [headerTextIndex, setHeaderTextIndex] = useState(0);
  const headerTexts = [
    "$1 of every subscription fuels global impact through ❤️ ZiNRAi Cares",
    "Live With Passion. Lead With Purpose."
  ];
  
  // Helper function to change content
  const changeContent = (direction: 'next' | 'prev') => {
    // Calculate the next index
    let nextIndex = currentIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % contentItems.length;
    } else {
      nextIndex = (currentIndex - 1 + contentItems.length) % contentItems.length;
    }
    
    // Update current index
    setCurrentIndex(nextIndex);
  };
  
  // Handle swipe to next content
  const handleSwipeNext = () => {
    changeContent('next');
  };
  
  // Effect for alternating header text
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeaderTextIndex(prevIndex => (prevIndex + 1) % headerTexts.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Effect for flickering images in grid boxes - matching zinrai.netlify.app exactly
  useEffect(() => {
    console.log("Starting flickering sequence"); // Debug log
    let timers: NodeJS.Timeout[] = [];
    
    // Function to handle flickering images sequence
    const startFlickerSequence = () => {
      console.log("Flickering sequence started"); // Debug log
      // Clear any active images first
      setActiveFlickerBoxes({});
      setIsFlickering(true);
      
      // All 8 possible grid boxes
      const allBoxes = [1, 2, 3, 4, 5, 6, 7, 8];
      
      // Helper function to shuffle array - ensures randomness
      const shuffleArray = (array: any[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
      
      // Initialize with 4 images in 4 random boxes
      let boxSelection = shuffleArray(allBoxes).slice(0, 4);
      let currentState: Record<number, string> = {};
      
      // Assign each image to a unique box
      for (let i = 0; i < flickerImages.length; i++) {
        currentState[boxSelection[i]] = flickerImages[i];
      }
      
      // Set initial state
      setActiveFlickerBoxes(currentState);
      
      // Move all images together
      // Using very fast interval for more rapid movement
      const moveInterval = setInterval(() => {
        if (!isFlickering) {
          clearInterval(moveInterval);
          return;
        }
        
        // Get new random box positions
        const newBoxes = shuffleArray(allBoxes).slice(0, 4);
        const newState: Record<number, string> = {};
        
        // Move all images at once to new positions
        for (let i = 0; i < flickerImages.length; i++) {
          newState[newBoxes[i]] = flickerImages[i];
        }
        
        // Update boxes all at once
        setActiveFlickerBoxes(newState);
      }, 100); // Extremely fast movement between boxes
      
      timers.push(moveInterval as any);
      
      // Generate a random duration between 3-5 seconds
      const flickerDuration = 3000 + Math.floor(Math.random() * 2000);
      
      // End the flicker sequence after the random duration
      const endTimer = setTimeout(() => {
        // Clear all images immediately
        clearInterval(moveInterval);
        setActiveFlickerBoxes({});
        setIsFlickering(false);
        
        // Schedule next sequence after exactly 8 seconds of black screen
        const nextSequenceTimer = setTimeout(() => {
          startFlickerSequence();
        }, 8000);
        
        timers.push(nextSequenceTimer);
      }, flickerDuration);
      
      timers.push(endTimer);
    };
    
    // Start the first sequence almost immediately
    const initialTimer = setTimeout(() => {
      startFlickerSequence();
    }, 500);
    
    timers.push(initialTimer);
    
    // Clean up all timers on component unmount
    return () => {
      timers.forEach(timer => {
        if (typeof timer === 'number') {
          clearTimeout(timer);
        } else {
          clearInterval(timer);
        }
      });
    };
  }, []);
  
  // Navigate to a specific page
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <div className="bg-black min-h-screen w-full overflow-hidden">
      {/* Header with menu and tagline */}
      <div className="w-full h-8 fixed top-0 left-0 right-0 bg-[#f7f5f0] z-40 flex items-center justify-between px-4">
        <div>
          {headerTexts[headerTextIndex]}
        </div>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-[3px] justify-center cursor-pointer h-full px-2"
        >
          <div className={`w-6 h-[2.5px] bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></div>
          <div className={`w-6 h-[2.5px] bg-black transition-all ${menuOpen ? '-rotate-45' : ''}`}></div>
        </button>
      </div>
      
      {/* Full-screen menu when open */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#f7f5f0] z-30 flex flex-col items-center justify-center">
          <div className="text-center">
            {contentItems.map((item, index) => (
              <div
                key={index}
                className="py-2 text-2xl hover:text-gray-700 cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  handleNavigate(`/${item.title.toLowerCase().replace(/\s+/g, '-')}`);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main content area with grid */}
      <div className="fixed inset-0 pt-8 flex flex-col">
        <div className="relative flex-1 w-full h-full">
          {/* Static grid lines with animation */}
          <div className="grid grid-cols-2 grid-rows-4 h-full pointer-events-none">
            {/* Horizontal lines */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 animate-grid-line-horizontal"></div>
            <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-line-horizontal animate-delay-100"></div>
            <div className="absolute top-2/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-line-horizontal animate-delay-200"></div>
            <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white/10 animate-grid-line-horizontal animate-delay-300"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 animate-grid-line-horizontal animate-delay-400"></div>
            
            {/* Vertical line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 animate-grid-line-vertical"></div>
          </div>
          
          {/* Centered logo and text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="relative">
              <img 
                src={zinraiLogoImage} 
                alt="ZiNRAi Logo" 
                className="w-[400px] h-[400px] animate-fade-in"
              />
              <div className="absolute bottom-[22%] left-0 right-0 text-white text-7xl font-bold text-center">
                ZiNRAi
              </div>
            </div>
          </div>
          
          {/* Flickering images for grid boxes */}
          {Object.entries(activeFlickerBoxes).map(([boxNum, imageSrc]) => {
            const boxNumber = parseInt(boxNum);
            return (
              <div 
                key={boxNumber}
                className="flicker-box"
                style={{
                  top: boxNumber === 1 || boxNumber === 2 ? '0' : 
                       boxNumber === 3 || boxNumber === 4 ? 'calc(25 * var(--vh))' : 
                       boxNumber === 5 || boxNumber === 6 ? 'calc(50 * var(--vh))' : 'calc(75 * var(--vh))',
                  left: boxNumber === 1 || boxNumber === 3 || 
                        boxNumber === 5 || boxNumber === 7 ? '0' : '50%',
                  width: '50%',
                  height: 'calc(25 * var(--vh))',
                  maxWidth: '50%', 
                  maxHeight: 'calc(25 * var(--vh))',
                  boxSizing: 'border-box',
                  position: 'absolute',
                  overflow: 'hidden'
                }}
              >
                <div 
                  className="image-container" 
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={imageSrc} 
                    alt="" 
                    className={`flicker-image flicker-timing-${Math.floor(Math.random() * 4) + 1}`}
                  />
                  
                  {/* Dark overlay */}
                  <div 
                    className="image-overlay" 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.85)',
                      zIndex: 1
                    }}
                  />
                </div>
              </div>
            );
          })}
          
          {/* Bottom right - START NOW - Fixed to ensure visibility */}
          <div 
            className="absolute bottom-0 right-0 w-1/2 h-1/4 flex items-center justify-center cursor-pointer z-50"
            onClick={() => handleNavigate('/subscribe')}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex items-center gap-2 text-white text-2xl font-light tracking-wide">
              <span style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>START NOW</span>
              <span className="text-3xl ml-1 transform rotate-[45deg]">→</span>
            </div>
          </div>
          
          {/* Bottom left - WATCH NOW - Fixed to ensure visibility */}
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-1/4 flex items-center justify-center cursor-pointer z-50"
            onClick={() => setVideoPopupOpen(true)}
            style={{ pointerEvents: 'auto' }}
          >
            <div className="flex items-center gap-2 text-white text-2xl font-light tracking-wide">
              <span style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}>WATCH NOW</span>
              <span className="text-2xl ml-1 animate-bounce">↓</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video popup when activated */}
      {videoPopupOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setVideoPopupOpen(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}