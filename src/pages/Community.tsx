import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Trophy, Copy, Users, TrendingUp, MessageSquare, Star, Bot, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Link } from 'react-router'

export default function Community() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  // ─── Three.js Particle Background (scoped to hero section) ───
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const width = canvas.parentElement?.clientWidth || window.innerWidth
    const height = canvas.parentElement?.clientHeight || window.innerHeight
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
      if (!canvas.parentElement) return
      const w = canvas.parentElement.clientWidth
      const h = canvas.parentElement.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
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

  return (
    <div className="relative bg-[#05070F] min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[#3A7BFF]/20 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Floating background elements */}
        <div className="absolute right-[10%] top-1/4 bg-[#0A0F2C]/60 backdrop-blur-xl border border-[#3A7BFF]/30 rounded-xl p-4 shadow-2xl z-0 animate-float hidden lg:block opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#3A7BFF] animate-pulse" />
            <div className="h-2 w-16 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
        <div className="absolute left-[10%] bottom-1/4 bg-[#0A0F2C]/60 backdrop-blur-xl border border-[#17B7BD]/30 rounded-xl p-4 shadow-2xl z-0 animate-float-delayed hidden lg:block opacity-50">
          <div className="flex items-center gap-3">
            <div className="h-2 w-12 bg-white/20 rounded animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-[#17B7BD] animate-pulse" />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#3A7BFF]/30 bg-[#3A7BFF]/10 text-[#3A7BFF] text-sm font-semibold mb-6">
            <Users size={16} />
            <span>The AlgoDeck Community</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Trade Like the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]">Top 1%</span>
          </h1>
          <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto mb-10 leading-relaxed">
            Join thousands of algorithmic traders. Discover the highest-performing bots, gain real-time market insights, and instantly clone winning strategies with a single click.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/download" className="primary-button group">
              Join the Community
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#leaderboards" className="outline-button">
              View Leaderboards
            </a>
          </div>
        </div>
      </section>

      {/* Leaderboards Feature */}
      <section id="leaderboards" className="py-24 px-6 bg-white/[0.02] border-y border-white/5 relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-12 h-12 bg-[#3A7BFF]/20 rounded-xl flex items-center justify-center mb-6 text-[#3A7BFF]">
                <Trophy size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Global Bot Leaderboards</h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                Stop guessing what works. Our global leaderboards rank the top-performing bots created by the community based on real, verifiable backtest and live trading data.
              </p>
              <ul className="space-y-4">
                {[
                  'Filter by asset class (Forex, Crypto, Indices)',
                  'Sort by Win Rate, Profit Factor, or Max Drawdown',
                  'Verified performance metrics straight from MT4/MT5',
                  'Follow your favorite creators and get notified of updates'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ShieldCheck className="text-[#00D084] shrink-0 mt-1" size={20} />
                    <span className="text-[#E2E8F0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual Mockup for Leaderboards */}
            <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C]/80 backdrop-blur-md shadow-2xl flex flex-col h-full">
              <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.02]">
                <div className="flex gap-4 font-medium text-sm">
                  <span className="text-white border-b-2 border-[#3A7BFF] py-4">Top Performing Bots</span>
                  <span className="text-[#64748B] py-4 hover:text-white transition-colors cursor-pointer">Trending Creators</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 flex-grow">
                {[
                  { name: 'Apex Predator V2', creator: '@algotrader', return: '+184.2%', users: '1.2k', type: 'Forex' },
                  { name: 'Quantum Scalper', creator: '@pipmaster', return: '+142.5%', users: '890', type: 'Crypto' },
                  { name: 'Golden Cross Grid', creator: '@wealthbot', return: '+118.0%', users: '560', type: 'Indices' },
                  { name: 'Night Owl EURUSD', creator: '@fxninja', return: '+94.8%', users: '420', type: 'Forex' }
                ].map((bot, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-6 text-center font-bold text-[#64748B]">#{i + 1}</div>
                      <div className="hidden sm:flex w-10 h-10 rounded-full bg-[#3A7BFF]/20 items-center justify-center text-[#3A7BFF] font-bold">
                        {bot.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{bot.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                          <span>{bot.creator}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <span>{bot.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#00D084] font-bold text-sm">{bot.return}</div>
                      <div className="text-xs text-[#64748B]">{bot.users} cloners</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA at the bottom */}
              <div className="p-6 pt-0 border-t border-white/5 bg-white/[0.01]">
                <a 
                  href="https://hub.algodeck.app/marketplace" 
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Explore the AlgoDeck Bot Marketplace"
                  className="w-full bg-[#3A7BFF] hover:bg-[#2563EB] py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_40px_rgba(58,123,255,0.2)] transition-all hover:scale-[1.02] mt-4"
                >
                  <Trophy className="text-white" size={18} />
                  <span className="text-sm sm:text-base font-bold text-white tracking-wide">Explore Bot Marketplace</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bot Cloning Feature */}
      <section className="py-24 px-6 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#17B7BD]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual Mockup for Cloning */}
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-white/10 bg-[#0A0F2C] p-8 shadow-2xl flex flex-col items-center justify-center z-10">
               <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                 <div className="flex justify-between items-start mb-6">
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1">Quantum Scalper Pro</h3>
                     <p className="text-sm text-[#94A3B8]">by @algotrader</p>
                   </div>
                   <div className="bg-[#00D084]/20 text-[#00D084] px-3 py-1 rounded-full text-xs font-bold">
                     +142.5% Return
                   </div>
                 </div>
                 
                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Strategy Type</span>
                     <span className="text-white">Mean Reversion</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Timeframe</span>
                     <span className="text-white">M15</span>
                   </div>
                   <div className="flex justify-between text-sm">
                     <span className="text-[#64748B]">Risk Profile</span>
                     <span className="text-amber-400">Medium</span>
                   </div>
                 </div>

                 <a 
                   href="https://hub.algodeck.app/marketplace" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   title="Clone this bot in the AlgoDeck Hub"
                   className="w-full flex items-center justify-center gap-2 py-3 bg-[#3A7BFF] hover:bg-[#2563EB] text-white rounded-xl font-bold transition-all hover:scale-[1.02]"
                 >
                   <Copy size={18} /> Open Hub to Clone Bot
                 </a>
               </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="w-12 h-12 bg-[#17B7BD]/20 rounded-xl flex items-center justify-center mb-6 text-[#17B7BD]">
                <Copy size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">1-Click Bot Cloning</h2>
              <p className="text-lg text-[#94A3B8] mb-8 leading-relaxed">
                Found a strategy that matches your trading style? With a single click, you can clone the exact algorithm and its optimized parameters directly into your own workspace.
              </p>
              <ul className="space-y-4">
                {[
                  'Instantly copy the logic blocks into your visual editor',
                  'Modify and tweak the cloned bot to fit your specific needs',
                  'Deploy the cloned bot directly to your broker account',
                  'Creators can earn rewards when their bots are cloned'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Zap className="text-[#17B7BD] shrink-0 mt-1" size={20} />
                    <span className="text-[#E2E8F0]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Social Insights Feature */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5 relative">
        <div className="max-w-[1200px] mx-auto text-center mb-16">
          <div className="w-12 h-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6 text-[#8B5CF6] mx-auto">
            <MessageSquare size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Social Insights & Collaboration</h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            AlgoDeck isn't just a tool; it's a social network for algorithmic traders. Discuss market trends, share your backtest results, and collaborate with developers globally.
          </p>
          <div className="max-w-[900px] mx-auto relative mb-12 flex justify-center">
          <img 
            src="/assets/connect.png" 
            alt="AlgoDeck Community Connection" 
            className="w-full max-w-4xl h-auto object-cover rounded-2xl shadow-[0_20px_60px_rgba(139,92,246,0.15)] border border-white/10"
          />
        </div>
        
        <div className="flex justify-center">
          <Link 
             to="/download"
             title="Download the AlgoDeck App to Join the Community"
             className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-8 py-4 rounded-xl flex items-center gap-3 shadow-[0_10px_40px_rgba(139,92,246,0.3)] transition-all hover:scale-105"
           >
             <MessageSquare className="text-white" size={20} />
             <span className="text-base font-bold text-white tracking-wide">Download App to Join</span>
             <ArrowRight className="text-white" size={20} />
           </Link>
        </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
