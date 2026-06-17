import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Shield, Mail } from 'lucide-react'

export default function Privacy() {
  return (
    <>
      <Navigation />
      <div style={{ position: 'relative', background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', background: 'var(--color-bg-midnight)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow-primary)'
              }}
            >
              <Shield size={36} color="#FFFFFF" />
            </div>
          </div>
          <h1 className="section-title" style={{ marginBottom: '16px' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Last Updated: May 2, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px 120px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '16px', lineHeight: 1.8 }}>

          {/* Introduction */}
          <div style={{ marginBottom: '48px' }}>
            <p style={{ marginBottom: '16px' }}>
              AlgoDeck is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.
            <p style={{ marginBottom: '16px' }}>
              By using AlgoDeck, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>

         {/* Section 1 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>1.</span>
              Information We Collect
            </h2>

            <p style={{ marginBottom: '16px' }}>
              We collect the following types of information:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Account Information:</strong> Email, username, password (encrypted), subscription tier, and payment details
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Trading Data:</strong> Strategies, bot configurations, execution history, account balances, and performance metrics
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Technical Data:</strong> IP address, device information, usage patterns, and diagnostic logs
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>2.</span>
              How We Use Your Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We use your data to provide our services, process payments, and ensure platform security.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              AI Training
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We may use anonymized, aggregated trading data to improve our AI models. Private trading strategies are not used to train models in a way that would expose your specific intellectual property to other users. You may opt-out of data usage for AI improvements in your account settings.
            </p>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>3.</span>
              Data Sharing
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We share data only with essential infrastructure providers (e.g., MetaAPI, Supabase, Stripe) necessary for service operation. We never sell your personal information.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>4.</span>
              Data Security
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We implement industry-standard measures:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
              <li style={{ marginBottom: '8px' }}>Secure credential storage in hardware security modules</li>
              <li style={{ marginBottom: '8px' }}>Strict access controls and 24/7 monitoring</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>5.</span>
              Trading Credentials
            </h2>
            <p style={{ marginBottom: '16px' }}>
              MetaTrader passwords are encrypted before storage, never stored in plaintext, and only used for authorized trading operations. We have no access to withdraw funds from your broker account.
            </p>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>6.</span>
              Your Rights
            </h2>
            <p style={{ marginBottom: '16px' }}>
              You have the right to access, correct, export, or request deletion of your data, and to close your account at any time.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>7.</span>
              Data Retention
            </h2>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Active accounts:</strong> Duration of service
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Closed accounts:</strong> 90 days for recovery, then deleted
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Financial records:</strong> 7 years for legal compliance
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Anonymized analytics:</strong> Indefinitely
              </li>
            </ul>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>8.</span>
              Cookies, Third-Party Links, and Children
            </h2>
            
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Cookies
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We use cookies for session management and analytics. You can control cookies through your device settings, but disabling certain cookies may affect functionality.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Third-Party Links
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We are not responsible for third-party privacy practices. We encourage you to review their privacy policies before providing personal information.
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Children's Privacy
            </h3>
            <p style={{ marginBottom: '16px' }}>
              AlgoDeck is not intended for users under 18. Trading in financial markets involves significant risk and is only appropriate for adults.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>9.</span>
              International Users
            </h2>
            <p style={{ marginBottom: '16px' }}>
              By using AlgoDeck, you consent to international data transfers. We take steps to ensure your data receives an adequate level of protection wherever it is processed.
            </p>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>10.</span>
              Changes to Policy
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We may update this policy from time to time. Material changes will be communicated via email or platform notification. Your continued use of AlgoDeck constitutes acceptance of any updates.
            </p>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>11.</span>
              Contact
            </h2>
            <p style={{ marginBottom: '16px' }}>
              For privacy concerns, contact us:
            </p>

            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              marginTop: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Privacy Inquiries</p>
                  <a href="mailto:privacy@algodeck.app" style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 500 }}>
                    privacy@algodeck.app
                  </a>
                </div>

                <div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Data Protection Officer</p>
                  <a href="mailto:dpo@algodeck.app" style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 500 }}>
                    dpo@algodeck.app
                  </a>
                </div>

                <div style={{ marginTop: '8px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    We strive to respond to all privacy inquiries within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '12px' }}>
              This Privacy Policy was last updated on May 2, 2026
            </p>
            <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
              AlgoDeck is committed to protecting your privacy and maintaining the security of your data.
            </p>
          </div>

        </div>
      </section>
      </div>
      <Footer />
    </>
  )
}
