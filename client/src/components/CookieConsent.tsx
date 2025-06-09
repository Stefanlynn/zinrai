import { useState, useEffect } from 'react';
import { X, Settings, Shield, BarChart3, Target, Wrench } from 'lucide-react';
import { cookieManager, CookiePreferences } from '../lib/cookieManager';
import { consentMode } from '../lib/consentMode';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(cookieManager.getPreferences());

  useEffect(() => {
    // Check if user has already made a choice
    if (!cookieManager.hasConsent()) {
      // Show popup immediately for compliance
      setShowConsent(true);
    } else {
      // Initialize tracking for existing users
      cookieManager.initializeTracking();
    }
  }, []);

  const handleAcceptAll = () => {
    cookieManager.acceptAll();
    consentMode.updateConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
    setShowConsent(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    cookieManager.rejectAll();
    consentMode.updateConsent({
      analytics: false,
      marketing: false,
      functional: false
    });
    setShowConsent(false);
    setShowSettings(false);
  };

  const handleSavePreferences = () => {
    cookieManager.setPreferences(preferences);
    consentMode.updateConsent({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      functional: preferences.functional
    });
    setShowConsent(false);
    setShowSettings(false);
  };

  const handleTogglePreference = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleBackToMain = () => {
    setShowSettings(false);
    setPreferences(cookieManager.getPreferences());
  };

  if (!showConsent) return null;

  const cookieCategories = [
    {
      key: 'essential' as const,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      icon: Shield,
      required: true
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      icon: BarChart3,
      required: false
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and track marketing performance.',
      icon: Target,
      required: false
    },
    {
      key: 'functional' as const,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      icon: Wrench,
      required: false
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
      
      {/* Cookie Consent Popup */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4">
        <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl relative mx-auto max-h-[90vh] overflow-y-auto">
          {!showSettings ? (
            // Main consent view
            <div className="p-6">
              {/* Close button */}
              <button
                onClick={handleRejectAll}
                className="absolute top-3 right-3 text-white/60 hover:text-white/90 transition-colors p-2 rounded-full hover:bg-white/10 z-10"
                aria-label="Close cookie consent"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="pr-12">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h3 className="text-white font-medium text-xl">
                    Cookie Consent
                  </h3>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  We use cookies to enhance your browsing experience, provide personalized content, 
                  and analyze our traffic. You can accept all cookies or customize your preferences.
                </p>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-3 mb-6">
                  <p className="text-blue-200 text-xs">
                    We respect your privacy. Essential cookies are required for basic site functionality 
                    and cannot be disabled. Other cookies help us improve our services.
                  </p>
                </div>

                {/* Cookie Policy Link */}
                <a
                  href="/cookie-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
                >
                  View Our Cookie Policy
                </a>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors"
                  >
                    Accept All Cookies
                  </button>
                  <button
                    onClick={handleShowSettings}
                    className="flex-1 bg-transparent border border-white/30 text-white px-4 py-3 rounded-md font-medium text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 bg-transparent border border-red-500/50 text-red-300 px-4 py-3 rounded-md font-medium text-sm hover:bg-red-500/10 transition-colors"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Settings view
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-6 h-6 text-blue-400" />
                  <h3 className="text-white font-medium text-xl">
                    Cookie Preferences
                  </h3>
                </div>
                <button
                  onClick={handleBackToMain}
                  className="text-white/60 hover:text-white/90 transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Back to main view"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-white/70 text-sm mb-6">
                Manage your cookie preferences. You can enable or disable different types of cookies below.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-4 mb-6">
                {cookieCategories.map((category) => {
                  const Icon = category.icon;
                  const isEnabled = preferences[category.key];
                  
                  return (
                    <div key={category.key} className="bg-black/30 border border-white/10 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="w-5 h-5 text-blue-400" />
                            <h4 className="text-white font-medium">{category.title}</h4>
                            {category.required && (
                              <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 text-sm">{category.description}</p>
                        </div>
                        
                        <div className="ml-4">
                          <button
                            onClick={() => handleTogglePreference(category.key)}
                            disabled={category.required}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                              isEnabled 
                                ? 'bg-blue-600' 
                                : 'bg-gray-600'
                            } ${category.required ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  Save Preferences
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-white text-gray-900 px-4 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}