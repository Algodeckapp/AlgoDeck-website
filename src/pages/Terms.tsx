import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Terms() {
  return (
    <div style={{ position: 'relative', background: 'var(--color-bg-deep)', minHeight: '100vh' }}>
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
            Terms of Service
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-secondary)',
              marginTop: '16px',
            }}
          >
            Last Updated: May 2, 2026
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section
        style={{
          padding: '80px 24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div
          className="glass-panel"
          style={{
            padding: '48px',
          }}
        >
          {/* Introduction */}
          <div style={{ marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              Welcome to AlgoDeck. By accessing or using our trading automation platform, you agree to be bound by these Terms of Service.
            </p>
          </div>

          {/* 1. Service Description */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              1. SERVICE DESCRIPTION
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              AlgoDeck provides automated trading bot creation and management services for MetaTrader 4 and MetaTrader 5 platforms. Our service includes strategy building, backtesting, AI-powered features, and automated trade execution.
            </p>
          </section>

          {/* 2. User Obligations */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              2. USER OBLIGATIONS
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              You agree to:
            </p>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '32px',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Provide accurate account information
              </li>
              <li style={{ marginBottom: '8px' }}>
                Maintain the security of your account credentials
              </li>
              <li style={{ marginBottom: '8px' }}>
                Use the service in compliance with all applicable laws
              </li>
              <li style={{ marginBottom: '8px' }}>
                Not attempt to reverse engineer or exploit the platform
              </li>
              <li style={{ marginBottom: '8px' }}>
                Accept full responsibility for trading decisions and outcomes
              </li>
            </ul>
          </section>

          {/* 3. Trading Risks */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              3. TRADING RISKS
            </h2>
            <div
              style={{
                padding: '20px',
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--color-text-primary)',
                  fontWeight: 500,
                }}
              >
                Trading financial instruments involves substantial risk of loss. You acknowledge:
              </p>
            </div>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '32px',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Past performance does not guarantee future results
              </li>
              <li style={{ marginBottom: '8px' }}>
                Automated trading carries additional technical risks, including slippage, latency, and broker outages
              </li>
              <li style={{ marginBottom: '8px' }}>
                You are solely responsible for all trading decisions, and AlgoDeck is not a registered investment advisor
              </li>
              <li style={{ marginBottom: '8px' }}>
                Automated strategies may result in rapid and significant capital loss
              </li>
            </ul>
          </section>

          {/* 4. Subscription and Fees */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              4. SUBSCRIPTION AND FEES
            </h2>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '32px',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Subscription fees are billed monthly in advance
              </li>
              <li style={{ marginBottom: '8px' }}>
                Performance fees (where applicable) are calculated on net monthly profits using a "High-Water Mark" principle, ensuring fees are only charged on new profits
              </li>
              <li style={{ marginBottom: '8px' }}>
                All fees are non-refundable except as required by law
              </li>
              <li style={{ marginBottom: '8px' }}>
                We reserve the right to modify pricing with 30 days notice
              </li>
            </ul>
          </section>

          {/* 5. Grace Period and Cancellation */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              5. GRACE PERIOD AND CANCELLATION
            </h2>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '32px',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Failed payments trigger a 3-day grace period
              </li>
              <li style={{ marginBottom: '8px' }}>
                Bots are automatically paused after grace period expires
              </li>
              <li style={{ marginBottom: '8px' }}>
                You may cancel your subscription at any time
              </li>
              <li style={{ marginBottom: '8px' }}>
                Access continues until the end of the billing period
              </li>
            </ul>
          </section>

          {/* 6. Intellectual Property */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              6. INTELLECTUAL PROPERTY
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              All platform code, designs, and features are owned by AlgoDeck. You retain ownership of your trading strategies and data.
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              7. LIMITATION OF LIABILITY
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              AlgoDeck is provided "as is" without warranties of any kind. To the maximum extent permitted by law, our total liability for any claims arising out of or related to these terms shall not exceed the amount you paid to AlgoDeck in the 12 months preceding the claim. We are not liable for:
            </p>
            <ul
              style={{
                listStyle: 'disc',
                paddingLeft: '32px',
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              <li style={{ marginBottom: '8px' }}>
                Trading losses
              </li>
              <li style={{ marginBottom: '8px' }}>
                Platform downtime or broker technical issues
              </li>
              <li style={{ marginBottom: '8px' }}>
                Data loss or security breaches beyond our reasonable control
              </li>
            </ul>
          </section>

          {/* 8. Termination */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              8. TERMINATION
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              We reserve the right to suspend or terminate accounts that violate these terms, engage in fraud, or abuse platform resources.
            </p>
          </section>

          {/* 9. Changes to Terms */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              9. CHANGES TO TERMS
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              We may update these terms at any time. Continued use constitutes acceptance of modified terms.
            </p>
          </section>

          {/* 10. Contact Information */}
          <section>
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              10. CONTACT
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              For questions about these terms, contact us at:
            </p>
            <div
              style={{
                padding: '20px',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <a
                href="mailto:legal@algodeck.app"
                style={{
                  fontSize: '15px',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none'
                }}
              >
                legal@algodeck.app
              </a>
            </div>
          </section>
        </div>

        {/* Acknowledgment Box */}
        <div
          style={{
            marginTop: '40px',
            padding: '24px',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
            }}
          >
            By using AlgoDeck, you acknowledge that you have read, understood, and agree to be bound by these
            Terms of Service.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
