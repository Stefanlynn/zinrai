import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Documents() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Force remove any classes preventing scroll
    document.body.classList.remove('home-is-active');
    document.body.style.overflow = 'auto !important';
    document.body.style.position = 'static !important';
    document.body.style.height = 'auto !important';
    document.body.style.width = '100% !important';
    document.documentElement.style.overflow = 'auto !important';
    
    // Remove any global scroll event listeners
    const allEventListeners = document.body.cloneNode(true);
    document.body.parentNode?.replaceChild(allEventListeners, document.body);
    
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div style={{ 
      position: 'fixed',
      top: '48px',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      overflow: 'auto',
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch',
      zIndex: 10,
      pointerEvents: 'auto'
    }}>
      <div style={{ padding: '32px 24px', maxWidth: '1024px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', marginBottom: '16px' }}>
          Legal Documents
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '32px' }}>
          Access all ZiNRAi legal documents and policies in one place.
        </p>

        <div style={{ marginBottom: '16px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking BP Terms');
               setLocation('/ibo-terms');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>BP Terms & Conditions</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            Business Promoter terms and conditions for partnership with ZiNRAi.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
        </div>

        <div style={{ marginBottom: '16px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking Cookie Policy');
               setLocation('/cookie-policy');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>Cookie Policy</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            Information about how we use cookies and similar technologies on our website.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
        </div>

        <div style={{ marginBottom: '16px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking Privacy Policy');
               setLocation('/privacy-policy');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>Privacy Policy</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            How we collect, use, and protect your personal information.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
        </div>

        <div style={{ marginBottom: '16px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking Refund Policy');
               setLocation('/refund-policy');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>Refund Policy</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            Terms and conditions regarding refunds and cancellations.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
        </div>

        <div style={{ marginBottom: '16px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking Terms and Conditions');
               setLocation('/terms-conditions');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>Terms and Conditions</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            General terms and conditions for using ZiNRAi services.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
        </div>

        <div style={{ marginBottom: '32px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', cursor: 'pointer', position: 'relative', zIndex: 20 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               console.log('Clicking Terms of Use');
               setLocation('/terms-of-use');
             }}>
          <h3 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '12px' }}>Terms of Use</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '16px' }}>
            Specific terms governing the use of our platform and services.
          </p>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>View Document →</span>
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