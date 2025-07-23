import React from "react";
import { useLocation } from "wouter";
import { useTranslation } from 'react-i18next';

export default function Menu() {
  const { t } = useTranslation();
  const [_, setLocation] = useLocation();

  const menuItems = [
    { number: "01", key: "nav.product", path: "/product" },
    { number: "02", key: "nav.partner", path: "/partner" },
    { number: "03", key: "nav.culture", path: "/culture" },
    { number: "04", key: "nav.insights", path: "/insights" },
    { number: "05", key: "nav.leadership", path: "/leadership" },
    { number: "06", key: "nav.contact", path: "/contact" }
  ];

  const legalLinks = [
    { titleKey: "home.footer.links.brand_promoter_agreement", href: "/assets/2025.06.10 Zinrai Brand Promoter Terms_1751741845402.pdf" },
    { titleKey: "home.footer.links.cookie_policy", href: "/assets/Cookie Policy 5-2025.pdf" },
    { titleKey: "home.footer.links.privacy_policy", href: "/assets/2025.06.10 Zinrai Website Privacy Policy_1751742430894.pdf" },
    { titleKey: "home.footer.links.refund_policy", href: "/assets/2025.06.09 Zinrai Refund Policy_1751742533480.pdf" },
    { titleKey: "home.footer.links.member_agreement", href: "/assets/2025.06.10 Zinrai Member Terms_1751741707468.pdf" },
    { titleKey: "home.footer.links.terms_of_use", href: "/assets/2025.06.10 Zinrai Website Terms of Use_1751742103884.pdf" },
    { titleKey: "home.footer.links.japan_statutory", href: "/assets/2025.06.10 Zinrai Japan Statutory Advertisement Matters 2_1751744521199.docx" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Grid overlay */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 w-full opacity-20">
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
        <div className="border border-white/[0.03]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 pt-24">
          <div 
            className="text-white text-2xl font-bold tracking-wide cursor-pointer hover:text-white/80 transition-colors"
            onClick={() => setLocation('/')}
          >
            ZiNRAi
          </div>
          
          <a 
            href="http://app.zinrai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[36px] px-6 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm"
          >
            <span className="text-white/90 text-sm font-light tracking-wide">{t('common.login')}</span>
          </a>
        </div>

        {/* Main menu content */}
        <div className="flex-1 px-6 pt-6 flex flex-col md:flex-row">
          {/* Left side: Navigation */}
          <nav className="space-y-6 max-w-xs flex-shrink-0">
            {menuItems.map((item) => (
              <div key={item.number}>
                <div className="flex items-start">
                  <div className="text-white/50 text-xs font-light mr-3 mt-1 w-5 text-right">{item.number}</div>
                  <div 
                    onClick={() => setLocation(item.path)}
                    className="text-white text-xl font-light hover:text-white/80 transition-colors cursor-pointer"
                  >
                    {t(item.key)}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right side: Legal Links */}
          <div className="md:ml-16 mt-12 md:mt-0">
            <h3 className="text-white/70 text-sm font-light mb-6">{t('home.footer.legal_links')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white/90 transition-colors text-sm text-left"
                >
                  {t(link.titleKey)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Company Legal Information */}
        <div className="px-6 pb-6 mt-auto">
          <div className="border-t border-white/10 pt-4">
            <div className="text-white/50 text-xs space-y-1">
              <div className="font-medium text-white/70">ZiNRAi LLC</div>
              <div className="text-white/40 text-[10px] leading-relaxed">
                3333 Renaissance Blvd<br />
                Suite #213<br />
                Bonita Springs, FL 34134
              </div>
              <div className="text-white/40 text-[10px] mt-2">
                © 2025 All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}