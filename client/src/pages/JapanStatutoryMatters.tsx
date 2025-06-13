export default function JapanStatutoryMatters() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Zinrai Japan Statutory Advertisement Matters
        </h1>
        
        <div className="space-y-8 text-gray-100">
          {/* Supervisor Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Name, address, telephone number, etc. of the supervisor
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p><span className="font-semibold">Company Name:</span> Zinrai LLC</p>
                  <p><span className="font-semibold">Executor:</span> Jason Brown</p>
                </div>
                <div>
                  <p><span className="font-semibold">Location:</span> 3333 Renaissance Blvd, Suite #209<br />
                     Bonita Springs, FL 34134</p>
                  <p><span className="font-semibold">Representative phone number:</span> 01-239-790-2833</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p><span className="font-semibold">Brand Partner Support Email:</span> support@zinrai.com</p>
                <p><span className="font-semibold">Customer care (return/refund of tools, subscriptions, etc.) Email:</span> billing@zinrai.com</p>
              </div>
            </div>
          </section>

          {/* Type of Service */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Type of service, etc.
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">Essential services</h3>
              <p>Online education services</p>
              <h3 className="font-semibold mb-2 mt-4">Others</h3>
              <p>Video content, audio content, and mobile applications provided via electronic media or the Internet.</p>
            </div>
          </section>

          {/* Specific Burden */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Matters concerning specific burden
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p className="mb-4">
                Applicants are required to submit a Brand Partner application and contract and pay an admission fee. 
                Purchase of the Brand Partner Resources and other Brand Partner Business Tools and Services are optional. 
                New Brand Partners can obtain Core 600 to Core 5000 ranks and above by meeting the conditions set forth 
                in the Zinrai Compensation Plan.
              </p>
              <p className="mb-2"><span className="font-semibold">Brand Partner Admission fee:</span> USD $25.00 per month (tax not included)</p>
              <p className="mb-4">
                In principle, after completing the payment procedure and confirming the order, we will provide access 
                to services on the same day or the next business day.
              </p>
              <p><span className="font-semibold">Optional Product Monthly fee:</span> USD $184.95 per month or USD $249.95 per month (tax not included).</p>
            </div>
          </section>

          {/* Business Tools */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Business tools, etc.
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p>All business tools are available at no additional charge in the Brand Partner back office.</p>
            </div>
          </section>

          {/* Compensation */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Compensation for services, etc.
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Specific profit calculation method</h3>
              <p>The specific benefits provided by Zinrai, LLC include commissions and bonuses, which are outlined below.</p>
              
              <h4 className="font-semibold">How Commissions Are Calculated?</h4>
              <p>
                Commissions are calculated based on commissionable revenue for services. Commissions are calculated by 
                multiplying the total commissionable earnings by the commission percentage. The commissionable revenue 
                for each service, as well as the period for which commissions are paid, personal retail sales volume, 
                personal sale volume and Active Members/Customers are recorded, are set forth in the Zinrai Compensation 
                Plan, which is part of the overview document and contract document.
              </p>
              
              <p>
                Zinrai reserves the right to change the commissionable revenues of its services according to business 
                conditions. Zinrai reserves the right to adjust commissionable earnings based on backlog data. If we 
                make this adjustment, we will do so through revisions to our Compensation Plan. Zinrai also reserves 
                the right to reduce commissionable revenue or reduce the amount of Commissions paid on a particular 
                Member Agreement if payment is not made in full for that Agreement.
              </p>
              
              <h4 className="font-semibold">Bonus Calculation Method Example:</h4>
              <p>
                Commissions or bonuses are calculated and paid weekly. Each product or service is assigned a fixed 
                Commissionable Volume (CV). The maximum calculated commission on a customer's enrollment for a Zinrai 
                products is 55% of the CV assigned for the product or services purchase (excluding Sales Tax). 
                Example calculation: 150 CV x .55% = $82.50.
              </p>
              
              <h4 className="font-semibold">Bonus Payment:</h4>
              <p>
                Weekly bonus payments are calculated and paid every Friday or the next business day if it falls on 
                a holiday for bonuses earned in the preceding week.
              </p>
            </div>
          </section>

          {/* Products and Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Products and Services
            </h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-2 px-4">Product Name</th>
                      <th className="text-left py-2 px-4">Retail Price (tax not included)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-2 px-4">All Access Membership</td>
                      <td className="py-2 px-4">USD $184.95 initial and per 28 days</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">VIP Membership</td>
                      <td className="py-2 px-4">USD $249.95 initial and per 28 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700">
                <p>
                  Contracts for customer subscriptions for the above products and services can be cancelled by email 
                  to billing@zinrai.com or by the customer in the Zinrai back office at any time within 10 calendar 
                  days of purchase.
                </p>
                <p className="mt-4">
                  All fees and commissions are calculated and paid in USD. The exchange rate that is applied to payments 
                  will vary by payment method and is selected by the card issuer or payment processor and not by Zinrai. 
                  Zinrai processes payments and pays commissions in USD.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}