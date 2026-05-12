import { useEffect, useRef, useState } from 'react'
import { Bot, Zap, BarChart3, Link2 } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Strategy Builder',
    description: 'Natural language to trading strategy. AI-powered optimization. No coding required.',
  },
  {
    icon: Zap,
    title: 'Live Trading Bots',
    description: 'Deploy bots to MT4/MT5. Real-time execution. 24/7 automated trading.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Backtesting',
    description: 'Test on historical data. Multiple timeframes. Detailed analytics.',
  },
  {
    icon: Link2,
    title: 'Multi-Account Support',
    description: 'Multiple MT4/MT5 accounts. Trade across brokers. Centralized management.',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
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

  const Icon = feature.icon

  return (
    <div
      ref={cardRef}
      style={{
        background: '#0F1629',
        border: '1px solid rgba(58, 123, 255, 0.15)',
        borderRadius: '16px',
        padding: '40px',
        transition: 'all 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(58, 123, 255, 0.4)'
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 16px rgba(58, 123, 255, 0.1)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(58, 123, 255, 0.15)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(58, 123, 255, 0.1)',
          border: '1px solid rgba(58, 123, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={24} color="#3A7BFF" />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '22px',
          fontWeight: 600,
          color: '#FFFFFF',
          marginTop: '24px',
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: '15px',
          lineHeight: 1.7,
          color: '#94A3B8',
          marginTop: '12px',
        }}
      >
        {feature.description}
      </p>
    </div>
  )
}

export default function Features() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rotation = 0
    let animationId: number

    const animate = () => {
      rotation += 0.1
      if (globeRef.current) {
        globeRef.current.style.transform = `rotateY(${rotation}deg)`
      }
      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <section className="bg-[#0A0F2C] py-16 px-6 md:py-32 md:px-8 relative overflow-hidden">
      {/* Wireframe Globe Background */}
      <div
        style={{
          position: 'absolute',
          right: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '400px',
          height: '400px',
          opacity: 0.05,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        className="hidden lg:block"
      >
        <div
          ref={globeRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid #3A7BFF',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1px solid #3A7BFF',
                transform: `rotateY(${i * 30}deg)`,
              }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={`h-${i}`}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${25 + i * 16}%`,
                height: '1px',
                background: '#3A7BFF',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <p className="section-eyebrow">MOBILE APP</p>
        <h2 className="section-title">Powerful Trading Bot Features in Your Pocket</h2>
        <p className="section-subtitle">
          Download the app and start building profitable trading bots on your mobile device.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
