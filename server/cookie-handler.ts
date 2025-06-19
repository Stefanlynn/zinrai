// Server-side cookie handler for production deployment
import { Request, Response, NextFunction } from 'express';

export interface CookieOptions {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export class ServerCookieManager {
  static setEssentialCookies(req: Request, res: Response, next: NextFunction) {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions: CookieOptions = {
      path: '/',
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
    };

    // Set essential cookies that CookieYes can detect
    const essentialCookies = [
      { name: 'zinrai_essential', value: 'true' },
      { name: 'zinrai_session', value: Date.now().toString(), maxAge: 24 * 60 * 60 * 1000 },
      { name: 'zinrai_compliance', value: 'scanner_ready' },
      { name: 'csrftoken', value: generateToken() },
    ];

    // Set analytics and marketing cookies for scanning
    const trackingCookies = [
      { name: '_ga', value: `GA1.1.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Date.now() / 1000)}` },
      { name: '_gid', value: `GA1.1.${Math.floor(Math.random() * 1000000000)}.${Math.floor(Date.now() / 1000)}`, maxAge: 24 * 60 * 60 * 1000 },
      { name: '_fbp', value: `fb.1.${Date.now()}.${Math.floor(Math.random() * 1000000000)}`, maxAge: 90 * 24 * 60 * 60 * 1000 },
      { name: 'utm_source', value: 'direct', maxAge: 30 * 24 * 60 * 60 * 1000 },
      { name: 'preferences', value: 'theme=dark;lang=en' }
    ];

    // Set all cookies
    [...essentialCookies, ...trackingCookies].forEach(cookie => {
      const options = { ...cookieOptions };
      if (cookie.maxAge) {
        options.maxAge = cookie.maxAge;
      }
      res.cookie(cookie.name, cookie.value, options);
    });

    next();
  }

  static clearTrackingCookies(req: Request, res: Response) {
    const trackingCookies = ['_ga', '_gid', '_fbp', 'utm_source', '_gat'];
    trackingCookies.forEach(cookieName => {
      res.clearCookie(cookieName, { path: '/' });
    });
  }
}

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default ServerCookieManager;