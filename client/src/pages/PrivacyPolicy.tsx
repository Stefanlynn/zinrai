export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--zinrai-bg)] text-white overflow-y-auto">
      {/* Header */}
      <div className="bg-[#222222] h-12 flex items-center px-6 sticky top-0 z-10">
        <div className="text-lg font-light tracking-wider">ZiNRAi</div>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 min-h-screen">
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-white mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-white/60">
              Effective Date: January 25, 2025
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              At ZiNRAi, we are committed to protecting your privacy and maintaining the trust of our community. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at https://zinrai.com.
            </p>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">1. Information We Collect</h2>
              <p className="text-white/80 mb-4">
                We may collect the following types of personal information when you interact with our site:
              </p>
              <ul className="text-white/70 space-y-2 ml-6">
                <li>• <strong className="text-white">Personal Identifiers:</strong> Name, email address, and contact information (if voluntarily submitted through forms or sign-ups).</li>
                <li>• <strong className="text-white">Usage Data:</strong> Information about your device and how you interact with our website, including IP address, browser type, referring pages, and time spent.</li>
              </ul>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-white/80 mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-white/70 space-y-2 ml-6">
                <li>• Provide you with information, products, or services you request</li>
                <li>• Improve our website, content, and user experience</li>
                <li>• Communicate updates, promotions, or relevant opportunities (only if you've opted in)</li>
                <li>• Monitor and analyze usage trends to enhance functionality</li>
              </ul>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">3. Sharing Your Information</h2>
              <p className="text-white/80">
                We do not sell, rent, or trade your personal information. We may share data with trusted service providers that help us operate our website and deliver services—only to the extent necessary and under strict confidentiality.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">4. Cookies & Tracking</h2>
              <p className="text-white/80">
                ZiNRAi may use cookies and similar technologies to understand how users engage with our site. You can adjust your browser settings to refuse cookies, though this may impact your experience.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">5. Your Privacy Rights</h2>
              <p className="text-white/80 mb-4">
                You have the right to:
              </p>
              <ul className="text-white/70 space-y-2 ml-6">
                <li>• Request access to the personal information we hold about you</li>
                <li>• Ask us to correct, update, or delete your information</li>
                <li>• Withdraw consent at any time (for example, unsubscribing from emails)</li>
              </ul>
              <p className="text-white/80 mt-4">
                To exercise any of these rights, please contact us at support@zinrai.com.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">6. Data Security</h2>
              <p className="text-white/80">
                We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">7. Third-Party Links</h2>
              <p className="text-white/80">
                Our site may contain links to third-party websites. ZiNRAi is not responsible for the privacy practices of other sites and encourages you to review their policies.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">8. Updates to This Policy</h2>
              <p className="text-white/80">
                We may update this Privacy Policy periodically. The updated version will be posted on this page with a revised effective date.
              </p>
            </section>

            <div className="border-t border-white/20 my-8"></div>

            <section className="mb-10">
              <h2 className="text-2xl font-light text-white mb-4">9. Contact Us</h2>
              <p className="text-white/80 mb-4">
                If you have any questions or concerns about this policy, please contact us at:
              </p>
              <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                <p className="text-white font-medium mb-2">ZiNRAi Support Team</p>
                <p className="text-white/70 mb-1">Email: support@zinrai.com</p>
                <p className="text-white/70">Website: https://zinrai.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}