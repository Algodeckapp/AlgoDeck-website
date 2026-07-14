import { useEffect, useRef, useState } from 'react'
import { Trophy, Copy, Users, TrendingUp, MessageSquare, Star, Bot } from 'lucide-react'

export default function CommunityLeaderboard() {
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
      id="community"
      ref={sectionRef}
      className="bg-[#05070F] py-24 md:py-32 px-6 relative overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[#3A7BFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A7BFF]/30 bg-[#3A7BFF]/10 text-[#3A7BFF] text-sm font-semibold mb-6 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Trophy size={16} />
            <span>Trader Community</span>
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Trade Like the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]">Top 1%</span>
          </h2>
          <p className={`text-lg text-[#94A3B8] max-w-2xl mx-auto transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Join our vibrant community of algorithmic traders. Discover top-performing bots, gain insights, and instantly copy winning strategies to your own account.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Feature List (Left side) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 bg-[#3A7BFF]/20 rounded-xl flex items-center justify-center mb-4 text-[#3A7BFF]">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Leaderboards</h3>
              <p className="text-[#94A3B8]">See the highest-yielding bots created by the community. Filter by risk, timeframe, and asset class.</p>
            </div>

            <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '400ms' }}>
              <div className="w-12 h-12 bg-[#17B7BD]/20 rounded-xl flex items-center justify-center mb-4 text-[#17B7BD]">
                <Copy size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">1-Click Bot Cloning</h3>
              <p className="text-[#94A3B8]">Found a bot you like? Clone the exact algorithm and parameters directly into your workspace with a single tap.</p>
            </div>

            <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ transitionDelay: '500ms' }}>
              <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-4 text-[#8B5CF6]">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Social Insights</h3>
              <p className="text-[#94A3B8]">Discuss market trends, share backtest results, and collaborate with other developers and traders.</p>
            </div>
          </div>

          {/* Visual Mockup (Right side) */}
          <div className={`lg:col-span-7 relative transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C] shadow-2xl">
              {/* Fake UI Header */}
              <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
                <div className="flex gap-4 font-medium text-sm">
                  <span className="text-white border-b-2 border-[#3A7BFF] py-4">Top Performing Bots</span>
                  <span className="text-[#64748B] py-4">Trending Creators</span>
                </div>
              </div>
              
              {/* Leaderboard Rows */}
              <div className="p-6 space-y-4">
                {[
                  { rank: 1, name: 'Quantum Scalper Pro', creator: '@algotrader', gain: '+142.5%', color: '#00D084', copies: '2.4k' },
                  { rank: 2, name: 'EURUSD Momentum Bot', creator: '@fx_wizard', gain: '+98.2%', color: '#00D084', copies: '1.1k' },
                  { rank: 3, name: 'Crypto Swing Master', creator: '@hodler99', gain: '+75.4%', color: '#00D084', copies: '856' },
                  { rank: 4, name: 'Gold Grid Strategy', creator: '@metaltrader', gain: '+62.1%', color: '#00D084', copies: '432' },
                ].map((bot, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
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
                    <div className="flex items-center gap-8">
                      <div className="text-right hidden sm:block">
                        <div className="text-white font-bold" style={{ color: bot.color }}>{bot.gain}</div>
                        <div className="text-[10px] text-[#64748B] uppercase tracking-wider">30D Return</div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#3A7BFF]/10 hover:bg-[#3A7BFF]/20 text-[#3A7BFF] rounded-lg font-semibold text-sm transition-colors border border-[#3A7BFF]/30">
                        <Copy size={16} /> <span className="hidden sm:inline">Clone ({bot.copies})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Floating Elements */}
            <div className="absolute -right-6 -bottom-6 bg-[#05070F] border border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-[#00D084]/20 flex items-center justify-center text-[#00D084]">
                  <MessageSquare size={20} />
               </div>
               <div>
                 <div className="text-sm font-bold text-white">Join the Discussion</div>
                 <div className="text-xs text-[#94A3B8]">15k+ active traders</div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
