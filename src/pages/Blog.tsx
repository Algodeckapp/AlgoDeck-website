import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Newspaper, BarChart3 } from 'lucide-react'

export default function Blog() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API
    console.log('Newsletter subscription:', email)
    setSubscribed(true)
  }

  const categories = [
    { name: 'All Posts', icon: Newspaper, count: 24 },
    { name: 'Tutorials', icon: BookOpen, count: 8 },
    { name: 'Trading Tips', icon: TrendingUp, count: 10 },
    { name: 'Platform Updates', icon: BarChart3, count: 4 },
    { name: 'Case Studies', icon: BarChart3, count: 2 },
  ]

  const [activeCategory, setActiveCategory] = useState('All Posts')

  const featuredPost = {
    title: 'Introducing AI Strategy Optimization: The Future of Algorithmic Trading',
    excerpt: 'Discover how our new AI-powered optimization engine can automatically fine-tune your trading strategies for maximum performance across different market conditions.',
    category: 'Platform Updates',
    date: 'May 1, 2026',
    readTime: '8 min read',
    image: '/assets/blog-featured.jpg',
    author: 'Sarah Chen',
    authorRole: 'Head of Product',
  }

  const blogPosts = [
    {
      title: '5 Trading Strategies Every Beginner Should Know',
      excerpt: 'Learn the foundational strategies that successful traders use to build their trading careers, from trend following to mean reversion.',
      category: 'Tutorials',
      date: 'April 28, 2026',
      readTime: '6 min read',
      image: '/assets/blog-1.jpg',
    },
    {
      title: 'How to Backtest Your Trading Strategy Properly',
      excerpt: 'A comprehensive guide to backtesting that helps you avoid common pitfalls and get accurate performance metrics for your strategies.',
      category: 'Tutorials',
      date: 'April 25, 2026',
      readTime: '10 min read',
      image: '/assets/blog-2.jpg',
    },
    {
      title: 'AlgoDeck vs Manual Trading: Performance Comparison',
      excerpt: 'Real data from 1,000+ traders showing how algorithmic trading with AlgoDeck compares to manual trading in terms of consistency and returns.',
      category: 'Case Studies',
      date: 'April 22, 2026',
      readTime: '7 min read',
      image: '/assets/blog-3.jpg',
    },
    {
      title: 'Understanding Risk Management in Algorithmic Trading',
      excerpt: 'Master the art of protecting your capital with proper position sizing, stop losses, and portfolio diversification strategies.',
      category: 'Trading Tips',
      date: 'April 19, 2026',
      readTime: '9 min read',
      image: '/assets/blog-4.jpg',
    },
    {
      title: 'New Feature: Multi-Timeframe Analysis',
      excerpt: 'Analyze multiple timeframes simultaneously to make better trading decisions and improve your strategy performance.',
      category: 'Platform Updates',
      date: 'April 16, 2026',
      readTime: '5 min read',
      image: '/assets/blog-5.jpg',
    },
    {
      title: 'Getting Started with MT4/MT5 Integration',
      excerpt: 'Step-by-step guide to connecting your MetaTrader account to AlgoDeck and deploying your first automated trading bot.',
      category: 'Tutorials',
      date: 'April 13, 2026',
      readTime: '12 min read',
      image: '/assets/blog-6.jpg',
    },
  ]

  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            AlgoDeck Blog
          </h1>
          <p className="section-subtitle" style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>
            Trading strategies, platform updates, and industry insights
          </p>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 24px 60px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map((category, index) => {
            const Icon = category.icon
            const isActive = activeCategory === category.name
            return (
              <button
                key={index}
                onClick={() => setActiveCategory(category.name)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-surface)',
                  border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: '9999px',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--color-primary)'
                    e.currentTarget.style.color = '#FFFFFF'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                  }
                }}
              >
                <Icon size={16} />
                <span>{category.name}</span>
                <span
                  style={{
                    padding: '2px 8px',
                    background: isActive ? 'var(--color-primary)' : 'rgba(100, 116, 139, 0.3)',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-muted)',
                  }}
                >
                  {category.count}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Featured Post */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div className="badge badge-primary" style={{ marginBottom: '24px' }}>Featured Post</div>
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: '1fr',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.borderColor = 'var(--color-primary)'
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-primary)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.borderColor = 'var(--color-border)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div
            style={{
              height: '400px',
              background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 50%, #8B5CF6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            Featured Image
          </div>
          <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <span className="badge badge-primary">{featuredPost.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={16} />
                  <span>{featuredPost.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={16} />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', lineHeight: 1.3 }}>
              {featuredPost.title}
            </h2>
            <p style={{ fontSize: '17px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {featuredPost.excerpt}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#FFFFFF' }}>{featuredPost.author}</div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{featuredPost.authorRole}</div>
              </div>
              <button
                className="glow-button"
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                Read Article
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section style={{ padding: '0 24px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '40px' }}>
          Latest Posts
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          {blogPosts.map((post, index) => (
            <div
              key={index}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.boxShadow = 'var(--shadow-glow-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div
                style={{
                  height: '200px',
                  background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent-purple) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                Blog Image {index + 1}
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <span className="badge badge-primary" style={{ fontSize: '10px', padding: '3px 10px' }}>
                    {post.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px', lineHeight: 1.4 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-primary)',
                    transition: 'gap 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '12px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '8px'
                  }}
                >
                  Read More
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: '80px 24px 120px', background: 'var(--color-bg-midnight)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div className="badge badge-primary" style={{ marginBottom: '20px' }}>Newsletter</div>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            Stay in the Loop
          </h2>
          <p className="section-subtitle" style={{ fontSize: '18px', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Get the latest trading insights, platform updates, and exclusive tips delivered to your inbox every week
          </p>

          {subscribed ? (
            <div
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-success)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '2px solid var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                You're Subscribed!
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                Check your inbox for a confirmation email. We'll send you the best content every week.
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                />
                <button
                  type="submit"
                  className="glow-button"
                  style={{ padding: '16px 32px' }}
                >
                  Subscribe
                </button>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
                No spam, unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
