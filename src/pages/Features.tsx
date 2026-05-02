import { Bot, Zap, LineChart, Network, Shield, Bell, Target, TrendingUp } from 'lucide-react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Strategy Creation',
      description: 'Turn plain English into executable trading strategies',
      details: [
        'Natural language input: "Buy EURUSD when RSI is below 30"',
        'AI parser converts to executable strategy',
        'Validates and suggests improvements',
        'Available on Pro & Elite tiers'
      ],
      tier: 'Pro & Elite',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Target,
      title: 'Visual Strategy Builder',
      description: 'Build strategies without writing code',
      details: [
        'Drag-and-drop indicators',
        'Visual condition builder',
        'Real-time preview',
        'Available on all tiers'
      ],
      tier: 'All Tiers',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: LineChart,
      title: 'Professional Backtesting',
      description: 'Test strategies on real historical data',
      details: [
        'Real historical data via yfinance',
        'Multiple timeframes (M1 to D1)',
        'Performance metrics (Sharpe ratio, drawdown, win rate)',
        'Trade-by-trade analysis'
      ],
      tier: 'All Tiers',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Live Trading Integration',
      description: 'Deploy bots directly to MT4/MT5 accounts',
      details: [
        'Direct MT4/MT5 connection via MetaAPI',
        'Real-time trade execution',
        'Position management',
        'Risk controls (stop loss, take profit)'
      ],
      tier: 'All Tiers',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Track performance with detailed metrics',
      details: [
        'Real-time P&L tracking',
        'Performance charts and graphs',
        'Trade history and journal',
        'Export reports to PDF (Elite tier)'
      ],
      tier: 'All Tiers',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Network,
      title: 'Multi-Account Management',
      description: 'Trade across multiple brokers',
      details: [
        'Connect up to 10 accounts (Elite)',
        'Trade across multiple brokers',
        'Account-specific strategies',
        'Unified dashboard'
      ],
      tier: 'Pro & Elite',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Protect your capital with built-in controls',
      details: [
        'Per-trade risk limits',
        'Account-wide exposure controls',
        'Automatic stop-loss and take-profit',
        'Trailing stops'
      ],
      tier: 'All Tiers',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay informed of every trade and alert',
      details: [
        'Trade alerts (all tiers)',
        'Bot status notifications',
        'Push notifications (Pro+)',
        'Email reports (Pro+)',
        'SMS alerts (Elite)'
      ],
      tier: 'All Tiers',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ]

  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '80px' }}>
        {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            Powerful Features for Serious Traders
          </h1>
          <p className="section-subtitle" style={{ fontSize: '18px' }}>
            Everything you need to build, test, and deploy profitable trading bots
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '0 24px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  transition: 'all 0.3s ease',
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
                {/* Icon */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    background: `linear-gradient(135deg, ${feature.gradient.replace('from-', 'var(--color-').replace(' to-', '), var(--color-').replace(/-([\d]+)/g, '')})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}
                >
                  <Icon size={28} color="#FFFFFF" />
                </div>

                {/* Tier Badge */}
                <div className="badge badge-primary" style={{ marginBottom: '16px' }}>
                  {feature.tier}
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '20px', lineHeight: 1.6 }}>
                  {feature.description}
                </p>

                {/* Details */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {feature.details.map((detail, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                      <span style={{ color: 'var(--color-primary)', marginTop: '2px' }}>•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', background: 'var(--color-bg-midnight)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            Ready to Start Trading?
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Download the AlgoDeck mobile app and start building your trading empire today
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#download" className="glow-button">
              Download for Android
            </a>
            <a href="/#download" className="outline-button">
              Download for iOS <span className="badge badge-warning" style={{ marginLeft: '8px' }}>Coming Soon</span>
            </a>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
