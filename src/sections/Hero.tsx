import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

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
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        background: '#05070F',
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

      {/* ═══ ROBOT + MONITORS CONTAINER (centered, massive) ═══ */}
      {/* ═══ HERO CONTENT CONTAINER ═══ */}
      <div className="relative z-10 max-w-[1600px] mx-auto h-full flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-16 pt-28 md:pt-0 gap-[10px] md:gap-16">
        {/* Text content */}
        <div className="w-full md:max-w-[600px] text-center md:text-left pointer-events-auto">
          {/* Eyebrow */}
          <span
            className={`section-eyebrow transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            } block mb-4`}
            style={{
              transitionDelay: '0.5s',
              textShadow: '0 2px 10px rgba(5,7,15,0.8)',
            }}
          >
            AUTOMATED TRADING INTELLIGENCE
          </span>

          {/* Headline */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              transitionDelay: '0.7s',
              textShadow: '0 4px 20px rgba(5,7,15,0.9), 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Automate Your Trading <br className="hidden md:block" />
            <span className="gradient-text">Empire</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-base md:text-lg text-[#CBD5E1] leading-relaxed mt-6 md:mt-8 transition-all duration-1000 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } max-w-lg mx-auto md:mx-0`}
            style={{
              transitionDelay: '0.9s',
              textShadow: '0 2px 10px rgba(5,7,15,0.8)',
            }}
          >
            Build, backtest, and deploy AI-powered trading bots directly to your MT4/MT5 accounts. No coding required. Download the mobile app and start trading smarter.
          </p>

          {/* CTA Row */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 mt-10 md:mt-12 transition-all duration-700 ${
              loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '1.1s' }}
          >
            <a 
              href="/download" 
              className="transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/10 rounded-xl"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-14 md:h-16 w-auto"
              />
            </a>
            <div className="relative group">
              <div className="absolute -top-3 -right-2 z-10">
                <span className="badge badge-warning text-[8px] px-2 py-0.5 shadow-lg">COMING SOON</span>
              </div>
              <div className="opacity-50 grayscale cursor-not-allowed transition-transform">
                <img 
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                  alt="Download on the App Store" 
                  className="h-14 md:h-16 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Mockup Image - Standalone Responsive */}
        <img
          src="/assets/hero mockup.png"
          alt="AlgoDeck Mobile App Mockup"
          className="md:mt-0 w-[calc(100%-6px)] md:w-[950px] h-auto rounded-[30px] z-20"
          style={{ 
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '1s',
            animation: loaded ? 'imageBounce 4s ease-in-out infinite' : 'none'
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease',
          transitionDelay: '2s',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'rgba(58, 123, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#3A7BFF',
              position: 'absolute',
              left: '-2px',
              animation: 'scrollDown 2s ease-in-out infinite',
            }}
          />
        </div>
        <span style={{ fontSize: '11px', letterSpacing: '0.05em', color: '#64748B', textTransform: 'uppercase' }}>
          Scroll to explore
        </span>
      </div>

      {/* Robot swerve keyframes injected via style */}
      <style>{`
        @keyframes imageBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float3D {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(2deg); }
        }

        @keyframes robotSwerve {
          0% {
            transform: translateX(0px);
          }
          20% {
            transform: translateX(-40px);
          }
          40% {
            transform: translateX(-40px);
          }
          50% {
            transform: translateX(0px);
          }
          70% {
            transform: translateX(40px);
          }
          90% {
            transform: translateX(40px);
          }
          100% {
            transform: translateX(0px);
          }
        }

        @keyframes monitorFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .monitor-left, .monitor-right {
          animation: monitorFloat 5s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .robot-sway {
            transform: scale(0.85) !important;
          }
        }

        @media (max-width: 768px) {
          .robot-sway {
            transform: scale(0.7) !important;
          }
          .monitor-left, .monitor-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
