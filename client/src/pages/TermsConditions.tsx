import { useLocation } from "wouter";

export default function TermsConditions() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
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

          <h1 className="text-4xl font-bold mb-8 text-center">ZiNRAi MEMBER TERMS AND CONDITIONS</h1>
          <div className="text-center mb-8">
            <p className="text-white/80">Last Updated: June 1, 2025</p>
          </div>
          
          <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
              <p className="font-bold uppercase text-red-300 mb-4">Important Notice</p>
              <p>PLEASE READ THESE MEMBER TERMS AND CONDITIONS CAREFULLY. THESE MEMBER TERMS AND CONDITIONS REQUIRE THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMITS THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.</p>
            </div>

            <p>These Member Terms and Conditions together with your online Member enrollment application constitute the agreement between you ("You" or "Your") and ZiNRAi, LLC ("ZiNRAi", "We", "Us", or "Our") for the supply of products or services accessed on www.zinrai.com (the "Site") and affiliated or linked sites, including but not limited to free trials and/or membership-based subscription services. The ZiNRAi Terms of Use published at www.zinrai.com/termsAndConditions and the ZiNRAi Privacy Policy published at www.zinrai.com/privacyPolicy are incorporated into these Member Terms and Conditions. Your Membership is effective on the date We provide You with confirmation by email of Your Membership and We have received payment for Your initial Membership fees and Your first twenty-eight (28) days recurring fees ("Effective Date"). We reserve the right to request certified or notarized copies of original documents evidencing Your identity as a prospective Member before confirming Your Membership or at any time during Your Membership and may reject any application to subscribe in Our sole discretion.</p>

            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
              <p className="font-bold text-yellow-300 mb-2">For Residents of Quebec, Canada:</p>
              <p>ZiNRAi does not promote market or sell products or services to residents of Quebec, Canada. The account of any Member who is resident in or becomes a resident of Quebec or if ZiNRAi has a reasonable suspicion that the Member is resident in Quebec, will be terminated.</p>
            </div>

            <p>In consideration of Your payment of the initial and recurring Membership fees, We grant You the right to access and use Our products and services, to use the Site and, if applicable, to download and use any software included with Your Membership in accordance with these Member Terms and Conditions. We reserve all other rights.</p>

            <p>From time to time, ZiNRAi may change these Member Terms and Conditions. Except as specifically provided below regarding amendments to the Dispute Resolution Agreement, You agree that You will be bound by any changes to these Member Terms and Conditions thirty (30) days after notice of the amendment is emailed at the email address on file for You with ZiNRAi or is posted in the ZiNRAi back office. By continuing to use the products and services as a Member after the effective date of the amendment, You agree to the amended Member Terms and Conditions. You may opt out of any proposed amendments by terminating Your membership prior to the effective date of such proposed amendments. Your continued participation in any way as a Member on or after the effective date of any amendment constitutes acceptance of the amended Member Terms and Conditions. Amendments will not have a retroactive effect unless You have expressly agreed to such amendment.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Products and Services</h2>
            <p>We provide educational products and services primarily comprised of live interactive content (supplemented by pre-recorded video and content in other formats) for analyzing, learning and discussing generic information related to trading strategies. Information, products, and services provided through the Site are solely provided for educational purposes and are not personalized for the Member. Our products and services are intended to be used by those over the age of majority and are not suitable for minors. By enrolling to use Our services, You represent to Us that You are not a minor and that You can legally enter into this Agreement. We may terminate Your Membership if We become aware, or have a reasonable suspicion at any time that You are under the age of majority.</p>

            <p>Our products and services do not facilitate, nor offer access to online platforms for, investment or online trading in securities, currency (including cryptocurrencies), or other financial or investment products or services. ZiNRAi, its brand promoters ("BPs"), and educators do NOT (i) provide personalized recommendations or advice on investment strategy, (ii) provide any regulated financial services, act as a registered investment advisor or broker-dealer, (iii) provide access to trading or broker-dealers, or (iv) facilitate mirror trading.</p>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <p className="font-bold text-red-300 mb-2">Important Disclaimer:</p>
              <p>If You make, or plan to make, any investment or trade, You should seek independent financial advice from a professional to verify any information, including user-generated content, that You find on Our Site or in Our products or services. ZiNRAi is not liable for any loss or damage, including without limitation, any loss of profit, which may arise, directly or indirectly, from the use of or reliance on such information and/or ZiNRAi, BP, educator, or user-generated content.</p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
              <p className="font-bold text-blue-300 mb-2">For Residents of the UK:</p>
              <p>ZiNRAi, LLC., and its affiliates do not engage in activities regulated under The Financial Services and Markets Act 2000, including advising, making arrangements to enter into trades on behalf of consumers, or providing trading signals.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Membership Fees</h2>
            <p>You hereby authorize Us to (i) charge the initial Membership fee and the first twenty-eight (28) days' recurring Membership fee to the credit/debit card or other applicable payment method You provide or use with Your Membership application (the "Payment Method") on receipt of Your application to subscribe for Our products and/or services; and (ii) thereafter to automatically charge the Payment Method for each recurring Membership fee payment due and payable under these Member Terms and Conditions. By submitting the Payment Method with Your application, or any amendment to the Payment Method thereafter, You represent that You are the owner or authorized user of the Payment Method to be charged. You acknowledge and agree that it is Your responsibility to ensure the Payment Method remains valid at all times during Your Membership, and that You will provide to ZiNRAi all information necessary to allow Us to charge the Payment Method (or any valid, replacement credit or debit card) for all amounts due and payable by You to us. You further acknowledge and agree that if the Payment Method expires or otherwise becomes invalid for any reason during Your Membership or You otherwise fail to pay any fees when due, then Your access to Our products and services may be restricted and Your Membership may be suspended.</p>

            <p>Recurring Membership fees are charged every twenty-eight (28) days.</p>

            <p>All Membership fees are charged, and refunds processed, and paid in US dollars (USD). Your card issuer or Payment Method provider may apply fees for foreign currency transactions and may determine the applicable foreign exchange rate for Your transaction. We do not have any control over the application of international transaction or foreign exchange fees, or rates, and We are not responsible for any differential between the price charged by Us or refund paid by Us in USD and the total price charged to You or received by You in a foreign currency. If You pay using a digital currency, Your payment may be processed by Our affiliate, Assiduous Inc., on Our behalf.</p>

            <p>To the extent permitted by law We reserve the right to apply reasonable account maintenance fees and to charge these to Your Payment Method. We will advise You in advance of introducing any such charges by notice in writing.</p>

            <p>You may update Your Payment Method and other account information online in Your back office.</p>

            <p>Your authorization under these Member Terms and Conditions allows Us to adjust the scheduled charge to reflect any changes to the recurring Membership, other fees (if applicable), or taxes. We will notify You by email at least ten (10) days prior to making any charge if there is a change to the recurring Membership fee.</p>

            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="font-bold uppercase">ALL PAYMENT AUTHORIZATIONS REMAIN IN EFFECT UNTIL YOUR MEMBERSHIP IS CHANGED, OR CANCELED BY YOU OR BY US.</p>
              <p className="font-bold uppercase mt-2">ZiNRAi RESERVES THE RIGHT TO CHANGE THE PAYMENT METHODS IT ACCEPTS AT ANY TIME IN ITS SOLE DISCRETION.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Intellectual Property</h2>
            <p>The Site and all materials, including images, illustrations, designs, icons, photographs, video clips, software, and written and other materials that are part of the Site and/or are used in any live session (collectively, the "Contents") may be subject to copyrights, trademarks, trade dress, and/or other intellectual property owned, controlled, or licensed by us, one of Our affiliates, or by third parties who have licensed their materials to ZiNRAi and may be protected by U.S. and international copyright laws. Subject to Your compliance with these Member Terms and Conditions, and solely for so long as You are permitted by ZiNRAi, You may access, view, download, and print the Contents for Your personal, non-commercial use only; provided, however, that You (1) retain all copyright, trademark, or other proprietary designations contained on all Contents; (2) do not modify or alter the Contents in any way except as expressly permitted; and (3) do not provide or make available the Contents to any third party in a commercial manner. No right, title, or interest in any downloaded materials or software is transferred to You as a result of any such downloading or copying. You may not reproduce (except as noted above), publish, transmit, distribute, display, modify, create derivative works from, sell, or participate in any sale of or exploit in any way, in whole or in part, any of the Contents, the Site, or any related software.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">User Account, Comments, and Ideas</h2>
            <p>You certify that any content You provide on or through the Site, including Your participation in live educational sessions, is accurate and that the information You provide on or through the Site is complete.</p>

            <p>You are solely responsible for maintaining the confidentiality and security of Your Member account, including Your username and password. We are not responsible for any losses arising out of the unauthorized use of Your Member account. Intentional sharing of Your username and password may be grounds for Us to terminate Your Membership. You agree that We do not have any responsibility if You lose or share access to Your device or Your account. Any agreement between You and the issuer of Your credit card, debit card, or other Payment Method will continue to govern Your use of such Payment Method on the Site. You agree that We are not a party to any such agreement, nor are We responsible for the content, accuracy, or unavailability of any method used for payment.</p>

            <p>Except as otherwise provided by law or expressly stated in these Member Terms and Conditions, at any time without notice to You, We may (1) change, restrict access to, suspend, or discontinue the Site or any portion of the Site; or (2) change, modify, or waive any fees required to use any services, functionality, or other content available through the Site or any portion of the Site.</p>

            <p>We do not claim ownership of any questions, statements, comments, feedback, or reviews submitted or offered by You on or through this Site ("Comment(s)") or ideas, concepts, or know-how ("Ideas"). By making any Comment or disclosing Ideas, You agree that such Comment and/or Idea is non-confidential, non-proprietary, and may be disseminated or used by Us or other Members to enhance Our products and services without compensation to You. If You make a Comment or provide an Idea, You automatically grant or warrant that the owner of such content has expressly granted Us a royalty-free, perpetual, irrevocable, worldwide, unlimited, nonexclusive license to use, reproduce, create derivative works from, modify, publish, edit, translate, distribute, perform, and display (publicly or otherwise) the Comments and Ideas in any media or medium, or any form, format, or forum now known or hereafter developed.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Prohibited Conduct</h2>
            <p>You agree that You will not make any Comment or provide any Idea that is, in whole or in part, libelous; scandalous; inflammatory; discriminatory; defamatory; false; threatening; vulgar; obscene; pornographic; profane; abusive; harassing; invasive of another's privacy; hateful or bashing; aimed at gender, race, color, sexual orientation, national origin, religious views, or disability; in violation of local, state, national, or international law; or that infringes on, or violates, any right of any party.</p>

            <p>Additionally, You agree that in using Our products or services You will not: (a) make any Comment or provide any content that is an advertisement or solicitation of business; (b) disrupt the normal flow of dialogue or make a Comment or statement unrelated to the topic being discussed (unless it is clear the discussion is free-form); (c) post a chain letter; (d) impersonate another person; (e) distribute viruses or other harmful computer code; (f) harvest or otherwise collect information about others, including email addresses, without their consent; (g) post the same note more than once or engage in "spamming"; (h) share or sell Your account access, username, and password with or to third-parties; or (i) engage in any other conduct that restricts or inhibits any other person from using or enjoying the site, or which, in Our sole and exclusive judgment, exposes Us or any of Our officers, employees, contractors, brand promoters, licensors, partners, educators, or customers to any liability or detriment of any type, violates any policy posted on the Site or is intended to cause harm, damage, disable or otherwise interfere with Our business.</p>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <p className="font-bold text-red-300 mb-2">Strict Prohibition:</p>
              <p>Under no circumstances will You make any Comment or contribute any content that states or implies, directly or indirectly, that Our products and services facilitate, or offer access to online platforms for, investment or online trading in securities, currency (including cryptocurrencies), or other financial or investment products or services. You may not use Our products or services to provide personalized recommendations or advice on investment strategy, provide any regulated financial services, act as a registered investment advisor or broker-dealer, provide access to trading or brokers, or facilitate mirror trading.</p>
            </div>

            <p>You are solely responsible for any Comments You make, the consequences of making a Comment, and Your reliance on any Comments. We are not responsible for the consequences of any Comment, and while We do monitor the Site and live sessions on a random audit basis, We are not obliged to, and do not accept responsibility for screening or monitoring Comments.</p>

            <p>You agree that You will not, during any live session, on any social media platform, or otherwise, make any false, misleading, inaccurate, or unrepresentative claims regarding earning potential as a result of using ZiNRAi products or services, including but not limited to claims related to replacing income impacted by coronavirus or making income from trading activity in which You may engage outside of Your use of ZiNRAi products and/or services.</p>

            <p>You consent to us, at Our option, recording any live sessions You participate in and any Comment You make on the Site for the purposes of providing Our products and services and investigating any allegation that a Comment does not comply with these Member Terms and Conditions. We may remove or request the removal of Comments that are abusive, illegal, disruptive, outdated, or otherwise fail to comply with these Member Terms and Conditions.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-red-300">LIMITATION OF LIABILITY</h2>
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
              <p className="font-bold uppercase mb-4">YOU ACKNOWLEDGE AND AGREE THAT, TO THE FULLEST EXTENT PROVIDED BY APPLICABLE LAW, IN NO EVENT WILL ZiNRAi, OR ITS DIRECTORS, AFFILIATES, OFFICERS, EMPLOYEES, CONTRACTORS, BPs, AGENTS, OR OTHER REPRESENTATIVES BE LIABLE TO YOU OR TO ANY OTHER PERSON, FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE, CONSEQUENTIAL LOSSES OR DAMAGES, OR ANY OTHER LOSSES OR DAMAGES OF ANY KIND, ARISING OUT OF OR RELATED TO YOUR MEMBERSHIP OR USE OF ZiNRAi PRODUCTS OR SERVICES OR YOUR USE OF THE SITE, WHETHER IN TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE.</p>
              
              <p className="uppercase mb-4">TO THE FULLEST EXTENT PROVIDED BY APPLICABLE LAW, THIS DISCLAIMER APPLIES TO ANY DAMAGES OR INJURY ARISING FROM ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DELETION, DEFECTS, DELAY IN OPERATION OR TRANSMISSION, LOST PROFITS, LOSS OF GOODWILL, LOSS OF DATA, WORK STOPPAGE, ACCURACY OF RESULTS, COMPUTER FAILURE OR MALFUNCTION, COMPUTER VIRUSES, FILE CORRUPTION, COMMUNICATION FAILURE, NETWORK OR SYSTEM OUTAGE, THEFT, DESTRUCTION, UNAUTHORIZED ACCESS TO, ALTERATION OF, LOSS OF USE OF ANY RECORD OR DATA, AND ANY OTHER TANGIBLE OR INTANGIBLE LOSS.</p>
              
              <p className="uppercase mb-4">SUBJECT TO THE FOREGOING, TO THE FULLEST EXTENT PROVIDED BY APPLICABLE LAW, ZiNRAi WILL NOT BE LIABLE FOR ANY DAMAGES IN EXCESS OF THE MEMBERSHIP FEES PAID BY YOU IN CONNECTION WITH YOUR USE OF THE SITE AND YOUR MEMBERSHIP DURING THE SIX (6) MONTH PERIOD PRECEDING THE DATE ON WHICH THE CLAIM AROSE.</p>
              
              <p className="uppercase">YOU SPECIFICALLY ACKNOWLEDGE AND AGREE THAT, TO THE FULLEST EXTENT PROVIDED BY APPLICABLE LAW, ZiNRAi WILL NOT BE LIABLE FOR ANY DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF ANY MEMBER OR OTHER USER OF THE SITE.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Indemnification</h2>
            <p>You agree to defend, indemnify, and hold ZiNRAi and its shareholders, directors, officers, contractors, and employees harmless from and against any and all liabilities, claims, damages, costs, and expenses, including attorneys' fees and court costs, arising from or related to Your misuse of the Site, arising out of or in connection with Your actions or omissions as a Member or any breach by You of these Member Terms and Conditions. We reserve the right, at Our expense, to assume exclusive defense and control of any matter otherwise subject to indemnification by You and, in any case, You agree to cooperate with Us if and as requested by Us in the defense and settlement of such matter.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-red-300">DISPUTE RESOLUTION; AGREEMENT TO ARBITRATE; CLASS-ACTION WAIVER</h2>
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
              <p className="font-bold uppercase mb-4">READ THESE DISPUTE RESOLUTION TERMS CAREFULLY. THEY SUPERSEDE AND REPLACE ALL PRIOR TERMS FOR RESOLVING DISPUTES BETWEEN YOU AND ZiNRAi, REQUIRE YOU AND ZiNRAi TO ARBITRATE CERTAIN CLAIMS ("CLAIM(S)", AND LIMIT HOW YOU AND ZiNRAi CAN SEEK RELIEF FROM EACH OTHER. WITH LIMITED EXCEPTIONS, THESE TERMS PRECLUDE YOU AND ZiNRAi FROM SUING IN COURT OR PARTICIPATING IN A CLASS ACTION AND YOU AND ZiNRAi AGREE THAT ARBITRATION WILL BE SOLELY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS ARBITRATION, CLASS ACTION, OR ANY OTHER REPRESENTATIVE PROCEEDING. YOU AND ZiNRAi ARE EACH WAIVING THE RIGHT TO TRIAL BY A JURY. FOLLOW THE INSTRUCTIONS BELOW IN SECTION L IF YOU WISH TO OPT OUT OF THE REQUIREMENT TO ARBITRATE.</p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-300">A. Arbitration Agreement</h3>
            <p>THE PARTIES TO THESE MEMBER TERMS AND CONDITIONS MUTUALLY AGREE THAT ANY CLAIM OR DISPUTE BETWEEN THEM ARISING FROM OR RELATING TO THESE MEMBER TERMS AND CONDITIONS OR THE RIGHTS OF THE PARTIES UNDER THESE MEMBER TERMS AND CONDITIONS WHICH CANNOT BE RESOLVED BY INFORMAL DISPUTE RESOLUTION SHALL BE RESOLVED BY BINDING INDIVIDUAL ARBITRATION BEFORE A SINGLE ARBITRATOR ADMINISTERED BY THE AMERICAN ARBITRATION ASSOCIATION ("AAA"). The rules applicable to Claims between You and ZiNRAi shall be AAA's Consumer Arbitration Rules. The Consumer Arbitration Rules of the AAA are available at www.adr.org.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-300">L. 30-Day Right to Opt Out</h3>
            <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
              <p className="font-bold text-yellow-300 mb-2">Important: Right to Opt Out</p>
              <p>You have the right to opt out of arbitration by sending written notice of Your decision to opt out to the following address by mail: ZiNRAi, LLC, 30 Gould Street, Sheridan Wyoming 82801 within thirty (30) days of You first becoming subject to these Dispute Resolution Terms. Such notice must include the name of each person opting out and contact information for each such person, the specific products, or services used that are at issue, the email address that You used to set up Your ZiNRAi account (if You have one), and, if applicable, a copy of Your purchase receipt(s).</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-300">Termination</h2>
            <p>You may terminate Your Membership at any time, by giving ZiNRAi written notice at support@zinrai.com or by using the cancellation option in Your back office. If You cancel Your Membership You may continue to use the Site for the unused portion of the then current twenty-eight (28) day billing cycle. Your cancellation notice must be received at least five (5) business days prior to Your next charging date to ensure that no further charges are made.</p>

            <p>We also may terminate Your Membership at any time and may do so immediately without notice and deny You access to the Site if, in Our sole discretion, We determine that You have failed to comply with any term or provision of these Member Terms and Conditions ("Cause"). If We cancel Your Membership for Cause, no refund will be due to You. If We cancel Your Membership for reasons other than Cause, no refund or credit will be due to You except for the unused portion of the then current month's Membership fee.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-green-300">NOTICE OF CANCELLATION</h2>
            <div className="bg-green-900/20 border border-green-500/30 p-6 rounded-lg">
              <p className="font-bold text-green-300 mb-4">Cancellation Rights</p>
              <p>Except where applicable law requires otherwise, You may cancel this transaction, without penalty or obligation, for a full refund, if You provide a valid cancellation notice postmarked within seven (7) days from the date of enrollment, exclusive of the date of signing. Except where applicable law requires otherwise if You cancel after the seven (7) day period, You are not entitled to any refund. To cancel You must deliver via email to support@zinrai.com or via Your back office, a written and dated copy notice of cancellation.</p>
            </div>

            <div className="text-center mt-12 py-8 border-t border-white/20">
              <p className="text-white/60">© 2025 ZiNRAi, LLC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}