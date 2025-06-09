// Cookie Management System for ZiNRAi™
export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export const defaultPreferences: CookiePreferences = {
  essential: true, // Always true - required for site functionality
  analytics: false,
  marketing: false,
  functional: false,
};

export class CookieManager {
  private static instance: CookieManager;
  private preferences: CookiePreferences = defaultPreferences;
  private consentGiven = false;

  private constructor() {
    this.loadPreferences();
    // Set essential cookies after other methods are defined
    setTimeout(() => this.setEssentialCookies(), 0);
  }

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  // Set essential cookies that are always required
  private setEssentialCookies(): void {
    this.setCookie('zinrai_essential', 'true', 365, 'Strict');
    this.setCookie('zinrai_session', Date.now().toString(), 1);
    this.setCookie('zinrai_site_visit', 'true', 30);
  }

  // Load preferences from localStorage
  private loadPreferences(): void {
    try {
      const savedPreferences = localStorage.getItem('zinrai-cookie-preferences');
      const consentStatus = localStorage.getItem('zinrai-cookie-consent');
      
      if (savedPreferences) {
        this.preferences = { ...defaultPreferences, ...JSON.parse(savedPreferences) };
      }
      
      this.consentGiven = consentStatus === 'accepted' || consentStatus === 'customized';
    } catch (error) {
      console.warn('Failed to load cookie preferences:', error);
    }
  }

  // Save preferences to localStorage and set actual cookies
  private savePreferences(): void {
    try {
      localStorage.setItem('zinrai-cookie-preferences', JSON.stringify(this.preferences));
      localStorage.setItem('zinrai-cookie-consent-timestamp', Date.now().toString());
      
      // Set actual HTTP cookies for compliance scanning
      this.setCookie('zinrai_consent', this.consentGiven ? 'accepted' : 'pending', 365);
      this.setCookie('zinrai_preferences', JSON.stringify(this.preferences), 365);
      
      // Set category-specific cookies
      if (this.preferences.essential) {
        this.setCookie('zinrai_essential', 'true', 365, 'Strict');
        this.setCookie('zinrai_session', 'active', 1); // Session management
      }
      if (this.preferences.analytics) {
        this.setCookie('zinrai_analytics', 'true', 365);
        this.setCookie('_ga_zinrai', 'analytics_enabled', 730); // Google Analytics identifier
      }
      if (this.preferences.marketing) {
        this.setCookie('zinrai_marketing', 'true', 365);
        this.setCookie('zinrai_ads', 'enabled', 90); // Marketing/advertising
      }
      if (this.preferences.functional) {
        this.setCookie('zinrai_functional', 'true', 365);
        this.setCookie('zinrai_ui_prefs', 'functional_enabled', 365); // UI preferences
      }
    } catch (error) {
      console.warn('Failed to save cookie preferences:', error);
    }
  }

