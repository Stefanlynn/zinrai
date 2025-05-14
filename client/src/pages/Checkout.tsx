import { useState } from "react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [, setLocation] = useLocation();
  
  // Get subscription details from localStorage (would typically come from state or context in a real app)
  const subscriptionData = JSON.parse(localStorage.getItem("subscriptionData") || "{}");
  const customerData = JSON.parse(localStorage.getItem("customerData") || "{}");
  
  return (
    <div className="min-h-screen bg-black text-white pt-[32px]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-white/70">Choose your preferred payment method to complete your subscription</p>
        </div>
        
        {/* Payment Method Selection */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <button
              onClick={() => setPaymentMethod("card")}
              className={`px-6 py-3 border ${
                paymentMethod === "card"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              Credit Card
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
              
              <div className="flex justify-between">
                <span className="text-white/70">Billing Cycle</span>
                <span>{subscriptionData.cycle || "Monthly"}</span>
              </div>
              
              <div className="flex justify-between text-lg font-medium pt-4 border-t border-white/10">
                <span>Total</span>
                <span>${subscriptionData.price || "79.99"}</span>
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
            {paymentMethod === "card" ? (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Card Payment</h2>
                
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
                </div>
              </>
            ) : (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Cryptocurrency Payment</h2>
                
                <div className="space-y-6">
                  {/* Crypto Selection */}
                  <div>
                    <label htmlFor="cryptoType" className="block text-white/80 text-sm mb-2">
                      Select Cryptocurrency
                    </label>
                    <select
                      id="cryptoType"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                    >
                      <option value="BTC" className="bg-black">Bitcoin (BTC)</option>
                      <option value="ETH" className="bg-black">Ethereum (ETH)</option>
                      <option value="USDT" className="bg-black">Tether (USDT)</option>
                      <option value="USDC" className="bg-black">USD Coin (USDC)</option>
                    </select>
                  </div>
                  
                  {/* Wallet Display */}
                  <div className="border border-white/20 rounded p-5 bg-white/5">
                    <h3 className="text-sm mb-3 text-white/80">Send the exact amount to this address:</h3>
                    <div className="bg-black/50 p-4 rounded break-all font-mono text-white/90 mb-4">
                      bc1q8zk7dxgn0vf3z5ugd3w6lm5tczrwmxsnj5f69x
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Amount to pay: <strong>0.00324 BTC</strong></span>
                      <button className="text-sm underline hover:text-white/80">Copy Address</button>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded text-white/70 text-sm">
                    <p>After sending payment, please click the "I've Sent Payment" button below. 
                    Your subscription will be activated once the transaction is confirmed on the blockchain.</p>
                  </div>
                </div>
              </>
            )}
            
            {/* Payment Buttons */}
            <div className="mt-8">
              <button 
                className="w-full bg-black border-2 border-white text-white py-4 px-8 transition-all duration-300 focus:outline-none hover:bg-white hover:text-black text-base font-medium tracking-wide uppercase"
                onClick={() => {
                  // In a real app, this would process the payment
                  alert("Thank you for your payment! Your subscription has been activated.");
                  setLocation("/profile");
                }}
              >
                {paymentMethod === "card" ? "Pay Now" : "I've Sent Payment"}
              </button>
              
              <button 
                className="w-full text-white/60 py-3 text-sm mt-4 hover:text-white/90 transition-colors"
                onClick={() => setLocation("/subscribe")}
              >
                Return to previous step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}