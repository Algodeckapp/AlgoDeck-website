import { Bot, Zap, LineChart, Network, Shield, Bell, Target, TrendingUp, Check, ArrowRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router'
import * as THREE from 'three'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'

export default function FeaturesPage() {
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setLoaded(true)
  }, [])

  // ─── Three.js Particle Background (scoped to hero section) ───
    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      // Size the renderer to the hero section, not the full window
      const heroEl = canvas.parentElement
      const getSize = () => ({
        width: heroEl?.clientWidth || window.innerWidth,
        height: heroEl?.clientHeight || window.innerHeight,
      })

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      let { width, height } = getSize()
      renderer.setSize(width, height)
  
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
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
        const rect = heroEl?.getBoundingClientRect()
        const localX = rect ? e.clientX - rect.left : e.clientX
        const localY = rect ? e.clientY - rect.top : e.clientY
        const w = rect?.width || window.innerWidth
        const h = rect?.height || window.innerHeight
        mouseRef.current.x = (localX / w - 0.5) * 2
        mouseRef.current.y = -(localY / h - 0.5) * 2
      }
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
  
      const handleResize = () => {
        const size = getSize()
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()
        renderer.setSize(size.width, size.height)
      }
      window.addEventListener('resize', handleResize)
  
      setTimeout(() => setLoaded(true), 300)
  
      return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('resize', handleResize)
        geometry.dispose()
        material.dispose()
        renderer.dispose()
      }
    }, [])

  const features = [
    {
      icon: Bot,
      title: 'AI Strategy Creation',
      description: 'Turn plain English into executable trading strategies',
      details: [
        'Natural language input parsing',
        'AI-powered logic optimization',
        'Automated code generation',
        'Strategy health validation'
      ],
      tier: 'Pro & Elite',
      color: '#3A7BFF'
    },
    {
      icon: Target,
      title: 'Visual Builder',
      description: 'Build strategies without writing code',
      details: [
        'Drag-and-drop conditions',
        'Visual logic flows',
        'Real-time strategy preview',
        'Indicator library integration'
      ],
      tier: 'All Tiers',
      color: '#17B7BD'
    },
    {
      icon: LineChart,
      title: 'Backtesting',
      description: 'Test strategies on real historical data',
      details: [
        'Tick-perfect historical data',
        'Multi-timeframe analysis',
        'Monte Carlo simulations',
        'Detailed performance metrics'
      ],
      tier: 'All Tiers',
      color: '#8B5CF6'
    },
    {
      icon: Zap,
      title: 'Live Deployment',
      description: 'Deploy bots directly to MT4/MT5',
      details: [
        'Direct MetaAPI integration',
        'Zero-latency execution',
        'Automatic risk padding',
        'Server-side bot hosting'
      ],
      tier: 'All Tiers',
      color: '#00D084'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Track performance with deep metrics',
      details: [
        'Real-time equity curves',
        'Drawdown heatmaps',
        'Proprietary Alpha scores',
        'Exportable PDF reports'
      ],
      tier: 'All Tiers',
      color: '#3A7BFF'
    },
    {
      icon: Network,
      title: 'Multi-Account',
      description: 'Trade across multiple brokers',
      details: [
        'Unified control center',
        'Cross-account copying',
        'Broker-agnostic routing',
        'Up to 10 accounts (Elite)'
      ],
      tier: 'Pro & Elite',
      color: '#17B7BD'
    },
    {
      icon: Shield,
      title: 'Risk Guard',
      description: 'Protect capital with built-in controls',
      details: [
        'Dynamic position sizing',
        'Global account stop-loss',
        'News event protection',
        'Trailing guard system'
      ],
      tier: 'All Tiers',
      color: '#8B5CF6'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Stay informed of every market move',
      details: [
        'Instant push notifications',
        'Custom webhook support',
        'Daily performance briefs',
        'Critical system alerts'
      ],
      tier: 'All Tiers',
      color: '#00D084'
    }
  ]

  return (
    <>
      <Navigation />
      <div className="relative bg-[#05070F] min-h-screen overflow-hidden">
        {/* Cinematic Hero */}
        <section className="relative pt-20 md:pt-32 pb-20 md:pb-32 px-6 overflow-hidden">
          {/* Three.js canvas, scoped to this hero section only */}
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
          />

          {/* Background gradient effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24 relative z-10">
            <div className={`w-full lg:max-w-2xl text-center lg:text-left transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="section-eyebrow mb-4 block text-[#3A7BFF]">ADVANCED TECHNOLOGY</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Everything You Need to <br />
                <span className="gradient-text">Dominate Markets.</span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl mt-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Institutional-grade tools reimagined for the modern mobile trader. From natural language strategy building to professional-grade backtesting and risk management.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
               <Link to="/download" className="glow-button !px-10">Get Started Now</Link>
               <a href="#all-features" className="outline-button !px-10">Explore Grid</a>
              </div>            </div>
            
            <div className={`w-full lg:w-1/2 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-[#3A7BFF]/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-1000" />
                <img
                  src="/assets/your edge automated.png"
                  alt="AlgoDeck Interface"
                  className="relative w-full max-w-[550px] mx-auto h-auto rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.7)] border border-white/10 z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section id="all-features" className="py-24 px-6 bg-[#0A0F2C]/40 backdrop-blur-sm border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Core Capabilities</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((f, i) => (
                <div 
                  key={i} 
                  className="glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group flex flex-col h-full"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 shadow-lg" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <f.icon size={28} style={{ color: f.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{f.title}</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                      {f.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {f.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-[#64748B] group-hover:text-[#94A3B8] transition-colors">
                          <Check size={14} className="text-[#3A7BFF] mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#3A7BFF]">{f.tier}</span>
                    <ArrowRight size={14} className="text-[#3A7BFF] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Showcase - App Focus */}
        <section className="py-24 md:py-40 px-6 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 md:gap-24">
            <div className="w-full lg:max-w-2xl">
              <span className="section-eyebrow mb-4 block text-[#17B7BD]">CENTRALIZED CONTROL</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8">
                Control Your Entire Empire <br />
                <span className="text-[#17B7BD]">From One App.</span>
              </h2>
              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#17B7BD]/10 flex items-center justify-center text-[#17B7BD] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Network size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Multi-Broker Hub</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Connect to any broker worldwide. Manage multiple MT4 and MT5 accounts simultaneously without switching applications.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#3A7BFF]/10 flex items-center justify-center text-[#3A7BFF] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Live Performance Ticker</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Real-time profit and loss tracking with advanced drawdown metrics. See exactly how your bots are performing in every market cycle.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Security-First Connection</h4>
                    <p className="text-[#94A3B8] leading-relaxed">Military-grade encryption for all API connections. Your broker credentials never leave our secure vault system.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#17B7BD]/20 to-[#3A7BFF]/20 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-1000" />
                <img
                  src="/assets/control from one app.png"
                  alt="Unified Control Center"
                  className="relative w-full max-w-[450px] mx-auto h-auto rounded-[30px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/10 z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Unified CTA */}
        <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0F2C]/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to Level Up?</h2>
            <p className="text-[#94A3B8] text-lg mb-12">
              Join the future of automated trading. Build your first strategy on mobile and deploy it globally in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
                <div className="absolute -top-3 -right-2 z-10">
                  <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
                </div>
                <div className="opacity-50 grayscale">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-12 w-auto"
                  />
                </div>
              </Link>
              <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
                <div className="absolute -top-3 -right-2 z-10">
                  <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
                </div>
                <div className="opacity-50 grayscale">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-12 w-auto"
                  />
                </div>
              </Link>
              <Link to="/pricing" className="text-sm font-bold text-[#3A7BFF] hover:underline sm:ml-4">
                Compare Plans →
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}