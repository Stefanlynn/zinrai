export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-light text-white mb-8 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Refund Policy
          </h1>
          
          <div className="bg-black/30 border border-white/10 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-light text-white mb-2">
                MEMBER REFUND POLICY
              </h2>
              <p className="text-green-400 font-medium">
                We Guarantee Your Satisfaction!
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none text-white/80 leading-relaxed space-y-6">
              <div className="bg-green-900/20 border border-green-500/30 rounded p-4 mb-6">
                <p className="text-green-200 font-medium text-sm">
                  We offer a seven (7) day, 100% money-back Satisfaction Guarantee
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <p>
                  We strive to provide exceptional service and ensure customer satisfaction. We understand that sometimes purchases don't go as planned. If you are not satisfied with your purchase of one of our Membership products or services for any reason we offer a seven (7) day, 100% money-back Satisfaction Guarantee as follows:
                </p>

                <p>
                  <strong>Within 7 Days:</strong> During the first seven (7) days from the date of your initial product or service purchase, you may cancel your ZiNRAi Membership Agreement without penalty and receive a 100% refund of all Membership fees paid.
                </p>

                <p>
                  <strong>After 7 Days:</strong> After seven (7) days, you may cancel your Membership at any time in accordance with the terms of the ZiNRAi Membership Agreement, but you will not be eligible to receive a refund of fees paid.
                </p>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">Refund Process:</h3>
                <p>
                  You can request a refund by emailing us at <strong>support@zinrai.com</strong> or use the cancellation option in your back office to start the refund request process. Please provide your Member ID and contact details in your email to facilitate the processing of your refund request.
                </p>

                <p>
                  Refunds will be issued to the payment method and account used for your original purchase. All refunds are processed and paid in US dollars. We do not accept responsibility for any international transaction fees or exchange rate fluctuations that may impact the refund amount received by a Member.
                </p>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">Chargebacks:</h3>
                <p>
                  In the event of a dispute regarding a transaction, we encourage Members to contact us directly to resolve the issue. Before initiating a chargeback, Members should contact our customer service team at <strong>support@zinrai.com</strong> as soon as possible.
                </p>

                <p className="text-xs text-white/60 mt-8">
                  This Refund Policy does not apply to Independent Business Owner ("IBO") enrollments, which are subject to the terms of the IBO Agreement and Policies and Procedures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}