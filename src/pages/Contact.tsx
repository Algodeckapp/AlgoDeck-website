import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Mail, Phone, MessageSquare, Users, Twitter, Youtube, Send } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@algodeck.com',
      color: '#3B82F6',
    },
    {
      icon: Users,
      title: 'Sales Inquiries',
      description: 'Enterprise and partnership opportunities',
      contact: 'sales@algodeck.com',
      color: '#10B981',
    },
    {
      icon: Phone,
      title: 'Technical Support',
      description: 'API and integration assistance',
      contact: 'tech@algodeck.com',
      color: '#8B5CF6',
    },
  ]

  const socialLinks = [
    {
      icon: Twitter,
      name: 'Twitter / X',
      handle: '@algodeck',
      url: 'https://twitter.com/algodeck',
      color: '#1DA1F2',
    },
    {
      icon: MessageSquare,
      name: 'Discord',
      handle: 'Join our community',
      url: 'https://discord.gg/algodeck',
      color: '#5865F2',
    },
    {
      icon: Youtube,
      name: 'YouTube',
      handle: '@AlgoDeck',
      url: 'https://youtube.com/@algodeck',
      color: '#FF0000',
    },
    {
      icon: Send,
      name: 'Telegram',
      handle: '@AlgoDeckOfficial',
      url: 'https://t.me/algodeck',
      color: '#0088CC',
    },
  ]

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: '#FFFFFF',
    fontSize: '15px',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-text-secondary)',
    marginBottom: '8px',
    display: 'block',
  }

  return (
    <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero Section */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            Get in Touch
          </h1>
          <p className="section-subtitle" style={{ fontSize: '20px' }}>
            We're here to help you succeed with AlgoDeck
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {contactMethods.map((method, index) => {
            const Icon = method.icon
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
                  e.currentTarget.style.borderColor = method.color
                  e.currentTarget.style.boxShadow = `0 0 40px ${method.color}33`
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
                    background: `${method.color}20`,
                    border: `1px solid ${method.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                  }}
                >
                  <Icon size={28} color={method.color} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '10px' }}>
                  {method.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                  {method.description}
                </p>
                <a
                  href={`mailto:${method.contact}`}
                  style={{
                    fontSize: '15px',
                    color: method.color,
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  {method.contact}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{ padding: '80px 24px', background: 'var(--color-bg-midnight)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Send us a message</div>
            <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
              Contact Form
            </h2>
            <p className="section-subtitle">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '64px 48px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '2px solid var(--color-success)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px' }}>
                Message Sent!
              </h3>
              <p style={{ fontSize: '16px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
                Thanks for reaching out, {formData.name}! Our team will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="outline-button"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '48px',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={inputStyle}
                    placeholder="Your name"
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={inputStyle}
                    placeholder="you@example.com"
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Subject *</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales / Partnership</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback / Suggestions</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: '150px', resize: 'vertical' }}
                    placeholder="Tell us how we can help you..."
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  />
                </div>

                <button
                  type="submit"
                  className="glow-button"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Social Media Section */}
      <section style={{ padding: '80px 24px 120px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge badge-primary" style={{ marginBottom: '16px' }}>Connect with us</div>
          <h2 className="section-title" style={{ fontSize: '36px', marginBottom: '20px' }}>
            Join Our Community
          </h2>
          <p className="section-subtitle">
            Follow us on social media for updates, tips, and community discussions
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = social.color
                  e.currentTarget.style.boxShadow = `0 0 32px ${social.color}33`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `${social.color}20`,
                    border: `1px solid ${social.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} color={social.color} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
                    {social.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    {social.handle}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