  // Set cookie with proper attributes
  private setCookie(name: string, value: string, days: number = 365, sameSite: 'Strict' | 'Lax' | 'None' = 'Lax'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=${sameSite}${secure}`;
  }

  // Get cookie value
  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Delete cookie
  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  // Accept all cookies
  acceptAll(): void {
    this.preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    this.consentGiven = true;
    this.savePreferences();
    localStorage.setItem('zinrai-cookie-consent', 'accepted');
    this.enableTracking();
  }

  // Reject non-essential cookies
  rejectAll(): void {
    this.preferences = defaultPreferences;
    this.consentGiven = true;
    this.savePreferences();
    localStorage.setItem('zinrai-cookie-consent', 'rejected');
    this.disableTracking();
  }

  // Set custom preferences
  setPreferences(preferences: Partial<CookiePreferences>): void {
    this.preferences = { ...this.preferences, ...preferences, essential: true };
    this.consentGiven = true;
    this.savePreferences();
    localStorage.setItem('zinrai-cookie-consent', 'customized');
    this.applyPreferences();
  }

  // Get current preferences
  getPreferences(): CookiePreferences {
    return { ...this.preferences };
  }

  // Check if consent has been given
  hasConsent(): boolean {
    return this.consentGiven;
  }

  // Check if specific category is enabled
  isEnabled(category: keyof CookiePreferences): boolean {
    return this.preferences[category];
  }

  // Enable tracking based on preferences
  private enableTracking(): void {
    if (this.preferences.analytics) {
      this.enableGoogleAnalytics();
    }
    
    if (this.preferences.marketing) {
      this.enableMarketingPixels();
    }
    
    if (this.preferences.functional) {
      this.enableFunctionalCookies();
    }
  }

  // Disable all tracking
  private disableTracking(): void {
    this.disableGoogleAnalytics();
    this.disableMarketingPixels();
    this.disableFunctionalCookies();
    this.clearTrackingCookies();
  }

  // Apply preferences selectively
  private applyPreferences(): void {
    if (this.preferences.analytics) {
      this.enableGoogleAnalytics();
    } else {
      this.disableGoogleAnalytics();
    }

    if (this.preferences.marketing) {
      this.enableMarketingPixels();
    } else {
      this.disableMarketingPixels();
    }

    if (this.preferences.functional) {
      this.enableFunctionalCookies();
    } else {
      this.disableFunctionalCookies();
    }
  }

  // Google Analytics management
  private enableGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    console.log('Google Analytics enabled');
  }

  private disableGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
    console.log('Google Analytics disabled');
  }

  // Marketing pixels management
  private enableMarketingPixels(): void {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'grant');
    }
    console.log('Marketing pixels enabled');
  }

  private disableMarketingPixels(): void {
    // Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('consent', 'revoke');
    }
    console.log('Marketing pixels disabled');
  }

  // Functional cookies management
  private enableFunctionalCookies(): void {
    // Enable chat widgets, preference storage, etc.
    console.log('Functional cookies enabled');
  }

  private disableFunctionalCookies(): void {
    // Disable non-essential functional cookies
    console.log('Functional cookies disabled');
  }

  // Clear tracking cookies
  private clearTrackingCookies(): void {
    const trackingCookies = [
      '_ga', '_gat', '_gid', '_ga_*', '_gat_*',
      '_fbp', '_fbc', 
      '__utma', '__utmb', '__utmc', '__utmt', '__utmz',
      '_hjid', '_hjSessionUser_*', '_hjSession_*',
      'MUID', 'MUIDB',
      'YSC', 'VISITOR_INFO1_LIVE'
    ];

    trackingCookies.forEach(cookie => {
      this.deleteCookie(cookie);
      // Also try with domain variations
      this.deleteCookie(cookie + '; domain=.zinrai.com');
      this.deleteCookie(cookie + '; domain=zinrai.com');
    });
  }

  // Initialize tracking scripts based on consent
  initializeTracking(): void {
    if (!this.consentGiven) return;

    // Update analytics consent
    if (typeof window !== 'undefined' && (window as any).gtag) {
      this.updateConsentState();
    }

    if (this.preferences.analytics) {
      this.loadGoogleAnalytics();
    }

    if (this.preferences.marketing) {
      this.loadMarketingScripts();
    }
  }

  // Update consent state for all tracking services
  private updateConsentState(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: this.preferences.analytics ? 'granted' : 'denied',
        ad_storage: this.preferences.marketing ? 'granted' : 'denied',
        functionality_storage: this.preferences.functional ? 'granted' : 'denied',
        personalization_storage: this.preferences.functional ? 'granted' : 'denied'
      });
    }
  }

  // Load Google Analytics
  private loadGoogleAnalytics(): void {
    // Add Google Analytics script if not already loaded
    if (!document.querySelector('[src*="googletagmanager.com/gtag"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href
        });
      `;
      document.head.appendChild(configScript);
    }
  }

  // Load marketing scripts
  private loadMarketingScripts(): void {
    // Facebook Pixel example
    if (!document.querySelector('[src*="connect.facebook.net"]')) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'YOUR_PIXEL_ID');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }
  }
}

// Global instance
export const cookieManager = CookieManager.getInstance();

// Type declarations for external scripts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    dataLayer: any[];
  }
}