import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ChevronLeft, Plus } from 'lucide-react';

// Content items for the bottom right navigation
const contentItems = [
  { number: "01", title: "PRODUCTS" },
  { number: "02", title: "PARTNER" },
  { number: "03", title: "CULTURE" },
  { number: "04", title: "INSIGHTS" },
  { number: "05", title: "LEADERSHIP" },
  { number: "06", title: "CONTACT" },
  { number: "07", title: "ZiNRAi CARES" }
];

// Video UI icon variants
const videoIcons = [
  { name: "Plus", icon: Plus },
  { name: "ChevronLeft", icon: ChevronLeft }
];

// Custom spinning plus component
const SpinningPlus = ({ size = 24, className = "" }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className={`absolute inset-0 flex items-center justify-center spinning-plus`}>
        <div className={`w-[${size * 0.66}px] h-[2px] bg-current`}></div>
        <div className={`w-[2px] h-[${size * 0.66}px] bg-current`}></div>
      </div>
    </div>
  );
};

export default function Home() {
  // State for navigation and menu
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconVariant, setIconVariant] = useState(0);
  
  // Wouter for client-side navigation
  const [, navigate] = useLocation();
  
  // Touch handling state
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [activeFlickerBoxes, setActiveFlickerBoxes] = useState({});
  
  // Helper function to get the correct route for the current content index
  const getRouteForCurrentIndex = () => {
    const title = contentItems[currentIndex].title.toLowerCase();
    return title === "products" ? "/product" : 
           title === "zinrai cares" ? "/zinrai-cares" :
           `/${title.replace(/\s+/g, '')}`;
  };
  
  // Effect for video icon rotating between variants
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIconVariant((prev) => (prev + 1) % videoIcons.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handle touch events for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    // Don't handle touch events if menu is open
    if (menuOpen) return;
    
    setTouchEndY(e.touches[0].clientY);
  };
  
  // Touch handling for mobile swipe navigation
  useEffect(() => {
    const preventTouchDefault = (e: TouchEvent) => {
      // Only prevent default for page scrolling, not for clicks
      const target = e.target as HTMLElement;
      const clickableParent = target.closest('.cursor-pointer, [role="button"], button, a, .start-now-text, .watch-text, .product-text, .product-arrow, .product-arrow-up, .menu-icon');
      
      if (clickableParent) {
        // Allow clicks on interactive elements
        return;
      }
      
      if (e.touches && e.touches.length > 0) {
        const touchY = e.touches[0].clientY;
        const initialY = touchStartY;
        
        // Only prevent vertical scrolling, not taps
        if (Math.abs(touchY - initialY) > 10) {
          e.preventDefault();
        }
      }
    };
    
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
    
    if (deltaY > 50) {
      if (touchEndY < touchStartY) {
        // Swipe up - next content
        changeContent('next');
      } else {
        // Swipe down - previous content
        changeContent('prev');
      }
    }
  };
  
  // Change content in the navigation element
  const changeContent = (direction: 'next' | 'prev') => {
    console.log("changeContent called with direction:", direction);
    console.log("Current index:", currentIndex, "contentItems length:", contentItems.length);
    
    let newIndex = currentIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % contentItems.length;
    } else {
      newIndex = (currentIndex - 1 + contentItems.length) % contentItems.length;
    }
    
    const newContent = contentItems[newIndex].title;
    console.log("New index will be:", newIndex, "new content:", newContent);
    
    setCurrentIndex(newIndex);
    console.log("Index updated to:", newIndex);
  };
  
  // Helper function to get route for a title
  const getRouteForTitle = (title: string) => {
    title = title.toLowerCase();
    return title === "products" ? "/product" : 
           title === "zinrai cares" ? "/zinrai-cares" : 
           `/${title.replace(/\s+/g, '')}`;
  };
  
  // For direct navigation to the selected page
  const handleNavigationClick = () => {
    const route = getRouteForCurrentIndex();
    navigate(route);
  };
  
  // Handle returning to home page
  const handleReturnToHome = () => {
    navigate('/');
    setCurrentIndex(0);
  };
  
  // For WATCH text click - open video popup
  const handleWatchClick = () => {
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
            {/* Switch/Play button above z in zinrai */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  setVideoPopupOpen(true);
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
              className={`absolute image-flicker bg-cover bg-center transition-opacity opacity-0 duration-[2000ms] h-[25vh] w-[50vw]`}
              style={{
                backgroundImage: `url(${imageSrc})`,
                top: `${Math.floor(boxNumber / 2) * 25}vh`,
                left: `${(boxNumber % 2) * 50}vw`,
                opacity: 0.05 // Very subtle overlay effect
              }}
            ></div>
          );
        })}
        
        {/* START NOW in the top left square - centered in the box - hidden when menu is open */}
        <div className={`absolute top-[12.5%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'block'}`}>
          <div 
            className="start-now-text animate-content-glitch cursor-pointer"
            onClick={() => navigate('/subscribe')}
            onTouchStart={() => navigate('/subscribe')}
            style={{ 
              animationDelay: '1.2s',
              position: 'relative',
              zIndex: 60,
              touchAction: 'manipulation',
              padding: '10px'
            }}
          >
            <div className="border border-white/30 px-3 py-2 flex flex-col items-center hover:border-white/50 hover:bg-white/5 transition-all duration-300">
              <div className="text-[11px] tracking-[0.1em] text-white/70 font-medium uppercase">Start</div>
              <div className="text-[11px] tracking-[0.1em] text-white/70 font-medium uppercase">Now</div>
            </div>
          </div>
        </div>
        
        {/* Menu icon has been moved to the header bar */}
        
        {/* WATCH and WHY text in the lower left square - hidden when menu is open */}
        <div 
          className={`absolute top-[87.5%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'block'}`}
          style={{ 
            position: 'relative', 
            zIndex: 60,
            touchAction: 'manipulation'
          }}
        >
          {/* WATCH and WHY text side by side with horizontal line between */}
          <div className="flex items-center space-x-4 animate-content-glitch" style={{ animationDelay: '1.6s' }}>
            {/* WATCH text */}
            <div 
              className="watch-text text-[10px] tracking-[0.15em] text-white/70 font-light uppercase text-center cursor-pointer" 
              style={{ padding: '5px' }}
              onClick={handleWatchClick}
              onTouchStart={handleWatchClick}
            >
              Watch
            </div>
            
            {/* Horizontal line between WATCH and WHY */}
            <div className="h-[1px] w-[15px] bg-white/40"></div>
            
            {/* WHY text */}
            <div 
              className="why-text text-[10px] tracking-[0.15em] text-white/70 font-light uppercase text-center cursor-pointer" 
              style={{ padding: '5px' }}
              onClick={() => navigate('/logo')}
              onTouchStart={() => navigate('/logo')}
            >
              Why
            </div>
          </div>
        </div>
        
        {/* Dynamic content in the lower right square - hidden when menu is open */}
        <div 
          className={`absolute bottom-0 right-0 flex flex-col items-center justify-center z-[60] ${menuOpen ? 'hidden' : 'flex'}`}
          style={{ 
            width: '50vw', 
            height: '25vh', 
            transform: 'translate(0, 0)',
            touchAction: 'manipulation'
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
          {/* Up arrow above text - navigate to previous content item (only functional on desktop) */}
          <div 
            className="product-arrow-up mb-3 cursor-pointer hidden md:block w-full text-center"
            onClick={(e) => {
              // Only allow arrow functionality on desktop
              if (window.innerWidth > 768) {
                e.stopPropagation();
                changeContent('prev');
              }
            }}
            onTouchStart={(e) => {
              // Only allow arrow functionality on desktop
              if (window.innerWidth > 768) {
                e.stopPropagation();
                changeContent('prev');
              }
            }}
            style={{ 
              position: 'relative', 
              zIndex: 60,
              touchAction: 'manipulation',
              padding: '10px'
            }}
          >
            <svg className="inline-block" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7L7 1L13 7" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Content text */}
          <div 
            className="product-text text-center cursor-pointer w-full mx-auto"
            style={{ padding: '8px' }}
            onClick={(e) => {
              // Prevent propagation and navigate on both mobile and desktop
              e.stopPropagation();
              
              // Get the correct path
              const title = contentItems[currentIndex].title.toLowerCase();
              const path = title === "products" ? "/product" : 
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
            <div className="text-[14px] font-bold tracking-wider text-white/90">{contentItems[currentIndex].number}</div>
            <div className="text-[12px] font-semibold tracking-wide text-white/80">{contentItems[currentIndex].title}</div>
          </div>
          
          {/* Down arrow below text - navigate to next content item (only functional on desktop) */}
          <div 
            className="product-arrow mt-3 cursor-pointer hidden md:block w-full text-center"
            onClick={(e) => {
              // Only allow arrow functionality on desktop
              if (window.innerWidth > 768) {
                e.stopPropagation();
                changeContent('next');
              }
            }}
            onTouchStart={(e) => {
              // Only allow arrow functionality on desktop
              if (window.innerWidth > 768) {
                e.stopPropagation();
                changeContent('next');
              }
            }}
            style={{ 
              padding: '10px'
            }}
          >
            <svg className="inline-block" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          {/* Decorative down arrow for mobile (non-functional) */}
          <div 
            className="product-arrow mt-3 cursor-pointer block md:hidden w-full text-center"
          >
            <svg className="inline-block" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L7 7L13 1" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        
        {/* Simple Menu Overlay - only visible when menu is open */}
        {menuOpen && (
          <div className="fixed inset-0 z-[800] bg-black/95 menu-overlay flex items-center justify-center">
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