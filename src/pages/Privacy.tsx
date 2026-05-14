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
              AlgoDeck ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and services. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
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

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              1.1 Account Information
            </h3>
            <p style={{ marginBottom: '16px' }}>
              When you create an AlgoDeck account, we collect:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Email address</li>
              <li style={{ marginBottom: '8px' }}>Username and password (encrypted)</li>
              <li style={{ marginBottom: '8px' }}>Account creation date and last login timestamp</li>
              <li style={{ marginBottom: '8px' }}>Subscription tier (Free, Pro, or Elite)</li>
              <li style={{ marginBottom: '8px' }}>Payment information (processed securely by our payment processor)</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              1.2 Trading Information
            </h3>
            <p style={{ marginBottom: '16px' }}>
              To provide our automated trading services, we collect:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>MT4/MT5 broker credentials (encrypted and stored securely)</li>
              <li style={{ marginBottom: '8px' }}>MetaAPI account IDs and connection tokens</li>
              <li style={{ marginBottom: '8px' }}>Trading strategies, bot configurations, and parameters</li>
              <li style={{ marginBottom: '8px' }}>Trade execution history (symbols, volumes, entry/exit prices, timestamps)</li>
              <li style={{ marginBottom: '8px' }}>Account balance and performance metrics</li>
              <li style={{ marginBottom: '8px' }}>Backtesting results and historical data</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              1.3 Technical Information
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We automatically collect certain technical information when you use AlgoDeck:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Device information (model, operating system, unique device identifiers)</li>
              <li style={{ marginBottom: '8px' }}>IP address and approximate geographic location</li>
              <li style={{ marginBottom: '8px' }}>App usage data (features used, session duration, crash reports)</li>
              <li style={{ marginBottom: '8px' }}>Performance and diagnostic information</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>2.</span>
              How We Use Your Information
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We use the information we collect for the following purposes:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Service Delivery:</strong> To provide, maintain, and improve our automated trading services, including executing trades on your behalf via MetaAPI
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Account Management:</strong> To create and manage your account, process subscriptions, and provide customer support
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Analytics:</strong> To analyze trading performance, generate reports, and provide insights into your bot's performance
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Security:</strong> To protect against unauthorized access, fraud, and abuse
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Communications:</strong> To send you service updates, trade notifications, and important account information
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Improvement:</strong> To improve our AI models, optimize strategy performance, and develop new features
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Legal Compliance:</strong> To comply with legal obligations and enforce our Terms of Service
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>3.</span>
              Data Sharing and Disclosure
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We do not sell your personal information. We share your information only in the following circumstances:
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              3.1 Service Providers
            </h3>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>MetaAPI:</strong> We share your MT4/MT5 broker credentials and trading instructions with MetaAPI to execute trades on your behalf. MetaAPI is a third-party service that provides bridge connectivity to MetaTrader platforms.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Supabase:</strong> We use Supabase as our backend database and authentication provider. Your account information, trading data, and bot configurations are stored on Supabase's secure infrastructure.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Payment Processors:</strong> We use third-party payment processors (Stripe, PayPal) to handle subscription payments. These providers have access to payment information necessary to process transactions.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Cloud Services:</strong> We use cloud infrastructure providers for hosting, storage, and computing resources.
              </li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              3.2 Legal Requirements
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas, or regulatory requirements).
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              3.3 Business Transfers
            </h3>
            <p style={{ marginBottom: '16px' }}>
              In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice in the app of any such change in ownership.
            </p>
          </div>

          {/* Section 4 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>4.</span>
              Data Security
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Access Controls:</strong> Strict access controls and authentication mechanisms limit who can access your data
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Regular Audits:</strong> We conduct regular security audits and vulnerability assessments
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Secure Infrastructure:</strong> Our infrastructure is hosted on enterprise-grade cloud platforms with advanced security features
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Monitoring:</strong> 24/7 monitoring for suspicious activity and security threats
              </li>
            </ul>
            <p style={{ marginBottom: '16px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--color-danger)' }}>
              <strong>Important:</strong> While we take every precaution to protect your data, no method of transmission over the internet or electronic storage is 100% secure. You are responsible for maintaining the confidentiality of your account credentials.
            </p>
          </div>

          {/* Section 5 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>5.</span>
              Trading Credentials Protection
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Your MT4/MT5 broker credentials are especially sensitive. We take additional measures to protect them:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Credentials are encrypted with military-grade encryption before storage</li>
              <li style={{ marginBottom: '8px' }}>We never log or display your passwords in plain text</li>
              <li style={{ marginBottom: '8px' }}>Credentials are transmitted only to MetaAPI via secure, encrypted channels</li>
              <li style={{ marginBottom: '8px' }}>We recommend using broker accounts with read/trade permissions only (not withdrawal permissions)</li>
              <li style={{ marginBottom: '8px' }}>You can revoke AlgoDeck's access at any time by changing your broker password or disconnecting your account</li>
            </ul>
          </div>

          {/* Section 6 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>6.</span>
              Your Rights and Choices
            </h2>
            <p style={{ marginBottom: '16px' }}>
              You have the following rights regarding your personal information:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Access:</strong> Request a copy of the personal data we hold about you
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Correction:</strong> Request corrections to any inaccurate or incomplete data
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Deletion:</strong> Request deletion of your account and associated data (subject to legal retention requirements)
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Portability:</strong> Request a copy of your data in a structured, machine-readable format
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Opt-out:</strong> Unsubscribe from marketing communications (service-related emails are still required)
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Restriction:</strong> Request restriction of processing in certain circumstances
              </li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              To exercise any of these rights, contact us at <a href="mailto:privacy@algodeck.app" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>privacy@algodeck.app</a>. We will respond to your request within 30 days.
            </p>
          </div>

          {/* Section 7 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>7.</span>
              Data Retention
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We retain your personal information for as long as necessary to provide our services and comply with legal obligations:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Account Information:</strong> Retained for the duration of your account plus 7 years for tax and legal compliance
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Trading Data:</strong> Retained for 7 years to comply with financial regulations
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Technical Logs:</strong> Retained for 90 days for security and troubleshooting purposes
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Marketing Data:</strong> Retained until you unsubscribe or request deletion
              </li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal or regulatory purposes.
            </p>
          </div>

          {/* Section 8 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>8.</span>
              Cookies and Tracking Technologies
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Essential Cookies:</strong> Required for authentication and core functionality
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Performance Cookies:</strong> Help us understand how you use the app and identify issues
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Analytics:</strong> We use analytics tools to measure app usage and improve our services
              </li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              You can control cookies through your device settings, but disabling certain cookies may affect functionality.
            </p>
          </div>

          {/* Section 9 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>9.</span>
              Third-Party Links
            </h2>
            <p style={{ marginBottom: '16px' }}>
              Our app may contain links to third-party websites, services, or resources (such as MetaAPI documentation, broker websites, or educational content). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </div>

          {/* Section 10 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>10.</span>
              Children's Privacy
            </h2>
            <p style={{ marginBottom: '16px' }}>
              AlgoDeck is not intended for users under the age of 18. We do not knowingly collect personal information from children. Trading in financial markets involves significant risk and is only appropriate for adults. If we become aware that we have collected personal information from a child under 18, we will take steps to delete that information promptly.
            </p>
            <p style={{ marginBottom: '16px' }}>
              If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:privacy@algodeck.app" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>privacy@algodeck.app</a>.
            </p>
          </div>

          {/* Section 11 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>11.</span>
              International Users
            </h2>
            <p style={{ marginBottom: '16px' }}>
              AlgoDeck is available globally. If you access our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States and other countries where our service providers operate.
            </p>
            <p style={{ marginBottom: '16px' }}>
              By using AlgoDeck, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection laws. We take steps to ensure that your data receives an adequate level of protection wherever it is processed.
            </p>
          </div>

          {/* Section 12 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>12.</span>
              Changes to This Privacy Policy
            </h2>
            <p style={{ marginBottom: '16px' }}>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make material changes, we will:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Update the "Last Updated" date at the top of this policy</li>
              <li style={{ marginBottom: '8px' }}>Notify you via email and/or in-app notification</li>
              <li style={{ marginBottom: '8px' }}>Provide a reasonable notice period before the changes take effect</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              Your continued use of AlgoDeck after any changes to this Privacy Policy constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* Section 13 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>13.</span>
              GDPR Compliance (European Users)
            </h2>
            <p style={{ marginBottom: '16px' }}>
              If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR):
            </p>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Legal Basis for Processing
            </h3>
            <p style={{ marginBottom: '16px' }}>
              We process your personal data on the following legal bases:
            </p>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Contract Performance:</strong> Processing necessary to provide our trading services
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Legitimate Interests:</strong> Improving our services, security, and fraud prevention
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Legal Obligations:</strong> Compliance with financial regulations and tax laws
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#FFFFFF' }}>Consent:</strong> Marketing communications and optional features
              </li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Additional GDPR Rights
            </h3>
            <ul style={{ marginBottom: '24px', marginLeft: '24px', listStyleType: 'disc' }}>
              <li style={{ marginBottom: '8px' }}>Right to object to processing based on legitimate interests</li>
              <li style={{ marginBottom: '8px' }}>Right to withdraw consent at any time (where processing is based on consent)</li>
              <li style={{ marginBottom: '8px' }}>Right to lodge a complaint with your local data protection authority</li>
              <li style={{ marginBottom: '8px' }}>Right to be informed about automated decision-making and profiling (we use AI for strategy recommendations)</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', marginBottom: '16px', marginTop: '24px' }}>
              Data Protection Officer
            </h3>
            <p style={{ marginBottom: '16px' }}>
              For GDPR-related inquiries, you can contact our Data Protection Officer at <a href="mailto:dpo@algodeck.app" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>dpo@algodeck.app</a>.
            </p>
          </div>

          {/* Section 14 */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#FFFFFF', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--color-primary)', fontSize: '20px' }}>14.</span>
              Contact Us
            </h2>
            <p style={{ marginBottom: '16px' }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>

            <div style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              marginTop: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Mail size={24} color="var(--color-primary)" />
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFFFFF' }}>Privacy Inquiries</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>General Privacy Questions</p>
                  <a href="mailto:privacy@algodeck.app" style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 500 }}>
                    privacy@algodeck.app
                  </a>
                </div>

                <div>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Data Protection Officer (GDPR)</p>
                  <a href="mailto:dpo@algodeck.app" style={{ color: 'var(--color-primary)', fontSize: '16px', fontWeight: 500 }}>
                    dpo@algodeck.app
                  </a>
                </div>

                <div style={{ marginTop: '8px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    We strive to respond to all privacy inquiries within 48 hours and will resolve your request within 30 days.
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
