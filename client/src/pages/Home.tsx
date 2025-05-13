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
  
  // Effect for flickering images in grid boxes
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    
    // Function to handle flickering images sequence
    const startFlickerSequence = () => {
      // Clear any active images first
      setActiveFlickerBoxes({});
      setIsFlickering(true);
      
      // All 8 possible grid boxes
      const allBoxes = [1, 2, 3, 4, 5, 6, 7, 8];
      
      // Helper function to shuffle array
      const shuffleArray = (array: any[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
      
      // Initial placement of images
      const initialBoxes = shuffleArray(allBoxes).slice(0, 4);
      const initialState: Record<number, string> = {};
      
      // Place each image in its initial box
      for (let i = 0; i < flickerImages.length; i++) {
        initialState[initialBoxes[i]] = flickerImages[i];
      }
      
      // Set initial state
      setActiveFlickerBoxes(initialState);
      
      // Create more frequent random movements (30+)
      // This will make images jump between different boxes very frequently
      const totalMoves = 40;
      
      for (let move = 0; move < totalMoves; move++) {
        // Randomly select which image to move (more random)
        const imageIndex = Math.floor(Math.random() * 4);
        const image = flickerImages[imageIndex];
        
        // Schedule this movement - more frequent with shorter intervals
        const moveTime = 150 + (move * 100); // More rapid movements
        
        const moveTimer = setTimeout(() => {
          if (!isFlickering) return;
          
          // Find where this image currently is
          let currentBox: number | null = null;
          Object.entries(activeFlickerBoxes).forEach(([boxNum, img]) => {
            if (img === image) {
              currentBox = parseInt(boxNum);
            }
          });
          
          if (currentBox === null) return;
          
          // Pick a different random box to move to
          const availableBoxes = allBoxes.filter(box => box !== currentBox);
          const newBox = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
          
          // Move the image - remove from current box, add to new box
          setActiveFlickerBoxes(prev => {
            const newState = { ...prev };
            delete newState[currentBox!];
            newState[newBox] = image;
            return newState;
          });
          
        }, moveTime);
        
        timers.push(moveTimer);
      }
      
      // End the flicker sequence after 4.5 seconds
      const endTimer = setTimeout(() => {
        // Immediately clear all images without any transition - instant cut
        setActiveFlickerBoxes({});
        setIsFlickering(false);
        
        // Schedule next sequence after 8 seconds of black screen
        const nextSequenceTimer = setTimeout(() => {
          startFlickerSequence();
        }, 8000);
        
        timers.push(nextSequenceTimer);
      }, 4500);
      
      timers.push(endTimer);
    };
    
    // Start first sequence after a delay
    const initialTimer = setTimeout(() => {
      startFlickerSequence();
    }, 2000);
    
    timers.push(initialTimer);
    
    // Clean up on unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
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
          <div className="grid grid-cols-2 grid-rows-4 h-full">
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transition: 'none' // Ensure no transitions are applied
                    }}
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
          
          {/* Bottom right - START NOW */}
          <div 
            className="absolute bottom-0 right-0 w-1/2 h-1/4 flex items-center justify-center cursor-pointer z-20"
            onClick={() => handleNavigate('/subscribe')}
          >
            <div className="flex items-center gap-2 text-white text-xl font-light">
              <span>START NOW</span>
              <span className="text-2xl ml-1 transform rotate-[45deg]">→</span>
            </div>
          </div>
          
          {/* Bottom left - WATCH VIDEO */}
          <div 
            className="absolute bottom-0 left-0 w-1/2 h-1/4 flex items-center justify-center cursor-pointer z-20"
            onClick={() => setVideoPopupOpen(true)}
          >
            <div className="flex items-center gap-2 text-white text-xl font-light">
              <span>WATCH</span>
              <span className="text-xl ml-1 animate-bounce">↓</span>
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