import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import CookieSettings from "./CookieSettings";

export default function Footer() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <footer className="bg-black text-white py-12 relative z-50 -mt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ZiNRAi<span className="text-xs align-super">™</span></h3>
            <p className="text-white/70 text-sm mb-4">
              {t('home.footer.company_description')}
            </p>
            <div className="text-white/60 text-sm">
              <p>ZiNRAi<span className="text-xs align-super">™</span> LLC</p>
              <p>3333 Renaissance Blvd</p>
              <p>Suite #213</p>
              <p>Bonita Springs, FL 34134</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.quick_links')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/product")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.courses')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/partner")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.brand_promoter')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/culture")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.culture')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/leadership")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.leadership')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/contact")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Website Privacy Policy_1751742430894.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.privacy_policy')}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Member Terms_1751741707468.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.member_agreement')}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Website Terms of Use_1751742103884.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.terms_of_use')}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.09 Zinrai Refund Policy_1751742533480.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.refund_policy')}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/Cookie Policy 5-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.cookie_policy')}
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setShowCookieSettings(true)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cookie Settings
                </button>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Brand Promoter Terms_1751741845402.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.brand_promoter_agreement')}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Japan Statutory Advertisement Matters 2_1751744521199.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.japan_statutory')}
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.follow_us')}</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Follow ZiNRAi™ on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://youtube.com/@zinrai?si=2xbcK-u8e_5HuRG2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Subscribe to ZiNRAi™ on YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="text-sm">
              <p className="text-white/70 mb-1">{t('home.footer.email')}: support@zinrai.com</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">{t('home.footer.disclaimer_title')}</h3>
            <div className="text-sm text-white/70 space-y-3">
              <p>{t('home.footer.disclaimer_text')}</p>
              <p>{t('home.footer.disclaimer_text2')}</p>
              <p>{t('home.footer.disclaimer_text3')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2025 ZiNRAi<span className="text-xs align-super">™</span> LLC. {t('home.footer.all_rights_reserved')}</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs">
                {t('home.footer.education_focus')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showCookieSettings && (
        <CookieSettings onClose={() => setShowCookieSettings(false)} />
      )}
    </footer>
  );
}