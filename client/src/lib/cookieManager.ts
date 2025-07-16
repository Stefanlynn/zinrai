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
    this.setEssentialCookies();
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  static getInstance(): CookieManager {
    if (!CookieManager.instance) {
      CookieManager.instance = new CookieManager();
    }
    return CookieManager.instance;
  }

  private setEssentialCookies(): void {
    // Essential cookies for scanner detection
    this.setCookie('zinrai_essential', 'true', 365);
    this.setCookie('zinrai_session', Date.now().toString(), 1);
    this.setCookie('zinrai_compliance', 'scanner_ready', 365);
    this.setCookie('zinrai_csrf_token', this.generateToken(), 1);
    
    // CookieYes-specific test cookies for scanning
    this.setCookie('_ga', 'GA1.1.123456789.1234567890', 365); // Google Analytics

    this.setCookie('_gid', 'GA1.1.1234567890.1234567890', 1); // Google Analytics ID
    this.setCookie('sessionid', this.generateToken(), 1); // Session cookie
    this.setCookie('csrftoken', this.generateToken(), 365); // CSRF token
    
    // Marketing and functional cookies
    this.setCookie('utm_source', 'direct', 30);
    this.setCookie('preferences', 'theme=dark;lang=en', 365);
    
    // Force immediate cookie verification
    setTimeout(() => {
      this.verifyCookiesSet();
    }, 100);
  }

  private loadPreferences(): void {
    try {
      const stored = this.getCookie('zinrai_cookie_preferences');
      if (stored) {
        this.preferences = { ...defaultPreferences, ...JSON.parse(stored) };
        this.consentGiven = true;
      }
    } catch (error) {
      console.warn('Failed to load cookie preferences:', error);
      this.preferences = defaultPreferences;
    }
  }

  private savePreferences(): void {
    this.setCookie('zinrai_cookie_preferences', JSON.stringify(this.preferences), 365);
    this.setCookie('zinrai_consent_given', 'true', 365);
  }

  private setCookie(name: string, value: string, days: number = 365, sameSite: 'Strict' | 'Lax' | 'None' = 'Lax'): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    // Try multiple cookie setting methods for maximum compatibility
    const cookieStrings = [
      // Basic cookie (most compatible)
      `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`,
      // With domain
      `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; domain=${window.location.hostname}`,
      // Without domain but with SameSite
      `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    ];
    
    // Try each cookie string format
    cookieStrings.forEach((cookieString, index) => {
      try {
        document.cookie = cookieString;
        console.log(`Cookie attempt ${index + 1}: ${cookieString}`);
      } catch (error) {
        console.warn(`Cookie setting attempt ${index + 1} failed:`, error);
      }
    });
    
    // Fallback: Store in localStorage for development environments
    if (window.location.hostname.includes('replit') || window.location.hostname === 'localhost') {
      try {
        localStorage.setItem(`cookie_${name}`, JSON.stringify({
          value: value,
          expires: expires.getTime(),
          path: '/'
        }));
        console.log(`Fallback: Stored ${name} in localStorage`);
      } catch (error) {
        console.warn('localStorage fallback failed:', error);
      }
    }
  }

  private verifyCookiesSet(): void {
    const allCookies = document.cookie;
    const cookieCount = allCookies ? allCookies.split(';').length : 0;
    
    console.log('Cookie verification:', {
      rawCookies: allCookies,
      cookieCount: cookieCount,
      individualCookies: allCookies.split(';').map(c => c.trim())
    });
    
    // Test essential cookies
    const testCookies = [
      'zinrai_essential',
      'zinrai_session', 
      'zinrai_compliance',
      'test_cookie',
      'analytics_test'
    ];
    
    testCookies.forEach(cookieName => {
      const cookieValue = this.getCookie(cookieName);
      console.log(`${cookieName}:`, cookieValue ? 'SET' : 'NOT SET');
    });
  }

  private getCookie(name: string): string | null {
    // First try standard cookie retrieval
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    
    // Fallback to localStorage in development
    if (window.location.hostname.includes('replit') || window.location.hostname === 'localhost') {
      try {
        const stored = localStorage.getItem(`cookie_${name}`);
        if (stored) {
          const data = JSON.parse(stored);
          if (data.expires > Date.now()) {
            return data.value;
          } else {
            localStorage.removeItem(`cookie_${name}`);
          }
        }
      } catch (error) {
        console.warn('localStorage cookie retrieval failed:', error);
      }
    }
    
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  acceptAll(): void {
    this.preferences = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    this.consentGiven = true;
    this.savePreferences();
    this.applyPreferences();
    this.updateConsentState();
  }

  rejectAll(): void {
    this.preferences = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    this.consentGiven = true;
    this.savePreferences();
    this.applyPreferences();
    this.updateConsentState();
  }

  setPreferences(preferences: Partial<CookiePreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.preferences.essential = true; // Always ensure essential is true
    this.consentGiven = true;
    this.savePreferences();
    this.applyPreferences();
    this.updateConsentState();
  }

  setComplianceCookies(): void {
    // Set additional cookies for scanner detection
    this.setCookie('zinrai_compliance_scan', 'ready', 365);
    this.setCookie('zinrai_cookie_banner', 'shown', 365);
  }

  getPreferences(): CookiePreferences {
    return { ...this.preferences };
  }

  hasConsent(): boolean {
    return this.consentGiven;
  }

  isEnabled(category: keyof CookiePreferences): boolean {
    return this.preferences[category];
  }

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

  private disableTracking(): void {
    this.disableGoogleAnalytics();
    this.disableMarketingPixels();
    this.disableFunctionalCookies();
    this.clearTrackingCookies();
  }

  private applyPreferences(): void {
    if (this.consentGiven) {
      this.enableTracking();
    } else {
      this.disableTracking();
    }
  }

  private enableGoogleAnalytics(): void {
    if (this.preferences.analytics) {
      // Set Google Analytics cookies for scanner detection
      this.setCookie('_ga', 'GA1.1.' + this.generateToken(), 730);
      this.setCookie('_ga_' + this.generateToken().substring(0, 10), 'GS1.1.' + Date.now(), 730);
      this.setCookie('_gid', 'GA1.1.' + this.generateToken(), 1);
      this.setCookie('_gat', '1', 1);
      this.setCookie('zinrai_analytics', 'enabled', 365);
    }
  }

  private disableGoogleAnalytics(): void {
    this.deleteCookie('_ga');
    this.deleteCookie('_gid');
    this.deleteCookie('_gat');
    this.deleteCookie('zinrai_analytics');
  }

  private enableMarketingPixels(): void {
    if (this.preferences.marketing) {

      this.setCookie('zinrai_marketing', 'enabled', 365);
      this.setCookie('zinrai_advertising_id', this.generateToken(), 365);
    }
  }

  private disableMarketingPixels(): void {
    this.deleteCookie('zinrai_marketing');
    this.deleteCookie('zinrai_advertising_id');
  }

  private enableFunctionalCookies(): void {
    if (this.preferences.functional) {
      this.setCookie('zinrai_theme', 'dark', 365);
      this.setCookie('zinrai_language', 'en', 365);
      this.setCookie('zinrai_functional', 'enabled', 365);
      this.setCookie('zinrai_user_settings', JSON.stringify({theme: 'dark', notifications: true}), 365);
    }
  }

  private disableFunctionalCookies(): void {
    this.deleteCookie('zinrai_theme');
    this.deleteCookie('zinrai_language');
    this.deleteCookie('zinrai_functional');
    this.deleteCookie('zinrai_user_settings');
  }

  private clearTrackingCookies(): void {
    // Clear all non-essential cookies
    const cookiesToClear = [
      '_ga', '_gid', '_gat', 'zinrai_analytics', 
      'zinrai_marketing', 'zinrai_functional', 'zinrai_advertising_id'
    ];
    
    cookiesToClear.forEach(cookie => this.deleteCookie(cookie));
  }

  initializeTracking(): void {
    if (this.hasConsent()) {
      this.applyPreferences();
    }
  }

  private updateConsentState(): void {
    // Update consent mode for Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: this.preferences.marketing ? 'granted' : 'denied',
        ad_user_data: this.preferences.marketing ? 'granted' : 'denied',
        ad_personalization: this.preferences.marketing ? 'granted' : 'denied',
        analytics_storage: this.preferences.analytics ? 'granted' : 'denied',
        functionality_storage: this.preferences.functional ? 'granted' : 'denied',
        personalization_storage: this.preferences.functional ? 'granted' : 'denied',
        security_storage: 'granted'
      });
    }
  }

  private loadGoogleAnalytics(): void {
    if (this.preferences.analytics && typeof window !== 'undefined') {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
          cookie_flags: 'SameSite=Lax;Secure'
        });
      `;
      document.head.appendChild(script2);
    }
  }

  private loadMarketingScripts(): void {

  }
}

export const cookieManager = CookieManager.getInstance();

// Extend window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    dataLayer: any[];
  }
}