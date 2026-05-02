import { useState } from 'react'
import { Link } from 'react-router'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Search, Book, Code, TrendingUp, PlayCircle, Shield, HelpCircle, ChevronRight } from 'lucide-react'

interface DocSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  articles: string[]
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Quick start guides and initial setup',
    icon: <PlayCircle size={24} />,
    articles: [
      'Creating Your First Strategy',
      'Platform Overview',
      'Setting Up Your Account',
      'Connecting Your Broker',
      'Understanding the Dashboard',
    ],
  },
  {
    id: 'strategy-building',
    title: 'Strategy Building',
    description: 'Build and customize your trading strategies',
    icon: <Code size={24} />,
    articles: [
      'Strategy Builder Interface',
      'Technical Indicators Guide',
      'Entry & Exit Rules',
      'Position Sizing',
      'Risk Management Parameters',
      'Using Multiple Timeframes',
    ],
  },
  {
    id: 'backtesting',
    title: 'Backtesting',
    description: 'Test your strategies against historical data',
    icon: <TrendingUp size={24} />,
    articles: [
      'Running Your First Backtest',
      'Understanding Backtest Results',
      'Performance Metrics Explained',
      'Optimization Techniques',
      'Walk-Forward Analysis',
    ],
  },
  {
    id: 'live-trading',
    title: 'Live Trading',
    description: 'Deploy and monitor live trading bots',
    icon: <PlayCircle size={24} />,
    articles: [
      'Going Live Checklist',
      'Paper Trading vs Live Trading',
      'Bot Monitoring Dashboard',
      'Managing Active Positions',
      'Emergency Stop Procedures',
      'VPS Setup & Management',
    ],
  },
  {
    id: 'account-management',
    title: 'Account Management',
    description: 'Manage your account settings and subscription',
    icon: <Shield size={24} />,
    articles: [
      'Subscription Plans',
      'Billing & Payments',
      'Account Security',
      'API Keys Management',
      'Notification Settings',
    ],
  },
  {
    id: 'api-docs',
    title: 'API Documentation (Institutional)',
    description: 'Advanced integration for institutional users',
    icon: <Book size={24} />,
    articles: [
      'API Authentication',
      'REST API Reference',
      'WebSocket Feeds',
      'Strategy Deployment API',
      'Portfolio Management API',
      'Rate Limits & Best Practices',
    ],
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Frequently asked questions',
    icon: <HelpCircle size={24} />,
    articles: [
      'Account & Billing',
      'Strategy Development',
      'Backtesting & Results',
      'Live Trading',
      'Technical Issues',
      'Security & Privacy',
    ],
  },
]

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const filteredSections = docSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some((article) =>
        article.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id)
  }

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
            Documentation
          </h1>
          <p
            className="section-subtitle"
            style={{
              fontSize: '18px',
              marginTop: '20px',
              color: 'var(--color-text-secondary)',
            }}
          >
            Everything you need to know about using AlgoDeck
          </p>

          {/* Search Bar */}
          <div
            style={{
              marginTop: '48px',
              position: 'relative',
              maxWidth: '600px',
              margin: '48px auto 0',
            }}
          >
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
              placeholder="Search documentation..."
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
        </div>
      </section>

      {/* Documentation Sections */}
      <section
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredSections.map((section) => (
            <div
              key={section.id}
              className="glass-panel"
              style={{
                padding: '32px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderColor:
                  expandedSection === section.id
                    ? 'var(--color-border-glow)'
                    : 'var(--color-border)',
              }}
              onClick={() => toggleSection(section.id)}
              onMouseEnter={(e) => {
                if (expandedSection !== section.id) {
                  e.currentTarget.style.borderColor = 'var(--color-border-glow)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedSection !== section.id) {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px',
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
                  {section.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {section.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {section.description}
                  </p>
                </div>
                <ChevronRight
                  size={20}
                  style={{
                    color: 'var(--color-text-muted)',
                    transform:
                      expandedSection === section.id
                        ? 'rotate(90deg)'
                        : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>

              {/* Expanded Articles */}
              {expandedSection === section.id && (
                <div
                  style={{
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {section.articles.map((article, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          style={{
                            fontSize: '14px',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px',
                            borderRadius: 'var(--radius-sm)',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = 'var(--color-primary)'
                            el.style.background = 'rgba(59, 130, 246, 0.05)'
                            el.style.paddingLeft = '12px'
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement
                            el.style.color = 'var(--color-text-secondary)'
                            el.style.background = 'transparent'
                            el.style.paddingLeft = '8px'
                          }}
                        >
                          <ChevronRight size={14} />
                          {article}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              color: 'var(--color-text-muted)',
            }}
          >
            <p style={{ fontSize: '18px' }}>No documentation found matching your search.</p>
          </div>
        )}
      </section>

      {/* Need More Help Section */}
      <section
        style={{
          padding: '80px 24px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-midnight)',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              marginBottom: '16px',
            }}
          >
            Need More Help?
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginBottom: '32px',
            }}
          >
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link
            to="/support"
            className="glow-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Contact Support
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
