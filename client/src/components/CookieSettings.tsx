import { useState, useEffect } from 'react';
import { Settings, Shield, BarChart3, Target, Wrench, X } from 'lucide-react';
import { cookieManager, CookiePreferences } from '../lib/cookieManager';
import { consentMode } from '../lib/consentMode';

interface CookieSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CookieSettings({ isOpen, onClose }: CookieSettingsProps) {
  const [preferences, setPreferences] = useState<CookiePreferences>(cookieManager.getPreferences());

  useEffect(() => {
    if (isOpen) {
      setPreferences(cookieManager.getPreferences());
    }
  }, [isOpen]);

  const handleTogglePreference = (category: keyof CookiePreferences) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSavePreferences = () => {
    cookieManager.setPreferences(preferences);
    consentMode.updateConsent({
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      functional: preferences.functional
    });
    onClose();
  };

  const handleAcceptAll = () => {
    cookieManager.acceptAll();
    consentMode.updateConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
    onClose();
  };

  const handleRejectAll = () => {
    cookieManager.rejectAll();
    consentMode.updateConsent({
      analytics: false,
      marketing: false,
      functional: false
    });
    onClose();
  };

  if (!isOpen) return null;

  const cookieCategories = [
    {
      key: 'essential' as const,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      icon: Shield,
      required: true,
      details: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.'
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      icon: BarChart3,
      required: false,
      details: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.'
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and track marketing performance.',
      icon: Target,
      required: false,
      details: 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.'
    },
    {
      key: 'functional' as const,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      icon: Wrench,
      required: false,
      details: 'These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.'
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />
      
      {/* Settings Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl px-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl relative mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-400" />
              <h2 className="text-white font-medium text-xl">Cookie Preferences</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white/90 transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Close cookie settings"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-white/70 text-sm mb-6">
              Manage your cookie preferences below. You can enable or disable different types of cookies and learn more about how we use them.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-6 mb-8">
              {cookieCategories.map((category) => {
                const Icon = category.icon;
                const isEnabled = preferences[category.key];
                
                return (
                  <div key={category.key} className="bg-black/30 border border-white/10 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-blue-400" />
                          <h3 className="text-white font-medium text-lg">{category.title}</h3>
                          {category.required && (
                            <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded font-medium">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 text-sm mb-3">{category.description}</p>
                        <p className="text-white/50 text-xs leading-relaxed">{category.details}</p>
                      </div>
                      
                      <div className="ml-6">
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
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors"
              >
                Save My Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 bg-white text-gray-900 px-6 py-3 rounded-md font-medium text-sm hover:bg-white/90 transition-colors"
              >
                Accept All Cookies
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 bg-transparent border border-red-500/50 text-red-300 px-6 py-3 rounded-md font-medium text-sm hover:bg-red-500/10 transition-colors"
              >
                Reject All Non-Essential
              </button>
            </div>

            {/* Additional Information */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-white/50 text-xs space-y-2">
                <p>
                  <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  For more information about our cookie usage, please read our{' '}
                  <a href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline">
                    Cookie Policy
                  </a>{' '}
                  and{' '}
                  <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}