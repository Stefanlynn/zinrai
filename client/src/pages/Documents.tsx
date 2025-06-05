import { useLocation } from "wouter";

export default function Documents() {
  const [, setLocation] = useLocation();

  const legalDocuments = [
    {
      title: "BP Terms & Conditions",
      description: "Brand Promoter terms and conditions for ZiNRAi partnership",
      path: "/ibo-terms"
    },
    {
      title: "Cookie Policy",
      description: "Information about how we use cookies on our website",
      path: "/cookie-policy"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      path: "/privacy-policy"
    },
    {
      title: "Refund Policy",
      description: "Our refund and cancellation policy for services",
      path: "/refund-policy"
    },
    {
      title: "Terms & Conditions",
      description: "General terms and conditions for using ZiNRAi services",
      path: "/terms-conditions"
    },
    {
      title: "Terms of Use",
      description: "Terms governing the use of our website and platform",
      path: "/terms-of-use"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] text-white" style={{ minHeight: 'calc(100vh - 48px)' }}>
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-light text-white mb-4">
            Legal Documents
          </h1>
          <p className="text-white/70 text-lg mb-8">
            Access all ZiNRAi legal documents and policies in one place.
          </p>

          {legalDocuments.map((doc, index) => (
            <div
              key={index}
              onClick={() => setLocation(doc.path)}
              className="bg-black/40 border border-white/20 rounded-lg p-6 hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer group mb-4"
            >
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-[var(--zinrai-blue-glow)] transition-colors">
                {doc.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                {doc.description}
              </p>
              <div className="flex items-center text-white/50 group-hover:text-white/80 transition-colors">
                <span className="text-sm">View Document</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}

          <div className="p-6 bg-black/20 border border-white/10 rounded-lg mt-8 mb-16">
            <h3 className="text-lg font-medium text-white mb-3">
              Need Help?
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              If you have questions about any of these documents or need clarification on our policies, please don't hesitate to contact us.
            </p>
            <button
              onClick={() => setLocation('/contact')}
              className="text-[var(--zinrai-blue-glow)] hover:text-white transition-colors text-sm font-medium"
            >
              Contact Support →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}