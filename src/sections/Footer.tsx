import { useState } from 'react'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features', isRoute: true },
    { label: 'Pricing', href: '/pricing', isRoute: true },
    { label: 'Download', href: '/download', isRoute: true },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Support', href: '/support', isRoute: true },
  ],
  Company: [
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms', isRoute: true },
    { label: 'Privacy Policy', href: '/privacy', isRoute: true },
  ],
  Connect: [
    { label: 'Twitter/X', href: 'https://twitter.com/algodeck', isRoute: false },
    { label: 'Discord', href: 'https://discord.gg/algodeck', isRoute: false },
    { label: 'Telegram', href: 'https://t.me/AlgoDeckOfficial', isRoute: false },
    { label: 'YouTube', href: 'https://youtube.com/@AlgoDeck', isRoute: false },
  ],
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" />
      </svg>
    ),
    discord: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.5 -1.5 .5 -5 .5 -5c0 -2.5 -2 -3 -2 -3c-1 0 -2.5 1 -3.5 2c-1 1 -1.5 1.5 -2 2c-.5 -.5 -1 -1 -2 -2c-1 -1 -2.5 -2 -3.5 -2c0 0 -2 .5 -2 3c0 0 -.5 3.5 .5 5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3" /><path d="M7 16.5c3.5 1 6.5 1 10 0" />
      </svg>
    ),
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    ),
  }

  return icons[type] || null
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { user } = useAuth()

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubscribed(true)
      setEmail('')
    },
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    subscribeMutation.mutate({ email: email.trim() })
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.slice(1)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      style={{
        background: '#05070F',
        borderTop: '1px solid rgba(58, 123, 255, 0.15)',
        padding: '80px 24px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Top Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            paddingBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '8px 16px 8px 8px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.95)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <img
                src="/assets/logo-primary.png"
                alt="AlgoDeck"
                style={{ height: '36px', objectFit: 'contain' }}
                className="logo-image"
              />
            </Link>
            <p
              style={{
                fontSize: '15px',
                color: '#94A3B8',
                marginTop: '16px',
                lineHeight: 1.6,
              }}
            >
              Automate Your Trading Empire
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {[
                { type: 'twitter', href: 'https://twitter.com/algodeck' },
                { type: 'discord', href: 'https://discord.gg/algodeck' },
                { type: 'github', href: 'https://github.com/algodeck' },
              ].map((social) => (
                <a
                  key={social.type}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#64748B',
                    transition: 'color 0.3s ease',
                    display: 'flex',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#3A7BFF'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#64748B'
                  }}
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  marginBottom: '20px',
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map((link) => {
                  const linkProps = {
                    onClick: (e: React.MouseEvent) => {
                      if (!link.isRoute && link.href.startsWith('#')) {
                        e.preventDefault()
                        handleNavClick(link.href)
                      }
                    },
                    style: {
                      fontSize: '14px',
                      color: '#94A3B8',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'inline-block',
                    },
                    onMouseEnter: (e: React.MouseEvent) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#FFFFFF'
                      el.style.transform = 'translateX(4px)'
                    },
                    onMouseLeave: (e: React.MouseEvent) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.color = '#94A3B8'
                      el.style.transform = 'translateX(0)'
                    }
                  }
                  return (
                    <li key={link.label}>
                      {link.isRoute ? (
                        <Link {...linkProps} to={link.href}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          {...linkProps}
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '20px',
              }}
            >
              Stay Updated
            </h4>
            {subscribed ? (
              <p style={{ fontSize: '14px', color: '#00D084' }}>
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: '#0F1629',
                    border: '1px solid rgba(58, 123, 255, 0.15)',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    minWidth: 0,
                  }}
                />
                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  style={{
                    padding: '10px 20px',
                    background: '#3A7BFF',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 500,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'filter 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.filter = 'none'
                  }}
                >
                  {subscribeMutation.isPending ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                style={{
                  display: 'inline-block',
                  marginTop: '16px',
                  fontSize: '12px',
                  color: '#3A7BFF',
                  textDecoration: 'none',
                }}
              >
                Admin Dashboard →
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '32px 0',
            borderTop: '1px solid rgba(58, 123, 255, 0.15)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            © 2026 AlgoDeck. All rights reserved.
          </span>
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            Made with ❤️ for traders
          </span>
        </div>
      </div>
    </footer>
  )
}
