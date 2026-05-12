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
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#05070F]/85 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <div
        className="bg-[#0A0F2C] border border-[#3A7BFF]/20 rounded-2xl p-8 md:p-10 max-w-[500px] w-full max-h-[90vh] overflow-y-auto relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors p-1"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-[#00D084]/10 border-2 border-[#00D084] flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D084" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Demo Requested!
            </h3>
            <p className="text-[15px] text-[#94A3B8] leading-relaxed">
              Thanks, {formData.name}! Our team will reach out within 24 hours to schedule your personalized demo.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Schedule a Demo
            </h3>
            <p className="text-sm text-[#94A3B8] mb-8">
              See AlgoDeck in action with a personalized walkthrough.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  placeholder="Your company (optional)"
                />
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Trader Type</label>
                <select
                  value={formData.traderType}
                  onChange={(e) => setFormData({ ...formData, traderType: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors cursor-pointer"
                >
                  <option value="individual">Individual Trader</option>
                  <option value="prop_firm">Prop Firm</option>
                  <option value="institution">Institution</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-medium tracking-wider uppercase text-[#94A3B8] mb-1.5 block">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0F1629] border border-[#3A7BFF]/20 rounded-lg text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors min-h-[80px] resize-vertical"
                  placeholder="Anything specific you'd like to see?"
                />
              </div>

              <button
                type="submit"
                disabled={demoMutation.isPending}
                className="glow-button w-full mt-2"
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
