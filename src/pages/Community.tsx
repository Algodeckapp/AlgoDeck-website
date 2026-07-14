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
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C] shadow-2xl">
              <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
                <div className="flex gap-4 font-medium text-sm">
                  <span className="text-white border-b-2 border-[#3A7BFF] py-4">Top Performing Bots</span>
                  <span className="text-[#64748B] py-4">Trending Creators</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { rank: 1, name: 'Quantum Scalper Pro', creator: '@algotrader', gain: '+142.5%', color: '#00D084', copies: '2.4k' },
                  { rank: 2, name: 'EURUSD Momentum Bot', creator: '@fx_wizard', gain: '+98.2%', color: '#00D084', copies: '1.1k' },
                  { rank: 3, name: 'Crypto Swing Master', creator: '@hodler99', gain: '+75.4%', color: '#00D084', copies: '856' },
                  { rank: 4, name: 'Gold Grid Strategy', creator: '@metaltrader', gain: '+62.1%', color: '#00D084', copies: '432' },
                ].map((bot, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center font-bold text-[#64748B]">#{bot.rank}</div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center border border-white/10 text-white font-bold">
                        <Bot size={20} className="opacity-70" />
                      </div>
                      <div>
                        <div className="text-white font-semibold flex items-center gap-2">
                          {bot.name}
                          {i === 0 && <Star size={14} className="text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="text-xs text-[#64748B]">{bot.creator}</div>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-white font-bold" style={{ color: bot.color }}>{bot.gain}</div>
                      <div className="text-[10px] text-[#64748B] uppercase tracking-wider">30D Return</div>
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
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C] p-8 shadow-2xl flex flex-col items-center justify-center">
               <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                 <div className="flex justify-between items-start mb-6">
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1">Quantum Scalper Pro</h3>
                     <p className="text-sm text-[#94A3B8]">by @algotrader</p>
                   </div>
                   <div className="bg-[#00D084]/20 text-[#00D084] px-3 py-1 rounded-full text-xs font-bold">
                     +142.5% Return
                   </div>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Strategy Type</span>
                     <span className="text-white">Mean Reversion</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Timeframe</span>
                     <span className="text-white">M15</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Risk Profile</span>
                     <span className="text-amber-400">Medium</span>
                   </div>
                 </div>

                 <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#3A7BFF] hover:bg-[#2563EB] text-white rounded-xl font-bold transition-all hover:scale-[1.02]">
                   <Copy size={18} /> Clone Bot to Workspace
                 </button>
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

        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-[#05070F] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#3A7BFF]" />
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white">MR</div>
               <div>
                 <div className="text-sm font-bold text-white">Mike R.</div>
                 <div className="text-xs text-[#64748B]">2 hours ago</div>
               </div>
             </div>
             <p className="text-[#E2E8F0] text-sm leading-relaxed mb-4">
               Just backtested the new CPI volatility strategy on EURUSD. Seeing incredibly consistent results with a 2.5 profit factor on M5. Anyone else testing this logic block?
             </p>
             <div className="flex gap-4 text-xs font-bold text-[#64748B]">
               <span className="flex items-center gap-1 hover:text-[#3A7BFF] cursor-pointer"><MessageSquare size={14} /> 12 Replies</span>
               <span className="flex items-center gap-1 hover:text-red-400 cursor-pointer">❤️ 45 Likes</span>
             </div>
           </div>

           <div className="bg-[#05070F] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-[#17B7BD]" />
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white">SJ</div>
               <div>
                 <div className="text-sm font-bold text-white">Sarah J.</div>
                 <div className="text-xs text-[#64748B]">5 hours ago</div>
               </div>
             </div>
             <p className="text-[#E2E8F0] text-sm leading-relaxed mb-4">
               I've just published my Gold Grid Bot to the community. I added a new trailing stop mechanism that reduced max drawdown by 15%. Feel free to clone and tweak!
             </p>
             <div className="flex gap-4 text-xs font-bold text-[#64748B]">
               <span className="flex items-center gap-1 hover:text-[#3A7BFF] cursor-pointer"><MessageSquare size={14} /> 8 Replies</span>
               <span className="flex items-center gap-1 hover:text-red-400 cursor-pointer">❤️ 89 Likes</span>
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
