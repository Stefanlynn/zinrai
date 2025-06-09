// Google Analytics 4 Integration with Cookie Consent
import { cookieManager } from './cookieManager';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private initialized = false;
  private gaId = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID

  private constructor() {}

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  // Initialize Google Analytics with consent mode
  init(measurementId?: string): void {
    if (this.initialized) return;

    if (measurementId) {
      this.gaId = measurementId;
    }

    // Initialize gtag with consent mode
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    // Set default consent state
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted', // Always granted for security
      wait_for_update: 500
    });

    // Load Google Analytics script
    this.loadGoogleAnalyticsScript();

    // Update consent based on current cookie preferences
    this.updateConsentFromCookieManager();

    this.initialized = true;
  }

  private loadGoogleAnalyticsScript(): void {
    // Don't load if already loaded
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${this.gaId}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    script.onload = () => {
      window.gtag('js', new Date());
      window.gtag('config', this.gaId, {
        page_title: document.title,
        page_location: window.location.href,
        cookie_flags: 'SameSite=Lax;Secure'
      });
    };
  }

  // Update consent based on cookie manager preferences
  updateConsentFromCookieManager(): void {
    if (!this.initialized) return;

    const preferences = cookieManager.getPreferences();
    
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      functionality_storage: preferences.functional ? 'granted' : 'denied',
      personalization_storage: preferences.functional ? 'granted' : 'denied'
    });
  }

  // Track page view
  trackPageView(page_title?: string, page_location?: string): void {
    if (!this.initialized || !cookieManager.isEnabled('analytics')) return;

    window.gtag('event', 'page_view', {
      page_title: page_title || document.title,
      page_location: page_location || window.location.href
    });
  }

  // Track custom events
  trackEvent(action: string, category?: string, label?: string, value?: number): void {
    if (!this.initialized || !cookieManager.isEnabled('analytics')) return;

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }

  // Track conversions
  trackConversion(conversionId: string, value?: number, currency?: string): void {
    if (!this.initialized || !cookieManager.isEnabled('analytics')) return;

    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency || 'USD'
    });
  }

  // Track user engagement
  trackEngagement(engagement_time?: number): void {
    if (!this.initialized || !cookieManager.isEnabled('analytics')) return;

    window.gtag('event', 'user_engagement', {
      engagement_time_msec: engagement_time || 1000
    });
  }

  // Set user properties
  setUserProperty(property_name: string, property_value: string): void {
    if (!this.initialized || !cookieManager.isEnabled('analytics')) return;

    window.gtag('config', this.gaId, {
      custom_map: { [property_name]: property_value }
    });
  }
}

// Export singleton instance
export const analytics = AnalyticsManager.getInstance();

// Common tracking functions for easy use
export const trackPageView = (title?: string, location?: string) => {
  analytics.trackPageView(title, location);
};

export const trackEvent = (action: string, category?: string, label?: string, value?: number) => {
  analytics.trackEvent(action, category, label, value);
};

export const trackConversion = (conversionId: string, value?: number, currency?: string) => {
  analytics.trackConversion(conversionId, value, currency);
};

// Initialize analytics when module loads
if (typeof window !== 'undefined') {
  // Replace 'G-XXXXXXXXXX' with your actual Google Analytics 4 Measurement ID
  analytics.init('G-XXXXXXXXXX');
}