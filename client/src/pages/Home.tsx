import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiToggleRight, FiPlay, FiPower, FiEye, FiCircle, FiPlus, FiRotateCw } from "react-icons/fi";

// Import flicker images
import beachImage from "../assets/flicker-images/beach.jpg";
import cryptoImage from "../assets/flicker-images/crypto.jpg";
import runnerImage from "../assets/flicker-images/runner.jpg";
import womanImage from "../assets/flicker-images/woman.jpg";
import zinraiLogoImage from "../assets/zinrai-circle-logo.png";
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
  const [isFlickering, setIsFlickering] = useState(false);
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
    
    // Function to add multiple flickering images for a 3-4 second sequence
    const startFlickerSequence = () => {
      // Clear any active images first
      setActiveFlickerBoxes({});
      
      // Mark as being in flicker mode
      setIsFlickering(true);
      
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
          if (!isFlickering) return;
          
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
          setActiveFlickerBoxes({});
          setIsFlickering(false);
          
          // Ensure all flicker boxes are properly reset
          document.querySelectorAll('.flicker-box').forEach(el => {
            (el as HTMLElement).style.overflow = 'hidden';
          });
        });
        
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
    
    // Use Wouter navigate function for client-side routing
    navigate(route);
  };
  
  // We'll use the existing toggleMenu function below
  
  // Handle returning to home page using client-side routing
  const handleReturnToHome = () => {
    // Use Wouter navigate for client-side routing
    navigate('/');
    // Reset current index for navigation
    setCurrentIndex(0);
    
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
  
  // Simple toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div 
      className="bg-black min-h-screen overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 h-[32px] bg-black z-[900] flex items-center justify-between px-6 shadow-sm">
        {/* ZiNRAi text on left side */}
        <div className="text-white text-sm font-medium">ZiNRAi</div>
        
        {/* Right-side icons */}
        <div className="flex items-center">
          {/* Menu icon button - black background with white lines */}
          <button 
            className="menu-header-icon flex flex-col justify-center items-center cursor-pointer mr-4 border border-white/40 rounded px-2 py-1"
            onClick={toggleMenu}
            onTouchStart={toggleMenu}
          >
            {menuOpen ? (
              <>
                {/* X shape when menu is open */}
                <div className="relative h-4 w-5">
                  <div className="w-5 h-[2px] bg-white absolute top-1/2 left-0 transform -translate-y-1/2 rotate-45"></div>
                  <div className="w-5 h-[2px] bg-white absolute top-1/2 left-0 transform -translate-y-1/2 -rotate-45"></div>
                </div>
              </>
            ) : (
              <>
                {/* Two parallel lines when menu is closed */}
                <div className="w-5 h-[2px] bg-white mb-[4px]"></div>
                <div className="w-5 h-[2px] bg-white"></div>
              </>
            )}
          </button>
          
          {/* Profile icon */}
          <div 
            className="profile-icon w-5 h-5 bg-white rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
            onTouchStart={() => navigate('/profile')}
          ></div>
        </div>
      </div>
      
      {/* Home page content */}
      <div className="relative">
        <div className="h-screen w-full"></div>
      </div>
        
      {/* UI elements - fixed position */}
      <div className="fixed inset-0">
        {/* zinrai text in the center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full px-4 text-center">
          <div className="relative inline-block">
{/* Removed the Plus button as requested */}
            
            {/* ZiNRAi Logo and Text stacked in center */}
            <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-[70]">
              {/* Stacked layout with text positioned higher */}
              <div className="flex flex-col items-center mt-[-50px]">
                {/* Logo */}
                <div className="zinrai-logo-container mb-[-150px]">
                  <img
                    src={zinraiLogoImage}
                    alt="ZiNRAi Logo"
                    className="w-[450px] h-[450px] object-contain transition-transform duration-700"
                  />
                </div>
                
                {/* Text overlapping with bottom of logo */}
                <h1 
                  className="zinrai-logo-text text-white text-[14vw] md:text-[10vw] lg:text-[8vw] xl:text-[120px] font-bold tracking-wider whitespace-nowrap transition-all duration-1000 ease-in-out"
                  style={{
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  ZiNRAi
                </h1>
              </div>
            </div>
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
                {/* The image with flickering animation */}
                <img 
                  src={imageSrc} 
                  alt="" 
                  className="flicker-image animate-flicker"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
                
                {/* Dark overlay */}
                <div 
                  className="image-overlay" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'black',
                    opacity: 0.5
                  }}
                ></div>
              </div>
            </div>
          );
        })}
        
        {/* Watch Now has been moved from the top left to the bottom left */}
        
        {/* Menu icon has been moved to the header bar */}
        
        {/* WATCH NOW in the bottom left square */}
        <div 
          className={`absolute bottom-0 left-0 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'flex'}`}
          style={{ 
            width: '50vw', 
            height: '25vh',
            transform: 'translate(0, 0)',
            touchAction: 'manipulation'
          }}
        >
          <div 
            className="watch-now-text text-[12px] tracking-[0.15em] text-white font-medium uppercase text-center cursor-pointer animate-content-glitch hover:scale-110 transition-transform" 
            style={{ 
              padding: '5px',
              animationDelay: '1.6s',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
            }}
            onClick={handleWatchClick}
            onTouchStart={handleWatchClick}
          >
            Watch Now
          </div>
          
          {/* Modern arrow pointing to the text (above) */}
          <div 
            className="mt-3 animate-bounce cursor-pointer"
            onClick={handleWatchClick}
            onTouchStart={handleWatchClick}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L20 12L12 20M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        
        {/* Start Now text in the bottom right square */}
        <div 
          className={`absolute bottom-0 right-0 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'flex'}`}
          style={{ 
            width: '50vw', 
            height: '25vh',
            transform: 'translate(0, 0)',
            touchAction: 'manipulation'
          }}
        >
          <div 
            className="start-now-text text-[12px] tracking-[0.15em] text-white font-medium uppercase text-center cursor-pointer animate-content-glitch hover:scale-110 transition-transform" 
            style={{ 
              padding: '5px',
              animationDelay: '1.6s',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.4)'
            }}
            onClick={() => navigate('/subscribe')}
            onTouchStart={() => navigate('/subscribe')}
          >
            Start Now
          </div>
          
          {/* Modern arrow pointing to the text (above) */}
          <div 
            className="mt-3 animate-bounce cursor-pointer"
            onClick={() => navigate('/subscribe')}
            onTouchStart={() => navigate('/subscribe')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L20 12L12 20M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Simple Menu Overlay - only visible when menu is open */}
        {menuOpen && (
          <div className="fixed inset-0 z-[800] bg-black/95 menu-overlay flex items-center justify-center">
            {/* Simple close button - Removed since we'll use the menu icon in the header */}
            
            {/* Simple centered menu list */}
            <div className="flex flex-col items-center space-y-5">
              {/* All 7 options in a vertical list */}
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/product');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[0].number}</div>
                <div className="text-white text-lg font-light">{contentItems[0].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/partner');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[1].number}</div>
                <div className="text-white text-lg font-light">{contentItems[1].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/culture');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[2].number}</div>
                <div className="text-white text-lg font-light">{contentItems[2].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/insights');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[3].number}</div>
                <div className="text-white text-lg font-light">{contentItems[3].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/leadership');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[4].number}</div>
                <div className="text-white text-lg font-light">{contentItems[4].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/contact');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[5].number}</div>
                <div className="text-white text-lg font-light">{contentItems[5].title}</div>
              </div>
              
              <div 
                className="cursor-pointer text-center"
                onClick={() => {
                  navigate('/zinrai-cares');
                  toggleMenu();
                }}
              >
                <div className="text-white/50 text-xs">{contentItems[6].number}</div>
                <div className="text-white text-lg font-light">{contentItems[6].title}</div>
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
              {/* YouTube iframe - embedded video */}
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/RbM2F-cfN0A?autoplay=1"
                title="ZiNRAi Introduction Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
