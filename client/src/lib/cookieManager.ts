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
    this.setCookie('zinrai_essential', 'true', 365, 'Strict');
    this.setCookie('zinrai_session', Date.now().toString(), 1);
    this.setCookie('zinrai_compliance', 'scanner_ready', 365);
    this.setCookie('zinrai_csrf_token', this.generateToken(), 1, 'Strict');
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
    
    let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=${sameSite}`;
    
    if (sameSite === 'None') {
      cookieString += '; Secure';
    }
    
    document.cookie = cookieString;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
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
      // Set Facebook Pixel cookies for scanner detection
      this.setCookie('_fbp', 'fb.1.' + Date.now() + '.' + this.generateToken(), 90);
      this.setCookie('_fbc', 'fb.1.' + Date.now() + '.' + this.generateToken(), 90);
      this.setCookie('zinrai_marketing', 'enabled', 365);
      this.setCookie('zinrai_advertising_id', this.generateToken(), 365);
    }
  }

  private disableMarketingPixels(): void {
    this.deleteCookie('_fbp');
    this.deleteCookie('_fbc');
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
      '_ga', '_gid', '_gat', '_fbp', '_fbc', 'zinrai_analytics', 
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
    if (this.preferences.marketing && typeof window !== 'undefined') {
      // Load Facebook Pixel
      const fbScript = document.createElement('script');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'XXXXXXXXXXXXXXXXX');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }
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