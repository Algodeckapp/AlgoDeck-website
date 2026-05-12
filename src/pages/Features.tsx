import { Bot, Zap, LineChart, Network, Shield, Bell, Target, TrendingUp, Check, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Features() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const features = [
    {
      icon: Bot,
      title: 'AI Strategy Creation',
      description: 'Turn plain English into executable trading strategies',
      details: [
        'Natural language input parsing',
        'AI-powered logic optimization',
        'Automated code generation',
        'Strategy health validation'
      ],
      tier: 'Pro & Elite',
      color: '#3A7BFF'
    },
    {
      icon: Target,
      title: 'Visual Builder',
      description: 'Build strategies without writing code',
      details: [
        'Drag-and-drop conditions',
        'Visual logic flows',
        'Real-time strategy preview',
        'Indicator library integration'
      ],
      tier: 'All Tiers',
      color: '#17B7BD'
    },
    {
      icon: LineChart,
      title: 'Backtesting',
      description: 'Test strategies on real historical data',
      details: [
        'Tick-perfect historical data',
        'Multi-timeframe analysis',
        'Monte Carlo simulations',
        'Detailed performance metrics'
      ],
      tier: 'All Tiers',
      color: '#8B5CF6'
    },
    {
      icon: Zap,
      title: 'Live Deployment',
      description: 'Deploy bots directly to MT4/MT5',
      details: [
        'Direct MetaAPI integration',
        'Zero-latency execution',
        'Automatic risk padding',
        'Server-side bot hosting'
      ],
      tier: 'All Tiers',
      color: '#00D084'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Track performance with deep metrics',
      details: [
        'Real-time equity curves',
        'Drawdown heatmaps',
        'Proprietary Alpha scores',
        'Exportable PDF reports'
      ],
      tier: 'All Tiers',
      color: '#3A7BFF'
    },
    {
      icon: Network,
      title: 'Multi-Account',
      description: 'Trade across multiple brokers',
      details: [
        'Unified control center',
        'Cross-account copying',
        'Broker-agnostic routing',
        'Up to 10 accounts (Elite)'
      ],
      tier: 'Pro & Elite',
      color: '#17B7BD'
    },
    {
      icon: Shield,
      title: 'Risk Guard',
      description: 'Protect capital with built-in controls',
      details: [
        'Dynamic position sizing',
        'Global account stop-loss',
        'News event protection',
        'Trailing guard system'
      ],
      tier: 'All Tiers',
      color: '#8B5CF6'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Stay informed of every market move',
      details: [
        'Instant push notifications',
        'Custom webhook support',
        'Daily performance briefs',
        'Critical system alerts'
      ],
      tier: 'All Tiers',
      color: '#00D084'
    }
  ]

  return (
    <>
      <Navigation />
      <div className="bg-[#05070F] min-h-screen pt-20 overflow-hidden">
        {/* Cinematic Hero */}
        <section className="relative py-20 md:py-32 px-6">
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24 relative z-10">
            <div className={`w-full lg:max-w-2xl text-center lg:text-left transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="section-eyebrow mb-4 block text-[#3A7BFF]">ADVANCED TECHNOLOGY</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Everything You Need to <br />
                <span className="gradient-text">Dominate Markets.</span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl mt-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Institutional-grade tools reimagined for the modern mobile trader. From natural language strategy building to professional-grade backtesting and risk management.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <a href="/download" className="glow-button !px-10">Get Started Now</a>
                <a href="#all-features" className="outline-button !px-10">Explore Grid</a>
              </div>
            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#3A7BFF]/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
                <img
                  src="/assets/your edge automated.png"
                  alt="AlgoDeck Interface"
                  className="relative w-full max-w-[550px] mx-auto h-auto rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/10 z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="all-features" className="py-24 px-6 bg-[#0A0F2C]/40 backdrop-blur-sm border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Core Capabilities</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <f.icon size={28} style={{ color: f.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{f.title}</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                      {f.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {f.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-[#64748B] group-hover:text-[#94A3B8] transition-colors">
                          <Check size={14} className="text-[#3A7BFF] mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A7BFF]">{f.tier}</span>
                    <ArrowRight size={14} className="text-[#3A7BFF] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase - App Focus */}
        <section className="py-24 md:py-40 px-6 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 md:gap-24">
            <div className="w-full lg:max-w-2xl">
              <span className="section-eyebrow mb-4 block text-[#17B7BD]">CENTRALIZED CONTROL</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
                Control Your Entire Empire <br />
                <span className="text-[#17B7BD]">From One App.</span>
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#17B7BD]/10 flex items-center justify-center text-[#17B7BD] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Network size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Multi-Broker Hub</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Connect to any broker worldwide. Manage multiple MT4 and MT5 accounts simultaneously without switching applications.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#3A7BFF]/10 flex items-center justify-center text-[#3A7BFF] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Live Performance Ticker</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Real-time profit and loss tracking with advanced drawdown metrics. See exactly how your bots are performing in every market cycle.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Security-First Connection</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Military-grade encryption for all API connections. Your broker credentials never leave our secure vault system.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#17B7BD]/20 to-[#3A7BFF]/20 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-1000" />
                <img
                  src="/assets/control from one app.png"
                  alt="Unified Control Center"
                  className="relative w-full max-w-[450px] mx-auto h-auto rounded-[30px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Unified CTA */}
        <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0F2C]/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Level Up?</h2>
            <p className="text-[#94A3B8] text-lg mb-12">
              Join the future of automated trading. Build your first strategy on mobile and deploy it globally in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <a href="/download" className="transition-transform hover:scale-105 active:scale-95">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  className="h-12 w-auto"
                />
              </a>
              <div className="relative group">
                <div className="absolute -top-3 -right-2 z-10">
                  <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
                </div>
                <div className="opacity-50 grayscale cursor-not-allowed">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              <Link to="/pricing" className="text-sm font-bold text-[#3A7BFF] hover:underline sm:ml-4">
                Compare Plans →
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

