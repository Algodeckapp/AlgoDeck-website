import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Check, X, HelpCircle, TrendingUp, DollarSign, Activity } from 'lucide-react'
import * as THREE from 'three'
import Navigation from '@/sections/Navigation'

const tiers = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Explore the basics of trading automation.',
    features: [
      { label: 'Strategy Builder', included: true },
      { label: 'Standard Backtesting', included: true },
      { label: '1 Active Bot', included: true },
      { label: 'MT4/MT5 Integration', included: false },
      { label: 'Multiple Accounts', included: false },
      { label: 'Advanced Analytics', included: false },
      { label: 'Email Alerts', included: false },
      { label: 'Priority Support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Starter',
    monthlyPrice: 49,
    annualPrice: 490,
    description: 'For individual traders getting started.',
    features: [
      { label: 'Strategy Builder', included: true },
      { label: 'Standard Backtesting', included: true },
      { label: 'Up to 3 Active Bots', included: true },
      { label: '1 MT4/MT5 Account', included: true },
      { label: '7-day Analytics History', included: true },
      { label: 'Email Alerts', included: true },
      { label: '0% Performance Fee', included: true },
      { label: 'Email Support', included: true },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 990,
    description: 'For serious traders who need AI power.',
    features: [
      { label: '3 Connected Accounts', included: true },
      { label: 'Up to 10 Active Bots', included: true },
      { label: 'AI Natural Strategies', included: true },
      { label: 'Advanced Backtesting', included: true },
      { label: 'Push + Email Alerts', included: true },
      { label: 'Full Analytics History', included: true },
      { label: '10% Performance Fee', included: true },
      { label: 'Priority Support', included: true },
    ],
    cta: 'Get Started',
    popular: true,
    primary: true,
  },
  {
    name: 'Elite',
    monthlyPrice: 249,
    annualPrice: 2490,
    description: 'For professionals managing multiple strategies.',
    features: [
      { label: '10 Connected Accounts', included: true },
      { label: 'Unlimited Bots', included: true },
      { label: 'AI Optimization', included: true },
      { label: 'Advanced Backtesting', included: true },
      { label: 'Push + Email + SMS', included: true },
      { label: 'PDF Reports', included: true },
      { label: 'VPS Monitoring', included: true },
      { label: 'Account Manager', included: true },
    ],
    cta: 'Get Started',
    popular: false,
    primary: false,
  },
  {
    name: 'Institutional',
    monthlyPrice: null,
    annualPrice: null,
    description: 'For firms requiring custom infrastructure.',
    features: [
      { label: 'Unlimited Accounts', included: true },
      { label: 'Custom Bot Dev', included: true },
      { label: 'Custom Backtesting', included: true },
      { label: 'API Access', included: true },
      { label: 'Dedicated Infra', included: true },
      { label: 'SLA Guarantee', included: true },
      { label: 'Negotiable Fee', included: true },
      { label: '24/7 Support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
    primary: false,
  },
]

function PricingCard({
  tier,
  isAnnual,
  index,
}: {
  tier: typeof tiers[0]
  isAnnual: boolean
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 100)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`glass-panel p-8 md:p-10 flex flex-col h-full transition-all duration-1000 group ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${
        tier.popular 
          ? 'border-[#3A7BFF]/40 shadow-[0_0_40px_rgba(58,123,255,0.1)]' 
          : 'border-white/5'
      } hover:border-[#3A7BFF]/30 hover:shadow-[0_0_40px_rgba(58,123,255,0.15)]`}
    >
      {tier.popular && (
        <div className="absolute top-0 right-10 -translate-y-1/2">
          <span className="bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
        <p className="text-[#64748B] text-sm leading-relaxed">{tier.description}</p>
      </div>

      <div className="mb-8">
        {tier.monthlyPrice !== null ? (
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                ${isAnnual ? Math.round(tier.annualPrice! / 12) : tier.monthlyPrice}
              </span>
              <span className="text-[#64748B] text-lg">/mo</span>
            </div>
            {isAnnual && tier.annualPrice! > 0 && (
              <span className="text-[#00D084] text-xs font-medium mt-2">
                ${tier.annualPrice}/year (save 2 months)
              </span>
            )}
          </div>
        ) : (
          <span className="text-4xl font-bold text-white">Custom</span>
        )}
      </div>

      <div className="h-px bg-white/5 w-full mb-8" />

      <ul className="space-y-4 mb-10 flex-grow">
        {tier.features.map((feature) => (
          <li key={feature.label} className="flex items-start gap-3 group/feature">
            {feature.included ? (
              <Check size={18} className="text-[#00D084] mt-0.5 shrink-0" />
            ) : (
              <X size={18} className="text-[#64748B] mt-0.5 shrink-0" />
            )}
            <span className={`text-sm leading-snug transition-colors ${
              feature.included ? 'text-[#94A3B8] group-hover/feature:text-white' : 'text-[#64748B] line-through opacity-50'
            }`}>
              {feature.label}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to={tier.cta === 'Contact Sales' ? '/contact' : '/download'}
        className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest text-center transition-all duration-300 ${
          tier.primary
            ? 'bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95'
            : 'border border-white/10 text-white hover:bg-white/5 hover:border-white/20 active:scale-95'
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  )
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [bgLoaded, setBgLoaded] = useState(false)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  // ─── Three.js Particle Background ───
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 30)

    const particleCount = 2000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const colorBlue = new THREE.Color('#3A7BFF')
    const colorCyan = new THREE.Color('#17B7BD')

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 80
      positions[i3 + 1] = (Math.random() - 0.5) * 60
      positions[i3 + 2] = (Math.random() - 0.5) * 40

      const mixRatio = Math.random()
      const color = mixRatio > 0.6 ? colorBlue : colorCyan
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      sizes[i] = Math.random() * 2 + 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    const gridHelper = new THREE.GridHelper(100, 50, 0x1a2540, 0x0d1220)
    gridHelper.position.y = -20
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.3
    scene.add(gridHelper)

    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      const posArray = geometry.attributes.position.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        posArray[i3 + 1] += Math.sin(elapsed * 0.3 + i * 0.01) * 0.008
        posArray[i3] += Math.cos(elapsed * 0.2 + i * 0.005) * 0.005
      }
      geometry.attributes.position.needsUpdate = true

      const targetX = mouseRef.current.x * 3
      const targetY = mouseRef.current.y * 2
      camera.position.x += (targetX - camera.position.x) * 0.02
      camera.position.y += (targetY - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      particles.rotation.y = elapsed * 0.02
      particles.rotation.x = Math.sin(elapsed * 0.01) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    setTimeout(() => setBgLoaded(true), 300)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <>
    <Navigation />
    <section className="relative bg-[#05070F] pt-32 md:pt-40 pb-24 md:pb-32 px-6 overflow-hidden">
      {/* Three.js canvas, fixed so it stays in place across the entire scrollable page */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: bgLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div 
        ref={headerRef}
        className={`relative z-10 text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
          headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="section-eyebrow mb-4 block">INVESTMENT PLANS</span>
        <h2 className="section-title mb-6 text-4xl md:text-6xl">
          Scale Your <span className="gradient-text">Trading Empire.</span>
        </h2>
        <p className="section-subtitle text-lg md:text-xl max-w-2xl mx-auto">
          Choose the plan that fits your ambition. From individual traders to institutional firms, we provide the infrastructure to win.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <span className={`text-xs font-bold tracking-widest transition-colors ${!isAnnual ? 'text-white' : 'text-[#64748B]'}`}>MONTHLY</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-[#0F1629] border border-[#3A7BFF]/30 relative p-1 transition-all hover:border-[#3A7BFF]/60"
          >
            <div
              className={`w-5 h-5 rounded-full bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] transition-all duration-300 shadow-[0_0_10px_rgba(58,123,255,0.5)] ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold tracking-widest transition-colors ${isAnnual ? 'text-white' : 'text-[#64748B]'}`}>ANNUAL</span>
          <span className="bg-[#00D084]/10 text-[#00D084] text-[9px] font-bold px-2 py-0.5 rounded border border-[#00D084]/20 ml-2">SAVE 20%</span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {tiers.map((tier, index) => (
          <PricingCard key={tier.name} tier={tier} isAnnual={isAnnual} index={index} />
        ))}
      </div>

      {/* Performance Fee Card */}
      <div className="relative z-10 max-w-4xl mx-auto mt-32 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#3A7BFF]/20 to-[#17B7BD]/20 rounded-[2rem] blur opacity-50" />
        <div className="glass-panel relative p-8 md:p-16 border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <span className="section-eyebrow mb-4 block">PERFORMANCE ALIGNMENT</span>
              <h3 className="text-3xl font-bold text-white mb-6">How Performance Fees Work</h3>
              <p className="text-[#94A3B8] leading-relaxed mb-8">
                We only succeed when you succeed. Our performance fee aligns our interests with yours, ensuring we are constantly optimizing our infrastructure for your profit.
              </p>
              <div className="space-y-4">
                {[
                  'Only charged on NET monthly profits',
                  '$0 fee if your accounts do not profit',
                  'Transparent, automated calculations',
                  'High-water mark protection'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                    <Check size={16} className="text-[#00D084]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { icon: TrendingUp, val: '10%', label: 'Profit Share', color: '#00D084' },
                { icon: DollarSign, val: '$0', label: 'Loss Fee', color: '#3A7BFF' },
                { icon: Activity, val: '24/7', label: 'Monitoring', color: '#8B5CF6' },
                { icon: HelpCircle, val: '100%', label: 'Alignment', color: '#17B7BD' }
              ].map((stat, i) => (
                <div key={stat.label} className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center group hover:border-white/10 transition-colors">
                  <stat.icon size={24} className="mx-auto mb-4" style={{ color: stat.color }} />
                  <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                  <div className="text-[10px] text-[#64748B] uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-12 border-t border-white/5">
            <p className="text-[#64748B] text-sm text-center italic">
              "Example: If your bots generate $1,000 in net profit this month, you pay $100 in performance fees. If you lose money or break even, you pay $0."
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-4xl mx-auto mt-32">
        <div className="text-center mb-16">
          <span className="section-eyebrow mb-4 block">QUESTIONS?</span>
          <h2 className="section-title text-4xl">Commonly Asked</h2>
        </div>
        
        <div className="grid gap-4">
          {[
            {
              q: 'Can I change plans?',
              a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing.'
            },
            {
              q: 'What happens if I cancel?',
              a: 'You can cancel anytime. Your bots will continue running until the end of your billing period, then automatically pause.'
            },
            {
              q: 'How is the performance fee calculated?',
              a: 'Performance fees are calculated on NET monthly profits across all your connected accounts. Losses are deducted from gains before calculating the fee.'
            },
            {
              q: 'Do you offer refunds?',
              a: 'We offer a 7-day money-back guarantee for first-time subscribers. Performance fees are non-refundable as they\'re based on realized profits.'
            },
            {
              q: 'Can I try before buying?',
              a: 'Yes! You can download the app and use our Free tier to build and deploy 1 active trading bot. You only need a paid subscription to connect more accounts or run multiple bots.'
            }
          ].map((faq, i) => (
            <div 
              key={i} 
              className="glass-panel p-6 md:p-8 border-white/5 hover:border-[#3A7BFF]/20 transition-all duration-300"
            >
              <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3A7BFF]" />
                {faq.q}
              </h4>
              <p className="text-[#94A3B8] text-sm leading-relaxed pl-4.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 max-w-4xl mx-auto mt-40 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3A7BFF]/5 rounded-full blur-[120px] pointer-events-none" />
        <h2 className="section-title text-3xl md:text-5xl mb-8">
          Start Your <span className="gradient-text">Freedom Journey.</span>
        </h2>
        <p className="section-subtitle max-w-xl mx-auto mb-12">
          Join thousands of traders automating their edge with AlgoDeck. The future of trading is mobile, automated, and institutional-grade.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12">
          <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
            <div className="absolute -top-3 -right-2 z-10">
              <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg uppercase">Coming Soon</span>
            </div>
            <div className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-14 w-auto"
              />
            </div>
          </Link>
          <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
            <div className="absolute -top-3 -right-2 z-10">
              <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg uppercase">Coming Soon</span>
            </div>
            <div className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-14 w-auto"
              />
            </div>
          </Link>
        </div>
      </div>
    </section>
    </>
  )
}