import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import {
  Search,
  Book,
  MessageCircle,
  Mail,
  Zap,
  MessageSquare,
  Users,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
} from 'lucide-react'

interface KnowledgeBaseArticle {
  title: string
  category: string
}

const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  { title: 'Getting Started with AlgoDeck', category: 'Getting Started' },
  { title: 'How to Create Your First Strategy', category: 'Getting Started' },
  { title: 'Understanding Backtest Results', category: 'Backtesting' },
  { title: 'Connecting Your MT4/MT5 Account', category: 'Integration' },
  { title: 'Live Trading Best Practices', category: 'Live Trading' },
  { title: 'Managing Risk Parameters', category: 'Risk Management' },
  { title: 'API Authentication Guide', category: 'API' },
  { title: 'Troubleshooting Common Issues', category: 'Technical' },
]

interface StatusIndicator {
  service: string
  status: 'operational' | 'degraded' | 'outage'
  lastChecked: string
}

const serviceStatus: StatusIndicator[] = [
  { service: 'Trading Platform', status: 'operational', lastChecked: '2 min ago' },
  { service: 'API Services', status: 'operational', lastChecked: '2 min ago' },
  { service: 'Backtesting Engine', status: 'operational', lastChecked: '2 min ago' },
  { service: 'VPS Infrastructure', status: 'operational', lastChecked: '2 min ago' },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />
    case 'degraded':
      return <AlertCircle size={16} style={{ color: 'var(--color-warning)' }} />
    case 'outage':
      return <AlertCircle size={16} style={{ color: 'var(--color-danger)' }} />
    default:
      return <Activity size={16} />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'var(--color-success)'
    case 'degraded':
      return 'var(--color-warning)'
    case 'outage':
      return 'var(--color-danger)'
    default:
      return 'var(--color-text-muted)'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'operational':
      return 'All Systems Operational'
    case 'degraded':
      return 'Degraded Performance'
    case 'outage':
      return 'Service Outage'
    default:
      return 'Unknown'
  }
}

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredArticles = knowledgeBaseArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '160px 24px 80px',
          background: 'linear-gradient(180deg, var(--color-bg-midnight) 0%, var(--color-bg-deep) 100%)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h1
            className="section-title"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              marginBottom: '20px',
            }}
          >
            How Can We Help?
          </h1>
          <p
            className="section-subtitle"
            style={{
              fontSize: '18px',
              marginTop: '20px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Find answers, get support, and learn how to make the most of AlgoDeck
          </p>
        </div>
      </section>

      {/* Main Support Sections */}
      <section
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Knowledge Base */}
        <div
          className="glass-panel"
          style={{
            padding: '48px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
              }}
            >
              <Book size={28} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                Knowledge Base
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                Search our comprehensive library of articles and guides
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px 16px 52px',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                fontSize: '16px',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Articles Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredArticles.map((article, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  padding: '16px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-glow)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  className="badge badge-primary"
                  style={{ marginBottom: '12px', fontSize: '10px' }}
                >
                  {article.category}
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {article.title}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Community & Direct Support Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {/* Community */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent-purple)',
                }}
              >
                <Users size={24} />
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                Community
              </h3>
            </div>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}
            >
              Connect with other traders and get help from the community
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="#"
                className="outline-button"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageCircle size={18} />
                  Discord Community
                </span>
                <ExternalLink size={14} />
              </a>
              <a
                href="#"
                className="outline-button"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} />
                  Telegram Group
                </span>
                <ExternalLink size={14} />
              </a>
              <a
                href="#"
                className="outline-button"
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} />
                  Community Forums
                </span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Direct Support */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                }}
              >
                <Mail size={24} />
              </div>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                Direct Support
              </h3>
            </div>
            <p
              style={{
                fontSize: '15px',
                color: 'var(--color-text-secondary)',
                marginBottom: '24px',
                lineHeight: 1.6,
              }}
            >
              Get personalized help from our support team
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  padding: '16px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Mail size={18} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    Email Support
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  support@algodeck.app
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} style={{ color: 'var(--color-text-muted)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Response: 24-48 hours
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Zap size={18} style={{ color: 'var(--color-warning)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    Priority Support
                  </span>
                  <span className="badge badge-warning" style={{ fontSize: '9px', padding: '2px 8px' }}>
                    PRO+
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  Dedicated support line
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} style={{ color: 'var(--color-text-muted)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Response: 4-8 hours
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: '16px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <MessageCircle size={18} style={{ color: 'var(--color-accent-purple)' }} />
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    In-App Chat
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '9px', padding: '2px 8px' }}>
                    ALL TIERS
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                  Chat with us directly in the platform
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={12} style={{ color: 'var(--color-text-muted)' }} />
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                    Mon-Fri, 9am-6pm EST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-panel" style={{ padding: '48px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-success)',
              }}
            >
              <Activity size={28} />
            </div>
            <div>
              <h2
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                System Status
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)' }}>
                Real-time status of all AlgoDeck services
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {serviceStatus.map((service, idx) => (
              <div
                key={idx}
                style={{
                  padding: '20px',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  {getStatusIcon(service.status)}
                  <span style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {service.service}
                  </span>
                </div>
                <div
                  className="badge"
                  style={{
                    background: `${getStatusColor(service.status)}15`,
                    color: getStatusColor(service.status),
                    border: `1px solid ${getStatusColor(service.status)}40`,
                    fontSize: '11px',
                    padding: '4px 10px',
                  }}
                >
                  {getStatusText(service.status)}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '8px',
                  }}
                >
                  Last checked: {service.lastChecked}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <a
              href="#"
              style={{
                fontSize: '14px',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none'
              }}
            >
              View full status page
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Response Time Info */}
        <div
          style={{
            marginTop: '40px',
            padding: '24px',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
            }}
          >
            Response Times by Tier
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Free & Starter
              </p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                24-48 hours
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Pro
              </p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                12-24 hours
              </p>
            </div>
            <div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                Pro+ & Institutional
              </p>
              <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-primary)' }}>
                4-8 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
