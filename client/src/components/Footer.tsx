import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLocation } from "wouter";

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (path: string) => {
    setLocation(path);
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ZiNRAi™</h3>
            <p className="text-white/70 text-sm mb-4">
              Innovative digital learning platform for investment education and strategy analysis.
            </p>
            <div className="text-white/60 text-sm">
              <p>ZiNRAi LLC</p>
              <p>3333 Renaissance Blvd</p>
              <p>Suite #209</p>
              <p>Bonita Springs, FL 34134</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/product")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/partner")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Brand Promoter
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/culture")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Culture
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => handleNavigation("/privacy-policy")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/terms-conditions")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/terms-of-use")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/refund-policy")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Refund Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/cookie-policy")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation("/ibo-terms")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  IBO Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/zinrai?igsh=eDFmdGpzMWJ5MmY2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Follow ZiNRAi on Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a 
                href="https://www.facebook.com/share/15mCyH4b5F/?mibextid=LQQJ4d" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Follow ZiNRAi on Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a 
                href="https://www.youtube.com/@zinrai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Subscribe to ZiNRAi on YouTube"
              >
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="text-sm">
              <button 
                onClick={() => handleNavigation("/contact")}
                className="text-white/70 hover:text-white transition-colors block mb-2"
              >
                Contact Us
              </button>
              <button 
                onClick={() => handleNavigation("/documents")}
                className="text-white/70 hover:text-white transition-colors block"
              >
                Documents
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <p>&copy; 2025 ZiNRAi™ LLC. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs">
                Disclaimer: Investment education and analysis. Not financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}