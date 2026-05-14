import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { 
  Search, Book, Code, TrendingUp, PlayCircle, 
  Shield, HelpCircle, ChevronRight, ArrowLeft,
  CheckCircle2, AlertCircle, Info, ExternalLink,
  Cpu, Zap, Lock, Globe, Terminal, Smartphone
} from 'lucide-react'

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ElementType
  articles: string[]
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Quick start guides and initial setup',
    icon: PlayCircle,
    articles: [
      'Platform Overview',
      'Installation Guide',
      'Setting Up Your Account',
      'Connecting Your Broker',
      'Creating Your First Strategy',
    ],
  },
  {
    id: 'strategy-building',
    title: 'Strategy Building',
    description: 'Build and customize your trading strategies',
    icon: Code,
    articles: [
      'Strategy Builder Interface',
      'AI Natural Language Parser',
      'Technical Indicators Guide',
      'Entry & Exit Rules',
      'Position Sizing & Risk',
    ],
  },
  {
    id: 'backtesting',
    title: 'Backtesting',
    description: 'Test your strategies against historical data',
    icon: TrendingUp,
    articles: [
      'Running Your First Backtest',
      'Understanding Results',
      'Performance Metrics',
      'Optimization Techniques',
    ],
  },
  {
    id: 'live-trading',
    title: 'Live Trading',
    description: 'Deploy and monitor live trading bots',
    icon: Zap,
    articles: [
      'Going Live Checklist',
      'Paper vs Live Trading',
      'Monitoring Dashboard',
      'Emergency Procedures',
    ],
  },
  {
    id: 'account',
    title: 'Account & Security',
    description: 'Manage your settings and subscription',
    icon: Shield,
    articles: [
      'Subscription Plans',
      'Billing & Payments',
      'Security Best Practices',
      'API Keys Management',
    ],
  },
  {
    id: 'institutional',
    title: 'Institutional API',
    description: 'Advanced integration for firms',
    icon: Book,
    articles: [
      'API Authentication',
      'REST API Reference',
      'WebSocket Feeds',
      'Rate Limits',
    ],
  },
]

