import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Play } from 'lucide-react'

// ─── Trading Chart SVG Components ───
function CandleChart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 80" style={{ width: '100%', height: '100%' }}>
      {/* Grid lines */}
      {[0, 20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
      ))}
      {/* Candles */}
      {[
        { x: 10, o: 50, c: 35, h: 55, l: 30, up: false },
        { x: 30, o: 35, c: 45, h: 48, l: 32, up: true },
        { x: 50, o: 45, c: 30, h: 50, l: 28, up: false },
        { x: 70, o: 30, c: 55, h: 60, l: 25, up: true },
        { x: 90, o: 55, c: 40, h: 58, l: 38, up: false },
        { x: 110, o: 40, c: 60, h: 65, l: 38, up: true },
        { x: 130, o: 60, c: 45, h: 62, l: 42, up: false },
        { x: 150, o: 45, c: 70, h: 72, l: 43, up: true },
        { x: 170, o: 70, c: 55, h: 73, l: 52, up: false },
        { x: 190, o: 55, c: 65, h: 68, l: 53, up: true },
      ].map((c, i) => (
        <g key={i}>
          <line x1={c.x} y1={c.l} x2={c.x} y2={c.h} stroke={c.up ? '#00D084' : '#FF4757'} strokeWidth="1" />
          <rect x={c.x - 3} y={Math.min(c.o, c.c)} width="6" height={Math.abs(c.c - c.o)} rx="1" fill={c.up ? '#00D084' : '#FF4757'} opacity="0.9" />
        </g>
      ))}
      {/* Trend line */}
      <path d="M 10 42 Q 60 60, 110 48 T 190 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
    </svg>
  )
}

function LineChart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 0 50 L 20 45 L 40 48 L 60 35 L 80 40 L 100 28 L 120 32 L 140 18 L 160 22 L 180 10 L 200 15"
        fill={`url(#grad-${color.replace('#', '')})`}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Data points */}
      {[
        [20, 45], [40, 48], [60, 35], [80, 40], [100, 28], [120, 32], [140, 18], [160, 22], [180, 10], [200, 15],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={color} />
      ))}
    </svg>
  )
}

function BarChartMini({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%' }}>
      {[
        { x: 10, h: 30 }, { x: 30, h: 45 }, { x: 50, h: 25 }, { x: 70, h: 50 },
        { x: 90, h: 35 }, { x: 110, h: 55 }, { x: 130, h: 40 }, { x: 150, h: 48 },
        { x: 170, h: 32 }, { x: 190, h: 42 },
      ].map((b, i) => (
        <rect key={i} x={b.x - 4} y={60 - b.h} width="8" height={b.h} rx="2" fill={color} opacity={0.6 + (i % 3) * 0.15} />
      ))}
    </svg>
  )
}

