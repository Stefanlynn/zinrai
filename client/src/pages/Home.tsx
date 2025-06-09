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
  // Track whether we should allow scrolling to footer
  const [canScrollToFooter, setCanScrollToFooter] = useState(false);
  
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
  
  // Function to handle video icon click in grid
  const handleVideoIconClick = (boxNumber: number) => {
    console.log('Video icon clicked for box:', boxNumber);
    
    // Cycle to next icon variant
    setIconVariant((prev) => (prev + 1) % videoIcons.length);
    
    // Get the current video source
    const videoSource = videoSources[(boxNumber - 1) % videoSources.length];
    console.log('Video source:', videoSource);
    
    // Toggle video display for this box
    if (activeVideoBoxes[boxNumber]) {
      // Remove video if it's already playing
      setActiveVideoBoxes(prev => {
        const newBoxes = { ...prev };
        delete newBoxes[boxNumber];
        console.log('Removed video from box:', boxNumber);
        return newBoxes;
      });
    } else {
      // Add video to this box
      setActiveVideoBoxes(prev => {
        const newState = {
          ...prev,
          [boxNumber]: videoSource
        };
        console.log('Added video to box:', boxNumber, 'New state:', newState);
        return newState;
      });
    }
  };

  // Scroll wheel navigation for content
  useEffect(() => {
    let isThrottled = false;
    
    const handleWheel = (e: WheelEvent) => {
      if (isThrottled || location !== "/") return;
      
      const scrollPosition = window.scrollY;
      
      // Only intercept scrolling when at the very top of the page
      if (scrollPosition === 0) {
        if (!canScrollToFooter) {
          e.preventDefault();
          
          isThrottled = true;
          setTimeout(() => { isThrottled = false; }, eventCooldown);
          
          if (e.deltaY > 0) {
            // Scrolling down
            if (currentIndex === contentItems.length - 1) {
              // At CONTACT (last item), enable scrolling to footer
              setCanScrollToFooter(true);
              console.log("Ready to scroll to footer");
            } else {
              setCurrentIndex(prev => (prev + 1) % contentItems.length);
            }
          } else {
            // Scrolling up
            setCurrentIndex(prev => (prev - 1 + contentItems.length) % contentItems.length);
          }
        } else if (e.deltaY > 0) {
          // Ready to scroll to footer, force scroll to footer
          console.log("Forcing scroll to footer");
          e.preventDefault(); // Prevent default and manually scroll
          setCanScrollToFooter(false); // Reset for future use
          // Force scroll to footer
          setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }, 100);
        }
      }
    };

    if (location === "/") {
      document.addEventListener("wheel", handleWheel, { passive: false });
    }
    
    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [location, eventCooldown, currentIndex, canScrollToFooter]);

  // Touch event handlers for mobile swiping - vertical only
  const handleTouchStart = (e: React.TouchEvent) => {
    if (location === "/") {
      setTouchStartY(e.targetTouches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (location === "/" && window.scrollY === 0) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (location !== "/" || (window.scrollY !== 0 && !canScrollToFooter)) return;
    
    setTouchEndY(e.changedTouches[0].clientY);
    
    const deltaY = touchStartY - touchEndY;
    const minSwipeDistance = 50;
    
    if (Math.abs(deltaY) > minSwipeDistance) {
      const currentTime = Date.now();
      if (currentTime - lastEventTime.current < eventCooldown) return;
      lastEventTime.current = currentTime;
      
      if (deltaY > 0) {
        // Swiped up
        if (currentIndex === contentItems.length - 1 && !canScrollToFooter) {
          // At CONTACT, enable footer scrolling
          setCanScrollToFooter(true);
        } else if (canScrollToFooter) {
          // Allow scroll to footer
          setCanScrollToFooter(false);
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        } else {
          setCurrentIndex(prev => (prev + 1) % contentItems.length);
        }
      } else {
        // Swiped down (previous content)
        setCurrentIndex(prev => (prev - 1 + contentItems.length) % contentItems.length);
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (location !== "/") return;
      
      const currentTime = Date.now();
      if (currentTime - lastEventTime.current < eventCooldown) return;
      
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        lastEventTime.current = currentTime;
        setCurrentIndex(prev => (prev + 1) % contentItems.length);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        lastEventTime.current = currentTime;
        setCurrentIndex(prev => (prev - 1 + contentItems.length) % contentItems.length);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleContentClick(contentItems[currentIndex].title);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, location]);

  // Handle content navigation when clicking on content items
  const handleContentClick = (title: string) => {
    switch (title) {
      case "COURSES":
        navigate("/product");
        break;
      case "PARTNER":
        navigate("/partner");
        break;
      case "CULTURE":
        navigate("/culture");
        break;
      case "INSIGHTS":
        navigate("/insights");
        break;
      case "LEADERSHIP":
        navigate("/leadership");
        break;
      case "ZiNRAi CARES":
        navigate("/zinrai-cares");
        break;
      case "CONTACT":
        navigate("/contact");
        break;
      default:
        break;
    }
  };

  // Reset scroll state when returning to home
  useEffect(() => {
    if (location === "/") {
      window.scrollTo(0, 0);
      setCanScrollToFooter(false);
    }
  }, [location]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle menu closing
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Navigate to specific pages from menu
  const navigateToPage = (page: string) => {
    navigate(page);
    closeMenu();
  };

  // Set menu animation class when menu opens
  useEffect(() => {
    if (menuOpen) {
      // Short delay to allow for menu transition
      setTimeout(() => {
        document.querySelectorAll('.menu-icon').forEach(icon => {
          icon.classList.add('menu-animate-in');
          icon.classList.add('animate-in');
        });
      }, 300);
    }
  }, [menuOpen]);

  return (
    <div className="bg-black">
      {/* Main home page section - full screen with grid */}
      <section 
        className="h-screen relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Grid layout - 2x4 columns */}
        <div className="h-full w-full grid grid-cols-2 grid-rows-4">
          {/* Box 1 - Top Left */}
          <div className="relative border-r border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[1] && (
              <video
                key={activeVideoBoxes[1]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[1]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 2 - Top Right */}
          <div className="relative border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[2] && (
              <video
                key={activeVideoBoxes[2]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[2]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 3 - Second Row Left */}
          <div className="relative border-r border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[3] && (
              <video
                key={activeVideoBoxes[3]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[3]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 4 - Second Row Right */}
          <div className="relative border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[4] && (
              <video
                key={activeVideoBoxes[4]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[4]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 5 - Third Row Left */}
          <div className="relative border-r border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[5] && (
              <video
                key={activeVideoBoxes[5]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[5]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 6 - Third Row Right */}
          <div className="relative border-b border-gray-700 overflow-hidden">
            {activeVideoBoxes[6] && (
              <video
                key={activeVideoBoxes[6]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[6]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 7 - Bottom Left */}
          <div className="relative border-r border-gray-700 overflow-hidden">
            {activeVideoBoxes[7] && (
              <video
                key={activeVideoBoxes[7]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[7]} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Box 8 - Bottom Right */}
          <div className="relative overflow-hidden">
            {activeVideoBoxes[8] && (
              <video
                key={activeVideoBoxes[8]}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={activeVideoBoxes[8]} type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        {/* Fixed UI Elements overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* TOP LEFT - Video Trigger Icon */}
          <div className="absolute top-6 left-6 pointer-events-auto">
            <button
              onClick={() => handleVideoIconClick(1)}
              className="text-white hover:text-blue-400 transition-colors duration-300 p-2"
            >
              {React.createElement(videoIcons[iconVariant].icon, { size: 20 })}
            </button>
          </div>



          {/* Center Logo and Title */}
          <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-full px-4 text-center pointer-events-auto">
            <div className="relative inline-block">
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-[60%] w-[200px] md:w-[250px] lg:w-[300px]">
                <img 
                  src={ziNRaiLogoImage} 
                  alt="ZiNRAi Logo" 
                  className="w-full h-auto opacity-90"
                />
              </div>
              <h1 className="zinrai-logo-text text-white text-[14vw] md:text-[10vw] lg:text-[8vw] xl:text-[120px] font-bold tracking-wider whitespace-nowrap relative z-10 neon-text-glow" style={{ textShadow: "0 0 15px #68ACFF, 0 0 25px #68ACFF, 0 0 35px #68ACFF" }}>
                ZiNRAi™
              </h1>
              <div className="tagline-text text-white text-[2vw] md:text-[1.8vw] lg:text-[1.4vw] xl:text-[18px] tracking-wider whitespace-nowrap relative z-10 text-center mt-[-3vw] md:mt-[-2.5vh] neon-text-glow-subtle" style={{ textShadow: "0 0 8px #68ACFF, 0 0 15px #68ACFF" }}>
                LIVE WITH PASSION. LEAD WITH PURPOSE
              </div>
            </div>
          </div>

          {/* BOTTOM LEFT - Content Navigation */}
          <div className="absolute bottom-6 left-6 pointer-events-auto">
            <div className="text-white">
              <div 
                className="text-6xl font-bold opacity-20 mb-2 cursor-pointer hover:opacity-40 transition-opacity duration-300"
                onClick={() => handleContentClick(contentItems[currentIndex].title)}
              >
                {contentItems[currentIndex].number}
              </div>
              <div 
                className="text-lg tracking-wider cursor-pointer hover:text-blue-400 transition-colors duration-300"
                onClick={() => handleContentClick(contentItems[currentIndex].title)}
              >
                {contentItems[currentIndex].title}
              </div>
              {/* Debug info */}
              {currentIndex === contentItems.length - 1 && (
                <div className="text-xs text-yellow-400 mt-2">
                  {canScrollToFooter ? "Ready to scroll to footer" : "Scroll again to reach footer"}
                </div>
              )}
            </div>
          </div>

          {/* BOTTOM RIGHT - Social Media Icons */}
          <div className="absolute bottom-6 right-6 pointer-events-auto">
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="Follow ZiNRAi on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://facebook.com/zinrai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="Follow ZiNRAi on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@ZiNRAi.official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300"
                aria-label="Subscribe to ZiNRAi on YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Full-screen mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center justify-center pointer-events-auto">
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 text-white hover:text-blue-400 transition-colors duration-300 p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className="w-5 h-0.5 bg-current rotate-45 translate-y-1"></div>
                <div className="w-5 h-0.5 bg-current -rotate-45 -translate-y-1"></div>
              </div>
            </button>

            {/* Menu Content */}
            <div className="text-center text-white space-y-8 px-8">
              {/* Navigation Links */}
              <div className="space-y-6">
                <button
                  onClick={() => navigateToPage("/")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  HOME
                </button>
                <button
                  onClick={() => navigateToPage("/product")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  COURSES
                </button>
                <button
                  onClick={() => navigateToPage("/partner")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  BRAND PROMOTER
                </button>
                <button
                  onClick={() => navigateToPage("/culture")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  CULTURE
                </button>
                <button
                  onClick={() => navigateToPage("/insights")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  INSIGHTS
                </button>
                <button
                  onClick={() => navigateToPage("/leadership")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  LEADERSHIP
                </button>
                <button
                  onClick={() => navigateToPage("/zinrai-cares")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  ZiNRAi CARES
                </button>
                <button
                  onClick={() => navigateToPage("/contact")}
                  className="menu-icon block text-2xl md:text-3xl font-light tracking-wider hover:text-blue-400 transition-colors duration-300"
                >
                  CONTACT
                </button>
              </div>

              {/* Legal Documentation Section */}
              <div className="border-t border-white/20 pt-8 mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white/80">Legal Information</h3>
                <div className="space-y-3 text-sm">
                  <button
                    onClick={() => navigateToPage("/privacy-policy")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => navigateToPage("/terms-conditions")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Terms & Conditions
                  </button>
                  <button
                    onClick={() => navigateToPage("/terms-of-use")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Terms of Use
                  </button>
                  <button
                    onClick={() => navigateToPage("/refund-policy")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Refund Policy
                  </button>
                  <button
                    onClick={() => navigateToPage("/cookie-policy")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    Cookie Policy
                  </button>
                  <button
                    onClick={() => navigateToPage("/ibo-terms")}
                    className="menu-icon block text-white/70 hover:text-white transition-colors duration-300"
                  >
                    BP Terms & Conditions
                  </button>
                </div>
              </div>

              {/* Company Information Section */}
              <div className="border-t border-white/20 pt-8 mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white/80">Company Information</h3>
                <div className="text-sm text-white/60 space-y-1">
                  <p>ZiNRAi™ LLC</p>
                  <p>3333 Renaissance Blvd, Suite #209</p>
                  <p>Bonita Springs, FL 34134</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="border-t border-white/20 pt-8 mt-8">
                <h3 className="text-lg font-semibold mb-4 text-white/80">Follow Us</h3>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300"
                    aria-label="Follow ZiNRAi on Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://facebook.com/zinrai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300"
                    aria-label="Follow ZiNRAi on Facebook"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.youtube.com/@ZiNRAi.official" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300"
                    aria-label="Subscribe to ZiNRAi on YouTube"
                  >
                    <FaYoutube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Traditional Footer */}
      <footer className="bg-black text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Footer Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ZiNRAi™</h3>
              <p className="text-white/70 text-sm mb-4">
                Innovative digital learning platform for investment education and strategy analysis.
              </p>
              <div className="text-white/60 text-sm">
                <p>ZiNRAi™ LLC</p>
                <p>3333 Renaissance Blvd</p>
                <p>Suite #209</p>
                <p>Bonita Springs, FL 34134</p>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms-conditions" className="text-white/70 hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="/terms-of-use" className="text-white/70 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="/refund-policy" className="text-white/70 hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="/cookie-policy" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="/ibo-terms" className="text-white/70 hover:text-white transition-colors">BP Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/product" className="text-white/70 hover:text-white transition-colors">Courses</a></li>
                <li><a href="/partner" className="text-white/70 hover:text-white transition-colors">Brand Promoter</a></li>
                <li><a href="/culture" className="text-white/70 hover:text-white transition-colors">Culture</a></li>
                <li><a href="/insights" className="text-white/70 hover:text-white transition-colors">Insights</a></li>
                <li><a href="/leadership" className="text-white/70 hover:text-white transition-colors">Leadership</a></li>
                <li><a href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Follow ZiNRAi on Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://facebook.com/zinrai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Follow ZiNRAi on Facebook"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@ZiNRAi.official" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Subscribe to ZiNRAi on YouTube"
                >
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-white/20 pt-8 mb-6">
            <h4 className="text-base font-bold mb-4">Important Disclaimer</h4>
            <p className="text-sm font-bold leading-relaxed">
              ZiNRAi™ products include digital and online interactive training content for analyzing, learning, and discussing general and generic information related to investments and strategies. ZiNRAi™ does not facilitate or offer access to online platforms for investment or online trading in securities, currency (including cryptocurrencies), or other financial or investment products or services. ZiNRAi™, its brand partners, and educators do not provide personalized recommendations or advice on investment strategy, nor do they provide any regulated financial services.
            </p>
            <p className="text-sm font-bold leading-relaxed mt-4">
              ZiNRAi™ is not endorsed by or affiliated with any national, state, provincial, or territorial organization or association, tax authorities, or agencies, or financial regulatory body.
            </p>
            <p className="text-sm font-bold leading-relaxed mt-4">
              ZiNRAi™ provides absolutely no guarantee that you will earn any money or achieve a financial goal using the methods, information, and suggestions in the content provided. Any examples or demonstrations provided are in no way a guarantee or promise that an individual will make financial gains of any kind.
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-white/60 text-sm">
              © Copyright 2025, ZiNRAi™ LLC. All Rights Reserved. All trademarks displayed on this website, unless otherwise indicated, are the property of ZiNRAi™ LLC.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}