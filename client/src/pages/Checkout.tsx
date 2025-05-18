import { useState } from "react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [, navigate] = useLocation();
  
  // Get subscription details from localStorage (would typically come from state or context in a real app)
  const subscriptionData = JSON.parse(localStorage.getItem("subscriptionData") || "{}");
  const customerData = JSON.parse(localStorage.getItem("customerData") || "{}");
  
  return (
    <div className="min-h-screen bg-black text-white pt-[32px] form-page">
      <div className="container mx-auto px-4 py-12 pb-32 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-white/70">Choose your preferred payment method to complete your subscription</p>
        </div>
        
        {/* Payment Method Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`px-6 py-3 border ${
                paymentMethod === "card"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              Credit/Debit Card
            </button>
            <button
              onClick={() => setPaymentMethod("crypto")}
              className={`px-6 py-3 border ${
                paymentMethod === "crypto"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              Cryptocurrency
            </button>
          </div>
        </div>
        
        {/* Payment Form Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Order Summary */}
          <div className="bg-black border border-white/20 p-8">
            <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-white/70">Subscription Plan</span>
                <span className="font-medium">{subscriptionData.name || "Premium Package"}</span>
              </div>
              
              {/* Show initial payment */}
              <div className="flex justify-between">
                <span className="text-white/70">Initial Payment</span>
                <span>${subscriptionData.price || "249.95"}</span>
              </div>
              
              {/* Show recurring payment if it's different */}
              {subscriptionData.monthlyAmount && subscriptionData.monthlyAmount !== subscriptionData.price && (
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly Renewal</span>
                  <span>${subscriptionData.monthlyAmount}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-white/70">Billing Cycle</span>
                <span>{subscriptionData.cycle || "Monthly"}</span>
              </div>
              
              <div className="flex justify-between text-lg font-medium pt-4 border-t border-white/10">
                <span>Total Due Today</span>
                <span>${subscriptionData.price || "249.95"}</span>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-medium mb-3">Customer Information</h3>
              
              <div className="space-y-2 text-sm">
                <p className="flex">
                  <span className="text-white/70 w-24">Name:</span>
                  <span>{customerData.firstName} {customerData.lastName}</span>
                </p>
                <p className="flex">
                  <span className="text-white/70 w-24">Email:</span>
                  <span>{customerData.email}</span>
                </p>
                <p className="flex">
                  <span className="text-white/70 w-24">Address:</span>
                  <span>{customerData.address1}</span>
                </p>
                <p className="flex">
                  <span className="text-white/70 w-24"></span>
                  <span>{customerData.address2}</span>
                </p>
                <p className="flex">
                  <span className="text-white/70 w-24"></span>
                  <span>{customerData.city}, {customerData.state} {customerData.postal}</span>
                </p>
                <p className="flex">
                  <span className="text-white/70 w-24"></span>
                  <span>{customerData.country}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Side - Payment Form */}
          <div className="bg-black border border-white/20 p-8">
            {paymentMethod === "card" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Credit/Debit Card Payment</h2>
                
                <div className="space-y-5">
                  {/* Credit Card Number */}
                  <div>
                    <label htmlFor="cardNumber" className="block text-white/80 text-sm mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  {/* Card Holder Name */}
                  <div>
                    <label htmlFor="cardName" className="block text-white/80 text-sm mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="Name on card"
                    />
                  </div>
                  
                  {/* Expiry and CVC */}
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="cardExpiry" className="block text-white/80 text-sm mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="cardCvc" className="block text-white/80 text-sm mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">Visa</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">MasterCard</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">American Express</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">Discover</div>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {paymentMethod === "crypto" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Cryptocurrency Payment</h2>
                
                <div className="space-y-5">
                  {/* Cryptocurrency Selection */}
                  <div>
                    <label htmlFor="cryptoType" className="block text-white/80 text-sm mb-2">
                      Select Cryptocurrency
                    </label>
                    <select
                      id="cryptoType"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                    >
                      <option value="bitcoin" className="bg-black">Bitcoin (BTC)</option>
                      <option value="ethereum" className="bg-black">Ethereum (ETH)</option>
                      <option value="usdt" className="bg-black">Tether (USDT)</option>
                      <option value="usdc" className="bg-black">USD Coin (USDC)</option>
                    </select>
                  </div>
                  
                  {/* Wallet Address */}
                  <div className="mt-6 p-6 border border-white/30 bg-black/40 rounded text-center">
                    <h3 className="text-lg font-medium text-white mb-2">Scan to Pay</h3>
                    <div className="w-48 h-48 mx-auto bg-white/10 flex items-center justify-center mb-4">
                      <div className="text-xs text-white/60">QR Code will appear here</div>
                    </div>
                    <div className="text-white/80 text-sm">
                      <p className="mb-3">Send exact amount: <span className="font-medium">${subscriptionData.price || "79.99"} USD</span></p>
                      <p className="mb-3">Wallet address:</p>
                      <p className="font-mono text-xs bg-white/5 p-2 rounded break-all">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded text-white/70 text-sm mt-4">
                    <p>After sending the payment, click "Complete Payment" below. Your subscription will activate once the transaction is confirmed on the blockchain.</p>
                  </div>
                </div>
              </>
            )}
            
            {/* Payment Button - common for all methods */}
            <div className="pt-8 mt-6 border-t border-white/10">
              <button 
                onClick={() => {
                  // Simulate successful payment and redirect
                  navigate('/');
                }}
                className="w-full bg-white hover:bg-white/90 text-black py-4 text-center text-base font-semibold tracking-wide transition-colors"
              >
                Complete Payment
              </button>
              <div className="mt-4 text-center">
                <button 
                  onClick={() => navigate('/subscribe')}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  Return to subscription selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}