// ─── Main Hero Section ───
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)
  const [robotPhase, setRobotPhase] = useState(0)

  // Track robot animation phase for monitor synchronization
  useEffect(() => {
    let frame = 0
    let id: number
    const tick = () => {
      frame++
      // 0-120: moving left, 120-240: moving right (at 60fps, 4 second cycle)
      const cycle = frame % 240
      setRobotPhase(cycle)
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
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

  // Monitor visibility based on robot phase
  const leftMonitorsVisible = robotPhase < 120  // robot on left
  const rightMonitorsVisible = robotPhase >= 120  // robot on right

  const monitorOpacity = {
    left: leftMonitorsVisible ? 1 : 0,
    right: rightMonitorsVisible ? 1 : 0,
  }

  const monitorTransform = {
    left: leftMonitorsVisible ? 'scale(1) translateX(0)' : 'scale(0.85) translateX(-20px)',
    right: rightMonitorsVisible ? 'scale(1) translateX(0)' : 'scale(0.85) translateX(20px)',
  }

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
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        {/* Robot wrapper with swerve animation */}
        <div
          className="robot-sway"
          style={{
            position: 'relative',
            animation: 'robotSwerve 4s ease-in-out infinite',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.3s',
          }}
        >
          {/* Robot Image - MASSIVE */}
          <img
            src="/assets/hero-robot.png"
            alt="AlgoDeck AI Trading Robot"
            style={{
              height: '85vh',
              maxHeight: '800px',
              minHeight: '500px',
              objectFit: 'contain',
              objectPosition: 'top center',
              marginTop: '-8%',
              filter: 'drop-shadow(0 0 80px rgba(58, 123, 255, 0.5)) drop-shadow(0 0 120px rgba(58, 123, 255, 0.2))',
            }}
          />

          {/* ═══ LEFT-SIDE MONITORS ═══ */}
          <div
            className="monitor-left"
            style={{
              position: 'absolute',
              top: '8%',
              left: '-28%',
              width: '200px',
              height: '130px',
              opacity: monitorOpacity.left,
              transform: monitorTransform.left,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(58, 123, 255, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: '0 0 30px rgba(58, 123, 255, 0.15), inset 0 0 20px rgba(58, 123, 255, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3A7BFF' }}>
                  EUR/USD M15
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <CandleChart color="#3A7BFF" />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '38%',
              left: '-35%',
              width: '180px',
              height: '110px',
              opacity: monitorOpacity.left,
              transform: monitorTransform.left,
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(58, 123, 255, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: '0 0 30px rgba(58, 123, 255, 0.15), inset 0 0 20px rgba(58, 123, 255, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#17B7BD' }}>
                  Portfolio P&L
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <LineChart color="#17B7BD" />
            </div>
          </div>

          <div
            className="monitor-left"
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '-22%',
              width: '170px',
              height: '100px',
              opacity: monitorOpacity.left,
              transform: monitorTransform.left,
              transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(58, 123, 255, 0.3)',
              borderRadius: '14px',
              padding: '12px',
              boxShadow: '0 0 30px rgba(58, 123, 255, 0.15), inset 0 0 20px rgba(58, 123, 255, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00D084' }}>
                  Volume
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <BarChartMini color="#00D084" />
            </div>
          </div>

          {/* ═══ RIGHT-SIDE MONITORS ═══ */}
          <div
            className="monitor-right"
            style={{
              position: 'absolute',
              top: '5%',
              right: '-30%',
              width: '210px',
              height: '140px',
              opacity: monitorOpacity.right,
              transform: monitorTransform.right,
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(23, 183, 189, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: '0 0 30px rgba(23, 183, 189, 0.15), inset 0 0 20px rgba(23, 183, 189, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#3A7BFF' }}>
                  GBP/USD H1
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <CandleChart color="#3A7BFF" />
            </div>
          </div>

          <div
            className="monitor-right"
            style={{
              position: 'absolute',
              top: '42%',
              right: '-32%',
              width: '190px',
              height: '115px',
              opacity: monitorOpacity.right,
              transform: monitorTransform.right,
              transition: 'opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(0, 208, 132, 0.3)',
              borderRadius: '14px',
              padding: '14px',
              boxShadow: '0 0 30px rgba(0, 208, 132, 0.15), inset 0 0 20px rgba(0, 208, 132, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00D084' }}>
                  Bot Performance
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <LineChart color="#00D084" />
            </div>
          </div>

          <div
            className="monitor-right"
            style={{
              position: 'absolute',
              bottom: '18%',
              right: '-24%',
              width: '160px',
              height: '95px',
              opacity: monitorOpacity.right,
              transform: monitorTransform.right,
              transition: 'opacity 0.5s ease 0.22s, transform 0.5s ease 0.22s',
              pointerEvents: 'auto',
            }}
          >
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(10, 15, 44, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(23, 183, 189, 0.3)',
              borderRadius: '14px',
              padding: '12px',
              boxShadow: '0 0 30px rgba(23, 183, 189, 0.15), inset 0 0 20px rgba(23, 183, 189, 0.05)',
              overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#17B7BD' }}>
                  Risk Metrics
                </span>
                <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>LIVE</span>
              </div>
              <BarChartMini color="#17B7BD" />
            </div>
          </div>

        </div>
      </div>

      {/* ═══ TEXT OVERLAY (bottom-left, z-index above everything) ═══ */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          zIndex: 10,
          maxWidth: '520px',
          padding: '0 24px',
          pointerEvents: 'auto',
        }}
      >
        {/* Eyebrow */}
        <span
          className="section-eyebrow"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
            transitionDelay: '0.5s',
            textShadow: '0 2px 10px rgba(5,7,15,0.8)',
          }}
        >
          AUTOMATED TRADING INTELLIGENCE
        </span>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.7s',
            textShadow: '0 4px 20px rgba(5,7,15,0.9), 0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          Automate Your Trading{' '}
          <span className="gradient-text">Empire</span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#CBD5E1',
            marginTop: '20px',
            maxWidth: '460px',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease',
            transitionDelay: '0.9s',
            textShadow: '0 2px 10px rgba(5,7,15,0.8)',
          }}
        >
          Build, backtest, and deploy AI-powered trading bots directly to your MT4/MT5 accounts. No coding required. Download the mobile app and start trading smarter.
        </p>

        {/* CTA Row */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '36px',
            flexWrap: 'wrap',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease',
            transitionDelay: '1.1s',
          }}
        >
          <a
            href="/download"
            className="glow-button"
            style={{ padding: '14px 32px', fontSize: '12px' }}
          >
            Download for Android
          </a>
          <a href="/download" className="outline-button" style={{ padding: '14px 32px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={16} />
            Download for iOS
            <span className="badge badge-warning" style={{ marginLeft: '4px' }}>Coming Soon</span>
          </a>
        </div>
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
        @keyframes robotSwerve {
          0% {
            transform: translateX(0px) rotateZ(0deg);
          }
          20% {
            transform: translateX(-40px) rotateZ(-2deg);
          }
          40% {
            transform: translateX(-40px) rotateZ(-2deg);
          }
          50% {
            transform: translateX(0px) rotateZ(0deg);
          }
          70% {
            transform: translateX(40px) rotateZ(2deg);
          }
          90% {
            transform: translateX(40px) rotateZ(2deg);
          }
          100% {
            transform: translateX(0px) rotateZ(0deg);
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
