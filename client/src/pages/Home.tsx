import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiToggleRight, FiPlay, FiPower, FiEye, FiCircle, FiPlus, FiRotateCw } from "react-icons/fi";

// Import videos
import { RiFilmLine, RiVideoLine } from "react-icons/ri";
import tradingVideo from "../assets/young-man-trading-online-with-tablet-at-home-SBV-338739703-4K.mp4";
import viennaVideo from "../assets/vienna-austria-august-2022-slow-motion-footage-of-the-united-nations-headquarters-f-SBV-347184715-4K.mp4";
import runningVideo from "../assets/man-running-in-park-for-fitness-and-healthy-lifestyle-SBV-346641696-4K.mp4";
import familyTravelVideo from "../assets/finally-travel-happy-family-of-four-in-protective-masks-with-luggage-walking-to-air-SBV-347036154-4K.mp4";
import coastlineVideo from "../assets/exploring-the-coastline-young-people-in-slow-motion-searching-for-a-path-SBV-316823787-HD.mp4";
import kayakVideo from "../assets/couple-in-a-kayak-in-the-jungle-of-krabi-thailand-men-and-women-in-a-kayak-in-a-tro-SBV-348822411-4K.mp4";
import japaneseWomanVideo from "../assets/japanese-woman-gracefully-dancing-with-fans-in-a-blooming-park-SBV-346616982-4K.mp4";
import cryptoInvestorVideo from "../assets/investor-checking-bitcoin-ethereum-and-other-altcoin-cryptocurrency-price-index-on--SBV-347295079-4K.mp4";

// Import the ZiNRAi logo
import ziNRaiLogoImage from "../assets/zinrai-circle-logo.png";

