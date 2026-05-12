import { Download as DownloadIcon, Smartphone, Wifi, HardDrive, CheckCircle2, Apple, PlayCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Download() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const brokers = [
    'IC Markets', 'Pepperstone', 'XM', 'FTMO', 'FX Choice',
    'Tickmill', 'Admiral Markets', 'OANDA', 'Forex.com', 'IG'
  ]

  return (
    <>
      <Navigation />
      <div className="bg-[#05070F] min-h-screen pt-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#17B7BD]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[#3A7BFF]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
            <div className={`w-full md:max-w-2xl text-center md:text-left transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="section-eyebrow mb-4 block">GET THE APP</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Trade Anytime, <br />
                <span className="gradient-text">Anywhere.</span>
              </h1>
              <p className="section-subtitle text-lg md:text-xl mt-8 max-w-xl mx-auto md:mx-0">
                AlgoDeck brings institutional-grade trading automation to your fingertips. Download the mobile app and start trading with AI-powered intelligence today.
              </p>
            </div>
            <div className={`w-full md:w-1/2 flex justify-center transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <img
                src="/assets/hero mockup.png"
                alt="AlgoDeck App"
                className="w-full max-w-[400px] md:max-w-[500px] h-auto rounded-[2.5rem] shadow-[0_40px_100px_rgba(58,123,255,0.15)] border border-white/10"
              />
            </div>
          </div>
        </section>

        {/* Download Grid */}
        <section className="relative z-10 py-20 px-6 bg-[#0A0F2C]/50 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Android Card */}
              <div className="glass-panel p-8 md:p-12 text-center border-2 border-[#3A7BFF]/30 shadow-[0_20px_50px_rgba(58,123,255,0.1)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A7BFF]/5 rounded-bl-full transition-all group-hover:scale-110" />
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3A7BFF] to-[#17B7BD] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#3A7BFF]/20">
                  <PlayCircle size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Android</h3>
                <p className="text-[#94A3B8] text-base mb-10">
                  The full AlgoDeck experience optimized for Android devices.
                </p>
                <a href="#" className="glow-button w-full flex items-center justify-center gap-3 !py-5 !text-base">
                  <DownloadIcon size={20} />
                  Google Play Store
                </a>
                <div className="mt-6 flex items-center justify-center gap-2 text-[#64748B] text-sm">
                  <Smartphone size={16} />
                  Requires Android 7.0+
                </div>
              </div>

              {/* iOS Card */}
              <div className="glass-panel p-8 md:p-12 text-center border border-white/10 relative overflow-hidden group opacity-90">
                <div className="badge badge-warning absolute top-6 right-6">COMING SOON</div>
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
                  <Apple size={40} className="text-[#94A3B8]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">iOS App Store</h3>
                <p className="text-[#94A3B8] text-base mb-8">
                  Join the waitlist to be first in line when we launch on iOS.
                </p>
                <form onSubmit={handleWaitlist} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-[#05070F] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  />
                  <button type="submit" className="outline-button w-full !py-4.5 !text-sm">
                    {submitted ? "You're on the list!" : "Join iOS Waitlist"}
                  </button>
                </form>
                <p className="mt-6 text-[#64748B] text-xs uppercase tracking-widest font-medium">
                  Expected Launch: Q3 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Stepper */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-20">Getting Started</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: '01', title: 'Download', desc: 'Install AlgoDeck from the Google Play Store.' },
                { num: '02', title: 'Onboard', desc: 'Create your account and complete the setup.' },
                { num: '03', title: 'Connect', desc: 'Securely link your MT4/MT5 broker account.' },
                { num: '04', title: 'Automate', desc: 'Deploy your first AI-powered bot in minutes.' }
              ].map((step, i) => (
                <div key={step.num} className="relative group">
                  <div className="text-6xl font-black text-white/5 absolute -top-8 -left-2 transition-colors group-hover:text-[#3A7BFF]/10">{step.num}</div>
                  <div className="relative z-10">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] mb-6 rounded-full" />
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs & Brokers Grid */}
        <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0F2C]/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* System Requirements */}
            <div className="lg:col-span-5 glass-panel p-10 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#3A7BFF] rounded-full" />
                System Requirements
              </h3>
              <div className="space-y-6">
                {[
                  { icon: Smartphone, label: 'Platform', text: 'Android 7.0 (Nougat) or higher' },
                  { icon: HardDrive, label: 'Storage', text: '120MB free disk space' },
                  { icon: Wifi, label: 'Network', text: 'Stable 4G/5G or WiFi connection' },
                  { icon: CheckCircle2, label: 'Broker', text: 'Valid MetaTrader 4 or 5 account' }
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#3A7BFF]">
                      <req.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#64748B] font-semibold mb-1">{req.label}</p>
                      <p className="text-white text-base">{req.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Brokers */}
            <div className="lg:col-span-7 glass-panel p-10 border border-white/5 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#17B7BD] rounded-full" />
                Supported Brokers
              </h3>
              <p className="text-[#94A3B8] mb-8 max-w-lg">
                AlgoDeck works with any broker that supports MetaTrader 4 or 5, ensuring you can automate your existing trading setup.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {brokers.map((broker) => (
                  <span key={broker} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs font-medium hover:bg-[#3A7BFF]/10 hover:border-[#3A7BFF]/30 transition-all cursor-default">
                    {broker}
                  </span>
                ))}
                <span className="px-4 py-2 bg-[#00D084]/10 border border-[#00D084]/30 rounded-full text-[#00D084] text-xs font-bold">
                  +200 MORE
                </span>
              </div>
              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`/assets/avatar-${i}.jpg`} alt="Trader" className="w-12 h-12 rounded-full border-4 border-[#0A0F2C] object-cover" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#0A0F2C] bg-[#3A7BFF] flex items-center justify-center text-white text-xs font-bold">+10k</div>
                </div>
                <p className="text-sm text-[#94A3B8] text-center sm:text-right">
                  Joined by thousands of <br className="hidden sm:block" /> professional traders worldwide
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

