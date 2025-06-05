import { useLocation } from "wouter";

export default function TermsOfUse() {
  const [, setLocation] = useLocation();

  return (
    <div className="policy-page-container bg-[#1a1a1a] text-white min-h-screen">
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
            Terms of Use
          </h1>
          
          <div className="bg-black/30 border border-white/10 rounded-lg p-8">
            <p className="text-white/80 text-lg leading-relaxed">
              The Terms of Use document will be displayed here once provided.
            </p>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-white/60 text-sm">
                This document outlines the terms of use for the ZiNRAi platform and services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}