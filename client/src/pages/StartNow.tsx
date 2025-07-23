import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

// Complete list of all world countries excluding OFAC-sanctioned countries
// Excluded: Afghanistan, Belarus, Burma (Myanmar), Chad, China, Cote D'Ivoire (Ivory Coast), Cuba, Democratic Republic of the Congo, Equatorial Guinea, Iran, Iraq, Lebanon, Liberia, North Korea, Russia, Rwanda, Sudan, Syria, Zimbabwe, and Crimea region of Ukraine
const AVAILABLE_COUNTRIES = [
  "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chile", "Colombia", "Comoros", "Congo (Republic)", "Costa Rica", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lesotho", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Suriname", "Sweden", "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia"
].sort();

export default function StartNow() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    refid: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hasReferral, setHasReferral] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);

  // Extract referral ID from URL on component mount
  useEffect(() => {
    function getParameterByName(name: string, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
      const results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    const refValue = getParameterByName('ref');
    if (refValue) {
      setFormData(prev => ({ ...prev, refid: refValue }));
      setHasReferral(true);
    } else {
      setHasReferral(false);
      setSubmitMessage(t('pages.startNow.form.noSponsor'));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if referral ID is missing
    if (!hasReferral || !formData.refid) {
      setSubmitMessage(t('pages.startNow.form.noSponsor'));
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch("https://app.zinrai.com/api/onboarding?token=zXNN14tzDo2Z0cWqJQWchVg94pXtPSAwCo7EuHrr0581e2db", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Check if the response contains a redirect_url
        if (result.redirect_url) {
          // Redirect to the ZiNRAi app signup page
          window.location.href = result.redirect_url;
        } else {
          // Fallback redirect to the default ZiNRAi app signup URL
          window.location.href = "https://app.zinrai.com/user-sign-up/cbffbd3d-cf2c-4e17-b4ef-defc759c7afd";
        }
      } else {
        // Check if the error is about email already existing
        try {
          const errorData = await response.json();
          if (errorData.errors && errorData.errors.email && errorData.errors.email.includes("The email has already been taken.")) {
            setSubmitMessage(t('pages.startNow.form.alreadyRegistered') + ' ' + t('pages.startNow.form.clickHereLogin') + t('pages.startNow.form.forgotPassword'));
          } else {
            setSubmitMessage(t('pages.startNow.form.submissionFailed'));
          }
        } catch {
          // Fallback to text parsing if JSON parsing fails
          const errorText = await response.text();
          if (errorText.includes("The email has already been taken") || errorText.includes("email has already been taken")) {
            setSubmitMessage(t('pages.startNow.form.alreadyRegistered') + ' ' + t('pages.startNow.form.clickHereLogin') + t('pages.startNow.form.forgotPassword'));
          } else {
            setSubmitMessage(t('pages.startNow.form.submissionFailed'));
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setSubmitMessage(t('pages.startNow.form.somethingWrong'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-2" style={{ 
            color: '#68ACFF',
            textShadow: '0 0 20px rgba(104, 172, 255, 0.5)'
          }}>
            ZiNRAi
          </h1>
          <p className="text-white/70 text-lg">{t('pages.startNow.joinFuture')}</p>
        </div>

        {/* Form */}
        <div className="bg-black/50 border border-white/20 rounded-lg p-8">
          <h2 className="text-2xl font-light text-center mb-6">{t('pages.startNow.getStartedToday')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" id="refid" name="refid" value={formData.refid} />
            
            <div>
              <label htmlFor="firstname" className="block text-white/80 text-sm font-medium mb-2">
                {t('pages.startNow.form.firstName')}
              </label>
              <input
                type="text"
                id="firstname"
                required
                value={formData.firstname}
                onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder={t('pages.startNow.form.firstNamePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-white/80 text-sm font-medium mb-2">
                {t('pages.startNow.form.lastName')}
              </label>
              <input
                type="text"
                id="lastname"
                required
                value={formData.lastname}
                onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder={t('pages.startNow.form.lastNamePlaceholder')}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-white/80 text-sm font-medium mb-2">
                {t('pages.startNow.form.country')}
              </label>
              <p className="text-white/60 text-sm mb-2">
                {t('pages.startNow.form.countryHelper')}
              </p>
              <select
                id="country"
                required
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
              >
                <option value="" className="bg-black text-white">{t('pages.startNow.form.countryPlaceholder')}</option>
                {AVAILABLE_COUNTRIES.map((country) => (
                  <option key={country} value={country} className="bg-black text-white">
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                {t('pages.startNow.form.email')}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder={t('pages.startNow.form.emailPlaceholder')}
              />
            </div>

            {/* Age Verification Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="ageVerification"
                checked={ageVerified}
                onChange={(e) => setAgeVerified(e.target.checked)}
                className="mt-1 w-4 h-4 text-[var(--zinrai-blue-glow)] bg-black/50 border border-white/20 rounded focus:ring-[var(--zinrai-blue-glow)] focus:ring-2"
              />
              <label htmlFor="ageVerification" className="text-white/70 text-sm leading-relaxed">
                {t('pages.startNow.form.ageVerification')}
                <br /><br />
                {t('pages.startNow.form.ageVerificationDetails')}
                <br /><br />
                {t('pages.startNow.form.ageVerificationPolicy')}
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !hasReferral || !ageVerified}
              className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(104,172,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[var(--zinrai-blue-glow)]/50"
            >
              {isSubmitting ? t('pages.startNow.form.joining') : t('pages.startNow.form.joinZinrai')}
            </button>

            {submitMessage && (
              <div className={`text-center text-sm mt-4 ${
                submitMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'
              }`}>
                {submitMessage.includes('already registered') ? (
                  <p>
                    {t('pages.startNow.form.alreadyRegistered')}{' '}
                    <a 
                      href="http://app.zinrai.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--zinrai-blue-glow)] underline hover:text-white transition-colors"
                    >
                      {t('pages.startNow.form.clickHereLogin')}
                    </a>
                    {t('pages.startNow.form.forgotPassword')}
                  </p>
                ) : (
                  <p>{submitMessage}</p>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/50 text-sm">
            {t('pages.startNow.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}