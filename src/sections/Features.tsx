import { useEffect, useRef, useState } from 'react'
import { Bot, Zap, BarChart3, Link2, Cpu, Globe, Shield, Target } from 'lucide-react'

const mainFeatures = [
  {
    icon: Bot,
    title: 'AI Strategy Builder',
    description: 'Natural language to trading strategy. AI-powered optimization. No coding required.',
    color: '#3A7BFF'
  },
  {
    icon: Zap,
    title: 'Live Trading Bots',
    description: 'Deploy bots to MT4/MT5. Real-time execution. 24/7 automated trading.',
    color: '#17B7BD'
  },
  {
    icon: BarChart3,
    title: 'Advanced Backtesting',
    description: 'Test on historical data. Multiple timeframes. Detailed analytics.',
    color: '#8B5CF6'
  },
  {
    icon: Link2,
    title: 'Multi-Account Support',
    description: 'Multiple MT4/MT5 accounts. Trade across brokers. Centralized management.',
    color: '#00D084'
  },
]

const subFeatures = [
  { icon: Cpu, title: 'Cloud Infrastructure', desc: 'Zero-latency execution' },
  { icon: Globe, title: 'Global Markets', desc: 'Forex, Crypto, Commodities' },
  { icon: Shield, title: 'Secure & Private', desc: 'Military-grade encryption' },
  { icon: Target, title: 'Precision Accuracy', desc: 'Micro-second precision' },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="bg-[#05070F] py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] bg-[#3A7BFF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#17B7BD]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="section-eyebrow mb-4 block">PLATFORM CAPABILITIES</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Institutional Power, <br />
            <span className="gradient-text">In Your Pocket.</span>
          </h2>
          <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed">
            Experience the most advanced mobile trading automation platform ever built. 
            Everything you need to automate your empire, from strategy creation to global deployment.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column - Features */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            {mainFeatures.slice(0, 2).map((f, i) => (
              <div 
                key={f.title} 
                className={`glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>

          {/* Center Column - Image Showcase */}
          <div className={`lg:col-span-4 flex justify-center order-1 lg:order-2 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-[#3A7BFF] to-[#17B7BD] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <img
                src="/assets/muilt bot controll center.png"
                alt="Multi Bot Control Center"
                className="relative w-full max-w-[320px] md:max-w-[360px] h-auto rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-white/10 z-10"
              />
              {/* Floating badges */}
              <div className="absolute -right-8 top-1/4 bg-[#0A0F2C] border border-[#3A7BFF]/30 rounded-xl p-3 shadow-2xl z-20 animate-float hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">4 Active Bots</span>
                </div>
              </div>
              <div className="absolute -left-12 bottom-1/4 bg-[#0A0F2C] border border-[#17B7BD]/30 rounded-xl p-3 shadow-2xl z-20 animate-float-delayed hidden md:block">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#17B7BD] uppercase tracking-wider whitespace-nowrap">+12.4% ROI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="lg:col-span-4 space-y-6 order-3 lg:order-3">
            {mainFeatures.slice(2, 4).map((f, i) => (
              <div 
                key={f.title} 
                className={`glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                style={{ transitionDelay: `${(i + 2) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon size={24} style={{ color: f.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-features Ticker/Grid */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-12 border-t border-white/5 transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {subFeatures.map((sf) => (
            <div key={sf.title} className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#94A3B8] group-hover:text-[#3A7BFF] transition-colors">
                <sf.icon size={20} />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">{sf.title}</h4>
                <p className="text-[#64748B] text-xs mt-1">{sf.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

