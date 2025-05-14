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
  // Get current location for navigation-aware behavior
  const [location] = useLocation();
  
  // Flicker images state - track multiple active boxes
  const [activeFlickerBoxes, setActiveFlickerBoxes] = useState<Record<number, string>>({});
  const flickerImages = [beachImage, cryptoImage, runnerImage, womanImage];
  
  // Debug flicker images
  useEffect(() => {
    console.log("Available flicker images:", flickerImages);
  }, []);
  
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
  
  // Add viewport height calculation for mobile browsers
  useEffect(() => {
    // Function to set the viewport height variable
    const setViewportHeight = () => {
      // Get the viewport height and multiply it by 1% to get a value for a vh unit
      const vh = window.innerHeight * 0.01;
      // Set the value in the --vh custom property
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Set the height initially
    setViewportHeight();
    
    // Update the height on window resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);
  
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
    // Check if we're touching a clickable element
    const target = e.target as HTMLElement;
    const isClickable = target.closest('.cursor-pointer, [role="button"], button, a, .start-now-text, .watch-text, .product-text, .product-arrow, .product-arrow-up, .menu-icon');
    
    // Don't prevent default for clickable elements - allow normal touch behavior
    if (isClickable) {
      return; // Let the click go through naturally
    }
    
    // Only prevent default for non-interactive elements
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) return;
    
    setTouchStartY(e.touches[0].clientY);
    // Initialize end Y to same as start to prevent false swipes
    setTouchEndY(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    // Check if we're interacting with a clickable element
    const target = e.target as HTMLElement;
    const isClickable = target.closest('.cursor-pointer, [role="button"], button, a, .start-now-text, .watch-text, .product-text, .product-arrow, .product-arrow-up, .menu-icon');
    
    // Don't prevent default for clickable elements
    if (isClickable) {
      // Just track position but don't prevent default
      setTouchEndY(e.touches[0].clientY);
      return;
    }
    
    // Prevent default behavior for non-interactive areas
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) return;
    
    setTouchEndY(e.touches[0].clientY);
  };
  
  // Use useEffect to selectively prevent scrolling but allow clicks
  useEffect(() => {
    const preventTouchDefault = (e: TouchEvent) => {
      // Don't prevent default on elements with the clickable class or role="button"
      const target = e.target as HTMLElement;
      const clickableParent = target.closest('.cursor-pointer, [role="button"], button, a, .start-now-text, .watch-text, .product-text, .product-arrow, .product-arrow-up, .menu-icon');
      
      if (clickableParent) {
        // Allow clicks on interactive elements
        return;
      }
      
      // Only prevent default for page scrolling, not for clicks
      if (e.touches && e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const initialY = touchStartY;
        
        // Only prevent vertical scrolling, not taps
        if (Math.abs(touchY - initialY) > 10) {
          e.preventDefault();
        }
      }
    };
    
    // Add listeners that only prevent unwanted scrolling
    document.body.addEventListener('touchmove', preventTouchDefault, { passive: false });
    
    return () => {
      document.body.removeEventListener('touchmove', preventTouchDefault);
    };
  }, [touchStartY]);
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Only prevent default for swipe gestures, not for clicks
    const deltaY = Math.abs(touchEndY - touchStartY);
    if (deltaY > 10) {
      e.preventDefault();
    }
    
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
  
  // Removed the effect that was moving the "why" logo as requested
  
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
          console.log(`Adding flicker image to box ${selectedBoxes[i]}:`, flickerImages[i]);
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
        // Force cleanup of any possible lingering images
        document.querySelectorAll('.flicker-image').forEach(el => {
          (el as HTMLElement).style.opacity = '0';
        });
        
        // Use RAF to ensure DOM has updated before removing
        requestAnimationFrame(() => {
          // Clear all active boxes
          setActiveFlickerBoxes({});
          
          // Mark as no longer being in flicker mode
          flickerMode.current = false;
        });
      }, 3500);
      
      timers.push(clearTimer);
    };
    
    // Function for the master timer that alternates between flicker sequence and black screen
    const startMasterTimer = () => {
      // Initial random delay before first flicker sequence (3-6 seconds)
      const initialDelay = Math.random() * 3000 + 3000;
      
      // Start first flicker sequence after initial delay
      const initialTimer = setTimeout(() => {
        // Start first flicker sequence
        console.log("Starting first flicker sequence");
        startFlickerSequence();
        
        // Set up recurring alternating pattern
        const intervalTimer = setInterval(() => {
          // If not in flicker mode, start a new flicker sequence
          if (!flickerMode.current) {
            console.log("Starting recurring flicker sequence");
            startFlickerSequence();
          } else {
            console.log("Still in flicker mode, waiting...");
          }
        }, 10000); // Check every 10 seconds
        
        timers.push(intervalTimer);
      }, initialDelay);
      
      timers.push(initialTimer);
    };
    
    // Start the master timer
    startMasterTimer();
    
    // Cleanup all timers on dismount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  // Helper function to toggle the menu state
  const toggleMenu = () => {
    // When toggling, apply an immediate opacity change to create a smooth fade effect
    if (!menuOpen) {
      // Opening menu - fade in immediately
      document.querySelector('.menu-overlay')?.classList.add('opacity-100');
    } else {
      // Closing menu - start fade out
      const menuOverlay = document.querySelector('.menu-overlay');
      if (menuOverlay) {
        menuOverlay.classList.remove('opacity-100');
        menuOverlay.classList.add('opacity-0');
      }
    }
    
    // Toggle the menu state
    setMenuOpen(!menuOpen);
  };
  
  // Function to handle the "WATCH" button click to open the YouTube video
  const handleWatchClick = () => {
    setVideoPopupOpen(true);
  };
  
  // Update the document title based on current page
  useEffect(() => {
    // For all pages, update the title dynamically
    if (location === '/') {
      document.title = 'ZiNRAi - Home';
    } else {
      const titleCase = (str: string) => {
        return str
          .replace('-', ' ')
          .replace(/^\w|\s\w/g, (letter) => letter.toUpperCase());
      };
      
      // Get the current path without the leading slash and transform
      const currentPage = location.substring(1);
      document.title = `ZiNRAi - ${titleCase(currentPage)}`;
    }
  }, [location]);
  
  return (
    <div 
      className="relative w-full min-h-screen bg-black overflow-hidden touch-none text-white"
      style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
    >
      {/* Header bar (off-white) with toggle icon */}
      <div 
        className="fixed top-0 left-0 w-full h-[32px] bg-[#f7f5f0] z-[80] flex items-center justify-between px-6"
        onClick={toggleMenu}
      >
        {/* Header Text - Alternate between two messages every 5 seconds */}
        <div className="header-text-container relative h-full flex items-center overflow-hidden">
          {/* Message 1: Cares - with Emoji */}
          <div className="header-text-1 text-black text-[11px] tracking-widest absolute inset-0 flex items-center transition-opacity duration-1000 whitespace-nowrap">
            $1 of every subscription fuels global impact through ❤️ ZiNRAi Cares
          </div>
          
          {/* Message 2: Live/Lead */}
          <div className="header-text-2 text-black text-[11px] tracking-widest absolute inset-0 flex items-center transition-opacity duration-1000 whitespace-nowrap opacity-0">
            Live With Passion. Lead With Purpose.
          </div>
        </div>
        
        {/* Menu icon removed from top right as requested */}
      </div>
      
      {/* Main content container */}
      <div 
        className="w-full h-screen pt-[32px] relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid lines container */}
        <div className="grid-container absolute inset-0 grid grid-cols-2 grid-rows-4 z-10">
          {/* Horizontal grid lines - animate from left to right */}
          <div className="horizontal-line absolute top-1/4 left-0 w-full h-[1.5px] bg-white/30 animate-line-left-to-right"></div>
          <div className="horizontal-line absolute top-2/4 left-0 w-full h-[1.5px] bg-white/30 animate-line-left-to-right" style={{ animationDelay: '0.2s' }}></div>
          <div className="horizontal-line absolute top-3/4 left-0 w-full h-[1.5px] bg-white/30 animate-line-left-to-right" style={{ animationDelay: '0.4s' }}></div>
          
          {/* Vertical grid line - animate from top to bottom */}
          <div className="vertical-line absolute top-0 left-1/2 w-[1.5px] h-full bg-white/30 animate-line-top-to-bottom" style={{ animationDelay: '0.6s' }}></div>
          
          {/* Border lines for the entire grid */}
          <div className="border-line absolute top-0 left-0 w-full h-[1.5px] bg-white/30"></div>
          <div className="border-line absolute bottom-0 left-0 w-full h-[1.5px] bg-white/30"></div>
          <div className="border-line absolute top-0 left-0 h-full w-[1.5px] bg-white/30"></div>
          <div className="border-line absolute top-0 right-0 h-full w-[1.5px] bg-white/30"></div>
          
          {/* Flickering images in grid boxes - these appear randomly with the effect */}
          {Object.entries(activeFlickerBoxes).map(([boxKey, imageSrc]) => {
            const boxNum = parseInt(boxKey);
            
            // Calculate position based on box number (1-8)
            // Boxes are numbered 1-2 for first row, 3-4 for second row, and so on
            const row = Math.ceil(boxNum / 2) - 1; // 0-3
            const col = (boxNum % 2 === 0) ? 1 : 0; // 0 or 1
            
            return (
              <div 
                key={`box-${boxNum}`}
                className="flicker-image absolute"
                style={{
                  top: `${row * 25}vh`,
                  left: `${col * 50}vw`,
                  width: '50vw',
                  height: '25vh',
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.25, // Increased opacity so images are more visible
                  zIndex: 5,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            );
          })}
        </div>
        
        {/* Logo in the top left square - always visible unless menu is open */}
        <div 
          className={`absolute top-0 left-0 w-[50%] h-[25%] flex flex-col items-center justify-center z-50 ${menuOpen ? 'hidden' : 'flex'}`}
        >
          <div className="zinrai-logo-text text-[20px] sm:text-[30px] md:text-[40px] font-black tracking-[0.1em] animate-content-glitch" style={{ animationDelay: '1s' }}>
            ZiNRAi
          </div>
        </div>
        
        {/* START NOW in the top right square - always visible unless menu is open */}
        <div 
          className={`absolute top-0 right-0 w-[50%] h-[25%] flex items-center justify-center z-50 ${menuOpen ? 'hidden' : 'flex'}`}
        >
          <div 
            className="start-now-text text-[10px] tracking-[0.2em] text-white/70 font-light cursor-pointer animate-content-glitch"
            style={{ animationDelay: '1.2s' }}
            onClick={() => navigate('/product')}
            onTouchStart={() => navigate('/product')} /* Added touchstart for more responsive mobile */
          >
            START NOW
          </div>
        </div>
        
        {/* Social icons in the left center square */}
        <div 
          className={`absolute top-1/4 left-0 w-[50%] h-[25%] flex items-center justify-center z-50 ${menuOpen ? 'hidden' : 'flex'}`}
        >
          <div className="social-icons flex space-x-4 opacity-0">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Facebook"
              style={{ padding: '8px' }} /* Added padding for larger touch target */
            >
              <FaFacebook size={16} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Instagram"
              style={{ padding: '8px' }} /* Added padding for larger touch target */
            >
              <FaInstagram size={16} />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="YouTube"
              style={{ padding: '8px' }} /* Added padding for larger touch target */
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>
        
        {/* WATCH and WHY text in the bottom left square - always visible unless menu is open */}
        <div 
          className={`absolute bottom-0 left-0 w-[50%] h-[25%] flex items-center justify-center z-50 ${menuOpen ? 'hidden' : 'flex'}`}
          style={{ 
            touchAction: 'manipulation'
          }}
        >
          {/* WATCH and WHY text side by side with horizontal line between */}
          <div className="flex items-center space-x-4 animate-content-glitch" style={{ animationDelay: '1.6s' }}>
            {/* WATCH text */}
            <div 
              className="watch-text text-[10px] tracking-[0.15em] text-white/70 font-light uppercase text-center cursor-pointer" 
              style={{ padding: '5px' }} /* Added padding for larger touch target */
              onClick={handleWatchClick}
              onTouchStart={handleWatchClick} /* Added touchstart for more responsive mobile handling */
            >
              Watch
            </div>
            
            {/* Horizontal line between WATCH and WHY */}
            <div className="h-[1px] w-[15px] bg-white/40"></div>
            
            {/* WHY text */}
            <div 
              className="why-text text-[10px] tracking-[0.15em] text-white/70 font-light uppercase text-center cursor-pointer" 
              style={{ padding: '5px' }} /* Added padding for larger touch target */
              onClick={() => navigate('/logo')}
              onTouchStart={() => navigate('/logo')} /* Added touchstart for more responsive mobile handling */
            >
              Why
            </div>
          </div>
        </div>
        
        {/* Navigation in the bottom right square completely removed as requested */}
        
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
                  <div className="w-6 h-[1px] bg-white/70 group-hover:bg-white transform rotate-45 transition-colors"></div>
                  <div className="w-6 h-[1px] bg-white/70 group-hover:bg-white transform -rotate-45 -translate-y-[1px] transition-colors"></div>
                </div>
              </div>
            </button>
            
            {/* Menu header with logo */}
            <div className="pt-16 md:pt-24 w-full px-8 md:px-16">
              <div className="zinrai-logo-text text-[30px] md:text-[40px] font-black tracking-[0.1em] text-white/90">
                ZiNRAi
              </div>
            </div>
            
            {/* Main menu content */}
            <div className="flex-1 w-full px-8 md:px-16 flex flex-col justify-center">
              <div className="menu-items-container">
                <div className="menu-section mb-12">
                  <div className="menu-section-title text-white/30 text-xs tracking-widest mb-6">
                    COMPANY
                  </div>
                  
                  {/* Company navigation items */}
                  <div 
                    className="flex flex-col items-start group cursor-pointer mb-6"
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
                    className="flex flex-col items-start group cursor-pointer mb-6"
                    onClick={() => {
                      navigate('/partner');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[1].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[1].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer mb-6"
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
                    className="flex flex-col items-start group cursor-pointer mb-6"
                    onClick={() => {
                      navigate('/insights');
                      toggleMenu();
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1">{contentItems[3].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[3].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
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
                </div>
                
                <div className="menu-section">
                  <div className="menu-section-title text-white/30 text-xs tracking-widest mb-6">
                    CONNECT
                  </div>
                  
                  {/* Connect navigation items */}
                  <div 
                    className="flex flex-col items-start group cursor-pointer mb-6"
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
            
            {/* Footer removed as requested */}
          </div>
        )}
      </div>

      {/* YouTube Video Popup */}
      {videoPopupOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setVideoPopupOpen(false)}>
          <div 
            className="relative w-[90vw] md:w-[80vw] max-w-[1000px] aspect-video" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for video */}
            <button 
              onClick={() => setVideoPopupOpen(false)} 
              className="absolute -top-16 right-0 text-white/80 hover:text-white transition-all group" 
              aria-label="Close video"
            >
              <div className="relative h-12 w-12 flex items-center justify-center">
                <div className="w-6 h-[1px] bg-white transform rotate-45"></div>
                <div className="w-6 h-[1px] bg-white transform -rotate-45 -translate-y-[1px]"></div>
              </div>
            </button>
            
            {/* YouTube iframe */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}