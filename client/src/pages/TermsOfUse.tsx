export default function TermsOfUse() {
  return (
    <div className="bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#222222] h-12 flex items-center px-6 sticky top-0 z-10">
        <div className="text-lg font-light tracking-wider">ZiNRAi</div>
      </div>
      
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-invert max-w-none">
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