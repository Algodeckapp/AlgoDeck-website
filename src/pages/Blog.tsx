import { useState, useEffect, useMemo } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Newspaper, BarChart3, Search, ArrowLeft, User, Share2, Bookmark, CheckCircle2, AlertCircle } from 'lucide-react'

export default function Blog() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All Posts')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    setLoaded(true)
    window.scrollTo(0, 0)
  }, [selectedPost])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => setSubscribed(false), 3000)
  }

  const featuredPost = {
    title: 'Introducing AI Strategy Optimization: The Future of Algorithmic Trading',
    excerpt: 'Discover how our new AI-powered optimization engine can automatically fine-tune your trading strategies for maximum performance across different market conditions.',
    category: 'Platform Updates',
    date: 'May 1, 2026',
    readTime: '8 min read',
    image: '/assets/strategy optinization.png',
    author: 'Tony Chris',
    authorRole: 'CEO of AlgoDeck',
  }

  const blogPosts = [
    {
      title: 'The Relaxed Trader: How Automation Ends Trading Stress',
      excerpt: 'Discover how switching to automated strategies can eliminate emotional decision-making and give you back your time without sacrificing performance.',
      category: 'Trading Tips',
      date: 'May 5, 2026',
      readTime: '7 min read',
      image: '/assets/relaxed trader.png',
      author: 'Tony Chris',
    },
    {
      title: '5 Trading Strategies Every Beginner Should Know',
      excerpt: 'Learn the foundational strategies that successful traders use to build their trading careers, from trend following to mean reversion.',
      category: 'Tutorials',
      date: 'April 28, 2026',
      readTime: '6 min read',
      image: '/assets/beginer strategies.png',
      author: 'Sarah Chen',
    },
    {
      title: 'How to Backtest Your Trading Strategy Properly',
      excerpt: 'A comprehensive guide to backtesting that helps you avoid common pitfalls and get accurate performance metrics for your strategies.',
      category: 'Tutorials',
      date: 'April 25, 2026',
      readTime: '10 min read',
      image: '/assets/blog image 2.png',
      author: 'James Wilson',
    },
    {
      title: 'AlgoDeck vs Manual Trading: Performance Comparison',
      excerpt: 'Real data from 1,000+ traders showing how algorithmic trading with AlgoDeck compares to manual trading in terms of consistency and returns.',
      category: 'Case Studies',
      date: 'April 22, 2026',
      readTime: '7 min read',
      image: '/assets/blog image 3.png',
      author: 'Elena K.',
    },
    {
      title: 'Strategy Factory: Mass-Producing High-Performance Bots',
      excerpt: 'Learn the industrial approach to trading automation. Discover how to build, test, and filter dozens of strategies to find the true statistical edges.',
      category: 'Trading Tips',
      date: 'April 19, 2026',
      readTime: '9 min read',
      image: '/assets/strategy factory.png',
      author: 'Tony Chris',
    },
    {
      title: 'New Feature: Multi-Timeframe Analysis',
      excerpt: 'Analyze multiple timeframes simultaneously to make better trading decisions and improve your strategy performance.',
      category: 'Platform Updates',
      date: 'April 16, 2026',
      readTime: '5 min read',
      image: '/assets/tested across time.png',
      author: 'Marcus T.',
    },
    {
      title: 'Getting Started with MT4/MT5 Integration',
      excerpt: 'Step-by-step guide to connecting your MetaTrader account to AlgoDeck and deploying your first automated trading bot.',
      category: 'Tutorials',
      date: 'April 13, 2026',
      readTime: '12 min read',
      image: '/assets/mt4&mt5 integration.png',
      author: 'Sarah Chen',
    },
  ]

  // Category calculation
  const categories = useMemo(() => {
    const allPosts = [featuredPost, ...blogPosts]
    const counts = allPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return [
      { name: 'All Posts', icon: Newspaper, count: allPosts.length },
      { name: 'Tutorials', icon: BookOpen, count: counts['Tutorials'] || 0 },
      { name: 'Trading Tips', icon: TrendingUp, count: counts['Trading Tips'] || 0 },
      { name: 'Platform Updates', icon: BarChart3, count: counts['Platform Updates'] || 0 },
      { name: 'Case Studies', icon: BarChart3, count: counts['Case Studies'] || 0 },
    ]
  }, [blogPosts, featuredPost])

  // Filter logic
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery, blogPosts])

  // Detailed Article Content Mapping
  const articleContents: Record<string, React.ReactNode> = {
    'Introducing AI Strategy Optimization: The Future of Algorithmic Trading': (
      <article className="prose prose-invert max-w-none">
        <p className="text-xl text-[#94A3B8] leading-relaxed mb-10">
          The biggest challenge in algorithmic trading isn't coming up with an idea—it's finding the exact parameters that turn a "good" idea into a consistent profit-generator. Today, we're changing that forever.
        </p>
        <h3 className="text-2xl font-bold text-white mb-6">The Multi-Dimensional Optimization Problem</h3>
        <p className="text-[#94A3B8] mb-8">
          Traditional optimization takes hours, even days. You have to manually run tests for RSI periods, EMA lengths, and stop-loss levels. AlgoDeck's new AI Engine does this in parallel across thousands of variations, using genetic algorithms to evolve your strategy toward its peak performance.
        </p>
        <div className="bg-[#3A7BFF]/5 border border-[#3A7BFF]/20 p-8 rounded-3xl mb-10">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2"><CheckCircle2 size={18} className="text-[#3A7BFF]" /> Key Benefits</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#94A3B8]">
            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF] mt-2 flex-shrink-0" /> Zero Curve-Fitting Protection</li>
            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF] mt-2 flex-shrink-0" /> Out-of-Sample Validation</li>
            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF] mt-2 flex-shrink-0" /> 100x Faster than Manual Testing</li>
            <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF] mt-2 flex-shrink-0" /> Intelligent Parameter Suggestion</li>
          </ul>
        </div>
        <p className="text-[#94A3B8]">
          "We didn't just build a faster backtester; we built a brain for your trading bots," says Tony Chris, CEO of AlgoDeck. "Our goal is to let the AI handle the math so you can focus on the market vision."
        </p>
      </article>
    ),
    'The Relaxed Trader: How Automation Ends Trading Stress': (
      <article className="prose prose-invert max-w-none">
        <p className="text-xl text-[#94A3B8] leading-relaxed mb-10 italic">
          "I used to wake up at 3 AM to check the London open. Now, I wake up when I'm rested, knowing my bots handled the volatility for me."
        </p>
        <h3 className="text-2xl font-bold text-white mb-6">The Psychology of the Manual Grind</h3>
        <p className="text-[#94A3B8] mb-8">
          Manual trading is inherently stressful because every pip represents a personal decision. When you automate with AlgoDeck, you're not just saving time; you're preserving your mental capital. By building a "Strategy Factory," you shift your role from an emotional executioner to a detached portfolio manager.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-[#17B7BD] font-bold mb-2">No Revenge Trading</h4>
            <p className="text-xs text-[#64748B]">Bots don't get angry at a loss. They follow the math, period.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-[#3A7BFF] font-bold mb-2">Life Beyond the Charts</h4>
            <p className="text-xs text-[#64748B]">Deploy on mobile and walk away. Get push alerts only for critical events.</p>
          </div>
        </div>
        <p className="text-[#94A3B8]">
          Becoming a relaxed trader isn't about ignoring the markets—it's about trusting your rules. Automation is the bridge to that trust.
        </p>
      </article>
    ),
    'Strategy Factory: Mass-Producing High-Performance Bots': (
      <article className="prose prose-invert max-w-none">
        <h3 className="text-3xl font-bold text-white mb-8">The Industrial Approach to Trading</h3>
        <p className="text-[#94A3B8] mb-8">
          Most traders fall in love with a single strategy and try to make it work forever. The "Strategy Factory" mindset treats strategies like products on an assembly line. Build 10, backtest them all, discard 9, and deploy the 1 that actually shows a statistical edge.
        </p>
        <div className="bg-[#05070F] border border-white/10 p-8 rounded-3xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A7BFF]/5 rounded-bl-full blur-2xl" />
          <h4 className="text-white font-bold mb-6">The Assembly Line Flow:</h4>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#3A7BFF] flex items-center justify-center text-white font-bold text-xs">1</div>
              <p className="text-sm text-[#94A3B8] mt-1"><strong>Hypothesis:</strong> Generate ideas using the AI Strategy Builder.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#17B7BD] flex items-center justify-center text-white font-bold text-xs">2</div>
              <p className="text-sm text-[#94A3B8] mt-1"><strong>Filtering:</strong> Run rapid backtests to find initial positive expectancy.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs">3</div>
              <p className="text-sm text-[#94A3B8] mt-1"><strong>Hardening:</strong> Apply stress tests and Monte Carlo simulations.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00D084] flex items-center justify-center text-white font-bold text-xs">4</div>
              <p className="text-sm text-[#94A3B8] mt-1"><strong>Deployment:</strong> Push to the cloud and monitor via the multi-bot dashboard.</p>
            </div>
          </div>
        </div>
      </article>
    ),
    'Default': (
      <article className="prose prose-invert max-w-none py-20 text-center">
        <BookOpen size={48} className="mx-auto text-[#3A7BFF] mb-6 opacity-20" />
        <h3 className="text-2xl font-bold text-white mb-4">Detailed Article Coming Soon</h3>
        <p className="text-[#94A3B8] max-w-md mx-auto">
          We are currently writing the full narrative for this topic. Stay tuned for expert insights and technical deep-dives into the AlgoDeck ecosystem.
        </p>
      </article>
    )
  }

  const currentPost = useMemo(() => {
    if (!selectedPost) return null
    const allPosts = [featuredPost, ...blogPosts]
    return allPosts.find(p => p.title === selectedPost)
  }, [selectedPost, blogPosts, featuredPost])

  return (
    <>
      <Navigation />
      <div className="bg-[#05070F] min-h-screen pt-20 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none" />

        {selectedPost && currentPost ? (
          /* READER VIEW */
          <div className="relative z-10 pt-16 md:pt-24 pb-32 px-6">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs & Back */}
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-[#3A7BFF] font-bold text-sm mb-12 hover:gap-3 transition-all group"
              >
                <ArrowLeft size={16} /> Back to Blog
              </button>

              {/* Post Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className="badge badge-primary">{currentPost.category}</span>
                  <div className="flex items-center gap-4 text-xs text-[#64748B] uppercase tracking-widest font-bold">
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {currentPost.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} /> {currentPost.readTime}</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                  {currentPost.title}
                </h1>
                
                {/* Author bar */}
                <div className="flex items-center justify-between py-8 border-y border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3A7BFF]/10 flex items-center justify-center text-[#3A7BFF] font-bold border border-[#3A7BFF]/20">
                      {currentPost && 'author' in currentPost ? (currentPost as any).author.split(' ').map((n: any) => n[0]).join('') : 'TC'}
                    </div>
                    <div>
                      <div className="text-white font-bold">{currentPost && 'author' in currentPost ? (currentPost as any).author : 'Tony Chris'}</div>
                      <div className="text-[#64748B] text-xs">{currentPost && 'authorRole' in currentPost ? (currentPost as any).authorRole : 'Expert Trader'}</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"><Share2 size={18} /></button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"><Bookmark size={18} /></button>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="mb-16 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/10">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title} 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Article Body */}
              <div className="glass-panel p-8 md:p-16 border border-white/5 leading-relaxed">
                {selectedPost && articleContents[selectedPost] ? articleContents[selectedPost] : articleContents['Default']}
              </div>

              {/* Newsletter Inline */}
              <div className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-[#0A0F2C] to-[#1A1F3A] border border-[#3A7BFF]/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Enjoyed this article?</h3>
                <p className="text-[#94A3B8] mb-8">Join our newsletter to get high-performance strategy breakdowns delivered to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-3">
                  <input type="email" placeholder="Email address" className="flex-1 bg-[#05070F] border border-white/10 rounded-xl px-4 text-white outline-none focus:border-[#3A7BFF]/40" required />
                  <button type="submit" className="glow-button !py-3">Join</button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <>
            {/* Hero Section */}
            <section className="relative z-10 pt-16 md:pt-24 pb-12 px-6 text-center">
              <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <span className="section-eyebrow mb-4 block">KNOWLEDGE CENTER</span>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
                  The AlgoDeck <span className="gradient-text">Blog</span>
                </h1>
                <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Master the markets with expert trading strategies, technical insights, and platform updates.
                </p>
                <div className="mt-12 relative max-w-xl mx-auto">
                  <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#64748B]" />
                  <input 
                    type="text" 
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 pl-14 pr-6 bg-[#0A0F2C] border border-white/10 rounded-2xl text-white outline-none focus:border-[#3A7BFF]/40"
                  />
                </div>
              </div>
            </section>

            {/* Categories Bar */}
            <section className="relative z-10 py-12 px-6">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3">
                {categories.map((c) => {
                  const isActive = activeCategory === c.name
                  return (
                    <button
                      key={c.name}
                      onClick={() => setActiveCategory(c.name)}
                      className={`flex items-center gap-2.5 px-6 py-3 rounded-full border transition-all duration-300 text-sm font-medium ${
                        isActive 
                          ? 'bg-[#3A7BFF]/15 border-[#3A7BFF] text-white' 
                          : 'bg-white/5 border-white/10 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <c.icon size={16} />
                      {c.name}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-[#64748B]">{c.count}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Featured Post */}
            <section className="py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div 
                  onClick={() => setSelectedPost(featuredPost.title)}
                  className={`glass-panel group overflow-hidden border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-700 cursor-pointer ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-[300px] lg:h-auto overflow-hidden">
                      <img src={featuredPost.image} alt="Featured" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="p-8 md:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6"><span className="badge badge-primary">{featuredPost.category}</span></div>
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-[#3A7BFF] transition-colors">{featuredPost.title}</h2>
                      <p className="text-[#94A3B8] text-lg leading-relaxed mb-10">{featuredPost.excerpt}</p>
                      <button className="glow-button !py-4 !px-8 flex items-center gap-2">Read Article <ArrowRight size={18} /></button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest Insights Grid */}
            <section className="py-24 px-6 relative">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-12 flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#3A7BFF] rounded-full" /> Latest Insights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedPost(post.title)}
                      className="glass-panel group border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute top-4 left-4 z-20"><span className="px-3 py-1 bg-[#05070F]/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase">{post.category}</span></div>
                      </div>
                      <div className="p-8 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-[#3A7BFF] transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-[#94A3B8] text-sm leading-relaxed line-clamp-3 mb-8">{post.excerpt}</p>
                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5 font-bold text-[#3A7BFF] text-xs">
                          READ MORE <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

