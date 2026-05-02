import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'AlgoDeck turned my manual RSI strategy into a running bot in under 10 minutes. The backtest showed 58% win rate over 4 years. Now it trades while I sleep.',
    author: 'Marcus T.',
    role: 'Forex Trader',
    rating: 5,
    avatar: '/assets/avatar-1.jpg',
  },
  {
    quote: 'We manage 40+ accounts for our fund. The VPS orchestration and bulk deployment saved us weeks of infrastructure work. Pure automation excellence.',
    author: 'Elena K.',
    role: 'Fund Manager',
    rating: 5,
    avatar: '/assets/avatar-2.jpg',
  },
  {
    quote: 'The AI strategy parser understood my natural language description perfectly. No coding, no debugging — just submit, validate, deploy. Revolutionary.',
    author: 'James R.',
    role: 'Day Trader',
    rating: 5,
    avatar: '/assets/avatar-3.jpg',
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 200)
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
        background: 'rgba(15, 22, 41, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(58, 123, 255, 0.15)',
        borderRadius: '16px',
        padding: '36px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '320px',
      }}
    >
      <div>
        {/* Stars */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} fill="#3A7BFF" color="#3A7BFF" />
          ))}
        </div>

        {/* Quote */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#94A3B8',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid rgba(58, 123, 255, 0.15)',
            objectFit: 'cover',
          }}
        />
        <div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
            }}
          >
            {testimonial.author}
          </p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#64748B',
              marginTop: '2px',
            }}
          >
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      style={{
        background: '#05070F',
        padding: '120px 24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '640px',
          margin: '0 auto 64px',
        }}
      >
        <p className="section-eyebrow">TRADER STORIES</p>
        <h2 className="section-title">Built for Traders Like You</h2>
      </div>

      {/* Testimonials Grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
        }}
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.author} testimonial={testimonial} index={index} />
        ))}
      </div>
    </section>
  )
}
