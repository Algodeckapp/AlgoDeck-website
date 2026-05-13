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
        className="w-full bg-gradient-to-br from-[#0A0F2C] via-[#0F1629] to-[#0A0F2C] py-24 md:py-32 px-6 border-t border-b border-[#3A7BFF]/15 relative overflow-hidden"
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 w-full h-full"
        />

        {/* Content */}
        <div
          className={`relative z-10 max-w-2xl mx-auto text-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Ready to Automate Your Trading?</h2>
          <p className="text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-lg mx-auto mt-6">
            Join thousands of traders using AlgoDeck to build profitable trading bots.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <a 
              href="/download" 
              className="transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/10"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-14 w-auto"
              />
            </a>
            <a 
              href="/download"
              className="relative group transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute -top-3 -right-2 z-10">
                <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
              </div>
              <div className="opacity-40 grayscale">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-14 w-auto"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </>
  )
}
