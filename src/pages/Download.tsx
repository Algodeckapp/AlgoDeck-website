import { Smartphone, Wifi, HardDrive, CheckCircle2, Apple, PlayCircle } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { trpc } from '@/providers/trpc'
import { toast } from 'sonner'

export default function Download() {
  const [androidEmail, setAndroidEmail] = useState('')
  const [iosEmail, setIosEmail] = useState('')
  const [androidSubmitted, setAndroidSubmitted] = useState(false)
  const [iosSubmitted, setIosSubmitted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setLoaded(true)
  }, [])

  // ─── Three.js Particle Background (scoped to hero section only) ───
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

  const androidSubscribeMutation = trpc.newsletter.subscribe.useMutation()
  const iosSubscribeMutation = trpc.newsletter.subscribe.useMutation()

  const handleAndroidWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    androidSubscribeMutation.mutate({ email: androidEmail, source: 'android_waitlist' }, {
      onSuccess: () => {
        setAndroidSubmitted(true)
        toast.success("You've been added to the Android waitlist!")
      },
      onError: (err) => {
        console.error('Android waitlist error:', err)
        toast.error(err.message || 'Failed to join waitlist. Please try again.')
      }
    })
  }

  const handleIosWaitlist = (e: React.FormEvent) => {
    e.preventDefault()
    iosSubscribeMutation.mutate({ email: iosEmail, source: 'ios_waitlist' }, {
      onSuccess: () => {
        setIosSubmitted(true)
        toast.success("You've been added to the iOS waitlist!")
      },
      onError: (err) => {
        console.error('iOS waitlist error:', err)
        toast.error(err.message || 'Failed to join waitlist. Please try again.')
      }
    })
  }

  const brokers = [
    'IC Markets', 'Pepperstone', 'XM', 'FTMO', 'FX Choice',
    'Tickmill', 'Admiral Markets', 'OANDA', 'Forex.com', 'IG'
  ]

  return (
    <>
      <Navigation />
      <div className="relative bg-[#05070F] min-h-screen pt-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#17B7BD]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-[#3A7BFF]/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Hero Section */}
        <section className="relative z-10 pt-16 md:pt-24 pb-12 md:pb-20 px-6 overflow-hidden">
          {/* Three.js canvas, scoped to this hero section only */}
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
          />
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative z-10">
            <div className={`w-full transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="section-eyebrow mb-4 block">GET THE APP</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Trade Anytime, <br />
                <span className="gradient-text">Anywhere.</span>
              </h1>
              <p className="section-subtitle text-lg md:text-xl mt-6 max-w-2xl mx-auto">
                AlgoDeck brings institutional-grade trading automation to your fingertips. Download the mobile app and start trading with AI-powered intelligence today.
              </p>
            </div>
          </div>
        </section>

        {/* Download Grid */}
        <section className="relative z-10 py-20 px-6 bg-[#0A0F2C]/50 backdrop-blur-sm border-y border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Android Card */}
              <div className="glass-panel p-8 md:p-12 text-center border border-white/10 shadow-[0_20px_50px_rgba(58,123,255,0.05)] relative overflow-hidden group">
                <div className="badge badge-warning absolute top-6 right-6">BETA ACCESS</div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3A7BFF] to-[#17B7BD] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#3A7BFF]/20 transition-transform group-hover:scale-110">
                  <PlayCircle size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Android</h3>
                <p className="text-[#94A3B8] text-base mb-8">
                  Get early access to the Android version and start automating.
                </p>
                
                <form onSubmit={handleAndroidWaitlist} className="space-y-4 mb-8">
                  <input
                    id="android-email"
                    type="email"
                    placeholder="Enter your email"
                    value={androidEmail}
                    onChange={(e) => setAndroidEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-[#05070F] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  />
                  <button 
                    type="submit" 
                    disabled={androidSubscribeMutation.isPending}
                    className="glow-button w-full !py-4.5 !text-sm"
                  >
                    {androidSubscribeMutation.isPending ? "SUBMITTING..." : (androidSubmitted ? "YOU'RE ON THE LIST!" : "JOIN ANDROID WAITLIST")}
                  </button>
                </form>

                <button 
                  onClick={() => document.getElementById('android-email')?.focus()}
                  className="opacity-40 grayscale cursor-pointer transition-transform hover:scale-105 active:scale-95 block mx-auto"
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-14 w-auto"
                  />
                </button>

                <div className="mt-8 flex items-center justify-center gap-2 text-[#64748B] text-[10px] uppercase tracking-widest font-bold border-t border-white/5 pt-6">
                  <Smartphone size={14} />
                  Requires Android 7.0+
                </div>
              </div>

              {/* iOS Card */}
              <div className="glass-panel p-8 md:p-12 text-center border border-white/10 relative overflow-hidden group opacity-90">
                <div className="badge badge-warning absolute top-6 right-6">COMING SOON</div>
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 transition-transform group-hover:scale-110">
                  <Apple size={40} className="text-[#94A3B8]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">iOS App Store</h3>
                <p className="text-[#94A3B8] text-base mb-8">
                  Join the waitlist to be first in line when we launch on iOS.
                </p>
                <form onSubmit={handleIosWaitlist} className="space-y-4 mb-8">
                  <input
                    id="ios-email"
                    type="email"
                    placeholder="Enter your email"
                    value={iosEmail}
                    onChange={(e) => setIosEmail(e.target.value)}
                    required
                    className="w-full px-5 py-4 bg-[#05070F] border border-white/10 rounded-xl text-white text-sm outline-none focus:border-[#3A7BFF]/40 transition-colors"
                  />
                  <button 
                    type="submit" 
                    disabled={iosSubscribeMutation.isPending}
                    className="glow-button w-full !py-4.5 !text-sm"
                  >
                    {iosSubscribeMutation.isPending ? "SUBMITTING..." : (iosSubmitted ? "YOU'RE ON THE LIST!" : "JOIN iOS WAITLIST")}
                  </button>
                </form>
                
                <button 
                  onClick={() => document.getElementById('ios-email')?.focus()}
                  className="opacity-40 grayscale cursor-pointer transition-transform hover:scale-105 active:scale-95 block mx-auto"
                >
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-14 w-auto"
                  />
                </button>
                
                <p className="mt-6 text-[#64748B] text-[10px] uppercase tracking-widest font-bold border-t border-white/5 pt-6">
                  Expected Launch: Q3 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Stepper */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-20">Getting Started</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: '01', title: 'Download', desc: 'Install AlgoDeck from the Google Play Store.' },
                { num: '02', title: 'Onboard', desc: 'Create your account and complete the setup.' },
                { num: '03', title: 'Connect', desc: 'Securely link your MT4/MT5 broker account.' },
                { num: '04', title: 'Automate', desc: 'Deploy your first AI-powered bot in minutes.' }
              ].map((step) => (
                <div key={step.num} className="relative group">
                  <div className="text-6xl font-black text-white/5 absolute -top-8 -left-2 transition-colors group-hover:text-[#3A7BFF]/10">{step.num}</div>
                  <div className="relative z-10">
                    <div className="w-12 h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] mb-6 rounded-full" />
                    <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs & Brokers Grid */}
        <section className="py-24 md:py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-[#0A0F2C]/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* System Requirements */}
            <div className="lg:col-span-5 glass-panel p-10 border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#3A7BFF] rounded-full" />
                System Requirements
              </h3>
              <div className="space-y-6">
                {[
                  { icon: Smartphone, label: 'Platform', text: 'Android 7.0 (Nougat) or higher' },
                  { icon: HardDrive, label: 'Storage', text: '120MB free disk space' },
                  { icon: Wifi, label: 'Network', text: 'Stable 4G/5G or WiFi connection' },
                  { icon: CheckCircle2, label: 'Broker', text: 'Valid MetaTrader 4 or 5 account' }
                ].map((req, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#3A7BFF]">
                      <req.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#64748B] font-semibold mb-1">{req.label}</p>
                      <p className="text-white text-base">{req.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Brokers */}
            <div className="lg:col-span-7 glass-panel p-10 border border-white/5 flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#17B7BD] rounded-full" />
                Supported Brokers
              </h3>
              <p className="text-[#94A3B8] mb-8 max-w-lg">
                AlgoDeck works with any broker that supports MetaTrader 4 or 5, ensuring you can automate your existing trading setup.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {brokers.map((broker) => (
                  <span key={broker} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-xs font-medium hover:bg-[#3A7BFF]/10 hover:border-[#3A7BFF]/30 transition-all cursor-default">
                    {broker}
                  </span>
                ))}
                <span className="px-4 py-2 bg-[#00D084]/10 border border-[#00D084]/30 rounded-full text-[#00D084] text-xs font-bold">
                  +200 MORE
                </span>
              </div>
              <div className="mt-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`/assets/avatar-${i}.jpg`} alt="Trader" className="w-12 h-12 rounded-full border-4 border-[#0A0F2C] object-cover" />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-[#0A0F2C] bg-[#3A7BFF] flex items-center justify-center text-white text-xs font-bold">+10k</div>
                </div>
                <p className="text-sm text-[#94A3B8] text-center sm:text-right">
                  Joined by thousands of <br className="hidden sm:block" /> professional traders worldwide
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}