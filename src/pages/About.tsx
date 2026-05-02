import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Target, Shield, Users, Lightbulb, HeartHandshake, Smartphone, Server, Database, Network, Bot } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making algorithmic trading accessible to traders of all skill levels, from beginners to professionals.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Clear pricing, honest performance metrics, and full visibility into how our platform operates.',
    },
    {
      icon: HeartHandshake,
      title: 'Security',
      description: 'Bank-grade encryption and security measures to protect your strategies and trading capital.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously pushing boundaries with AI-powered tools and cutting-edge trading technology.',
    },
    {
      icon: Target,
      title: 'Support',
      description: 'Dedicated customer support and educational resources to ensure your trading success.',
    },
  ]

  const techStack = [
    {
      icon: Smartphone,
      name: 'Flutter',
      description: 'Cross-platform mobile app framework for iOS & Android',
      color: '#02569B',
    },
    {
      icon: Server,
      name: 'Python FastAPI',
      description: 'High-performance backend API infrastructure',
      color: '#009688',
    },
    {
      icon: Database,
      name: 'Supabase',
      description: 'Real-time database and authentication platform',
      color: '#3ECF8E',
    },
    {
      icon: Network,
      name: 'MetaAPI',
      description: 'MT4/MT5 broker integration for live trading',
      color: '#FF6B35',
    },
    {
      icon: Bot,
      name: 'Claude AI',
      description: 'AI-powered strategy generation and optimization',
      color: '#8B5CF6',
    },
  ]

  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            About AlgoDeck
          </h1>
          <p className="section-subtitle" style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto' }}>
            Empowering traders with AI-powered automation and professional-grade tools
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px' }}>
            Our Mission
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>
            AlgoDeck was built to democratize algorithmic trading. We believe every trader should have access to
            professional-grade automation tools without needing to write a single line of code.
          </p>
          <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            Our platform combines cutting-edge AI technology with intuitive design, making it easy to build,
            test, and deploy trading strategies that work for you 24/7.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Our Story</div>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            Built by Traders, for Traders
          </h2>
        </div>
        <div
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
          }}
        >
          <div style={{ display: 'grid', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
                Founded 2026
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                AlgoDeck was founded by a team of experienced traders and software engineers who were frustrated
                by the complexity and cost of existing algorithmic trading platforms. We set out to build something
                different - a mobile-first platform that puts powerful automation tools in your pocket.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
                Innovation First
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                We pioneered the use of AI for strategy creation, allowing traders to describe their ideas in
                plain English and have them instantly converted into executable trading bots. This breakthrough
                has made algorithmic trading accessible to thousands of traders worldwide.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
                Community Driven
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Every feature we build is shaped by feedback from our community of traders. We're committed to
                continuous improvement and regularly ship updates based on what our users need to succeed in the markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Our Values</div>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            What We Stand For
          </h2>
          <p className="section-subtitle" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            These core principles guide everything we do at AlgoDeck
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  textAlign: 'center',
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
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <Icon size={28} color="var(--color-primary)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section style={{ padding: '80px 24px 120px', background: 'var(--color-bg-midnight)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Technology</div>
            <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
              Built on Modern Tech
            </h2>
            <p className="section-subtitle" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
              We leverage the best tools and technologies to deliver a fast, reliable, and secure trading platform
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
            {techStack.map((tech, index) => {
              const Icon = tech.icon
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
                    e.currentTarget.style.borderColor = tech.color
                    e.currentTarget.style.boxShadow = `0 0 40px ${tech.color}33, 0 0 80px ${tech.color}1A`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-md)',
                      background: `${tech.color}20`,
                      border: `1px solid ${tech.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <Icon size={28} color={tech.color} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>
                    {tech.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                    {tech.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            Join Thousands of Traders
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Download AlgoDeck today and start building your automated trading empire
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

      <Footer />
    </div>
  )
}
