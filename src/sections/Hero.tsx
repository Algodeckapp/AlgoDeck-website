import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

// ─── Main Hero Section ───
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

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
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#05070F',
        overflow: 'hidden',
        paddingTop: '120px',
        paddingBottom: '40px'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
      />

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center justify-start px-6 gap-6">
        <div className="w-full text-center pointer-events-auto">
          <span className="section-eyebrow block mb-4" style={{ textShadow: '0 2px 10px rgba(5,7,15,0.8)' }}>AUTOMATED TRADING INTELLIGENCE</span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight" style={{ textShadow: '0 4px 20px rgba(5,7,15,0.9)' }}>
            Automate Your Trading <br className="hidden md:block" />
            <span className="gradient-text">Empire</span>
          </h1>
          <p className="text-base md:text-lg text-[#CBD5E1] leading-relaxed mt-6 max-w-2xl mx-auto" style={{ textShadow: '0 2px 10px rgba(5,7,15,0.8)' }}>
            Build, backtest, and deploy AI-powered trading bots directly to your MT4/MT5 accounts. No coding required. Download the mobile app and start trading smarter.
          </p>

          <div className="flex flex-col items-center gap-6 mt-10">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/download" className="relative transition-transform hover:scale-105 active:scale-95 opacity-80 hover:opacity-100">
                <div className="absolute -top-3 -right-2 z-10"><span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">SOON</span></div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-14 w-auto" />
              </Link>
              <Link to="/download" className="relative transition-transform hover:scale-105 active:scale-95 opacity-80 hover:opacity-100">
                <div className="absolute -top-3 -right-2 z-10"><span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">SOON</span></div>
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-14 w-auto" />
              </Link>
            </div>
            <Link to="/download" className="glow-button !px-12 !py-4 font-black tracking-widest flex items-center gap-3">
              JOIN THE WAITLIST <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <img
          src="/assets/hero mockup.png"
          alt="AlgoDeck Mobile App Mockup"
          className="w-full max-w-[300px] md:max-w-[450px] h-auto z-20 mt-8"
          style={{ animation: 'imageBounce 4s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes imageBounce { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
      `}</style>
    </section>
  )
}
