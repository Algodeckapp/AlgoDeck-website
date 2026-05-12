import { useEffect, useRef, useState } from 'react'

export default function TradingViz() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(section)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#05070F] py-20 md:py-32 px-6 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Text Content */}
        <div 
          className={`w-full md:max-w-lg transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="section-eyebrow">ADVANCED VISUALIZATION</p>
          <h2 className="section-title text-3xl md:text-5xl lg:text-6xl">
            See the Market <br />
            <span className="gradient-text">Differently</span>
          </h2>
          <p className="section-subtitle text-lg mt-6">
            Your strategies, visualized in real-time. Every bot, every trade, every edge — live on your dashboard. Gain a competitive advantage with precision analytics and deep market insights.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-[#3A7BFF]/5 border border-[#3A7BFF]/10 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#3A7BFF]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3A7BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Real-time P&L</h4>
                <p className="text-[#94A3B8] text-xs">Live tracking across all accounts</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-[#17B7BD]/5 border border-[#17B7BD]/10 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-[#17B7BD]/10 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17B7BD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" /><path d="M18 17l-6-6-4 4-5-5" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Deep Analytics</h4>
                <p className="text-[#94A3B8] text-xs">Proprietary performance metrics</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div 
          className={`w-full md:w-1/2 transition-all duration-1000 delay-300 ${
            inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="relative group">
            <img
              src="/assets/see market differently.png"
              alt="Market Visualization"
              className="w-full h-auto rounded-[30px] shadow-[0_30px_100px_rgba(58,123,255,0.15)] border border-white/5"
            />
            
            {/* Overlay Badges */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#05070F]/60 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <a href="/download" className="transition-transform hover:scale-105 active:scale-95">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-10 w-auto"
                />
              </a>
              <div className="relative">
                <div className="absolute -top-2 -right-1 z-10 scale-75 origin-top-right">
                  <span className="badge badge-warning text-[8px] px-1.5 py-0">SOON</span>
                </div>
                <div className="opacity-40 grayscale cursor-not-allowed">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-9 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

