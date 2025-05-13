import React, { useState } from 'react';
import { useLocation } from 'wouter';

interface HeaderProps {
  toggleMenu: () => void;
  menuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu, menuOpen }) => {
  const [, navigate] = useLocation();

  return (
    <div className="fixed top-0 left-0 right-0 h-[32px] bg-[#f7f5f0] z-[999] flex items-center justify-between px-6">
      {/* ZiNRAi text on left side */}
      <div 
        className="text-black text-sm font-medium cursor-pointer"
        onClick={() => navigate('/')}
      >
        ZiNRAi
      </div>
      
      {/* Right-side icons */}
      <div className="flex items-center">
        {/* Menu icon with two black lines */}
        <button 
          className="relative flex flex-col justify-center items-center mr-4 cursor-pointer"
          onClick={toggleMenu}
          style={{ width: '18px', height: '18px' }}
        >
          {menuOpen ? (
            // X shape
            <>
              <div className="absolute w-[18px] h-[2px] bg-black top-1/2 left-0 transform -translate-y-1/2 rotate-45"></div>
              <div className="absolute w-[18px] h-[2px] bg-black top-1/2 left-0 transform -translate-y-1/2 -rotate-45"></div>
            </>
          ) : (
            // Two lines
            <>
              <div className="w-[18px] h-[2px] bg-black mb-[3px]"></div>
              <div className="w-[18px] h-[2px] bg-black"></div>
            </>
          )}
        </button>
        
        {/* Profile icon */}
        <div 
          className="profile-icon w-5 h-5 bg-white rounded-full cursor-pointer border border-black/30"
          onClick={() => navigate('/profile')}
        ></div>
      </div>
    </div>
  );
};

export default Header;