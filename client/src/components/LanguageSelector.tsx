import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1.5 lg:py-2 bg-white/10 hover:bg-white/20 rounded-md lg:rounded-lg transition-colors duration-200 text-white"
        aria-label="Select Language"
      >
        <Globe size={14} className="lg:w-4 lg:h-4" />
        <span className="text-xs lg:text-sm font-medium">{currentLanguage.flag}</span>
        <svg 
          className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-50 min-w-[150px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage.code === language.code ? 'bg-white/10' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium text-white">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;