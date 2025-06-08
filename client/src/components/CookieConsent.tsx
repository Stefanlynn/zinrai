import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentGiven = localStorage.getItem('zinrai-cookie-consent');
    if (!consentGiven) {
      // Show popup after a brief delay for better UX
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('zinrai-cookie-consent', 'accepted');
    localStorage.setItem('zinrai-cookie-consent-timestamp', Date.now().toString());
    setShowConsent(false);
    
    // Initialize analytics and tracking services
    if (typeof window !== 'undefined') {
      // Enable Google Analytics, Facebook Pixel, etc.
      console.log('Cookies accepted - tracking services enabled');
      
      // You can add your tracking initialization here
      // Example: gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  };

  const handleReject = () => {
    localStorage.setItem('zinrai-cookie-consent', 'rejected');
    localStorage.setItem('zinrai-cookie-consent-timestamp', Date.now().toString());
    setShowConsent(false);
    
    // Disable non-essential cookies and tracking
    if (typeof window !== 'undefined') {
      console.log('Cookies rejected - non-essential tracking disabled');
      
      // Disable tracking services
      // Example: gtag('consent', 'update', { analytics_storage: 'denied' });
      
      // Clear any existing tracking cookies if they exist
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
    }
  };

  const handleClose = () => {
    // Treat close as rejection
    handleReject();
  };

  if (!showConsent) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
      
      {/* Cookie Consent Popup */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg mx-4">
        <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg p-6 shadow-2xl">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white/90 transition-colors"
            aria-label="Close cookie consent"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="pr-8">
            <h3 className="text-white font-medium text-lg mb-3">
              Cookie Consent
            </h3>
            
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              We use cookies to enhance your browsing experience, provide personalized content, 
              and analyze our traffic. By accepting, you consent to our use of cookies in accordance 
              with our Cookie Policy.
            </p>

            {/* Cookie Policy Link */}
            <a
              href="/cookie-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
            >
              View Cookie Policy
            </a>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAccept}
                className="flex-1 bg-white text-gray-900 px-4 py-2 rounded-md font-medium text-sm hover:bg-white/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-transparent border border-white/30 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-white/10 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}