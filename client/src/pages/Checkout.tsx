import { useState } from "react";
import { useLocation } from "wouter";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "debit" | "ach" | "ewallet">("card");
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
              Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod("debit")}
              className={`px-6 py-3 border ${
                paymentMethod === "debit"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              Debit Card
            </button>
            <button
              onClick={() => setPaymentMethod("ach")}
              className={`px-6 py-3 border ${
                paymentMethod === "ach"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              ACH Transfer
            </button>
            <button
              onClick={() => setPaymentMethod("ewallet")}
              className={`px-6 py-3 border ${
                paymentMethod === "ewallet"
                  ? "border-white bg-white/10"
                  : "border-white/30 hover:border-white/60"
              } transition-colors`}
            >
              E-Wallets
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
              
              {subscriptionData.trackName && (
                <div className="flex justify-between">
                  <span className="text-white/70">Selected Track</span>
                  <span>{subscriptionData.trackName}</span>
                </div>
              )}
              
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
            {paymentMethod === "card" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Credit Card Payment</h2>
                
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
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {paymentMethod === "debit" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Debit Card Payment</h2>
                
                <div className="space-y-5">
                  {/* Debit Card Number */}
                  <div>
                    <label htmlFor="debitNumber" className="block text-white/80 text-sm mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="debitNumber"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  {/* Card Holder Name */}
                  <div>
                    <label htmlFor="debitName" className="block text-white/80 text-sm mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="debitName"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="Name on card"
                    />
                  </div>
                  
                  {/* Expiry and CVC */}
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="debitExpiry" className="block text-white/80 text-sm mb-2">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="debitExpiry"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="debitCvc" className="block text-white/80 text-sm mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="debitCvc"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  {/* No specific card type logos for debit card section */}
                </div>
              </>
            )}
            
            {paymentMethod === "ach" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">ACH Bank Transfer</h2>
                
                <div className="space-y-5">
                  {/* Bank Routing Number */}
                  <div>
                    <label htmlFor="routingNumber" className="block text-white/80 text-sm mb-2">
                      Routing Number
                    </label>
                    <input
                      type="text"
                      id="routingNumber"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="123456789"
                    />
                  </div>
                  
                  {/* Account Number */}
                  <div>
                    <label htmlFor="accountNumber" className="block text-white/80 text-sm mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      id="accountNumber"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="Account number"
                    />
                  </div>
                  
                  {/* Account Type */}
                  <div>
                    <label htmlFor="accountType" className="block text-white/80 text-sm mb-2">
                      Account Type
                    </label>
                    <select
                      id="accountType"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                    >
                      <option value="checking" className="bg-black">Checking</option>
                      <option value="savings" className="bg-black">Savings</option>
                      <option value="business" className="bg-black">Business</option>
                    </select>
                  </div>
                  
                  {/* Account Holder Name */}
                  <div>
                    <label htmlFor="achName" className="block text-white/80 text-sm mb-2">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      id="achName"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="Name on account"
                    />
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded text-white/70 text-sm">
                    <p>By authorizing this payment, you allow ZiNRAi to debit the account specified for the amount shown. This authorization will remain in effect until canceled.</p>
                  </div>
                </div>
              </>
            )}
            
            {paymentMethod === "ewallet" && (
              <>
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">E-Wallet Payment</h2>
                
                <div className="space-y-6">
                  {/* E-Wallet Selection */}
                  <div>
                    <label htmlFor="walletType" className="block text-white/80 text-sm mb-2">
                      Select E-Wallet
                    </label>
                    <select
                      id="walletType"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                    >
                      <option value="paypal" className="bg-black">PayPal</option>
                      <option value="applepay" className="bg-black">Apple Pay</option>
                      <option value="googlepay" className="bg-black">Google Pay</option>
                      <option value="venmo" className="bg-black">Venmo</option>
                    </select>
                  </div>
                  
                  {/* E-Wallet Email */}
                  <div>
                    <label htmlFor="walletEmail" className="block text-white/80 text-sm mb-2">
                      E-Wallet Email/Account
                    </label>
                    <input
                      type="email"
                      id="walletEmail"
                      className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">PayPal</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">Apple Pay</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">Google Pay</div>
                      <div className="px-3 py-1.5 border border-white/30 rounded text-sm text-white/70 hover:border-white/60 cursor-pointer transition-colors">Venmo</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded text-white/70 text-sm">
                    <p>After clicking "Pay Now", you'll be securely redirected to complete your payment with your selected e-wallet provider.</p>
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
                  navigate("/profile");
                }}
              >
                Pay Now
              </button>
              
              <button 
                className="w-full text-white/60 py-3 text-sm mt-4 hover:text-white/90 transition-colors"
                onClick={() => navigate("/subscribe")}
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