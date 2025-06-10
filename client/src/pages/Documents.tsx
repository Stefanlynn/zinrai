import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Documents() {
  const [, setLocation] = useLocation();

  const handleDocumentClick = (path: string, docName: string) => {
    console.log(`Navigating to ${docName}: ${path}`);
    setLocation(path);
  };

  useEffect(() => {
    // Allow normal scrolling behavior
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      // Cleanup when leaving page
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pb-32"
      style={{ 
        paddingTop: '48px',
        overflow: 'auto',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch'
      }}>
      <div style={{ padding: '32px 24px', maxWidth: '1024px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', marginBottom: '16px' }}>
          Legal Documents
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '32px' }}>
          Access all ZiNRAi legal documents and policies in one place.
        </p>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/ibo-terms', 'BP Terms & Conditions')}>
          <h3 className="text-xl font-medium mb-3 text-white">BP Terms & Conditions</h3>
          <p className="text-white/60 text-sm mb-4">
            Business Promoter terms and conditions for partnership with ZiNRAi.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/brand-promoter-agreement', 'Brand Promoter Agreement')}>
          <h3 className="text-xl font-medium mb-3 text-white">Brand Promoter Agreement</h3>
          <p className="text-white/60 text-sm mb-4">
            Complete legal agreement for ZiNRAi Brand Promoters including arbitration terms and restrictive covenants.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/cookie-policy', 'Cookie Policy')}>
          <h3 className="text-xl font-medium mb-3 text-white">Cookie Policy</h3>
          <p className="text-white/60 text-sm mb-4">
            Information about how we use cookies and similar technologies on our website.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/privacy-policy', 'Privacy Policy')}>
          <h3 className="text-xl font-medium mb-3 text-white">Privacy Policy</h3>
          <p className="text-white/60 text-sm mb-4">
            How we collect, use, and protect your personal information.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/refund-policy', 'Refund Policy')}>
          <h3 className="text-xl font-medium mb-3 text-white">Refund Policy</h3>
          <p className="text-white/60 text-sm mb-4">
            Terms and conditions regarding refunds and cancellations.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-4 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/terms-conditions', 'Terms and Conditions')}>
          <h3 className="text-xl font-medium mb-3 text-white">Terms and Conditions</h3>
          <p className="text-white/60 text-sm mb-4">
            General terms and conditions for using ZiNRAi services.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div 
          className="bg-black/40 border border-white/20 rounded-lg p-6 mb-8 cursor-pointer hover:bg-black/50 transition-colors"
          onClick={() => handleDocumentClick('/terms-of-use', 'Terms of Use')}>
          <h3 className="text-xl font-medium mb-3 text-white">Terms of Use</h3>
          <p className="text-white/60 text-sm mb-4">
            Specific terms governing the use of our platform and services.
          </p>
          <span className="text-white/50 text-sm">View Document →</span>
        </div>

        <div style={{ padding: '24px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', marginBottom: '64px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '12px' }}>Need Help?</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            If you have questions about any of these documents or need clarification on our policies, please don't hesitate to contact us.
          </p>
          <button
            onClick={() => setLocation('/contact')}
            style={{ color: '#68acff', fontSize: '14px', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Contact Support →
          </button>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '64px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
            © 2025 ZiNRAi. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}