// Google Consent Mode v2 Implementation for ZiNRAi™
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface ConsentSettings {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

class ConsentMode {
  private static instance: ConsentMode;
  private initialized = false;

  private constructor() {}

  static getInstance(): ConsentMode {
    if (!ConsentMode.instance) {
      ConsentMode.instance = new ConsentMode();
    }
    return ConsentMode.instance;
  }

  // Initialize Google Consent Mode
  initialize(): void {
    if (this.initialized || typeof window === 'undefined') return;

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Set default consent state (deny all except security)
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted', // Always granted for essential functionality
      wait_for_update: 500
    });

    // Load Google Analytics script
    this.loadGoogleAnalytics();

    this.initialized = true;
  }

  private loadGoogleAnalytics(): void {
    // Check if script already exists
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
      return;
    }

    // Load Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // Replace with your GA4 ID
    document.head.appendChild(script);

    script.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', 'G-XXXXXXXXXX', { // Replace with your GA4 ID
        anonymize_ip: true,
        cookie_expires: 63072000, // 2 years
        cookie_domain: 'auto',
        cookie_flags: 'SameSite=Lax;Secure'
      });
    };
  }

  // Update consent based on user preferences
  updateConsent(preferences: {
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  }): void {
    if (!this.initialized) return;

    const consentSettings: ConsentSettings = {
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      ad_user_data: preferences.marketing ? 'granted' : 'denied',
      ad_personalization: preferences.marketing ? 'granted' : 'denied',
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      functionality_storage: preferences.functional ? 'granted' : 'denied',
      personalization_storage: preferences.functional ? 'granted' : 'denied',
      security_storage: 'granted'
    };

    window.gtag('consent', 'update', consentSettings);

    // Store consent timestamp for compliance
    localStorage.setItem('zinrai-consent-timestamp', new Date().toISOString());
    localStorage.setItem('zinrai-consent-version', '2.0');
  }

  // Get current consent state
  getConsentState(): ConsentSettings | null {
    const timestamp = localStorage.getItem('zinrai-consent-timestamp');
    if (!timestamp) return null;

    return {
      ad_storage: localStorage.getItem('zinrai-marketing-consent') === 'true' ? 'granted' : 'denied',
      ad_user_data: localStorage.getItem('zinrai-marketing-consent') === 'true' ? 'granted' : 'denied',
      ad_personalization: localStorage.getItem('zinrai-marketing-consent') === 'true' ? 'granted' : 'denied',
      analytics_storage: localStorage.getItem('zinrai-analytics-consent') === 'true' ? 'granted' : 'denied',
      functionality_storage: localStorage.getItem('zinrai-functional-consent') === 'true' ? 'granted' : 'denied',
      personalization_storage: localStorage.getItem('zinrai-functional-consent') === 'true' ? 'granted' : 'denied',
      security_storage: 'granted'
    };
  }

  // Check if consent has been given
  hasConsent(): boolean {
    return localStorage.getItem('zinrai-cookie-consent') !== null;
  }
}

// Export singleton instance
export const consentMode = ConsentMode.getInstance();

// Initialize when module loads
if (typeof window !== 'undefined') {
  consentMode.initialize();
}