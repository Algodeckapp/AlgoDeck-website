import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function Terms() {
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
              Welcome to AlgoDeck. By accessing or using our platform, you agree to be bound by these Terms of
              Service. Please read them carefully before using our services.
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
              1. Service Description
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              AlgoDeck provides an algorithmic trading platform that enables users to design, backtest, and deploy
              automated trading strategies. Our services include:
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
              <li style={{ marginBottom: '8px' }}>Strategy builder and visual programming interface</li>
              <li style={{ marginBottom: '8px' }}>Backtesting engine with historical market data</li>
              <li style={{ marginBottom: '8px' }}>Live trading execution via MT4/MT5 integration</li>
              <li style={{ marginBottom: '8px' }}>Portfolio management and risk analytics</li>
              <li style={{ marginBottom: '8px' }}>VPS infrastructure for 24/5 bot deployment</li>
              <li style={{ marginBottom: '8px' }}>API access for institutional clients</li>
            </ul>
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
              2. User Obligations
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              As a user of AlgoDeck, you agree to:
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
                Provide accurate and complete registration information
              </li>
              <li style={{ marginBottom: '8px' }}>
                Maintain the security of your account credentials
              </li>
              <li style={{ marginBottom: '8px' }}>
                Comply with all applicable laws and regulations regarding trading activities
              </li>
              <li style={{ marginBottom: '8px' }}>
                Not use the platform for illegal or unauthorized purposes
              </li>
              <li style={{ marginBottom: '8px' }}>
                Not attempt to reverse engineer, decompile, or extract source code from our platform
              </li>
              <li style={{ marginBottom: '8px' }}>
                Not share your account access with unauthorized third parties
              </li>
              <li style={{ marginBottom: '8px' }}>
                Respect rate limits and usage guidelines for API access
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
              3. Trading Risks and Disclaimers
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
                IMPORTANT: Trading financial instruments involves substantial risk of loss and is not suitable for
                all investors.
              </p>
            </div>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              You acknowledge and agree that:
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
                Past performance does not guarantee future results
              </li>
              <li style={{ marginBottom: '8px' }}>
                Backtesting results may not reflect actual trading conditions
              </li>
              <li style={{ marginBottom: '8px' }}>
                You may lose some or all of your invested capital
              </li>
              <li style={{ marginBottom: '8px' }}>
                AlgoDeck does not provide financial advice or investment recommendations
              </li>
              <li style={{ marginBottom: '8px' }}>
                You are solely responsible for your trading decisions and outcomes
              </li>
              <li style={{ marginBottom: '8px' }}>
                System failures, network issues, or market conditions may impact trading performance
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
              4. Subscription and Fees
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              AlgoDeck offers multiple subscription tiers with varying features and pricing. By subscribing, you
              agree to:
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
                Pay all applicable fees as described on our pricing page
              </li>
              <li style={{ marginBottom: '8px' }}>
                Subscriptions automatically renew unless cancelled before the renewal date
              </li>
              <li style={{ marginBottom: '8px' }}>
                Fees are non-refundable except as required by law or stated in our refund policy
              </li>
              <li style={{ marginBottom: '8px' }}>
                We reserve the right to change pricing with 30 days advance notice
              </li>
              <li style={{ marginBottom: '8px' }}>
                Payment must be made through approved payment methods
              </li>
              <li style={{ marginBottom: '8px' }}>
                Failed payments may result in service suspension or termination
              </li>
            </ul>
          </section>

          {/* 5. Grace Period */}
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
              5. Grace Period and Service Suspension
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              In the event of payment failure or subscription expiration:
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
                A 7-day grace period will be provided for payment resolution
              </li>
              <li style={{ marginBottom: '8px' }}>
                During the grace period, access to live trading features will be suspended
              </li>
              <li style={{ marginBottom: '8px' }}>
                Running bots will be automatically stopped to prevent unauthorized trading
              </li>
              <li style={{ marginBottom: '8px' }}>
                Read-only access to historical data and account settings will remain available
              </li>
              <li style={{ marginBottom: '8px' }}>
                After the grace period, full account suspension may occur
              </li>
              <li style={{ marginBottom: '8px' }}>
                Accounts inactive for 90 days may be subject to data deletion
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
              6. Intellectual Property
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              All content, features, and functionality of the AlgoDeck platform, including but not limited to
              software, text, graphics, logos, and trademarks, are owned by AlgoDeck and protected by
              international copyright and intellectual property laws.
            </p>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              You retain ownership of your trading strategies, but grant AlgoDeck a license to host, execute, and
              process them as necessary to provide our services. We will not share or sell your proprietary
              strategies to third parties.
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
              7. Limitation of Liability
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              To the maximum extent permitted by law, AlgoDeck and its affiliates shall not be liable for:
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
                Any trading losses or missed profit opportunities
              </li>
              <li style={{ marginBottom: '8px' }}>
                Service interruptions, system errors, or data loss
              </li>
              <li style={{ marginBottom: '8px' }}>
                Third-party broker errors or market execution issues
              </li>
              <li style={{ marginBottom: '8px' }}>
                Indirect, incidental, or consequential damages
              </li>
              <li style={{ marginBottom: '8px' }}>
                Damages exceeding the amount paid for services in the preceding 12 months
              </li>
            </ul>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginTop: '16px',
              }}
            >
              Our platform is provided "as is" without warranties of any kind, express or implied.
            </p>
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
              8. Termination
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              You may cancel your subscription at any time through your account settings. Upon cancellation:
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
                Access will continue until the end of your current billing period
              </li>
              <li style={{ marginBottom: '8px' }}>
                All active trading bots will be stopped
              </li>
              <li style={{ marginBottom: '8px' }}>
                Historical data will remain accessible for 30 days
              </li>
              <li style={{ marginBottom: '8px' }}>
                No refunds will be provided for unused time
              </li>
            </ul>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginTop: '16px',
              }}
            >
              We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent
              activity, or pose a security risk to our platform.
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
              9. Changes to Terms
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              We may update these Terms of Service from time to time. Material changes will be communicated via
              email or platform notification at least 30 days in advance. Your continued use of the platform after
              changes take effect constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* 10. Governing Law */}
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
              10. Governing Law
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
              }}
            >
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in
              which AlgoDeck is incorporated, without regard to its conflict of law provisions. Any disputes
              arising from these Terms shall be resolved through binding arbitration in accordance with applicable
              arbitration rules.
            </p>
          </section>

          {/* 11. Contact Information */}
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
              11. Contact Information
            </h2>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-text-secondary)',
                marginBottom: '16px',
              }}
            >
              For questions or concerns regarding these Terms of Service, please contact us at:
            </p>
            <div
              style={{
                padding: '20px',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '8px',
                }}
              >
                Legal Department
              </p>
              <a
                href="mailto:legal@algodeck.com"
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
                legal@algodeck.com
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
