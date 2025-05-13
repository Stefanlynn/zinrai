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
  // State to track which icon to display
  const [iconVariant, setIconVariant] = useState(0);
  // Import navigate for seamless navigation
  const [_, navigate] = useLocation();
  // Ref to track last event time to prevent too frequent updates
  const lastEventTime = useRef(0);
  // Cooldown period for events (ms) - increased to slow down navigation
  const eventCooldown = 1200;
  // For touch events
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  // State for logo position
  const [logoPosition, setLogoPosition] = useState({
    left: Math.floor(Math.random() * 80) + 10 + '%', 
    top: Math.floor(Math.random() * 80) + 10 + '%'
  });
  
  // Flicker images state - track multiple active boxes
  const [activeFlickerBoxes, setActiveFlickerBoxes] = useState<Record<number, string>>({});
  const flickerImages = [beachImage, cryptoImage, runnerImage, womanImage];
  
  // Custom spinning plus component
  const SpinningPlus = ({ size = 18, className = "" }) => {
    const [spin, setSpin] = useState(false);
    
    // Spin the plus icon every 5 seconds
    useEffect(() => {
      // Initial spin after 3 seconds
      const initialTimeout = setTimeout(() => {
        setSpin(true);
        setTimeout(() => setSpin(false), 1000);
      }, 3000);
      
      // Set up interval for subsequent spins
      const spinInterval = setInterval(() => {
        setSpin(true);
        setTimeout(() => setSpin(false), 1000);
      }, 10000);
      
      return () => {
        clearTimeout(initialTimeout);
        clearInterval(spinInterval);
      };
    }, []);
    
    return (
      <div className={`inline-block ${className}`}>
        <FiPlus 
          size={size} 
          className={spin ? "animate-spin" : ""}
          style={{ transformOrigin: 'center' }}
        />
      </div>
    );
  };
  
  // Video trigger icons to choose from
  const videoIcons = [
    { icon: () => <SpinningPlus />, name: "Plus" },
    { icon: RiVideoLine, name: "Video" },
    { icon: RiFilmLine, name: "Film" },
    { icon: FiEye, name: "Eye" },
    { icon: FiPower, name: "Power" },
    { icon: FiCircle, name: "Circle" }
  ];
  
  // Add scroll event listener to update content
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default scroll behavior
      e.preventDefault();
      
      // Don't handle scroll events if menu is open
      if (menuOpen) {
        return;
      }
      
      const now = Date.now();
      
      // Check if we're still in cooldown period
      if (now - lastEventTime.current < eventCooldown) {
        return;
      }
      
      // Update last event time
      lastEventTime.current = now;
      
      console.log("Wheel event: current index =", currentIndex, "direction =", e.deltaY > 0 ? "next" : "prev");
      
      // Determine scroll direction and change content
      if (e.deltaY > 0) {
        // Scrolling down - increase number (next)
        changeContent('next');
      } else if (e.deltaY < 0) {
        // Scrolling up - decrease number (previous)
        changeContent('prev');
      }
    };
    
    // Add event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Prevent default scroll behavior on the document
    const preventScroll = (e: Event) => e.preventDefault();
    document.addEventListener('scroll', preventScroll, { passive: false });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      document.removeEventListener('scroll', preventScroll);
    };
  }, [menuOpen, currentIndex]);
  
  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default behavior
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) return;
    
    setTouchStartY(e.touches[0].clientY);
    // Initialize end Y to same as start to prevent false swipes
    setTouchEndY(e.touches[0].clientY);
    
    console.log("Touch start at Y =", e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default behavior
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) return;
    
    setTouchEndY(e.touches[0].clientY);
  };
  
  // Use useEffect to add passive: false touch event listeners to body
  useEffect(() => {
    const preventTouchDefault = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    // Add listeners to prevent site movement during touch
    document.body.addEventListener('touchmove', preventTouchDefault, { passive: false });
    
    return () => {
      document.body.removeEventListener('touchmove', preventTouchDefault);
    };
  }, []);
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Prevent default behavior
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) {
      return;
    }
    
    const now = Date.now();
    
    // Check if we're still in cooldown period
    if (now - lastEventTime.current < eventCooldown) {
      return;
    }
    
    // Only process if there was substantial movement (30px threshold)
    if (Math.abs(touchStartY - touchEndY) > 30) {
      // Update last event time
      lastEventTime.current = now;
      
      console.log("Touch swipe: current index =", currentIndex, 
                  "direction =", touchStartY > touchEndY ? "prev" : "next",
                  "touchStartY =", touchStartY, "touchEndY =", touchEndY);
      
      if (touchStartY > touchEndY) {
        // Swiped up - should decrease number (go to previous)
        changeContent('prev');
      } else {
        // Swiped down - should increase number (go to next)
        changeContent('next');
      }
    }
  };
  // Function to handle content change with animation
  const changeContent = (direction: 'next' | 'prev') => {
    console.log(`changeContent called with direction: ${direction}`);
    console.log(`Current index: ${currentIndex}, contentItems length: ${contentItems.length}`);
    
    // Create animation for content transition - fade and slide (but only for the text)
    const productText = document.querySelector('.product-text');
    const zinraiText = document.querySelector('.zinrai-logo-text'); // Class name preserved for DOM selection
    
    // Fade out only the text content, keep arrows visible
    productText?.classList.add('fade-out');
    
    // Add subtle pulse animation to ZiNRAi text
    zinraiText?.classList.add('text-pulse');
    
    // Calculate the next index
    let nextIndex = currentIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % contentItems.length;
    } else {
      nextIndex = (currentIndex - 1 + contentItems.length) % contentItems.length;
    }
    
    console.log(`New index will be: ${nextIndex}, new content: ${contentItems[nextIndex].title}`);
    
    // After fade out, change content and fade in
    setTimeout(() => {
      // Update current index
      setCurrentIndex(nextIndex);
      console.log(`Index updated to: ${nextIndex}`);
      
      // Reset fade classes
      setTimeout(() => {
        productText?.classList.remove('fade-out');
        
        // Remove pulse animation from ZiNRAi text
        zinraiText?.classList.remove('text-pulse');
      }, 50);
    }, 300); // Reduced transition time for snappier experience
  };
  
  // Handle swipe to next content
  const handleSwipeNext = () => {
    changeContent('next');
  };
  
  // No keyboard navigation, just manual click on SWIPE text
  
  useEffect(() => {
    // We no longer need to add animation classes with setTimeout
    // All animations are now handled via CSS classes directly in the JSX
    
    // This is just to make sure any 'opacity-0' classes are removed
    // to prevent them from interfering with our new CSS animations
    const removeOpacityClasses = () => {
      document.querySelectorAll('.grid-line, .horizontal-line, .vertical-line, .border-line').forEach(el => {
        el.classList.remove('opacity-0');
      });
      
      // Also make sure social icons are animated
      const socialIcons = document.querySelector('.social-icons');
      if (socialIcons) {
        socialIcons.classList.add('animate-content-glitch');
        // Add a unique delay for social icons
        (socialIcons as HTMLElement).style.animationDelay = '2.3s';
      }
    };
    
    removeOpacityClasses();
  }, []);
  
  // Effect to move the logo randomly every 5 seconds
  useEffect(() => {
    const moveLogoInterval = setInterval(() => {
      setLogoPosition({
        left: Math.floor(Math.random() * 80) + 10 + '%',
        top: Math.floor(Math.random() * 80) + 10 + '%'
      });
    }, 5000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(moveLogoInterval);
  }, []);
  
  // No longer need a separate effect for spinning plus icon
  // The animation is now handled directly in the SpinningPlus component
  
  // No longer using toggle effect between logo and START NOW
  
  // Effect for flickering images in grid boxes - with 10 second pause and box movement
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    
    // Track the current state to alternate between flicker mode and black screen mode
    const flickerMode = { current: true };
    
    // Function to add multiple flickering images for a 3-4 second sequence
    const startFlickerSequence = () => {
      // Clear any active images first
      setActiveFlickerBoxes({});
      
      // Mark as being in flicker mode
      flickerMode.current = true;
      
      // Create a mapping of image index to current box number
      const imageToBoxMap: {[key: number]: number} = {};
      
      // Initially place each image in a random box
      const initializeImages = () => {
        // Get 4 random unique boxes from 8 possible boxes
        const availableBoxes = Array.from({length: 8}, (_, i) => i + 1);
        shuffleArray(availableBoxes);
        const selectedBoxes = availableBoxes.slice(0, 4);
        
        // Assign each image to one of the selected boxes
        for (let i = 0; i < flickerImages.length; i++) {
          imageToBoxMap[i] = selectedBoxes[i];
          
          // Add this box and image to active boxes
          setActiveFlickerBoxes(prev => ({
            ...prev,
            [selectedBoxes[i]]: flickerImages[i]
          }));
        }
      };
      
      // Helper function to shuffle an array
      function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      
      // Initialize the images in boxes
      initializeImages();
      
      // Move images to new boxes a few times during the flicker sequence
      for (let moveIdx = 0; moveIdx < 3; moveIdx++) {
        const moveTimer = setTimeout(() => {
          if (!flickerMode.current) return;
          
          // Get 4 random unique boxes from 8 possible boxes for the next position
          const availableBoxes = Array.from({length: 8}, (_, i) => i + 1);
          shuffleArray(availableBoxes);
          const newBoxes = availableBoxes.slice(0, 4);
          
          // Remove current images
          setActiveFlickerBoxes({});
          
          // Update box positions and display images in new boxes
          for (let i = 0; i < flickerImages.length; i++) {
            // Update the box for this image
            imageToBoxMap[i] = newBoxes[i];
            
            // Add this box and image to active boxes
            setActiveFlickerBoxes(prev => ({
              ...prev,
              [newBoxes[i]]: flickerImages[i]
            }));
          }
        }, 800 + moveIdx * 800); // Move every 800ms after initial placement
        
        timers.push(moveTimer);
      }
      
      // After 3.5 seconds, clear all images and go to black screen mode
      const clearTimer = setTimeout(() => {
        setActiveFlickerBoxes({});
        flickerMode.current = false;
        
        // Schedule the next flicker sequence after 10 seconds of black screen
        const nextSequenceTimer = setTimeout(() => {
          startFlickerSequence();
        }, 10000);
        
        timers.push(nextSequenceTimer);
      }, 3500);
      
      timers.push(clearTimer);
    };
    
    // Start the first flicker sequence
    const initialTimer = setTimeout(() => {
      startFlickerSequence();
    }, 2000);
    
    timers.push(initialTimer);
    
    // Clean up timers on unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Helper function to get the route for the current index
  const getRouteForCurrentIndex = () => {
    // Get the current item title and convert to lowercase for the route
    let route = contentItems[currentIndex].title.toLowerCase();
    
    // Special case for "ZiNRAi CARES" - use hyphen for URL
    if (route === "zinrai cares") {
      route = "zinrai-cares"; // Route kept lowercase for URL consistency
    } 
    // Special case for "PRODUCTS" - go to product page
    else if (route === "products") {
      route = "product";
    }
    else {
      // Replace any spaces with nothing for other routes
      route = route.replace(/\s+/g, '');
    }
    
    // Debug log to see what route is being generated
    console.log("Route for current index:", route);
    
    return `/${route}`;
  };
  
  // Handle navigation item click to go to corresponding page
  const handleNavigationClick = () => {
    // Use the helper function to get the route
    const route = getRouteForCurrentIndex();
    
    // Use window.location for direct navigation
    window.location.href = route;
  };
  
  // We'll use the existing toggleMenu function below
  
  // Handle returning to home page - now using direct navigation
  const handleReturnToHome = () => {
    // Use direct navigation for better reliability
    window.location.href = '/';
    // setCurrentIndex will be called automatically when the page reloads
    
    // Make sure navigation is visible when returning to home page
    setTimeout(() => {
      const productText = document.querySelector('.product-text');
      const productArrow = document.querySelector('.product-arrow');
      const productArrowUp = document.querySelector('.product-arrow-up');
      
      // Ensure these elements are visible
      productText?.classList.add('animate-in');
      productArrow?.classList.add('animate-in');
      productArrowUp?.classList.add('animate-in');
    }, 50);
  };
  
  // For WATCH text click (open video popup)
  const handleWatchClick = () => {
    // Open the video popup
    setVideoPopupOpen(true);
  };
  
  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
    // If closing the menu, make sure the menu icon reappears properly
    if (menuOpen) {
      // Short delay to allow for menu transition
      setTimeout(() => {
        document.querySelectorAll('.menu-icon').forEach(icon => {
          icon.classList.add('menu-animate-in');
          icon.classList.add('animate-in');
        });
      }, 300);
    }
  };

  return (
    <div 
      className="bg-black min-h-screen overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Small sideways "why" text randomly positioned - changes every 5 seconds, only visible when menu is closed */}
      {!menuOpen && (
        <div 
          className="fixed z-30 transform -rotate-90 transition-all duration-700 ease-in-out cursor-pointer"
          style={{ 
            left: logoPosition.left, 
            top: logoPosition.top 
          }}
          onClick={() => navigate('/logo')}
        >
          <span className="text-white text-[8px] uppercase tracking-widest font-bold">why</span>
        </div>
      )}
      

      
      {/* Home page content */}
      <div className="relative">
        <div className="h-screen w-full"></div>
      </div>
        
      {/* UI elements - fixed position */}
      <div className="fixed inset-0">
        {/* zinrai text in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full px-4 text-center">
          <div className="relative inline-block">
            {/* Switch/Play button above z in zinrai */}
            <div className="absolute -top-[30px] left-[4%] z-50">
              <button 
                onClick={() => setVideoPopupOpen(true)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setIconVariant((prev) => (prev + 1) % videoIcons.length);
                }}
                className="text-white/80 cursor-pointer"
                style={{ touchAction: 'manipulation' }}  
                aria-label="Open video"
                title={`Video trigger (${videoIcons[iconVariant].name} icon)`}
              >
                {iconVariant === 0 ? (
                  <SpinningPlus size={18} className="play-button-glow" />
                ) : (
                  React.createElement(videoIcons[iconVariant].icon, { 
                    size: 18, 
                    className: "play-button-glow"
                  })
                )}
              </button>
            </div>
            <h1 className="zinrai-logo-text animate-content-glitch text-white text-[14vw] md:text-[10vw] lg:text-[8vw] xl:text-[120px] font-bold tracking-wider whitespace-nowrap">
              ZiNRAi
            </h1>
          </div>
        </div>
      
        {/* Center horizontal line for screen - slides in from left */}
        <div className="horizontal-line animate-grid-line-horizontal absolute top-1/2 w-0 h-[1px] bg-white/[0.15] transform -translate-y-[0.5px]"></div>
        
        {/* Center vertical line for screen - slides in from top */}
        <div className="vertical-line animate-grid-line-vertical absolute left-1/2 w-[1px] h-0 bg-white/[0.15] transform -translate-x-[0.5px]"></div>
        
        {/* Grid lines - horizontal lines at 25%, 50%, 75% positions */}
        <div className="grid-line animate-grid-line-horizontal absolute top-[25%] left-0 w-0 h-[1px] bg-white/[0.15]" style={{ animationDelay: '0.2s' }}></div>
        <div className="grid-line animate-grid-line-horizontal absolute top-[75%] left-0 w-0 h-[1px] bg-white/[0.15]" style={{ animationDelay: '0.4s' }}></div>
        
        {/* Border around the grid */}
        <div className="border-line animate-border absolute inset-0 border border-white/[0.15] opacity-0"></div>
        
        {/* Flickering images for grid boxes - map through active boxes */}
        {Object.entries(activeFlickerBoxes).map(([boxNum, imageSrc]) => {
          const boxNumber = parseInt(boxNum);
          return (
            <div 
              key={boxNumber}
              className={`absolute flex items-center justify-center w-[50%] h-[25vh] overflow-hidden z-10 ${
                // Position based on the box number (1-8)
                boxNumber === 1 ? 'top-0 left-0' : 
                boxNumber === 2 ? 'top-0 left-[50%]' : 
                boxNumber === 3 ? 'top-[25vh] left-0' : 
                boxNumber === 4 ? 'top-[25vh] left-[50%]' : 
                boxNumber === 5 ? 'top-[50vh] left-0' : 
                boxNumber === 6 ? 'top-[50vh] left-[50%]' : 
                boxNumber === 7 ? 'top-[75vh] left-0' : 
                'top-[75vh] left-[50%]'
              }`}
            >
              <div className="relative w-full h-full">
                {/* The image with flickering animation */}
                <img 
                  src={imageSrc} 
                  alt="" 
                  className="w-full h-full object-cover animate-flicker"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
              </div>
            </div>
          );
        })}
        
        {/* START NOW in the top left square - centered in the box */}
        <div className="absolute top-[12.5%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <div 
            className="start-now-text animate-content-glitch cursor-pointer"
            onClick={() => navigate('/subscribe')}
            style={{ animationDelay: '1.2s' }}
          >
            <div className="border border-white/30 px-3 py-2 flex flex-col items-center hover:border-white/50 hover:bg-white/5 transition-all duration-300">
              <div className="text-[11px] tracking-[0.1em] text-white/70 font-medium uppercase">Start</div>
              <div className="text-[11px] tracking-[0.1em] text-white/70 font-medium uppercase">Now</div>
            </div>
          </div>
        </div>
        
        {/* Menu icon in the top right square - centered in the box */}
        <div className={`absolute top-[12.5%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-[60] ${menuOpen ? 'hidden' : 'block'}`}>
          {/* Menu icon for home page */}
          <div 
            className="menu-icon animate-content-glitch cursor-pointer" 
            onClick={toggleMenu}
            style={{ animationDelay: '1.4s' }}
          >
            <div className="menu-line1"></div>
            <div className="menu-line2"></div>
          </div>
        </div>
        
        {/* WATCH text in the lower left square */}
        <div 
          className="absolute top-[87.5%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer"
          onClick={handleWatchClick}
        >
          <div className="watch-text animate-content-glitch text-[10px] tracking-[0.15em] text-white/70 font-light uppercase text-center" style={{ animationDelay: '1.6s' }}>
            Watch
          </div>
          {/* Vertical line below WATCH text */}
          <div className="watch-line animate-content-glitch h-[15px] w-[1px] bg-white/40 mt-1 mx-auto" style={{ animationDelay: '1.7s' }}></div>
        </div>
        
        {/* Dynamic content in the lower right square */}
        <div 
          className="absolute top-[87.5%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
        >
          {/* Up arrow above text - navigate to previous content item */}
          <div 
            className="product-arrow-up mb-3 cursor-pointer"
            onClick={() => changeContent('prev')}
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7L7 1L13 7" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Content text - using native HTML anchor */}
          <div 
            className="product-text text-center cursor-pointer"
            onClick={() => {
              const title = contentItems[currentIndex].title.toLowerCase();
              const path = title === "products" ? "/product" : 
                          title === "zinrai cares" ? "/zinrai-cares" : // URL kept lowercase for consistency
                          `/${title.replace(/\s+/g, '')}`;
              navigate(path);
            }}
          >
            <div className="text-[14px] font-bold tracking-wider text-white/90">{contentItems[currentIndex].number}</div>
            <div className="text-[12px] font-semibold tracking-wide text-white/80">{contentItems[currentIndex].title}</div>
          </div>
          
          {/* Down arrow below text - navigate to next content item */}
          <div 
            className="product-arrow mt-3 cursor-pointer"
            onClick={() => changeContent('next')}
          >
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
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
                    onClick={() => {
                      navigate('/product');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[0].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[0].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/partner');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[1].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[1].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                {/* Column 2 */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/culture');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[2].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[2].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/insights');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[3].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[3].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                {/* Column 3 */}
                <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/leadership');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[4].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[4].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/zinrai-cares');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[5].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[5].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer mt-6"
                    onClick={() => {
                      navigate('/contact');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[6].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[6].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer with social icons and legal content - positioned at bottom */}
            <div className="w-full border-t border-white/[0.13] py-5 px-4 mt-auto">
              <div className="container mx-auto flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                {/* Social Media Icons */}
                <div className="mb-4">
                  <div className="flex justify-center space-x-6 social-icons">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300">
                      <FaInstagram size={16} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300">
                      <FaYoutube size={16} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors duration-300">
                      <FaFacebook size={16} />
                    </a>
                  </div>
                </div>
                
                {/* Copyright and legal info */}
                <div className="text-white/50 text-[10px] text-center">
                  © 2023 ZiNRAi. All Rights Reserved. <span className="mx-1">|</span> 
                  <a href="#" className="hover:text-white/70 transition-colors">Terms</a> <span className="mx-1">|</span> 
                  <a href="#" className="hover:text-white/70 transition-colors">Privacy</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* YouTube Video Popup */}
      {videoPopupOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setVideoPopupOpen(false)}>
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
            
            {/* Video container with responsive aspect ratio */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-2xl border border-white/10">
              {/* This will be replaced with the actual YouTube iframe when you provide the video ID */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                <div className="text-white/90 text-lg flex flex-col items-center gap-4">
                  <div className="flex items-center justify-center mb-2">
                    {iconVariant === 0 ? (
                      <SpinningPlus size={48} className="text-white/90" />
                    ) : (
                      React.createElement(videoIcons[iconVariant].icon, { 
                        size: 48, 
                        className: "text-white/90 animate-pulse" 
                      })
                    )}
                  </div>
                  <span className="font-bold tracking-wide">VIDEO READY</span>
                  <span className="text-sm text-white/60 max-w-xs text-center">
                    Your YouTube video will appear here when you provide the video ID.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
