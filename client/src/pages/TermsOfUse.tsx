import { useLocation } from "wouter";

export default function TermsOfUse() {
  const [, setLocation] = useLocation();

  return (
    <div className="policy-page-container bg-black text-white min-h-screen pb-32">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          {/* Back button */}
          <button
            onClick={() => setLocation('/documents')}
            className="flex items-center text-white/70 hover:text-white transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Documents
          </button>

          <h1 className="text-4xl font-light text-white mb-8 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            ZiNRAi™ Website Terms of Use
          </h1>
          
          <div className="bg-black/30 border border-white/10 rounded-lg p-8">
            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-6">
              <div className="text-center mb-8">
                <p className="text-lg font-medium text-white">Effective Date: [DATE]</p>
              </div>

              <div className="bg-red-900/20 border border-red-500/30 rounded p-4 mb-6">
                <p className="text-red-200 font-medium text-sm">
                  <strong>PLEASE READ THESE TERMS OF USE CAREFULLY.</strong> THESE TERMS OF USE REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMITS THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Acceptance of the Terms of Use</h2>
                  <p>
                    These terms of use are entered into by and between you and ZiNRAi™ LLC ("ZiNRAi™", "Company," "we," or "us"). The following terms and conditions, together with any documents they expressly incorporate by reference (collectively, "Terms of Use"), govern your access to and use of zinrai.com, including any content, functionality, and services offered on or through zinrai.com (the "Website"), whether as a guest or a registered user.
                  </p>
                  <p>
                    Please read the Terms of Use carefully before you start to use the Website. By using the Website or by clicking to accept or agree to the Terms of Use when this option is made available to you, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy, found at zinrai.com, incorporated herein by reference.
                  </p>
                  <p>
                    If you do not want to agree to these Terms of Use or the Privacy Policy, you must not access or use the Website.
                  </p>
                  <p>
                    This Website is available to users who have reached the legal age of digital consent in their country of residence. If you are under this age, please do not use the Website.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Changes to the Terms of Use</h2>
                  <p>
                    We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Website thereafter. However, any changes to the dispute resolution provisions set out in the section below titled "Governing law and Jurisdiction" and "Arbitration" will not apply to any disputes for which the parties have actual notice on or before the date the change is posted on the Website.
                  </p>
                  <p>
                    Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page each time you access this Website, so you are aware of any changes, as they are binding on you.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Accessing the Website and Account Security</h2>
                  <p>
                    We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period. From time to time, we may restrict user access, including registered user access, to some parts of the Website or the entire Website.
                  </p>
                  <p>You are responsible for both:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Making all arrangements necessary for you to have access to the Website.</li>
                    <li>Ensuring that all persons who access the Website through your internet connection are aware of these Terms of Use and comply with them.</li>
                  </ul>
                  <p>
                    To access the Website or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the Website that all the information you provide on the Website is correct, current, and complete. You agree that all information you provide to register with this Website or otherwise, including, but not limited to, through the use of any interactive features on the Website, is governed by our Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Intellectual Property Rights</h2>
                  <p>
                    The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                  </p>
                  <p>
                    These Terms of Use permit you to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, perform, republish, download, store, or transmit any of the material on our Website, except as follows:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                    <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
                    <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                    <li>If we provide desktop, mobile, or other applications for download, you may download a single copy to your computer or mobile device solely for your own personal, non-commercial use, provided you agree to be bound by our end user license agreement for such applications.</li>
                    <li>If we provide social media features with certain content, you may take such actions as are enabled by such features.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Trademarks</h2>
                  <p>
                    The Company name, the terms ZiNRAi™, the ZiNRAi™ logo, and all related names, logos, product and service names, designs, and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written permission of the Company. All other names, logos, product and service names, designs, and slogans on this Website are the trademarks of their respective owners.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Prohibited Uses</h2>
                  <p>You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                    <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by us, may harm the Company or users of the Website, or expose them to liability.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Reliance on Information Posted</h2>
                  <p>
                    The information presented on or through the Website is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Website, or by anyone who may be informed of any of its contents.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Information About You and Your Visits to the Website</h2>
                  <p>
                    All information we collect on this Website is subject to our Privacy Policy. By using the Website, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-medium text-white mb-3">Online Purchases and Other Terms and Conditions</h2>
                  <p>
                    All purchases through our site or other transactions for the sale of goods or services, carried out through the Website, or resulting from visits made by you, are governed by our Member Terms, which are hereby incorporated into these Terms of Use.
                  </p>
                  <p>
                    Additional terms and conditions may also apply to specific portions, services, or features of the Website. All such additional terms and conditions are hereby incorporated by this reference into these Terms of Use.
                  </p>
                </section>

                <div className="bg-amber-900/20 border border-amber-500/30 rounded p-4 my-6">
                  <p className="text-amber-100 text-sm">
                    <strong>Contact Information:</strong> If you have any questions about these Terms of Use, please contact us through the contact information provided on our Website.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}