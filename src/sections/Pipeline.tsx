import { useEffect, useRef, useState } from 'react'
import { Download, Cog, Activity } from 'lucide-react'

const stages = [
  {
    step: 1,
    title: 'Download & Sign Up',
    description: 'Get the AlgoDeck app from Google Play Store. Create your free account in seconds. Connect your MT4/MT5 broker accounts.',
    icon: Download,
    side: 'left' as const,
  },
  {
    step: 2,
    title: 'Build Your Strategy',
    description: 'Use our AI-powered builder or visual strategy designer. Backtest your strategy on years of historical data. Fine-tune parameters for optimal performance.',
    icon: Cog,
    side: 'right' as const,
  },
  {
    step: 3,
    title: 'Deploy & Monitor',
    description: 'Activate your trading bot with one tap. Monitor real-time performance from your phone. Adjust settings and optimize anytime, anywhere.',
    icon: Activity,
    side: 'left' as const,
  },
]

function StageCard({ stage, index }: { stage: typeof stages[0]; index: number }) {
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

  const Icon = stage.icon
  const isLeft = stage.side === 'left'

  return (
    <div
      ref={cardRef}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-start' : 'flex-end',
        padding: '0 24px',
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0) scale(1)'
          : `translateX(${isLeft ? '-60px' : '60px'}) scale(0.95)`,
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          background: 'rgba(15, 22, 41, 0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(58, 123, 255, 0.15)',
          borderRadius: '16px',
          padding: '32px',
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Step number */}
        <span
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '48px',
            fontWeight: 700,
            color: '#3A7BFF',
            opacity: 0.15,
            lineHeight: 1,
          }}
        >
          {String(stage.step).padStart(2, '0')}
        </span>

        {/* Icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Icon size={28} color="#17B7BD" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '12px',
          }}
        >
          {stage.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#94A3B8',
          }}
        >
          {stage.description}
        </p>
      </div>
    </div>
  )
}

export default function Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      const line = lineRef.current
      if (!section || !line) return

      const rect = section.getBoundingClientRect()
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Calculate progress: 0 when section top enters viewport, 1 when section bottom leaves
      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportHeight - rect.top) / (sectionHeight + viewportHeight))
      )

      line.style.height = `${scrollProgress * 100}%`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#05070F',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: '640px',
          margin: '0 auto 80px',
          padding: '0 24px',
        }}
      >
        <p className="section-eyebrow">HOW IT WORKS</p>
        <h2 className="section-title">Start Trading in 3 Simple Steps</h2>
        <p className="section-subtitle">
          Download the mobile app, build your strategy, and let your bot trade 24/7.
        </p>
      </div>

      {/* Pipeline Container */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          padding: '0 24px',
        }}
      >
        {/* Connecting Line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            transform: 'translateX(-50%)',
            background: 'rgba(58, 123, 255, 0.08)',
            zIndex: 0,
          }}
        >
          <div
            ref={lineRef}
            style={{
              width: '100%',
              height: '0%',
              background: 'linear-gradient(to bottom, #3A7BFF, #17B7BD, #00D084)',
              transition: 'height 0.1s linear',
            }}
          />
        </div>

        {/* Stage Cards */}
        {stages.map((stage, index) => (
          <StageCard key={stage.step} stage={stage} index={index} />
        ))}
      </div>
    </section>
  )
}
