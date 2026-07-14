import React from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Sparkles } from 'lucide-react'

export default function ReferralFallback() {
  return (
    <div className="min-h-screen bg-[#05070F] flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-[#3A7BFF]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#17B7BD]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-[#0A0F2C]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]" />
            
            <div className="w-16 h-16 bg-[#3A7BFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#3A7BFF]/20">
              <Sparkles className="text-[#3A7BFF] w-8 h-8" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              You've been invited to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]">AlgoDeck!</span>
            </h1>
            
            <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
              Our mobile app is launching soon. Get ready to automate your trading empire directly from your phone.
            </p>

            <div className="relative">
              {/* Coming Soon Overlay Badge */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-[#05070F]/90 backdrop-blur-md border border-[#3A7BFF]/50 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(58,123,255,0.3)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3A7BFF] animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-widest uppercase">Coming Soon</span>
                </div>
              </div>

              {/* Disabled Store Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-30 grayscale pointer-events-none select-none">
                <div className="w-[180px] h-[52px] bg-black rounded-xl border border-white/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-full object-cover py-1"
                  />
                </div>
                <div className="w-[180px] h-[52px] bg-black rounded-xl border border-white/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-full object-cover py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
