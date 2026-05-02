import { useState } from 'react'
import { X } from 'lucide-react'
import { trpc } from '@/providers/trpc'

interface ContactModalProps {
  onClose: () => void
}

export default function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    traderType: 'individual',
    preferredDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const demoMutation = trpc.demo.request.useMutation({
    onSuccess: () => {
      setSubmitted(true)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    demoMutation.mutate(formData)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    background: '#0F1629',
    border: '1px solid rgba(58, 123, 255, 0.2)',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    color: '#94A3B8',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(5, 7, 15, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0A0F2C',
          border: '1px solid rgba(58, 123, 255, 0.2)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#64748B',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(0, 208, 132, 0.1)',
                border: '2px solid #00D084',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#FFFFFF', marginBottom: '12px' }}>
              Demo Requested!
            </h3>
            <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.6 }}>
              Thanks, {formData.name}! Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
          </div>
        ) : (
          <>
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Schedule a Demo
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '32px' }}>
              See AlgoDeck in action with a personalized walkthrough.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={inputStyle}
                  placeholder="Your name"
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
                />
              </div>

              <div>
                <label style={labelStyle}>Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  style={inputStyle}
                  placeholder="Your company (optional)"
                />
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={inputStyle}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label style={labelStyle}>Trader Type</label>
                <select
                  value={formData.traderType}
                  onChange={(e) => setFormData({ ...formData, traderType: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="individual">Individual Trader</option>
                  <option value="prop_firm">Prop Firm</option>
                  <option value="institution">Institution</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  placeholder="Anything specific you'd like to see?"
                />
              </div>

              <button
                type="submit"
                disabled={demoMutation.isPending}
                className="glow-button"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {demoMutation.isPending ? 'Submitting...' : 'Request Demo'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
