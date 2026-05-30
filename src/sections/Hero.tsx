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
        paddingTop: '80px', // Add top padding for nav
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#05070F',
        overflow: 'hidden',
      }}
    >
      {/* Three.js Particle Canvas (always behind) */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.5s ease',
        }}
      />

      {/* ═══ HERO CONTENT CONTAINER ═══ */}
      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center justify-start px-6 gap-4">
        
        {/* Text content - Optimized for mobile */}
        <div className="w-full text-center pointer-events-auto">
          {/* Eyebrow */}
          <span
            className={`section-eyebrow transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } block mb-2`}
            style={{
              transitionDelay: '0.5s',
              textShadow: '0 2px 10px rgba(5,7,15,0.8)',
              fontSize: '10px'
            }}
          >
            AUTOMATED TRADING INTELLIGENCE
          </span>

          {/* Headline */}
          <h1
            className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              transitionDelay: '0.7s',
              textShadow: '0 4px 20px rgba(5,7,15,0.9)',
            }}
          >
            Automate Your Trading <br className="hidden md:block" />
            <span className="gradient-text">Empire</span>
          </h1>

          {/* CTA Row - Tighter spacing for mobile */}
          <div
            className={`flex flex-col items-center gap-4 mt-6 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '1.1s' }}
          >
            {/* Primary Waitlist Button */}
            <Link 
              to="/download"
              className="glow-button !px-8 !py-3 !text-xs font-black tracking-widest flex items-center gap-2 group"
            >
              JOIN THE WAITLIST 
            </Link>
          </div>
        </div>

        {/* Hero Mockup Image - Responsive scaling */}
        <img
          src="/assets/hero mockup.png"
          alt="AlgoDeck Mobile App Mockup"
          className="w-full max-w-[320px] md:max-w-[500px] h-auto z-20"
          style={{ 
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '1s',
            animation: loaded ? 'imageBounce 4s ease-in-out infinite' : 'none',
            marginTop: '1rem',
            marginBottom: '1rem'
          }}
        />
      </div>

      {/* Robot swerve keyframes injected via style */}
      <style>{`
        @keyframes imageBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  )
}
