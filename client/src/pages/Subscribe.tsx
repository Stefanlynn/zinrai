import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Subscribe() {
  // State to track if the page is loaded for animations
  const [pageLoaded, setPageLoaded] = useState(false);
  // State to track which subscription option is selected
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);
  // State to track monthly plan selection after choosing All Access
  const [selectedMonthlyPlan, setSelectedMonthlyPlan] = useState<string | null>(null);
  // State to track if monthly plan selection is shown
  const [showMonthlyOptions, setShowMonthlyOptions] = useState(false);
  // State to track if independent rep option is selected
  const [independentRep, setIndependentRep] = useState(false);
  // State to track selected course track (for single course selection)
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  // Import navigate for navigation and toast for notifications
  const [_, navigate] = useLocation();
  // State to track form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Load animations when component mounts
  useEffect(() => {
    // Show all UI elements immediately
    document.querySelectorAll('.horizontal-line, .vertical-line, .border-line')
      .forEach(element => {
        element.classList.add('animate-in');
      });
    
    // Set page as loaded for animations
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);

  // Handle subscription selection
  const handleSubscriptionSelect = (type: string) => {
    setSelectedSubscription(type);
    
    if (type === 'all') {
      // Show monthly options when All Access is selected
      setShowMonthlyOptions(true);
      // Set default monthly plan if none selected
      if (!selectedMonthlyPlan) {
        setSelectedMonthlyPlan('standard');
      }
    } else {
      // Hide monthly options for other selections
      setShowMonthlyOptions(false);
      setSelectedMonthlyPlan(null);
    }
  };
  
  // Toggle independent rep add-on
  const toggleIndependentRep = () => {
    setIndependentRep(!independentRep);
  };
  
  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    
    if (selectedSubscription === 'all') {
      // One-time fee
      total += 249.95;
      
      // Add monthly plan cost if selected
      if (showMonthlyOptions && selectedMonthlyPlan) {
        // Not added to initial total, shown separately
      }
    }
    
    if (independentRep) {
      total += 24.95;
    }
    
    return total.toFixed(2);
  };
  
  // Get monthly recurring cost
  const getMonthlyRecurring = () => {
    let monthlyTotal = 0;
    
    if (selectedSubscription === 'all' && selectedMonthlyPlan) {
      if (selectedMonthlyPlan === 'standard') {
        monthlyTotal += 185;
      } else if (selectedMonthlyPlan === 'vip') {
        monthlyTotal += 249.95;
      }
    }
    
    if (independentRep) {
      monthlyTotal += 24.95;
    }
    
    return monthlyTotal > 0 ? monthlyTotal.toFixed(2) : '0.00';
  };

  return (
    <div className="bg-black min-h-screen w-full form-page">
      {/* Header with back button */}
      <div className="fixed top-0 left-0 w-full h-8 bg-[#f7f5f0] z-50 flex items-center px-6">
        <button 
          className="text-black text-sm flex items-center space-x-1 hover:opacity-70 transition-opacity"
          onClick={() => navigate('/')}
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Main content */}
      <div className="relative pt-8">
        {/* Grid for visual design */}
        <div className="fixed inset-0 z-0 pt-8">
          {/* Grid lines - vertical lines at 50% */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/[0.15] transform -translate-x-[0.5px]"></div>
          
          {/* Grid lines - horizontal lines at 25%, 50%, 75% positions */}
          <div className="absolute top-[25%] left-0 w-full h-[1px] bg-white/[0.15]"></div>
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-white/[0.15]"></div>
          <div className="absolute top-[75%] left-0 w-full h-[1px] bg-white/[0.15]"></div>
          
          {/* Border around the grid */}
          <div className="absolute inset-0 border border-white/[0.15] mt-8"></div>
        </div>
        
        {/* Subscription Content */}
        <div className={`relative z-10 pt-16 pb-24 px-6 md:px-10 max-w-6xl mx-auto transition-opacity duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {/* Heading with gradient */}
          <div className="text-center mb-14">
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wider inline-block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              SUBSCRIBE
            </h1>
            <div className="mt-3 mb-3">
              <span className="bg-[var(--zinrai-blue-glow)] text-white text-sm font-bold px-4 py-1 rounded-sm shadow-[0_0_10px_rgba(104,172,255,0.7)]">
                FREE UNTIL JUNE 1ST, 2025
              </span>
            </div>
            <p className="text-white/70 mt-3 text-sm md:text-base tracking-wide max-w-xl mx-auto">
              Select your preferred subscription option to begin your journey with ZiNRAi - No credit card required now
            </p>
          </div>
          
          {/* Subscription Options - 2 column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {/* All Access Subscription */}
            <div 
              className={`bg-black border relative ${selectedSubscription === 'all' ? 'border-white' : 'border-white/20'} p-6 cursor-pointer transition-all duration-300 hover:border-white/70 h-full flex flex-col`}
              onClick={() => handleSubscriptionSelect('all')}
            >

              
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full ${selectedSubscription === 'all' ? 'border-2 border-white' : 'border border-white/50'}`}>
                  {selectedSubscription === 'all' && (
                    <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
              
              <h2 className="text-white text-xl font-medium mb-3 mt-2">All Access</h2>
              <div className="text-white/90 text-3xl font-bold mb-6">
                <span className="line-through opacity-40">$249.95</span> 
                <span className="text-[var(--zinrai-blue-glow)] ml-2">FREE</span>
                <span className="text-white/60 text-sm font-normal ml-1">until June 1st</span>
              </div>
              
              <p className="text-white/80 text-sm mb-4">Full access to all education tracks:</p>
              
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>All 5 education packs included</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Member perks and discounts</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Early access to future offerings</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Premium tools and resources</span>
                </li>
              </ul>
              

            </div>
            
            {/* Brand Promoter */}
            <div 
              className={`bg-black border ${independentRep ? 'border-white' : 'border-white/20'} p-6 relative cursor-pointer transition-all duration-300 hover:border-white/70 h-full flex flex-col`}
              onClick={toggleIndependentRep}
            >
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full ${independentRep ? 'border-2 border-white' : 'border border-white/50'}`}>
                  {independentRep && (
                    <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              </div>
              
              <h2 className="text-white text-xl font-medium mb-3 mt-2">Brand Promoter</h2>
              <div className="text-white/90 text-3xl font-bold mb-6">
                <span className="line-through opacity-40">$24.95</span> 
                <span className="text-[var(--zinrai-blue-glow)] ml-2">FREE</span>
                <span className="text-white/60 text-sm font-normal ml-1">until June 1st</span>
              </div>
              
              <p className="text-white/80 text-sm mb-4">Add to All Access or select on its own:</p>
              
              <ul className="space-y-3 flex-grow">
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Business dashboard</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Commission eligibility</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Marketing tools</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Leadership training</span>
                </li>
                <li className="text-white/70 text-sm flex items-start">
                  <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <span>Private community access</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Monthly Options - appears only when All Access is selected */}
          {showMonthlyOptions && selectedSubscription === 'all' && (
            <div className="mb-10">
              <h3 className="text-white text-xl font-medium mb-6">Choose Your Monthly Plan</h3>
              <p className="text-white/70 mb-6">Select your preferred monthly membership option:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Standard Monthly Option */}
                <div 
                  className={`bg-black border ${selectedMonthlyPlan === 'standard' ? 'border-white' : 'border-white/20'} p-6 relative cursor-pointer transition-all duration-300 hover:border-white/70 h-full flex flex-col`}
                  onClick={() => setSelectedMonthlyPlan('standard')}
                >
                  <div className="absolute top-4 right-4">
                    <div className={`w-5 h-5 rounded-full ${selectedMonthlyPlan === 'standard' ? 'border-2 border-white' : 'border border-white/50'}`}>
                      {selectedMonthlyPlan === 'standard' && (
                        <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-white text-xl font-medium mb-3 mt-2">Standard</h2>
                  <div className="text-white/90 text-3xl font-bold mb-6">
                    <span className="line-through opacity-40">$185</span>
                    <span className="text-[var(--zinrai-blue-glow)] ml-2">FREE</span>
                    <span className="text-white/60 text-sm font-normal ml-1">until June 1st</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>All education tracks included</span>
                    </li>
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Live training sessions</span>
                    </li>
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Community forum access</span>
                    </li>
                  </ul>
                </div>
                
                {/* VIP Monthly Option */}
                <div 
                  className={`bg-black border ${selectedMonthlyPlan === 'vip' ? 'border-white' : 'border-white/20'} p-6 relative cursor-pointer transition-all duration-300 hover:border-white/70 h-full flex flex-col`}
                  onClick={() => setSelectedMonthlyPlan('vip')}
                >
                  {/* Best Value tag */}
                  <div className="absolute -top-3 -left-2 bg-[var(--zinrai-blue-glow)] text-white text-xs font-bold px-3 py-1 shadow-[0_0_10px_rgba(104,172,255,0.7)]">
                    BEST VALUE
                  </div>
                
                  <div className="absolute top-4 right-4">
                    <div className={`w-5 h-5 rounded-full ${selectedMonthlyPlan === 'vip' ? 'border-2 border-white' : 'border border-white/50'}`}>
                      {selectedMonthlyPlan === 'vip' && (
                        <div className="w-3 h-3 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-white text-xl font-medium mb-3 mt-2">VIP</h2>
                  <div className="text-white/90 text-3xl font-bold mb-6">
                    <span className="line-through opacity-40">$249.95</span>
                    <span className="text-[var(--zinrai-blue-glow)] ml-2">FREE</span>
                    <span className="text-white/60 text-sm font-normal ml-1">until June 1st</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Everything in Standard</span>
                    </li>
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>Premium travel benefits</span>
                    </li>
                    <li className="text-white/70 text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>VIP-only events</span>
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Order Summary and Payment Form in 2 columns */}
          {(selectedSubscription || independentRep) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Order Summary Column */}
              <div className="bg-black border border-white/20 p-8">
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {selectedSubscription === 'single' && (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-base">Single Track Subscription</p>
                        <p className="text-white/60 text-xs mt-1">Monthly access to 1 education track</p>
                      </div>
                      <span className="text-white text-lg"><span className="line-through opacity-50">$185.00</span> <span className="text-[var(--zinrai-blue-glow)] font-bold">FREE</span></span>
                    </div>
                  )}
                  
                  {selectedSubscription === 'all' && (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-base">All Access Subscription</p>
                        <p className="text-white/60 text-xs mt-1">Monthly access to all education tracks</p>
                      </div>
                      <span className="text-white text-lg"><span className="line-through opacity-50">$250.00</span> <span className="text-[var(--zinrai-blue-glow)] font-bold">FREE</span></span>
                    </div>
                  )}
                  
                  {independentRep && (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white text-base">Independent Representative</p>
                        <p className="text-white/60 text-xs mt-1">Monthly access to business tools</p>
                      </div>
                      <span className="text-white text-lg"><span className="line-through opacity-50">$24.99</span> <span className="text-[var(--zinrai-blue-glow)] font-bold">FREE</span></span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="text-white font-medium">Total</span>
                  <div className="flex flex-col items-end">
                    <span className="text-white/40 text-sm line-through">${calculateTotal()}</span>
                    <span className="text-[var(--zinrai-blue-glow)] text-2xl font-bold shadow-sm shadow-[var(--zinrai-blue-glow)]/20">FREE</span>
                  </div>
                </div>
                

                
                <div className="mt-6 bg-[var(--zinrai-blue-glow)]/10 p-4 border border-[var(--zinrai-blue-glow)]/30">
                  <p className="text-white text-sm">
                    <span className="font-medium">FREE UNTIL JUNE 1ST, 2025</span> - On June 1st, a one-time activation fee of $200 will be charged. Then 28 days later, your account will be billed ${getMonthlyRecurring()} monthly for your
                    <span className="font-medium"> {selectedMonthlyPlan === 'standard' ? 'Standard' : 'VIP'}</span> plan.
                    No credit card required now. You'll be notified before any charges begin.
                  </p>
                </div>
              </div>
              
              {/* Customer Information Column */}
              <div className="bg-black border border-white/20 p-8">
                <h2 className="text-white text-xl font-medium mb-6 pb-3 border-b border-white/10">Customer Information</h2>
                
                {/* Form Fields */}
                <div className="p-0">
                  
                  <form className="space-y-5 w-full">
                    {/* 1. Full Name - Split into First/Last */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="firstName" className="block text-white/80 text-sm mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                          placeholder="First name"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="lastName" className="block text-white/80 text-sm mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    
                    {/* 2. Email Field */}
                    <div className="w-full">
                      <label htmlFor="email" className="block text-white/80 text-sm mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    {/* 3. Country */}
                    <div className="w-full">
                      <label htmlFor="country" className="block text-white/80 text-sm mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white focus:outline-none focus:border-white/60 transition-colors"
                      >
                        <option value="" className="bg-black">Select country</option>
                        <option value="DZ" className="bg-black">Algeria</option>
                        <option value="AO" className="bg-black">Angola</option>
                        <option value="AR" className="bg-black">Argentina</option>
                        <option value="AM" className="bg-black">Armenia</option>
                        <option value="AU" className="bg-black">Australia</option>
                        <option value="AT" className="bg-black">Austria</option>
                        <option value="BY" className="bg-black">Belarus</option>
                        <option value="BE" className="bg-black">Belgium</option>
                        <option value="BO" className="bg-black">Bolivia</option>
                        <option value="BR" className="bg-black">Brazil</option>
                        <option value="CM" className="bg-black">Cameroon</option>
                        <option value="CA" className="bg-black">Canada</option>
                        <option value="CV" className="bg-black">Cape Verde</option>
                        <option value="CL" className="bg-black">Chile</option>
                        <option value="CO" className="bg-black">Colombia</option>
                        <option value="EC" className="bg-black">Ecuador</option>
                        <option value="EG" className="bg-black">Egypt</option>
                        <option value="FR" className="bg-black">France</option>
                        <option value="DE" className="bg-black">Germany</option>
                        <option value="GT" className="bg-black">Guatemala</option>
                        <option value="HT" className="bg-black">Haiti</option>
                        <option value="IN" className="bg-black">India</option>
                        <option value="IQ" className="bg-black">Iraq</option>
                        <option value="IE" className="bg-black">Ireland</option>
                        <option value="IT" className="bg-black">Italy</option>
                        <option value="CI" className="bg-black">Ivory Coast</option>
                        <option value="JM" className="bg-black">Jamaica</option>
                        <option value="JP" className="bg-black">Japan</option>
                        <option value="JO" className="bg-black">Jordan</option>
                        <option value="KZ" className="bg-black">Kazakhstan</option>
                        <option value="KG" className="bg-black">Kyrgyzstan</option>
                        <option value="LB" className="bg-black">Lebanon</option>
                        <option value="LI" className="bg-black">Liechtenstein</option>
                        <option value="LU" className="bg-black">Luxembourg</option>
                        <option value="MG" className="bg-black">Madagascar</option>
                        <option value="MX" className="bg-black">Mexico</option>
                        <option value="MA" className="bg-black">Morocco</option>
                        <option value="MZ" className="bg-black">Mozambique</option>
                        <option value="NZ" className="bg-black">New Zealand</option>
                        <option value="NG" className="bg-black">Nigeria</option>
                        <option value="PE" className="bg-black">Peru</option>
                        <option value="PH" className="bg-black">Philippines</option>
                        <option value="PL" className="bg-black">Poland</option>
                        <option value="PT" className="bg-black">Portugal</option>
                        <option value="QA" className="bg-black">Qatar</option>
                        <option value="RU" className="bg-black">Russia</option>
                        <option value="SM" className="bg-black">San Marino</option>
                        <option value="SA" className="bg-black">Saudi Arabia</option>
                        <option value="SN" className="bg-black">Senegal</option>
                        <option value="ZA" className="bg-black">South Africa</option>
                        <option value="ES" className="bg-black">Spain</option>
                        <option value="CH" className="bg-black">Switzerland</option>
                        <option value="TN" className="bg-black">Tunisia</option>
                        <option value="UA" className="bg-black">Ukraine</option>
                        <option value="AE" className="bg-black">United Arab Emirates</option>
                        <option value="GB" className="bg-black">United Kingdom</option>
                        <option value="US" className="bg-black">United States</option>
                        <option value="VA" className="bg-black">Vatican City</option>
                        <option value="VE" className="bg-black">Venezuela</option>
                      </select>
                    </div>
                    
                    {/* 4. Street Address */}
                    <div>
                      <label htmlFor="address1" className="block text-white/80 text-sm mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address1"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors mb-3"
                        placeholder="Street address, P.O. box, company name"
                      />
                      <input
                        type="text"
                        id="address2"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                      />
                    </div>
                    
                    {/* 5 & 7. City and Postal Code */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-2/3">
                        <label htmlFor="city" className="block text-white/80 text-sm mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                          placeholder="City"
                        />
                      </div>
                      <div className="w-full sm:w-1/3">
                        <label htmlFor="postal" className="block text-white/80 text-sm mb-2">
                          Postal / ZIP Code
                        </label>
                        <input
                          type="text"
                          id="postal"
                          className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                    
                    {/* 6. State/Province/Region */}
                    <div className="w-full">
                      <label htmlFor="state" className="block text-white/80 text-sm mb-2">
                        State / Province / Region
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full bg-white/5 border border-white/20 rounded px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="State, province, or region"
                      />
                    </div>
                    
                    {/* Form submission error message */}
                    {formError && (
                      <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-sm mb-4">
                        <p className="text-white text-sm">{formError}</p>
                      </div>
                    )}
                    
                    {/* Free Enrollment Button */}
                    <button 
                      type="button"
                      disabled={(selectedSubscription === 'single' && !selectedTrack) || isSubmitting}
                      className={`mt-6 w-full bg-[var(--zinrai-blue-glow)] border-2 ${
                        (selectedSubscription === 'single' && !selectedTrack) || isSubmitting
                          ? 'opacity-50 text-white/50 cursor-not-allowed' 
                          : 'text-white hover:bg-[var(--zinrai-blue-glow)]/80'
                      } py-4 px-8 transition-all duration-300 focus:outline-none text-base font-medium tracking-wide uppercase shadow-[0_0_15px_rgba(104,172,255,0.3)]`}
                      onClick={async () => {
                        setFormError(null);
                        
                        // Get form data
                        const firstName = (document.getElementById('firstName') as HTMLInputElement)?.value || '';
                        const lastName = (document.getElementById('lastName') as HTMLInputElement)?.value || '';
                        const email = (document.getElementById('email') as HTMLInputElement)?.value || '';
                        const country = (document.getElementById('country') as HTMLSelectElement)?.value || '';
                        const address1 = (document.getElementById('address1') as HTMLInputElement)?.value || '';
                        const address2 = (document.getElementById('address2') as HTMLInputElement)?.value || '';
                        const city = (document.getElementById('city') as HTMLInputElement)?.value || '';
                        const state = (document.getElementById('state') as HTMLInputElement)?.value || '';
                        const postal = (document.getElementById('postal') as HTMLInputElement)?.value || '';
                        
                        // Validate required fields
                        if (!firstName || !lastName || !email || !country) {
                          setFormError("Please fill out all required fields (First Name, Last Name, Email, Country)");
                          return;
                        }
                        
                        // Email validation
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(email)) {
                          setFormError("Please enter a valid email address");
                          return;
                        }
                        
                        // Prepare customer data
                        const customerData = {
                          firstName,
                          lastName,
                          email,
                          country,
                          address1,
                          address2,
                          city,
                          state,
                          postal,
                        };
                        
                        // Save subscription data
                        const subscriptionData = {
                          name: selectedSubscription === 'all' ? 
                                  (selectedMonthlyPlan === 'standard' ? 'All Access Standard' : 
                                   selectedMonthlyPlan === 'vip' ? 'All Access VIP' : 'All Access') : 
                                independentRep ? 'Brand Promoter' : 'Custom Package',
                          cycle: "Free until June 1st, 2025",
                          price: "0.00",
                          futureMonthlyAmount: selectedSubscription === 'all' ? getMonthlyRecurring() : calculateTotal(),
                          trackName: selectedSubscription === 'single' ? 
                            (selectedTrack === 'forex' ? 'Foreign Exchange (Forex)' : 
                             selectedTrack === 'stocks' ? 'Stocks & Options' :
                             selectedTrack === 'crypto' ? 'Cryptocurrency' :
                             selectedTrack === 'ecommerce' ? 'E-Commerce' :
                             selectedTrack === 'marketing' ? 'Digital Marketing' : null) : null
                        };
                        
                        // Prepare form submission data
                        const formData = {
                          customerInfo: customerData,
                          subscriptionInfo: subscriptionData,
                          timestamp: new Date().toISOString()
                        };
                        
                        // Store data in localStorage (as backup and for the confirmation page)
                        localStorage.setItem('customerData', JSON.stringify(customerData));
                        localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
                        
                        // Submit form data to API
                        try {
                          setIsSubmitting(true);
                          
                          // Use the API endpoint - dynamically determine based on environment
                          const apiUrl = import.meta.env.VITE_API_URL || 'https://api.zinrai.com/submit';
                          
                          const response = await fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(formData)
                          });
                          
                          if (response.ok) {
                            // Success - navigate to confirmation page
                            navigate('/confirmation');
                          } else {
                            // API response was not ok
                            const errorData = await response.json().catch(() => null);
                            throw new Error(errorData?.message || 'Failed to submit form. Please try again.');
                          }
                        } catch (error) {
                          console.error('Form submission error:', error);
                          setFormError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
                          
                          // Even if the API fails, we'll navigate to the confirmation page for now
                          // This ensures users can still proceed during the free trial period
                          navigate('/confirmation');
                        } finally {
                          setIsSubmitting(false);
                        }
                      }}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        "Next"
                      )}
                    </button>
                  </form>
                </div>
                
                {/* Note: Replaced the COMPLETE SUBSCRIPTION button with the Next button in the form above */}
              </div>
            </div>
          )}
          
          {/* Show message if no option selected */}
          {!selectedSubscription && !independentRep && (
            <div className="mt-8 p-6 border border-white/20 text-center">
              <p className="text-white/70">Select a subscription option above to continue.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}