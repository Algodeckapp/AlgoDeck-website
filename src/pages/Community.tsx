import { useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Trophy, Copy, Users, TrendingUp, MessageSquare, Star, Bot, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router'

export default function Community() {
  useEffect(() => {
    // Optional: Add some entry animations if desired
  }, [])

  return (
    <div className="relative bg-[#05070F] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[#3A7BFF]/20 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Floating background elements */}
        <div className="absolute right-[10%] top-1/4 bg-[#0A0F2C]/60 backdrop-blur-xl border border-[#3A7BFF]/30 rounded-xl p-4 shadow-2xl z-0 animate-float hidden lg:block opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#3A7BFF] animate-pulse" />
            <div className="h-2 w-16 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="absolute left-[10%] bottom-1/4 bg-[#0A0F2C]/60 backdrop-blur-xl border border-[#17B7BD]/30 rounded-xl p-4 shadow-2xl z-0 animate-float-delayed hidden lg:block opacity-50">
          <div className="flex items-center gap-3">
            <div className="h-2 w-12 bg-white/20 rounded animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-[#17B7BD] animate-pulse" />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A7BFF]/30 bg-[#3A7BFF]/10 text-[#3A7BFF] text-sm font-semibold mb-6">
            <Users size={16} />
            <span>The AlgoDeck Community</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Trade Like the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]">Top 1%</span>
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto mb-10 leading-relaxed">
            Join thousands of algorithmic traders. Discover the highest-performing bots, gain real-time market insights, and instantly clone winning strategies with a single click.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/download" className="primary-button group">
              Join the Community
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#leaderboards" className="outline-button">
              View Leaderboards
            </a>
          </div>
        </div>
      </section>

      {/* Leaderboards Feature */}
      <section id="leaderboards" className="py-24 px-6 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-[#3A7BFF]/20 rounded-xl flex items-center justify-center mb-6 text-[#3A7BFF]">
                <Trophy size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Global Bot Leaderboards</h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                Stop guessing what works. Our global leaderboards rank the top-performing bots created by the community based on real, verifiable backtest and live trading data.
              </p>
              <ul className="space-y-4">
                {[
                  'Filter by asset class (Forex, Crypto, Indices)',
                  'Sort by Win Rate, Profit Factor, or Max Drawdown',
                  'Verified performance metrics straight from MT4/MT5',
                  'Follow your favorite creators and get notified of updates'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ShieldCheck className="text-[#00D084] shrink-0 mt-1" size={20} />
                    <span className="text-[#E2E8F0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Mockup for Leaderboards */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C]/80 backdrop-blur-md shadow-2xl">
              {/* Overlay Badge */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05070F]/40 backdrop-blur-[2px]">
                <div className="bg-[#05070F] border border-[#3A7BFF]/30 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                  <div className="w-2 h-2 rounded-full bg-[#3A7BFF] animate-pulse" />
                  <span className="text-sm font-bold text-white tracking-widest uppercase">Launching Q3 2026</span>
                </div>
              </div>

              <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
                <div className="flex gap-4 font-medium text-sm">
                  <span className="text-white border-b-2 border-[#3A7BFF] py-4">Top Performing Bots</span>
                  <span className="text-[#64748B] py-4">Trending Creators</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 opacity-50">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4 w-1/2">
                      <div className="w-8 text-center font-bold text-[#64748B]">#{i}</div>
                      <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-1/3 justify-end">
                      <div className="space-y-2 text-right w-16">
                        <div className="h-4 w-full bg-[#00D084]/20 rounded animate-pulse" />
                        <div className="h-2 w-3/4 ml-auto bg-white/5 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Cloning Feature */}
      <section className="py-24 px-6 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#17B7BD]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Mockup for Cloning */}
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C]/80 backdrop-blur-md p-8 shadow-2xl flex flex-col items-center justify-center">
               
               {/* Overlay Badge */}
               <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05070F]/40 backdrop-blur-[2px]">
                 <div className="bg-[#05070F] border border-[#17B7BD]/30 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
                   <div className="w-2 h-2 rounded-full bg-[#17B7BD] animate-pulse" />
                   <span className="text-sm font-bold text-white tracking-widest uppercase">Launching Q3 2026</span>
                 </div>
               </div>

               <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 relative opacity-50">
                 <div className="flex justify-between items-start mb-8">
                   <div className="space-y-3 w-1/2">
                     <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
                     <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse" />
                   </div>
                   <div className="h-6 w-24 bg-[#00D084]/20 rounded-full animate-pulse" />
                 </div>
                 
                 <div className="space-y-5 mb-8">
                   <div className="flex justify-between items-center">
                     <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                     <div className="h-3 w-24 bg-white/10 rounded animate-pulse" />
                   </div>
                   <div className="flex justify-between items-center">
                     <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
                     <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                   </div>
                   <div className="flex justify-between items-center">
                     <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                     <div className="h-3 w-16 bg-amber-400/20 rounded animate-pulse" />
                   </div>
                 </div>

                 <div className="w-full h-12 bg-[#3A7BFF]/20 rounded-xl animate-pulse" />
               </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 bg-[#17B7BD]/20 rounded-xl flex items-center justify-center mb-6 text-[#17B7BD]">
                <Copy size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">1-Click Bot Cloning</h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                Found a strategy that matches your trading style? With a single click, you can clone the exact algorithm and its optimized parameters directly into your own workspace.
              </p>
              <ul className="space-y-4">
                {[
                  'Instantly copy the logic blocks into your visual editor',
                  'Modify and tweak the cloned bot to fit your specific needs',
                  'Deploy the cloned bot directly to your broker account',
                  'Creators can earn rewards when their bots are cloned'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="text-[#17B7BD] shrink-0 mt-1" size={20} />
                    <span className="text-[#E2E8F0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Insights Feature */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5 relative">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6 text-[#8B5CF6] mx-auto">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Social Insights & Collaboration</h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            AlgoDeck isn't just a tool; it's a social network for algorithmic traders. Discuss market trends, share your backtest results, and collaborate with developers globally.
          </p>
        </div>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative">
           {/* Overlay Badge for Social */}
           <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#05070F]/40 backdrop-blur-[2px] rounded-2xl">
             <div className="bg-[#05070F] border border-[#8B5CF6]/30 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
               <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
               <span className="text-sm font-bold text-white tracking-widest uppercase">Launching Q3 2026</span>
             </div>
           </div>

           <div className="bg-[#0A0F2C]/80 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden opacity-50">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#3A7BFF]" />
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
               <div className="space-y-2 w-32">
                 <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                 <div className="h-2 w-2/3 bg-white/5 rounded animate-pulse" />
               </div>
             </div>
             <div className="space-y-3 mb-6">
               <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
               <div className="h-3 w-[90%] bg-white/10 rounded animate-pulse" />
               <div className="h-3 w-[75%] bg-white/10 rounded animate-pulse" />
             </div>
             <div className="flex gap-4">
               <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
               <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
             </div>
           </div>

           <div className="bg-[#0A0F2C]/80 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden opacity-50">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#17B7BD]" />
             <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse" />
               <div className="space-y-2 w-32">
                 <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                 <div className="h-2 w-2/3 bg-white/5 rounded animate-pulse" />
               </div>
             </div>
             <div className="space-y-3 mb-6">
               <div className="h-3 w-[95%] bg-white/10 rounded animate-pulse" />
               <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
               <div className="h-3 w-[60%] bg-white/10 rounded animate-pulse" />
             </div>
             <div className="flex gap-4">
               <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
               <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
