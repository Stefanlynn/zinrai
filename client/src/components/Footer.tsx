import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import CookieSettings from "./CookieSettings";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  // Footer translations based on current language
  const footerTexts = {
    en: {
      legal: "Legal",
      quickLinks: "Quick Links",
      connect: "Connect",
      home: "Home",
      courses: "Courses",
      brandPromoter: "Brand Promoter",
      culture: "Culture",
      leadership: "Leadership",
      privacyPolicy: "Privacy Policy",
      memberAgreement: "Member Agreement",
      termsOfUse: "Terms of Use",
      refundPolicy: "Refund Policy",
      cookiePolicy: "Cookie Policy",
      brandPromoterAgreement: "Brand Promoter Agreement",
      japanStatutory: "Japan Statutory Advertisement Matters",
      contactSupport: "Contact Support",
      contact: "Contact",
      documents: "Documents",
      allRightsReserved: "All rights reserved.",
      educationFocus: "Our focus is financial education, not investment advice.",
      email: "Email"
    },
    ja: {
      legal: "法的事項",
      quickLinks: "クイックリンク",
      connect: "接続",
      home: "ホーム",
      courses: "コース",
      brandPromoter: "ブランドプロモーター",
      culture: "文化",
      leadership: "リーダーシップ",
      privacyPolicy: "プライバシーポリシー",
      memberAgreement: "メンバー契約",
      termsOfUse: "利用規約",
      refundPolicy: "返金ポリシー",
      cookiePolicy: "クッキーポリシー",
      brandPromoterAgreement: "ブランドプロモーター契約",
      japanStatutory: "日本法定広告事項",
      contactSupport: "サポートにお問い合わせ",
      contact: "お問い合わせ",
      documents: "ドキュメント",
      allRightsReserved: "すべての権利予約済み。",
      educationFocus: "私たちの焦点は金融教育であり、投資アドバイスではありません。",
      email: "メール"
    },
    es: {
      legal: "Legal",
      quickLinks: "Enlaces Rápidos",
      connect: "Conectar",
      home: "Inicio",
      courses: "Cursos",
      brandPromoter: "Promotor de Marca",
      culture: "Cultura",
      leadership: "Liderazgo",
      privacyPolicy: "Política de Privacidad",
      memberAgreement: "Acuerdo de Miembro",
      termsOfUse: "Términos de Uso",
      refundPolicy: "Política de Reembolso",
      cookiePolicy: "Política de Cookies",
      brandPromoterAgreement: "Acuerdo de Promotor de Marca",
      japanStatutory: "Asuntos Publicitarios Estatutarios de Japón",
      contactSupport: "Contactar Soporte",
      contact: "Contacto",
      documents: "Documentos",
      allRightsReserved: "Todos los derechos reservados.",
      educationFocus: "Nuestro enfoque es la educación financiera, no el asesoramiento de inversión.",
      email: "Correo"
    }
  };

  const currentLang = i18n.language || 'en';
  const texts = footerTexts[currentLang as keyof typeof footerTexts] || footerTexts.en;


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
              Innovative digital learning platform for financial education and strategy analysis.
            </p>
            <div className="text-white/60 text-sm">
              <p>ZiNRAi<span className="text-xs align-super">™</span> LLC</p>
              <p>3333 Renaissance Blvd</p>
              <p>Suite #213</p>
              <p>Bonita Springs, FL 34134</p>
            </div>
            <div className="mt-4 p-3 bg-gray-800 text-white rounded font-bold text-center">
              {texts.email}: support@zinrai.com
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{texts.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/product")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.courses}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/partner")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.brandPromoter}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/culture")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.culture}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{texts.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Website Privacy Policy_1751742430894.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.privacyPolicy}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Member Terms_1751741707468.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.memberAgreement}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Website Terms of Use_1751742103884.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.termsOfUse}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.09 Zinrai Refund Policy_1751742533480.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.refundPolicy}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/Cookie Policy 5-2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.cookiePolicy}
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
                  {texts.brandPromoterAgreement}
                </a>
              </li>
              <li>
                <a 
                  href="/assets/2025.06.10 Zinrai Japan Statutory Advertisement Matters 2_1751744521199.docx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.japanStatutory}
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{texts.connect}</h3>
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
                <p className="text-white/70 mb-1">{texts.contactSupport}:</p>
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
                {texts.contact}
              </button>
              <button 
                onClick={() => handleNavigation("/documents")}
                className="text-white/70 hover:text-white transition-colors block"
              >
                {texts.documents}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2025 ZiNRAi<span className="text-xs align-super">™</span> LLC. {texts.allRightsReserved}</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs">
                {texts.educationFocus}
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