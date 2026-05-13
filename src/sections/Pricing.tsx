import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Check, X } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Explore the basics of automation.',
    features: [
      { label: 'Strategy Builder', included: true },
      { label: 'Standard Backtesting', included: true },
      { label: '1 Active Bot', included: true },
      { label: 'MT4/MT5 Integration', included: false },
      { label: 'Multiple Accounts', included: false },
      { label: 'Advanced Analytics', included: false },
      { label: 'Email Alerts', included: false },
      { label: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 490,
    description: 'For individual traders getting started.',
    features: [
      { label: 'Strategy Builder', included: true },
      { label: 'Standard Backtesting', included: true },
      { label: 'Up to 3 Active Bots', included: true },
      { label: '1 MT4/MT5 Account', included: true },
      { label: '7-day Analytics History', included: true },
      { label: 'Email Alerts', included: true },
      { label: '0% Performance Fee', included: true },
      { label: 'Email Support', included: true },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 990,
    description: 'For serious traders who need AI power.',
    features: [
      { label: '3 Connected Accounts', included: true },
      { label: 'Up to 10 Active Bots', included: true },
      { label: 'AI Natural Strategies', included: true },
      { label: 'Advanced Backtesting', included: true },
      { label: 'Push + Email Alerts', included: true },
      { label: 'Full Analytics History', included: true },
      { label: '10% Performance Fee', included: true },
      { label: 'Priority Support', included: true },
    ],
    cta: 'Get Started',
    popular: true,
    primary: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 249,
    annualPrice: 2490,
    description: 'For professionals managing multiple strategies.',
    features: [
      { label: '10 Connected Accounts', included: true },
      { label: 'Unlimited Bots', included: true },
      { label: 'AI Optimization', included: true },
      { label: 'Advanced Backtesting', included: true },
      { label: 'Push + Email + SMS', included: true },
      { label: 'PDF Reports', included: true },
      { label: 'VPS Monitoring', included: true },
      { label: 'Account Manager', included: true },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Institutional',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For firms requiring custom infrastructure.',
    features: [
      { label: 'Unlimited Accounts', included: true },
      { label: 'Custom Bot Dev', included: true },
      { label: 'Custom Backtesting', included: true },
      { label: 'API Access', included: true },
      { label: 'Dedicated Infra', included: true },
      { label: 'SLA Guarantee', included: true },
      { label: 'Negotiable Fee', included: true },
      { label: '24/7 Support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    primary: false,
  },
]

function PricingCard({
  tier,
  isAnnual,
  index,
}: {
  tier: typeof tiers[0]
  isAnnual: boolean
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [index])

  return (
    <div
      ref={cardRef}
      style={{
        background: '#0F1629',
        border: tier.popular
          ? '1px solid #3A7BFF'
          : '1px solid rgba(58, 123, 255, 0.15)',
        borderRadius: '16px',
        padding: '40px 32px',
        position: 'relative',
        flex: '1',
        minWidth: '260px',
        boxShadow: tier.popular ? '0 0 40px rgba(58, 123, 255, 0.3), 0 0 80px rgba(58, 123, 255, 0.1)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '20px',
            transform: 'translateY(-50%)',
            background: 'linear-gradient(135deg, #3A7BFF 0%, #17B7BD 100%)',
            color: 'white',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '4px',
          }}
        >
          Most Popular
        </div>
      )}

      {/* Tier name */}
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#FFFFFF',
        }}
      >
        {tier.name}
      </h3>

      {/* Price */}
      <div style={{ marginTop: '16px' }}>
        {tier.monthlyPrice !== null ? (
          <>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '42px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              ${isAnnual ? Math.round(tier.annualPrice! / 12) : tier.monthlyPrice}
            </span>
            <span
              style={{
                fontSize: '16px',
                color: '#64748B',
                marginLeft: '4px',
              }}
            >
              /month
            </span>
            {isAnnual && (
              <div
                style={{
                  fontSize: '14px',
                  color: '#00D084',
                  marginTop: '4px',
                }}
              >
                ${tier.annualPrice}/year (save 2 months)
              </div>
            )}
          </>
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '42px',
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            Custom
          </span>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '15px',
          color: '#94A3B8',
          marginTop: '12px',
          lineHeight: 1.6,
        }}
      >
        {tier.description}
      </p>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: 'rgba(58, 123, 255, 0.15)',
          margin: '24px 0',
        }}
      />

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {tier.features.map((feature) => (
          <li key={feature.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {feature.included ? (
              <Check size={16} color="#00D084" />
            ) : (
              <X size={16} color="#64748B" />
            )}
            <span style={{ 
              fontSize: '14px', 
              color: feature.included ? '#94A3B8' : '#64748B',
              textDecoration: feature.included ? 'none' : 'line-through',
              opacity: feature.included ? 1 : 0.6
            }}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to={tier.cta === 'Contact Sales' ? '/contact' : '/download'}
        style={{
          display: 'block',
          width: '100%',
          marginTop: '32px',
          padding: '14px 24px',
          borderRadius: '9999px',
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: '12px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          ...(tier.primary
            ? {
                background: 'linear-gradient(135deg, #3A7BFF 0%, #17B7BD 100%)',
                color: 'white',
                border: 'none',
              }
            : {
                background: 'transparent',
                color: '#94A3B8',
                border: '1px solid rgba(58, 123, 255, 0.3)',
              }),
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          if (tier.primary) {
            el.style.filter = 'brightness(1.1)'
            el.style.boxShadow = '0 0 40px rgba(58, 123, 255, 0.3)'
          } else {
            el.style.borderColor = '#3A7BFF'
            el.style.color = 'white'
          }
          el.style.transform = 'scale(1.02)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          if (tier.primary) {
            el.style.filter = 'none'
            el.style.boxShadow = 'none'
          } else {
            el.style.borderColor = 'rgba(58, 123, 255, 0.3)'
            el.style.color = '#94A3B8'
          }
          el.style.transform = 'scale(1)'
        }}
      >
        {tier.cta}
      </Link>
    </div>
  )
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="bg-[#0A0F2C] py-16 px-6 md:py-32 md:px-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="section-eyebrow">PRICING</p>
        <h2 className="section-title">Aligned With Your Success</h2>
        <p className="section-subtitle">
          Simple subscription + performance fee. You only pay more when you win.
        </p>
      </div>

      {/* Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: !isAnnual ? '#FFFFFF' : '#64748B',
            transition: 'color 0.3s ease',
          }}
        >
          Monthly
        </span>

        <button
          onClick={() => setIsAnnual(!isAnnual)}
          style={{
            width: '48px',
            height: '26px',
            borderRadius: '13px',
            background: '#0F1629',
            border: '1px solid rgba(58, 123, 255, 0.3)',
            position: 'relative',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s ease',
          }}
        >
          <div
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#3A7BFF',
              position: 'absolute',
              top: '2px',
              left: isAnnual ? '24px' : '2px',
              transition: 'left 0.3s ease',
              boxShadow: '0 0 8px rgba(58, 123, 255, 0.5)',
            }}
          />
        </button>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: isAnnual ? '#FFFFFF' : '#64748B',
            transition: 'color 0.3s ease',
          }}
        >
          Annual
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier, index) => (
          <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} index={index} />
        ))}
      </div>

      {/* Performance fee note */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '12px',
          letterSpacing: '0.05em',
          color: '#64748B',
          marginTop: '32px',
        }}
      >
        * Pro and Elite tiers include a 10% performance fee on net monthly profits. Only charged when you win.
      </p>

      {/* Performance Fee Explanation */}
      <div className="max-w-3xl mx-auto mt-20 p-10 bg-[var(--color-bg-surface)] rounded-2xl border border-[var(--color-border)]">
        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', marginBottom: '20px', textAlign: 'center' }}>
          How Performance Fees Work
        </h3>
        <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '20px', textAlign: 'center' }}>
          We only succeed when you succeed. Our performance fee aligns our interests with yours.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--color-success)', marginBottom: '8px' }}>10%</div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Only on NET monthly profits</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>$0</div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Fee if you don't profit</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: 700, color: 'var(--color-accent-purple)', marginBottom: '8px' }}>100%</div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Transparent calculation</p>
          </div>
        </div>
        <div className="mt-8 p-5 bg-[#3b82f60d] rounded-lg border border-[#3b82f633]">
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}><strong>Example:</strong></p>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            If your bots generate $1,000 in profit this month, you pay $100 in performance fees. If you lose money or break even, you pay $0 in performance fees — only your subscription remains.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto mt-20">
        <h3 className="section-title text-center text-4xl mb-12">
          Frequently Asked Questions
        </h3>
        <div className="flex flex-col gap-6">
          {[
            {
              q: 'Can I change plans?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing.'
            },
            {
              q: 'What happens if I cancel?',
              a: 'You can cancel anytime. Your bots will continue running until the end of your billing period, then automatically pause.'
            },
            {
              q: 'How is the performance fee calculated?',
              a: 'Performance fees are calculated on NET monthly profits across all your connected accounts. Losses are deducted from gains before calculating the fee.'
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 7-day money-back guarantee for first-time subscribers. Performance fees are non-refundable as they\'re based on realized profits.'
            },
            {
              q: 'Can I try before buying?',
              a: 'Yes! You can download the app and use our Free tier to build and deploy 1 active trading bot. You only need a paid subscription to connect more accounts or run multiple bots.'
            }
          ].map((faq, i) => (
            <div key={i} className="p-6 bg-[var(--color-bg-surface)] rounded-xl border border-[var(--color-border)]">
              <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>{faq.q}</h4>
              <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-2xl mx-auto mt-20 text-center pb-20">
        <h3 className="section-title text-3xl mb-5">
          Start for Free — Upgrade Anytime
        </h3>
        <p className="section-subtitle mb-8">
          Download the AlgoDeck mobile app and begin your trading automation journey today
        </p>
        <div className="flex gap-6 justify-center flex-wrap mt-10">
          <a href="/download" className="transition-transform hover:scale-105 active:scale-95">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
              alt="Get it on Google Play" 
              className="h-12 w-auto"
            />
          </a>
          <a href="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
            <div className="absolute -top-3 -right-2 z-10">
              <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
            </div>
            <div className="opacity-50 grayscale">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-12 w-auto"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