// Mapping of article titles to their detailed content
const articleContent: Record<string, React.ReactNode> = {
  'Platform Overview': (
    <div className="prose prose-invert max-w-none">
      <p className="text-lg text-[#94A3B8] leading-relaxed mb-6">
        AlgoDeck is a revolutionary mobile-first trading automation platform designed to democratize algorithmic trading. Built for both novice and professional traders, it removes the coding barrier from strategy development.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Smartphone size={18} className="text-[#3A7BFF]" /> Mobile First</h4>
          <p className="text-sm text-[#64748B]">Manage your entire trading empire from your phone. No desktop required for deployment or monitoring.</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Cpu size={18} className="text-[#17B7BD]" /> AI Powered</h4>
          <p className="text-sm text-[#64748B]">Leverage advanced LLMs to convert plain English ideas into high-performance execution logic.</p>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">Core Ecosystem</h3>
      <ul className="space-y-3 text-[#94A3B8]">
        <li className="flex gap-3"><CheckCircle2 size={18} className="text-[#00D084] mt-1 flex-shrink-0" /> <strong>Strategy Hub:</strong> Build and store your intellectual property.</li>
        <li className="flex gap-3"><CheckCircle2 size={18} className="text-[#00D084] mt-1 flex-shrink-0" /> <strong>Backtest Engine:</strong> Verify performance with tick-perfect historical data.</li>
        <li className="flex gap-3"><CheckCircle2 size={18} className="text-[#00D084] mt-1 flex-shrink-0" /> <strong>Execution Cloud:</strong> 24/7 low-latency bot hosting.</li>
      </ul>
    </div>
  ),
  'Connecting Your Broker': (
    <div className="prose prose-invert max-w-none">
      <p className="text-[#94A3B8] mb-6">AlgoDeck connects to your MetaTrader 4 (MT4) or MetaTrader 5 (MT5) accounts using secure, encrypted API bridges.</p>
      <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-8 flex gap-4">
        <AlertCircle className="text-amber-500 flex-shrink-0" size={24} />
        <p className="text-sm text-amber-200/80">Never share your master password. We recommend using a <strong>Trading Password</strong> (Investor passwords do not support automated execution).</p>
      </div>
      <h3 className="text-xl font-bold text-white mb-4">Connection Steps:</h3>
      <ol className="list-decimal pl-6 space-y-4 text-[#94A3B8]">
        <li>Open the AlgoDeck App and go to <strong>Settings &gt; Accounts</strong>.</li>
        <li>Tap <strong>Add Account</strong> and select your platform (MT4 or MT5).</li>
        <li>Enter your Broker Server name (e.g., IC Markets-Live 20).</li>
        <li>Provide your Account ID and Trading Password.</li>
        <li>Tap <strong>Verify Connection</strong>. Once green, your account is ready for bot deployment.</li>
      </ol>
    </div>
  ),
  'AI Natural Language Parser': (
    <div className="prose prose-invert max-w-none">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Plain English to Profit</h3>
      <div className="bg-[#0A0F2C] border border-[#3A7BFF]/30 p-8 rounded-3xl mb-8 relative">
        <div className="absolute -top-3 left-6 px-3 py-1 bg-[#3A7BFF] rounded-full text-[10px] font-black uppercase">User Input</div>
        <p className="text-xl italic text-white font-serif">"Buy 0.1 lots of Gold when the 14-period RSI crosses below 30 and the price is above the 200 EMA."</p>
      </div>
      <div className="flex justify-center mb-8"><ArrowLeft className="rotate-[270deg] text-[#3A7BFF]" /></div>
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
        <h4 className="text-[#00D084] font-bold mb-4 flex items-center gap-2"><Terminal size={18} /> AI Interpretation:</h4>
        <ul className="space-y-2 text-sm text-[#94A3B8]">
          <li><strong>Symbol:</strong> XAUUSD</li>
          <li><strong>Volume:</strong> 0.1 Lots (Fixed)</li>
          <li><strong>Condition 1:</strong> RSI(14) &lt; 30 (Cross-under)</li>
          <li><strong>Condition 2:</strong> Close &gt; EMA(200)</li>
        </ul>
      </div>
    </div>
  ),
  'Going Live Checklist': (
    <div className="prose prose-invert max-w-none">
      <h3 className="text-xl font-bold text-white mb-6">Before You Flip the Switch</h3>
      <div className="space-y-4">
        {[
          { t: 'Verify Backtest', d: 'Ensure your strategy has at least 100 trades in history with a positive profit factor.' },
          { t: 'Check Margin', d: 'Confirm your broker account has sufficient free margin for the bot\'s position sizing.' },
          { t: 'Stop-Loss Required', d: 'All live bots MUST have a hard stop-loss defined to prevent catastrophic loss.' },
          { t: 'Server Status', d: 'Check the Status Page to ensure the AlgoDeck Execution Cloud is fully operational.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="w-6 h-6 rounded-full bg-[#00D084]/20 text-[#00D084] flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle2 size={16} />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm mb-1">{item.t}</h5>
              <p className="text-xs text-[#64748B]">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  // Default fallback for unwritten articles
  'Default': (
    <div className="text-center py-20">
      <Info size={48} className="mx-auto text-[#3A7BFF] mb-6 opacity-20" />
      <h3 className="text-xl font-bold text-white mb-2">Content Under Construction</h3>
      <p className="text-[#64748B]">This article is currently being updated by our documentation team. Check back soon for the latest guides.</p>
    </div>
  )
}

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    window.scrollTo(0, 0)
  }, [selectedArticle])

  const filteredSections = useMemo(() => {
    if (!searchQuery) return docSections
    return docSections.map(section => ({
      ...section,
      articles: section.articles.filter(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(section => section.articles.length > 0 || section.title.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery])

  const currentContent = useMemo(() => {
    if (!selectedArticle) return null
    return articleContent[selectedArticle] || articleContent['Default']
  }, [selectedArticle])

  return (
    <div className="relative bg-[#05070F] min-h-screen">
      <Navigation />

      {selectedArticle ? (
        /* ARTICLE READER VIEW */
        <div className="pt-24 md:pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Sidebar Navigation */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 text-[#3A7BFF] font-bold text-sm mb-8 hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} /> Back to Docs
            </button>
            <div className="space-y-8">
              {docSections.map(s => (
                <div key={s.id}>
                  <h5 className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em] mb-4">{s.title}</h5>
                  <ul className="space-y-3">
                    {s.articles.map(a => (
                      <li key={a}>
                        <button 
                          onClick={() => setSelectedArticle(a)}
                          className={`text-xs text-left transition-colors hover:text-white ${selectedArticle === a ? 'text-[#3A7BFF] font-bold' : 'text-[#94A3B8]'}`}
                        >
                          {a}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className={`flex-1 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={() => setSelectedArticle(null)}
              className="md:hidden flex items-center gap-2 text-[#3A7BFF] font-bold text-sm mb-6"
            >
              <ArrowLeft size={16} /> All Docs
            </button>
            <nav className="flex items-center gap-2 text-[10px] text-[#64748B] uppercase tracking-widest mb-4">
              <span>Documentation</span>
              <ChevronRight size={10} />
              <span className="text-[#3A7BFF] font-bold">{selectedArticle}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">{selectedArticle}</h1>
            <div className="glass-panel p-8 md:p-12 border border-white/5 min-h-[400px]">
              {currentContent}
            </div>
            
            {/* Footer Pagination */}
            <div className="mt-12 flex justify-between items-center py-8 border-t border-white/5">
              <Link to="/support" className="text-sm text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2">
                <HelpCircle size={16} /> Still need help?
              </Link>
              <button className="text-sm text-[#3A7BFF] font-bold flex items-center gap-1">
                Next Article <ChevronRight size={16} />
              </button>
            </div>
          </main>
        </div>
      ) : (
        /* DOCS DASHBOARD VIEW */
        <>
          <section className="relative pt-32 pb-16 px-6">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/5 to-transparent pointer-events-none" />
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <span className="section-eyebrow mb-4 block">KNOWLEDGE BASE</span>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">Documentation</h1>
              <div className="relative max-w-2xl mx-auto group">
                <Search size={22} className="absolute left-6 top-1/2 -translate-y-1/2 text-[#64748B] group-focus-within:text-[#3A7BFF] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search features, setups, or indicators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 pl-16 pr-8 bg-[#0A0F2C] border border-white/10 rounded-2xl text-white outline-none focus:border-[#3A7BFF]/40 focus:ring-4 focus:ring-[#3A7BFF]/5 transition-all shadow-2xl"
                />
              </div>
            </div>
          </section>

          <section className="pb-32 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSections.map((s, idx) => (
                  <div 
                    key={s.id}
                    className={`glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#3A7BFF]/5 border border-[#3A7BFF]/10 flex items-center justify-center text-[#3A7BFF] mb-8 transition-transform group-hover:scale-110">
                      <s.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-[#64748B] text-sm mb-8 leading-relaxed">{s.description}</p>
                    
                    <ul className="space-y-3 border-t border-white/5 pt-6">
                      {s.articles.map(a => (
                        <li key={a}>
                          <button 
                            onClick={() => setSelectedArticle(a)}
                            className="flex items-center justify-between w-full text-sm text-[#94A3B8] hover:text-white transition-all group/item"
                          >
                            <span className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF]/30 group-hover/item:bg-[#3A7BFF] transition-colors" />
                              {a}
                            </span>
                            <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}

