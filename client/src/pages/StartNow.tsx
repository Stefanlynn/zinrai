import { useState, useEffect } from "react";

export default function StartNow() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    refid: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hasReferral, setHasReferral] = useState(true);

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
      setSubmitMessage("OOPS! You don't appear to have a sponsor, please return to the person you received this link from and get a proper signup link");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if referral ID is missing
    if (!hasReferral || !formData.refid) {
      setSubmitMessage("OOPS! You don't appear to have a sponsor, please return to the person you received this link from and get a proper signup link");
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
        const errorText = await response.text();
        if (errorText.includes("The email has already been taken") || errorText.includes("email has already been taken")) {
          setSubmitMessage("Your email is already registered with us, please click here to go to the login page. If you cannot remember your password you can follow the \"Forgot Password\" process there");
        } else {
          setSubmitMessage("Submission failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setSubmitMessage("Something went wrong. Please try again later.");
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
          <p className="text-white/70 text-lg">Join the Future</p>
        </div>

        {/* Form */}
        <div className="bg-black/50 border border-white/20 rounded-lg p-8">
          <h2 className="text-2xl font-light text-center mb-6">Get Started Today</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" id="refid" name="refid" value={formData.refid} />
            
            <div>
              <label htmlFor="firstname" className="block text-white/80 text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstname"
                required
                value={formData.firstname}
                onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-white/80 text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastname"
                required
                value={formData.lastname}
                onChange={(e) => setFormData(prev => ({ ...prev, lastname: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--zinrai-blue-glow)] focus:ring-1 focus:ring-[var(--zinrai-blue-glow)] transition-colors"
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !hasReferral}
              className="w-full py-3 bg-[var(--zinrai-blue-glow)] text-white font-medium rounded-sm hover:bg-[var(--zinrai-blue-glow)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(104,172,255,0.3)] focus:outline-none focus:ring-2 focus:ring-[var(--zinrai-blue-glow)]/50"
            >
              {isSubmitting ? 'Joining...' : 'Join ZiNRAi'}
            </button>

            {submitMessage && (
              <div className={`text-center text-sm mt-4 ${
                submitMessage.includes('Successfully') ? 'text-green-400' : 'text-red-400'
              }`}>
                {submitMessage.includes('already registered') ? (
                  <p>
                    Your email is already registered with us, please{' '}
                    <a 
                      href="http://app.zinrai.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[var(--zinrai-blue-glow)] underline hover:text-white transition-colors"
                    >
                      click here to go to the login page
                    </a>
                    . If you cannot remember your password you can follow the "Forgot Password" process there.
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
            Live With Passion. Lead With Purpose.
          </p>
        </div>
      </div>
    </div>
  );
}