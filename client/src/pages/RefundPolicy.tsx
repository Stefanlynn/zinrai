import { useLocation } from "wouter";

export default function RefundPolicy() {
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
            ZiNRAi™ Customer Refund Policy
          </h1>
          
          <div className="bg-black/30 border border-white/10 rounded-lg p-8">
            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-6">
              <div className="space-y-6 text-sm">
                <p>
                  Except as otherwise required by applicable law in your place of residence, during the first ten (10) days from the date of your initial product or service purchase, you may cancel your ZiNRAi™ subscription without penalty and receive a 100% refund of all Membership fees paid.
                </p>

                <p>
                  Except as otherwise required by applicable law in your place of residence, after ten (10) days, you may cancel your ZiNRAi™ subscription at any time in accordance with the terms of the ZiNRAi™ Member Agreement, but you will not be eligible to receive a refund of fees paid.
                </p>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4 my-6">
                  <h3 className="text-blue-200 font-medium text-base mb-3">Refund Process:</h3>
                  <p className="text-blue-100 text-sm">
                    You can request a refund by emailing us at <strong>billing@zinrai.com</strong> or use the cancellation option in your back office to start the refund request process. If you make your refund request by email please provide your Member ID and contact details in your email.
                  </p>
                </div>

                <p>
                  Refunds will be issued to the payment method and account used for your original purchase. All refunds are processed and paid in US dollars. We do not accept responsibility for any international transaction fees or exchange rate fluctuations that may impact the refund amount received by a Member.
                </p>

                <p>
                  <strong>Important:</strong> This Refund Policy does not apply to Brand Promoter enrollments, which are subject to the terms of the Brand Promoter Agreement and Policies and Procedures.
                </p>

                <div className="bg-amber-900/20 border border-amber-500/30 rounded p-4 my-6">
                  <p className="text-amber-100 text-sm">
                    If you have any questions about this Refund Policy, please contact <strong>billing@zinrai.com</strong>.
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