// Define all the content items for swiping
const contentItems = [
  { number: "01", title: "COURSES" },
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
  
  // Video display in grid - track grid box positions
  const [activeVideoBoxes, setActiveVideoBoxes] = useState<Record<number, string>>({});
  // Video sources - all eight videos for the grid
  const videoSources = [tradingVideo, viennaVideo, runningVideo, familyTravelVideo, coastlineVideo, kayakVideo, japaneseWomanVideo, cryptoInvestorVideo];
  
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
  
  // Effect for displaying videos in the grid
  useEffect(() => {
    // Display videos in all grid boxes
    const newVideoBoxes: Record<number, string> = {};
    
    // Directly map each position to a video
    // Making sure all 8 positions are filled
    newVideoBoxes[1] = videoSources[0]; // top-left
    newVideoBoxes[2] = videoSources[1]; // top-right
    newVideoBoxes[3] = videoSources[2]; // center-left
    newVideoBoxes[4] = videoSources[3]; // center-right
    newVideoBoxes[5] = videoSources[4]; // bottom-left
    newVideoBoxes[6] = videoSources[5]; // bottom-right
    newVideoBoxes[7] = videoSources[6]; // bottom-left-2
    newVideoBoxes[8] = videoSources[7]; // bottom-right-2
    
    // Set the videos display
    setActiveVideoBoxes(newVideoBoxes);
    console.log("Video boxes set:", newVideoBoxes);
  }, []);

  // Helper function to get the route for the current index
  const getRouteForCurrentIndex = () => {
    // Get the current item title and convert to lowercase for the route
    let route = contentItems[currentIndex].title.toLowerCase();
    
    // Special case for "ZiNRAi CARES" - use hyphen for URL
    if (route === "zinrai cares") {
      route = "zinrai-cares"; // Route kept lowercase for URL consistency
    } 
    // Special case for "COURSES" - go to product page
    else if (route === "courses") {
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
      {/* We're removing the moving "why" text and adding it below WATCH */}
      

      
      {/* Home page content */}
      <div className="relative">
        <div className="h-screen w-full"></div>
      </div>
        
      {/* UI elements - fixed position */}
      <div className="fixed inset-0">
        {/* zinrai text in the center with logo behind it - moved down a bit */}
        <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full px-4 text-center">
          <div className="relative inline-block">
            {/* Logo positioned behind and slightly above the text */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-[200px] md:w-[250px] lg:w-[300px]">
              <img 
                src={ziNRaiLogoImage} 
                alt="ZiNRAi Logo" 
                className="w-full h-auto opacity-90"
              />
            </div>
            <h1 className="zinrai-logo-text text-white text-[14vw] md:text-[10vw] lg:text-[8vw] xl:text-[120px] font-bold tracking-wider whitespace-nowrap relative z-10 neon-text-glow" style={{ textShadow: "0 0 15px #68ACFF, 0 0 25px #68ACFF, 0 0 35px #68ACFF" }}>
              ZiNRAi
            </h1>
            <div className="tagline-text text-white text-[2vw] md:text-[1.8vw] lg:text-[1.4vw] xl:text-[18px] tracking-wider whitespace-nowrap relative z-10 text-center mt-[-3vw] md:mt-[-2.5vh] neon-text-glow-subtle" style={{ textShadow: "0 0 8px #68ACFF, 0 0 15px #68ACFF" }}>
              LIVE WITH PASSION. LEAD WITH PURPOSE
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
        
        {/* Videos in grid boxes - map through active video boxes */}
        {Object.entries(activeVideoBoxes).map(([boxNum, videoSrc]) => {
          const boxNumber = parseInt(boxNum);
          return (
            <div 
              key={boxNumber}
              className="video-box"
              style={{
                top: boxNumber === 1 || boxNumber === 2 ? '0' : 
                     boxNumber === 3 || boxNumber === 4 ? 'calc(25 * var(--vh))' : 
                     boxNumber === 5 || boxNumber === 6 ? 'calc(50 * var(--vh))' : 
                     boxNumber === 7 || boxNumber === 8 ? 'calc(75 * var(--vh))' : '0',
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
                className="video-container" 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                {/* Video element - autoplay, loop, muted */}
                <video 
                  src={videoSrc} 
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="grid-video"
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
                
                {/* Dark overlay (reduced opacity to better see video) */}
                <div 
                  className="video-overlay" 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'black',
                    opacity: 0.3 /* Reduced opacity for videos */
                  }}
                ></div>
              </div>
            </div>
          );
        })}
        

        
        {/* Dynamic content in the top right square - hidden when menu is open */}
        <div 
          className={`absolute top-0 right-0 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'flex'}`}
          style={{ 
            top: '12.5vh', // Position at the vertical center of the top row
            right: '25vw', // Position at the horizontal center of the right column
            transform: 'translate(50%, -50%)', // Center perfectly
            width: 'auto', // Let content determine width
            height: 'auto' // Let content determine height
          }}
          onTouchStart={(e) => {
            // On mobile, make touch events more responsive by handling them on touch start
            if (window.innerWidth <= 768) {
              e.stopPropagation();
              
              // Helper function to generate the correct path
              const getRouteForTitle = (title: string) => {
                title = title.toLowerCase();
                return title === "courses" ? "/product" : 
                       title === "zinrai cares" ? "/zinrai-cares" : 
                       `/${title.replace(/\s+/g, '')}`;
              };
              
              // Get the path for the current index
              const path = getRouteForTitle(contentItems[currentIndex].title);
              
              // Use Wouter's navigate for client-side routing
              navigate(path);
            }
          }}
          onClick={(e) => {
            // Handle click events for both mobile and desktop
            e.stopPropagation();
              
            // Helper function to generate the correct path
            const getRouteForTitle = (title: string) => {
              title = title.toLowerCase();
              return title === "products" ? "/product" : 
                     title === "zinrai cares" ? "/zinrai-cares" : 
                     `/${title.replace(/\s+/g, '')}`;
            };
            
            // Get the path for the current index
            const path = getRouteForTitle(contentItems[currentIndex].title);
            
            // Use Wouter's navigate for client-side routing
            navigate(path);
          }}
        >
          {/* Content text */}
          <div 
            className="product-text text-center cursor-pointer w-full mx-auto"
            style={{ padding: '8px' }} /* Added padding for larger touch target */
            onClick={(e) => {
              // Prevent propagation and navigate on both mobile and desktop
              e.stopPropagation();
              
              // Get the correct path
              const title = contentItems[currentIndex].title.toLowerCase();
              const path = title === "courses" ? "/product" : 
                          title === "zinrai cares" ? "/zinrai-cares" : // URL kept lowercase for consistency
                          `/${title.replace(/\s+/g, '')}`;
              
              // Use Wouter's navigate for client-side routing
              navigate(path);
            }}
            onTouchStart={(e) => {
              // For mobile touch, make even more responsive by triggering on first touch
              e.stopPropagation();
              
              // Get the correct path
              const title = contentItems[currentIndex].title.toLowerCase();
              const path = title === "products" ? "/product" : 
                          title === "zinrai cares" ? "/zinrai-cares" : 
                          `/${title.replace(/\s+/g, '')}`;
              
              // Use Wouter's navigate for client-side routing
              navigate(path);
            }}
          >
            {/* Navigation text removed but functionality preserved */}
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
                    role="button"
                    tabIndex={0}
                    aria-label="Go to Courses page"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate('/product');
                        toggleMenu();
                      }
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1" aria-hidden="true">{contentItems[0].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[0].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1" aria-hidden="true"></div>
                  </div>
                  
                  <div 
                    className="flex flex-col items-start group cursor-pointer"
                    onClick={() => {
                      navigate('/partner');
                      toggleMenu();
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Go to Brand Promoter page"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate('/partner');
                        toggleMenu();
                      }
                    }}
                  >
                    <div className="text-white/40 text-xs tracking-wider mb-1" aria-hidden="true">{contentItems[1].number}</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">{contentItems[1].title}</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1" aria-hidden="true"></div>
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
            
            {/* Footer removed as requested */}
          </div>
        )}
      </div>

      {/* YouTube Video Popup */}
      {videoPopupOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md" 
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

      {/* Footer - similar to header design */}
      <footer className="fixed bottom-0 left-0 right-0 h-[48px] bg-black/20 backdrop-blur-sm border-t border-white/10 z-[100] pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-between px-8">
          {/* Left side - Copyright */}
          <div className="text-white/70 text-xs font-light pointer-events-auto">
            © 2025 ZiNRAi
          </div>
          
          {/* Center - Documents link */}
          <div className="absolute left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <button
              onClick={() => window.location.href = '/documents'}
              className="text-white/70 text-xs font-bold hover:text-white transition-colors"
            >
              Documents
            </button>
          </div>
          
          {/* Right side - Social links */}
          <div className="flex items-center space-x-4 pointer-events-auto">
            <a 
              href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Follow ZiNRAi on Instagram"
            >
              <FaInstagram className="w-3 h-3" />
            </a>
            <a 
              href="https://facebook.com/zinrai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Follow ZiNRAi on Facebook"
            >
              <FaFacebook className="w-3 h-3" />
            </a>
            <a 
              href="https://www.youtube.com/@ZiNRAi.official" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Subscribe to ZiNRAi on YouTube"
            >
              <FaYoutube className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
