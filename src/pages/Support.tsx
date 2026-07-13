import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Link } from 'react-router'
import {
  Search,
  Book,
  Mail,
  ExternalLink,
  CheckCircle,
  Activity,
  ArrowRight,
} from 'lucide-react'

interface KnowledgeBaseArticle {
  title: string
  category: string
  description: string
  docSection: string
  docArticle: string
}

const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  { 
    title: 'Getting Started with AlgoDeck', 
    category: 'Getting Started',
    description: 'Learn how to set up your account, configure your initial profile, and navigate the AlgoDeck dashboard.',
    docSection: 'getting-started',
    docArticle: 'Platform Overview',
  },
  { 
    title: 'How to Create Your First Strategy', 
    category: 'Getting Started',
    description: 'A step-by-step guide to building your first automated trading strategy using our visual strategy builder.',
    docSection: 'getting-started',
    docArticle: 'Creating Your First Strategy',
  },
  { 
    title: 'Understanding Backtest Results', 
    category: 'Backtesting',
    description: 'Learn how to interpret equity curves, drawdowns, and performance metrics from your strategy backtests.',
    docSection: 'backtesting',
    docArticle: 'Understanding Results',
  },
  { 
    title: 'Connecting Your MT4/MT5 Account', 
    category: 'Integration',
    description: 'Follow our secure instructions to connect your MetaTrader 4 or 5 broker accounts to AlgoDeck.',
    docSection: 'getting-started',
    docArticle: 'Connecting Your Broker',
  },
  { 
    title: 'Live Trading Best Practices', 
    category: 'Live Trading',
    description: 'Guidelines on risk management, position sizing, and monitoring your automated strategies in live markets.',
    docSection: 'live-trading',
    docArticle: 'Going Live Checklist',
  },
  { 
    title: 'Managing Risk Parameters', 
    category: 'Risk Management',
    description: 'Configuring stop-loss, take-profit, and max drawdown limits to protect your capital effectively.',
    docSection: 'strategy-building',
    docArticle: 'Position Sizing & Risk',
  },
  { 
    title: 'API Authentication Guide', 
    category: 'API',
    description: 'Learn how to generate API keys securely to interact with AlgoDeck services programmatically.',
    docSection: 'institutional',
    docArticle: 'API Authentication',
  },
  { 
    title: 'Security Best Practices', 
    category: 'Account & Security',
    description: 'Keep your account and trading credentials safe with our recommended security guidelines.',
    docSection: 'account',
    docArticle: 'Security Best Practices',
  },
]



export default function Support() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = knowledgeBaseArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ position: 'relative', background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '160px 24px 80px', background: 'linear-gradient(180deg, var(--color-bg-midnight) 0%, var(--color-bg-deep) 100%)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="section-title" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: '20px' }}>How Can We Help?</h1>
          <p className="section-subtitle" style={{ fontSize: '18px', marginTop: '20px', color: 'var(--color-text-secondary)' }}>
            Find answers, get support, and learn how to make the most of AlgoDeck
          </p>
        </div>
      </section>

      {/* Main Support Sections */}
      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Knowledge Base */}
        <div className="glass-panel" style={{ padding: 'clamp(24px, 5vw, 48px)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Book size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>Knowledge Base</h2>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>Search our comprehensive library of articles and guides</p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '16px 20px 16px 52px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', fontSize: '16px', outline: 'none' }}
            />
          </div>

          {/* Articles Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredArticles.map((article, idx) => (
              <Link
                key={idx}
                to={`/docs?section=${article.docSection}&article=${encodeURIComponent(article.docArticle)}`}
                style={{ padding: '24px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column', gap: '12px' }}
                className="hover:border-blue-500/50 group"
              >
                <span className="badge badge-primary" style={{ fontSize: '10px', width: 'fit-content' }}>{article.category}</span>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{article.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{article.description}</p>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-primary)', marginTop: 'auto' }}>
                  Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Status & Contact Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

          {/* System Status Card */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle size={22} style={{ color: 'var(--color-success)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>System Status</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Check the real-time health of the AlgoDeck platform, API services, and infrastructure uptime.
            </p>
            <Link
              to="/status"
              className="outline-button !justify-center !gap-3"
              style={{ marginTop: 'auto' }}
            >
              <Activity size={16} /> View Status Page <ExternalLink size={14} />
            </Link>
          </div>

          {/* Contact Support Card */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={22} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-text-primary)' }}>Contact Support</h3>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Can't find what you're looking for? Our support team is ready to help you directly.
            </p>
            <a
              href="mailto:support@algodeck.app"
              className="outline-button !justify-center !gap-3"
              style={{ marginTop: 'auto' }}
            >
              <Mail size={16} /> support@algodeck.app
            </a>
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}
