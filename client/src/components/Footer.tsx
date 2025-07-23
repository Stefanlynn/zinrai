import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import CookieSettings from "./CookieSettings";

export default function Footer() {
  const [, setLocation] = useLocation();
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const { t } = useTranslation();

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
            <div className="mt-4 p-3 bg-gray-800 text-white rounded font-bold text-center">
              {t('home.footer.email')}: support@zinrai.com
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.quick_links')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('home.footer.links.home')}
                </button>
              </li>
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
                  {t('home.footer.links.cookie_settings')}
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

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('home.footer.connect')}</h3>
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
                href="https://www.youtube.com/@zinrai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Subscribe to ZiNRAi™ on YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="text-sm">
              <div className="mb-3">
                <p className="text-white/70 mb-1">{t('home.footer.contact_support')}:</p>
                <a 
                  href="mailto:support@zinrai.com"
                  className="text-white hover:text-blue-400 transition-colors font-bold"
                >
                  support@zinrai.com
                </a>
              </div>
              <button 
                onClick={() => handleNavigation("/contact")}
                className="text-white/70 hover:text-white transition-colors block mb-2"
              >
                {t('home.footer.links.contact')}
              </button>
              <button 
                onClick={() => handleNavigation("/documents")}
                className="text-white/70 hover:text-white transition-colors block"
              >
                {t('home.footer.links.documents')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2025 ZiNRAi<span className="text-xs align-super">™</span> LLC. {t('home.footer.all_rights_reserved')}</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs">
                {t('home.footer.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cookie Settings Modal */}
      <CookieSettings 
        isOpen={showCookieSettings} 
        onClose={() => setShowCookieSettings(false)} 
      />
    </footer>
  );
}