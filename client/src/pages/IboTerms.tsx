import { useLocation } from "wouter";

export default function IboTerms() {
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
            BP Terms & Conditions
          </h1>
          
          <div className="bg-black/30 border border-white/10 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">
                ZiNRAi BRAND PROMOTER AGREEMENT
              </h2>
              <p className="text-white/60 text-sm">
                Effective Date: June 1, 2025
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-6">
              <div className="bg-red-900/20 border border-red-500/30 rounded p-4 mb-6">
                <p className="text-red-200 font-medium text-sm">
                  PLEASE READ THIS BRAND PROMOTER AGREEMENT CAREFULLY. THIS BRAND PROMOTER AGREEMENT REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMITS THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <p>
                  1. By applying to become a ZiNRAi, LLC Brand Promoter ("BP") through the ZiNRAi website and online enrollment process, the applicant ("You") acknowledges and agrees that You have read and understand the ZiNRAi Brand Promoter Agreement, which is comprised of these Terms and Conditions, the ZiNRAi Policies & Procedures, the ZiNRAi Pay Plan, and ZiNRAi Social Media Policy ("BP Agreement").
                </p>

                <p>
                  2. There is no requirement to become a Brand Promoter beyond your entering into the BP Agreement and paying the initial and Recurring Fees on enrollment. Recurring Fees are the fees paid by a Brand Promoter every twenty-eight (28) days for the support of a BP account.
                </p>

                <p>
                  3. No Compensation is earned for the enrollment of new Brand Promoters, and You will be compensated only based upon the activities of other Brand Promoters to the extent that such Brand Promoters make sales of ZiNRAi Products and/or Services to Customers/Members.
                </p>

                <p>
                  4. You hereby authorize ZiNRAi to (i) charge the initial fee and initial Recurring Fee to your credit or debit card on file with ZiNRAi or other selected payment method (the "Payment Method"); and (ii) automatically charge the Payment Method for each Recurring Fee payment due and payable under this BP Agreement.
                </p>

                <p>
                  For the complete Brand Promoter Terms & Conditions document, please contact support@zinrai.com or access your back office for the full agreement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}