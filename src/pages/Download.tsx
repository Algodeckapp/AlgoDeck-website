import { Download as DownloadIcon, Smartphone, Wifi, HardDrive, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Download() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const brokers = [
    'IC Markets', 'Pepperstone', 'XM', 'FTMO', 'FX Choice',
    'Tickmill', 'Admiral Markets', 'OANDA', 'Forex.com', 'IG'
  ]

  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 className="section-title" style={{ marginBottom: '24px' }}>
            Download AlgoDeck
          </h1>
          <p className="section-subtitle" style={{ fontSize: '18px' }}>
            Available on Android. iOS coming soon.
          </p>
        </div>
      </section>

      {/* Download Options */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {/* Android */}
          <div
            style={{
              background: 'var(--color-bg-surface)',
              border: '2px solid var(--color-primary)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              textAlign: 'center',
              boxShadow: 'var(--shadow-glow-primary)'
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'var(--color-gradient-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}
            >
              <Smartphone size={40} color="#FFFFFF" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px' }}>
              Download for Android
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Get the full AlgoDeck experience on your Android device
            </p>
            <button className="glow-button" style={{ width: '100%', marginBottom: '16px' }}>
              <DownloadIcon size={16} style={{ marginRight: '8px' }} />
              Google Play Store
            </button>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Requires Android 7.0 or higher
            </p>
          </div>

          {/* iOS */}
          <div
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
              textAlign: 'center',
              position: 'relative',
              opacity: 0.7
            }}
          >
            <div className="badge badge-warning" style={{ position: 'absolute', top: '16px', right: '16px' }}>
              Coming Soon
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}
            >
              <Smartphone size={40} color="#8B5CF6" />
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px' }}>
              iOS App Store
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Join the waitlist to be notified when iOS launches
            </p>
            <form onSubmit={handleWaitlist} style={{ marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'var(--color-bg-deep)',
                  border: '1px solid var(--color-border)',
                  color: '#FFFFFF',
                  marginBottom: '12px'
                }}
              />
              <button type="submit" className="outline-button" style={{ width: '100%' }}>
                {submitted ? 'You\'re on the list!' : 'Join Waitlist'}
              </button>
            </form>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
              Expected: Q3 2026
            </p>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section style={{ padding: '80px 24px', background: 'var(--color-bg-midnight)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '60px' }}>
            Getting Started
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { num: '1', title: 'Download the app', desc: 'Get AlgoDeck from Google Play Store' },
              { num: '2', title: 'Create account', desc: 'Sign up with email in seconds' },
              { num: '3', title: 'Connect MT4/MT5', desc: 'Link your broker account securely' },
              { num: '4', title: 'Build & deploy', desc: 'Create your first trading bot' }
            ].map((step) => (
              <div key={step.num} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'var(--color-gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#FFFFFF'
                  }}
                >
                  {step.num}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {/* Requirements */}
          <div
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px' }}>
              System Requirements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: Smartphone, text: 'Android 7.0 or higher' },
                { icon: HardDrive, text: '100MB free space' },
                { icon: Wifi, text: 'Stable internet connection' },
                { icon: CheckCircle2, text: 'Valid MT4/MT5 account' }
              ].map((req, i) => {
                const Icon = req.icon
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={20} color="var(--color-primary)" />
                    <span style={{ fontSize: '15px', color: 'var(--color-text-secondary)' }}>{req.text}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Supported Brokers */}
          <div
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px'
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px' }}>
              Supported Brokers
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {brokers.map((broker) => (
                <span
                  key={broker}
                  className="badge badge-primary"
                  style={{ fontSize: '12px' }}
                >
                  {broker}
                </span>
              ))}
              <span className="badge badge-success" style={{ fontSize: '12px' }}>
                +200 More
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
              Any broker that supports MT4 or MT5
            </p>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
