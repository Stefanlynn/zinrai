import { FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

import CookieSettings from "./CookieSettings";

export default function Footer() {
  const { i18n } = useTranslation();
  const [, setLocation] = useLocation();
  const [showCookieSettings, setShowCookieSettings] = useState(false);

  // Footer translations based on current language
  const footerTexts = {
    en: {
      legal: "Legal",
      quickLinks: "Quick Links",
      followUs: "Follow Us",
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
      cookieSettings: "Cookie Settings",
      brandPromoterAgreement: "Brand Promoter Agreement",
      japanStatutory: "Japan Statutory Advertisement Matters",
      contact: "Contact",
      allRightsReserved: "All rights reserved.",
      educationFocus: "Our focus is financial education, not investment advice.",
      email: "Email",
      companyDescription: "Innovative digital learning platform for financial education and strategy analysis.",
      disclaimerTitle: "Important Disclaimer",
      disclaimer1: "ZiNRAi™ products include digital and online interactive training content for analyzing, learning, and discussing general and generic information related to investments and strategies. ZiNRAi™ does not facilitate or offer access to online platforms for investment or online trading in securities, currency (including cryptocurrencies), or other financial or investment products or services. ZiNRAi™, its brand partners, and educators do not provide personalized recommendations or advice on investment strategy, nor do they provide any regulated financial services.",
      disclaimer2: "ZiNRAi™ is not endorsed by or affiliated with any national, state, provincial, or territorial organization or association, tax authorities, or agencies, or financial regulatory body.",
      disclaimer3: "ZiNRAi™ provides absolutely no guarantee that you will earn any money or achieve a financial goal using the methods, information, and suggestions in the content provided. Any examples or demonstrations provided are in no way a guarantee or promise that an individual will make financial gains of any kind."
    },
    ja: {
      legal: "法的事項",
      quickLinks: "クイックリンク",
      followUs: "フォローする",
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
      cookieSettings: "クッキー設定",
      brandPromoterAgreement: "ブランドプロモーター契約",
      japanStatutory: "日本法定広告事項",
      contact: "お問い合わせ",
      allRightsReserved: "すべての権利予約済み。",
      educationFocus: "私たちの焦点は金融教育であり、投資アドバイスではありません。",
      email: "メール",
      companyDescription: "金融教育と戦略分析のための革新的なデジタル学習プラットフォーム。",
      disclaimerTitle: "重要な免責事項",
      disclaimer1: "ZiNRAi™製品には、投資と戦略に関する一般的かつ汎用的な情報を分析、学習、議論するためのデジタルおよびオンラインの対話型トレーニングコンテンツが含まれています。ZiNRAi™は、証券、通貨（暗号通貨を含む）、またはその他の金融もしくは投資商品やサービスの投資やオンライン取引のためのオンラインプラットフォームへのアクセスを促進したり、提供したりすることはありません。ZiNRAi™、そのブランドパートナー、および教育者は、投資戦略に関する個人的な推奨事項やアドバイスを提供することはなく、規制された金融サービスも提供しません。",
      disclaimer2: "ZiNRAi™は、国、州、県、地域の組織や協会、税務当局、機関、または金融規制機関によって承認されておらず、また関連もありません。",
      disclaimer3: "ZiNRAi™は、提供されたコンテンツの方法、情報、提案を使用してお金を稼いだり、財務目標を達成したりすることを絶対に保証しません。提供される例やデモンストレーションは、個人が何らかの金銭的利益を得ることの保証や約束ではありません。"
    },
    es: {
      legal: "Legal",
      quickLinks: "Enlaces Rápidos",
      followUs: "Síguenos",
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
      cookieSettings: "Configuración de Cookies",
      brandPromoterAgreement: "Acuerdo de Promotor de Marca",
      japanStatutory: "Asuntos Publicitarios Estatutarios de Japón",
      contact: "Contacto",
      allRightsReserved: "Todos los derechos reservados.",
      educationFocus: "Nuestro enfoque es la educación financiera, no el asesoramiento de inversión.",
      email: "Correo",
      companyDescription: "Plataforma de aprendizaje digital innovadora para educación financiera y análisis de estrategias.",
      disclaimerTitle: "Aviso Legal Importante",
      disclaimer1: "Los productos ZiNRAi™ incluyen contenido de capacitación digital e interactivo en línea para analizar, aprender y discutir información general y genérica relacionada con inversiones y estrategias. ZiNRAi™ no facilita ni ofrece acceso a plataformas en línea para inversiones o comercio en línea de valores, monedas (incluidas las criptomonedas) u otros productos o servicios financieros o de inversión. ZiNRAi™, sus socios de marca y educadores no proporcionan recomendaciones personalizadas o asesoramiento sobre estrategias de inversión, ni proporcionan servicios financieros regulados.",
      disclaimer2: "ZiNRAi™ no está respaldado por ni afiliado con ninguna organización o asociación nacional, estatal, provincial o territorial, autoridades fiscales o agencias, o entidad reguladora financiera.",
      disclaimer3: "ZiNRAi™ no proporciona absolutamente ninguna garantía de que ganará dinero o logrará un objetivo financiero utilizando los métodos, información y sugerencias en el contenido proporcionado. Cualquier ejemplo o demostración proporcionada no es de ninguna manera una garantía o promesa de que un individuo obtendrá ganancias financieras de cualquier tipo."
    }
  };

  // Get current language or default to 'en'
  const currentLang = i18n.language?.split('-')[0] || 'en';
  const texts = footerTexts[currentLang as keyof typeof footerTexts] || footerTexts.en;

  const handleNavigation = (path: string) => {
    setLocation(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              {texts.companyDescription}
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
            <h3 className="text-lg font-semibold mb-4">{texts.quickLinks}</h3>
            <ul className="space-y-2 text-sm">
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
              <li>
                <button 
                  onClick={() => handleNavigation("/leadership")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.leadership}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/contact")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {texts.contact}
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
                  {texts.cookieSettings}
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

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{texts.followUs}</h3>
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
              <p className="text-white/70 mb-1">{texts.email}: support@zinrai.com</p>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-center">{texts.disclaimerTitle}</h3>
            <div className="text-sm text-white/70 space-y-3">
              <p>{texts.disclaimer1}</p>
              <p>{texts.disclaimer2}</p>
              <p>{texts.disclaimer3}</p>
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
      {showCookieSettings && (
        <CookieSettings onClose={() => setShowCookieSettings(false)} />
      )}
    </footer>
  );
}