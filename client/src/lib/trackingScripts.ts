// Comprehensive tracking scripts for cookie compliance
import { cookieManager } from './cookieManager';

interface TrackingConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hotjarId?: string;
  linkedinPartnerId?: string;
}

class TrackingScriptManager {
  private static instance: TrackingScriptManager;
  private config: TrackingConfig = {};
  private scriptsLoaded: Set<string> = new Set();

  private constructor() {}

  static getInstance(): TrackingScriptManager {
    if (!TrackingScriptManager.instance) {
      TrackingScriptManager.instance = new TrackingScriptManager();
    }
    return TrackingScriptManager.instance;
  }

  configure(config: TrackingConfig): void {
    this.config = { ...this.config, ...config };
  }

  // Load essential scripts based on consent
  loadTrackingScripts(): void {
    if (!cookieManager.hasConsent()) return;

    const preferences = cookieManager.getPreferences();

    if (preferences.analytics) {
      this.loadGoogleAnalytics();
      this.loadHotjar();
    }

    if (preferences.marketing) {
      this.loadFacebookPixel();
      this.loadLinkedInInsight();
      this.loadGoogleAds();
    }

    if (preferences.functional) {
      this.loadChatWidgets();
    }
  }

  private loadGoogleAnalytics(): void {
    if (this.scriptsLoaded.has('ga4') || !this.config.googleAnalyticsId) return;

    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalyticsId}`;
    document.head.appendChild(script);

    const configScript = document.createElement('script');
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.config.googleAnalyticsId}', {
        page_title: document.title,
        page_location: window.location.href,
        anonymize_ip: true,
        cookie_flags: 'SameSite=Lax;Secure'
      });
    `;
    document.head.appendChild(configScript);

    this.scriptsLoaded.add('ga4');
  }

  private loadFacebookPixel(): void {
    if (this.scriptsLoaded.has('fbpixel') || !this.config.facebookPixelId) return;

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
      fbq('init', '${this.config.facebookPixelId}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${this.config.facebookPixelId}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);

    this.scriptsLoaded.add('fbpixel');
  }

  private loadHotjar(): void {
    if (this.scriptsLoaded.has('hotjar') || !this.config.hotjarId) return;

    const script = document.createElement('script');
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${this.config.hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    document.head.appendChild(script);

    this.scriptsLoaded.add('hotjar');
  }

  private loadLinkedInInsight(): void {
    if (this.scriptsLoaded.has('linkedin') || !this.config.linkedinPartnerId) return;

    const script = document.createElement('script');
    script.innerHTML = `
      _linkedin_partner_id = "${this.config.linkedinPartnerId}";
      window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
      window._linkedin_data_partner_ids.push(_linkedin_partner_id);
    `;
    document.head.appendChild(script);

    const pixelScript = document.createElement('script');
    pixelScript.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    pixelScript.async = true;
    document.head.appendChild(pixelScript);

    this.scriptsLoaded.add('linkedin');
  }

  private loadGoogleAds(): void {
    if (this.scriptsLoaded.has('googleads')) return;

    // Google Ads conversion tracking
    const script = document.createElement('script');
    script.src = 'https://www.googleadservices.com/pagead/conversion_async.js';
    script.async = true;
    document.head.appendChild(script);

    this.scriptsLoaded.add('googleads');
  }

  private loadChatWidgets(): void {
    if (this.scriptsLoaded.has('chat')) return;

    // Placeholder for chat widget - replace with your actual chat service
    console.log('Chat widgets would be loaded here');
    this.scriptsLoaded.add('chat');
  }

  // Remove tracking scripts when consent is withdrawn
  removeTrackingScripts(): void {
    // Remove Facebook Pixel
    if ((window as any).fbq) {
      (window as any).fbq('consent', 'revoke');
    }

    // Clear Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }

    // Clear cookies
    this.clearTrackingCookies();
  }

  private clearTrackingCookies(): void {
    const cookiesToClear = [
      '_ga', '_gat', '_gid', '_ga_*', '_gat_*',
      '_fbp', '_fbc',
      '__utma', '__utmb', '__utmc', '__utmt', '__utmz',
      '_hjid', '_hjSessionUser_*', '_hjSession_*',
      'MUID', 'MUIDB',
      'YSC', 'VISITOR_INFO1_LIVE',
      '_gcl_au', '_gcl_aw',
      'li_gc', 'lidc', 'UserMatchHistory'
    ];

    cookiesToClear.forEach(cookieName => {
      // Clear cookie
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.zinrai.com;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=zinrai.com;`;
    });
  }

  // Track page views for analytics
  trackPageView(title?: string, location?: string): void {
    if (!cookieManager.isEnabled('analytics')) return;

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: title || document.title,
        page_location: location || window.location.href
      });
    }

    // Facebook Pixel
    if ((window as any).fbq && cookieManager.isEnabled('marketing')) {
      (window as any).fbq('track', 'PageView');
    }
  }

  // Track custom events
  trackEvent(action: string, category?: string, label?: string, value?: number): void {
    if (!cookieManager.isEnabled('analytics')) return;

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }

    // Facebook Pixel for marketing events
    if ((window as any).fbq && cookieManager.isEnabled('marketing')) {
      (window as any).fbq('track', 'CustomEvent', {
        action: action,
        category: category,
        label: label,
        value: value
      });
    }
  }
}

// Export singleton instance
export const trackingScripts = TrackingScriptManager.getInstance();

// Configure with your actual tracking IDs
trackingScripts.configure({
  googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
  facebookPixelId: 'XXXXXXXXXXXXXXX', // Replace with your Facebook Pixel ID
  hotjarId: 'XXXXXXX', // Replace with your Hotjar ID
  linkedinPartnerId: 'XXXXXXX' // Replace with your LinkedIn Partner ID
});

// Auto-load scripts when module loads
if (typeof window !== 'undefined') {
  // Wait for consent before loading
  setTimeout(() => {
    if (cookieManager.hasConsent()) {
      trackingScripts.loadTrackingScripts();
    }
  }, 1000);
}