import { useEffect, useRef, useState } from 'react'
import ContactModal from '@/components/ContactModal'

export default function CTABanner() {
  const [showModal, setShowModal] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  // Particle burst canvas effect
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.parentElement?.clientWidth || 720
    canvas.height = canvas.parentElement?.clientHeight || 400

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create particles
    for (let i = 0; i < 60; i++) {
      const angle = (Math.PI * 2 * i) / 60
      const speed = 0.3 + Math.random() * 0.8
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 200 + Math.random() * 200,
      })
    }

    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        const alpha = progress < 0.5 ? progress * 2 : (1 - progress) * 2

        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(58, 123, 255, ${alpha * 0.2})`
        ctx.fill()

        if (p.life >= p.maxLife) {
          p.x = centerX
          p.y = centerY
          p.life = 0
          const angle = Math.random() * Math.PI * 2
          const speed = 0.3 + Math.random() * 0.8
          p.vx = Math.cos(angle) * speed
          p.vy = Math.sin(angle) * speed
        }
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 720
      canvas.height = canvas.parentElement?.clientHeight || 400
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [visible])

  return (
    <>
      <section
        ref={sectionRef}
        style={{
          width: '100%',
          background: 'linear-gradient(135deg, #0A0F2C 0%, #0F1629 50%, #0A0F2C 100%)',
          padding: '128px 24px',
          borderTop: '1px solid rgba(58, 123, 255, 0.15)',
          borderBottom: '1px solid rgba(58, 123, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease',
          }}
        >
          <h2 className="section-title">Ready to Automate Your Trading?</h2>
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#94A3B8',
              maxWidth: '560px',
              margin: '20px auto 0',
            }}
          >
            Join thousands of traders using AlgoDeck to build profitable trading bots.
          </p>

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <a
              href="/download"
              className="glow-button"
              style={{ padding: '16px 40px', fontSize: '16px' }}
            >
              Download for Android
            </a>
            <button
              style={{
                background: 'rgba(58, 123, 255, 0.1)',
                border: '1px solid rgba(58, 123, 255, 0.3)',
                borderRadius: '8px',
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: 500,
                padding: '12px 32px',
                cursor: 'not-allowed',
                opacity: 0.7,
              }}
              disabled
            >
              Download for iOS (Coming Soon)
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </>
  )
}
