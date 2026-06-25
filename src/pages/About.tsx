import { useEffect, useState, useRef} from 'react'
import { Link } from 'react-router'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Target, Shield, Users, Lightbulb, HeartHandshake, Smartphone, Server, Database, Network, Bot, Award, Zap, Globe } from 'lucide-react'
import * as THREE from 'three'

export default function About() {
  const [loaded, setLoaded] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setLoaded(true)
  }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
    
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
    
        return () => {
          cancelAnimationFrame(animationId)
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('resize', handleResize)
          geometry.dispose()
          material.dispose()
          renderer.dispose()
        }
      }, [])

  const values = [
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making algorithmic trading accessible to traders of all skill levels, from beginners to professionals.',
      color: '#3A7BFF'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Clear pricing, honest performance metrics, and full visibility into how our platform operates.',
      color: '#17B7BD'
    },
    {
      icon: HeartHandshake,
      title: 'Security',
      description: 'Bank-grade encryption and security measures to protect your strategies and trading capital.',
      color: '#8B5CF6'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Continuously pushing boundaries with AI-powered tools and cutting-edge trading technology.',
      color: '#00D084'
    },
    {
      icon: Target,
      title: 'Support',
      description: 'Dedicated customer support and educational resources to ensure your trading success.',
      color: '#F59E0B'
    },
  ]

  const techStack = [
    {
      icon: Smartphone,
      name: 'Flutter',
      description: 'Cross-platform mobile app framework for iOS & Android',
      color: '#02569B',
    },
    {
      icon: Server,
      name: 'Python FastAPI',
      description: 'High-performance backend API infrastructure',
      color: '#009688',
    },
    {
      icon: Database,
      name: 'Supabase',
      description: 'Real-time database and authentication platform',
      color: '#3ECF8E',
    },
    {
      icon: Network,
      name: 'MetaAPI',
      description: 'MT4/MT5 broker integration for live trading',
      color: '#FF6B35',
    },
    {
      icon: Bot,
      name: 'Claude AI',
      description: 'AI-powered strategy generation and optimization',
      color: '#8B5CF6',
    },
  ]

  return (
    <>
      <Navigation />
      <div className="relative bg-[#05070F] min-h-screen pt-20 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#17B7BD]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative z-10 pt-16 md:pt-28 pb-12 px-6">
           <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
          />
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="section-eyebrow mb-4 block">OUR MISSION</span>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                Democratizing <br />
                <span className="gradient-text">Algorithmic Trading.</span>
              </h1>
              <p className="text-[#94A3B8] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                We believe every trader should have access to professional-grade automation tools without needing to write a single line of code.
              </p>
            </div>
          </div>
        </section>

        {/* Story & Vision */}
        <section className="py-20 px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="glass-panel p-8 md:p-12 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3A7BFF]/5 rounded-bl-full" />
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Award className="text-[#3A7BFF]" /> Our Story
                </h2>
                <div className="space-y-6 text-[#94A3B8] leading-relaxed">
                  <p>
                    AlgoDeck was founded in 2026 by a team of experienced traders and software engineers who were frustrated
                    by the complexity and cost of existing algorithmic trading platforms.
                  </p>
                  <p>
                    We set out to build something different—a mobile-first platform that puts powerful automation tools 
                    directly in your pocket, allowing you to manage your trading empire from anywhere in the world.
                  </p>
                  <div className="pt-6 border-t border-white/5 flex items-center gap-6">
                    <div>
                      <div className="text-2xl font-bold text-white">10k+</div>
                      <div className="text-xs uppercase tracking-widest text-[#64748B]">Active Traders</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">100M+</div>
                      <div className="text-xs uppercase tracking-widest text-[#64748B]">Trades Executed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`space-y-12 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap size={20} className="text-[#17B7BD]" /> Innovation First
                </h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  We pioneered the use of AI for strategy creation, allowing traders to describe their ideas in
                  plain English and have them instantly converted into executable trading bots.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-[#8B5CF6]" /> Community Driven
                </h3>
                <p className="text-[#94A3B8] leading-relaxed">
                  Every feature we build is shaped by feedback from our community. We're committed to
                  continuous improvement and regularly ship updates based on what our users need to succeed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 px-6 bg-[#0A0F2C]/40 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="section-eyebrow mb-4 block">PRINCIPLES</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">What We Stand For</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div 
                  key={i} 
                  className="glass-panel p-8 border border-white/5 hover:border-[#3A7BFF]/30 transition-all duration-500 group text-center"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 group-hover:scale-110" style={{ background: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                    <v.icon size={28} style={{ color: v.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
                  <p className="text-[#64748B] text-xs leading-relaxed group-hover:text-[#94A3B8] transition-colors">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 text-center lg:text-left">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Built on Modern Tech</h2>
                <p className="text-[#94A3B8] text-lg">We leverage the best tools and technologies to deliver a fast, reliable, and secure trading platform.</p>
              </div>
              <div className="hidden lg:block text-[#64748B] font-mono text-sm tracking-tighter uppercase opacity-50">Infrastructure v2.4.0</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {techStack.map((tech, i) => (
                <div 
                  key={i} 
                  className="glass-panel p-8 border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all" style={{ background: `${tech.color}15` }}>
                    <tech.icon size={24} style={{ color: tech.color }} />
                  </div>
                  <h4 className="text-white font-bold mb-2">{tech.name}</h4>
                  <p className="text-[#64748B] text-xs leading-relaxed">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0F2C]/50 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3A7BFF]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Join the Future of Trading</h2>
            <p className="text-[#94A3B8] text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the power of AlgoDeck. Join thousands of traders worldwide who have automated their success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/10">
                <div className="absolute -top-3 -right-2 z-10">
                  <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
                </div>
                <div className="opacity-40 grayscale">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-14 w-auto"
                  />
                </div>
              </Link>
              <Link to="/download" className="relative group transition-transform hover:scale-105 active:scale-95">
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
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
