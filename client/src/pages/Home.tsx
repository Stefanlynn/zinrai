import { useState, useEffect, useRef } from 'react';
import { FiPlus, RiVideoLine, RiFilmLine, FiEye, FiPower, FiCircle } from 'react-icons/fi';
import { useLocation } from 'wouter';

// Import assets
import ziNRaiLogoImage from '@assets/zinrai-circle-logo.png';
import tradingVideo from '@assets/young-man-trading-online-with-tablet-at-home-SBV-338739703-4K.mp4';
import viennaVideo from '@assets/vienna-austria-august-2022-slow-motion-footage-of-the-united-nations-headquarters-f-SBV-347184715-4K.mp4';
import runningVideo from '@assets/man-running-in-park-for-fitness-and-healthy-lifestyle-SBV-346641696-4K.mp4';
import familyTravelVideo from '@assets/finally-travel-happy-family-of-four-in-protective-masks-with-luggage-walking-to-air-SBV-347036154-4K.mp4';
import coastlineVideo from '@assets/exploring-the-coastline-young-people-in-slow-motion-searching-for-a-path-SBV-316823787-HD.mp4';
import kayakVideo from '@assets/couple-in-a-kayak-in-the-jungle-of-krabi-thailand-men-and-women-in-a-kayak-in-a-tro-SBV-348822411-4K.mp4';
import japaneseWomanVideo from '@assets/japanese-woman-gracefully-dancing-with-fans-in-a-blooming-park-SBV-346616982-4K.mp4';
import cryptoInvestorVideo from '@assets/investor-checking-bitcoin-ethereum-and-other-altcoin-cryptocurrency-price-index-on--SBV-347295079-4K.mp4';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoPopupOpen, setVideoPopupOpen] = useState(false);
  const lastEventTime = useRef(0);
  const eventCooldown = 800;
  const [, navigate] = useLocation();

  // Define all the content items for navigation
  const contentItems = [
    { number: "01", title: "COURSES" },
    { number: "02", title: "PARTNER" },
    { number: "03", title: "CULTURE" },
    { number: "04", title: "INSIGHTS" },
    { number: "05", title: "LEADERSHIP" },
    { number: "06", title: "ZiNRAi CARES" },
    { number: "07", title: "CONTACT" },
  ];

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Fixed positioned elements for hero */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-zinc-900"></div>

          {/* ZiNRAi text in the center with logo behind it */}
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

          {/* Grid lines */}
          <div className="horizontal-line animate-grid-line-horizontal absolute top-1/2 w-0 h-[1px] bg-white/[0.15] transform -translate-y-[0.5px]"></div>
          <div className="vertical-line animate-grid-line-vertical absolute left-1/2 w-[1px] h-0 bg-white/[0.15] transform -translate-x-[0.5px]"></div>
          <div className="grid-line animate-grid-line-horizontal absolute top-[25%] left-0 w-0 h-[1px] bg-white/[0.15]" style={{ animationDelay: '0.2s' }}></div>
          <div className="grid-line animate-grid-line-horizontal absolute top-[75%] left-0 w-0 h-[1px] bg-white/[0.15]" style={{ animationDelay: '0.4s' }}></div>
          <div className="border-line animate-border absolute inset-0 border border-white/[0.15] opacity-0"></div>

          {/* Navigation elements in corners */}
          <div className="absolute top-4 left-4 z-50">
            <button
              className="menu-icon text-white/70 hover:text-white/90 transition-colors p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <div className="w-full h-[1.5px] bg-current"></div>
                <div className="w-full h-[1.5px] bg-current"></div>
                <div className="w-full h-[1.5px] bg-current"></div>
              </div>
            </button>
          </div>

          <div className="absolute top-4 right-4 z-50">
            <div className="product-text text-white/60 text-sm tracking-wider cursor-pointer hover:text-white/90 transition-colors" onClick={() => navigate('/product')}>
              {contentItems[currentIndex].number} {contentItems[currentIndex].title}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 z-50">
            <div className="start-now-text text-white/60 text-sm tracking-wider cursor-pointer hover:text-white/90 transition-colors" onClick={() => navigate('/start-now')}>
              START NOW
            </div>
          </div>

          <div className="absolute bottom-4 right-4 z-50">
            <div className="watch-text text-white/60 text-sm tracking-wider cursor-pointer hover:text-white/90 transition-colors" onClick={() => setVideoPopupOpen(true)}>
              WATCH
            </div>
          </div>
        </div>

        {/* Menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md">
            <div className="absolute top-4 left-4">
              <button
                className="text-white/70 hover:text-white/90 transition-colors p-2"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <div className="w-6 h-5 relative">
                  <div className="w-full h-[1.5px] bg-current absolute top-1/2 transform -translate-y-1/2 rotate-45"></div>
                  <div className="w-full h-[1.5px] bg-current absolute top-1/2 transform -translate-y-1/2 -rotate-45"></div>
                </div>
              </button>
            </div>
            
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl w-full">
                <div className="space-y-6">
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/product'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">01</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">COURSES</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/partner'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">02</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">PARTNER</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/culture'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">03</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">CULTURE</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/insights'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">04</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">INSIGHTS</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/leadership'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">05</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">LEADERSHIP</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div className="flex flex-col items-start group cursor-pointer" onClick={() => { navigate('/zinrai-cares'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">06</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">ZiNRAi CARES</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                  
                  <div className="flex flex-col items-start group cursor-pointer mt-6" onClick={() => { navigate('/contact'); toggleMenu(); }}>
                    <div className="text-white/40 text-xs tracking-wider mb-1">07</div>
                    <div className="text-white/80 text-base font-light tracking-wide group-hover:text-white transition-colors">CONTACT</div>
                    <div className="h-[1px] w-0 bg-white/30 group-hover:w-full transition-all duration-300 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video popup */}
        {videoPopupOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setVideoPopupOpen(false)}>
            <div className="relative w-[90vw] max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute -top-12 right-0 text-white/70 hover:text-white/90 transition-colors group"
                onClick={() => setVideoPopupOpen(false)}
                aria-label="Close video"
              >
                <div className="w-6 h-6 relative">
                  <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform rotate-45 transition-all duration-300"></div>
                  <div className="w-6 h-[1.5px] bg-white/70 group-hover:bg-white absolute top-0 left-0 transform -rotate-45 transition-all duration-300"></div>
                </div>
              </button>
              
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
      </div>

      {/* Footer Section */}
      <footer className="relative bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-light text-white mb-4" style={{ 
                  color: '#68ACFF',
                  textShadow: '0 0 20px rgba(104, 172, 255, 0.3)'
                }}>
                  ZiNRAi
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Empowering individuals with innovative educational courses and resources. 
                  Live with passion, lead with purpose.
                </p>
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
            
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/product" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="/partner" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Brand Promoter
                  </a>
                </li>
                <li>
                  <a href="/culture" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Why ZiNRAi
                  </a>
                </li>
                <li>
                  <a href="/leadership" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Leadership
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy-policy" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms-conditions" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/terms-of-use" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="/cookie-policy" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="/refund-policy" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="/ibo-terms" className="text-white/60 hover:text-white/90 transition-colors text-sm">
                    IBO Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm mb-4 md:mb-0">
                © 2025 ZiNRAi, LLC. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a 
                  href="http://app.zinrai.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/90 transition-colors text-sm"
                >
                  Member Login
                </a>
                <span className="text-white/40">|</span>
                <span className="text-white/60 text-sm">
                  ZiNRAi, LLC, 30 Gould Street, Sheridan Wyoming 82801
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}