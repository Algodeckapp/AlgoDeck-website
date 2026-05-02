import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function TradingViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(section)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  useEffect(() => {
    if (!inView || !canvasRef.current) return

    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth
    const containerHeight = canvas.parentElement?.clientHeight || 600
    renderer.setSize(containerWidth, containerHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 100)
    camera.position.set(0, 5, 25)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x3A7BFF, 0.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0x3A7BFF, 0.8)
    dirLight.position.set(10, 10, 5)
    scene.add(dirLight)

    const cyanLight = new THREE.PointLight(0x17B7BD, 0.5, 50)
    cyanLight.position.set(-10, 5, 0)
    scene.add(cyanLight)

    // Group for all animated objects
    const group = new THREE.Group()
    scene.add(group)

    // Track all meshes for cleanup
    const allMeshes: THREE.Mesh[] = []

    // Floating bar charts
    const barCount = 40
    const barGeometry = new THREE.BoxGeometry(0.8, 1, 0.8)
    const barMaterialBlue = new THREE.MeshStandardMaterial({
      color: 0x3A7BFF,
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.6,
    })
    const barMaterialCyan = new THREE.MeshStandardMaterial({
      color: 0x17B7BD,
      transparent: true,
      opacity: 0.7,
      roughness: 0.3,
      metalness: 0.6,
    })

    const bars: THREE.Mesh[] = []
    for (let i = 0; i < barCount; i++) {
      const material = i % 3 === 0 ? barMaterialCyan : barMaterialBlue
      const bar = new THREE.Mesh(barGeometry, material)
      const x = (i % 10 - 4.5) * 2
      const z = Math.floor(i / 10 - 2) * 2
      const height = 1 + Math.random() * 4
      bar.position.set(x, height / 2, z)
      bar.scale.y = height
      bar.userData = {
        originalY: height / 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      }
      group.add(bar)
      bars.push(bar)
      allMeshes.push(bar)
    }

    // Growth arrows (cones)
    const arrowCount = 8
    const arrowGeometry = new THREE.ConeGeometry(0.4, 1.5, 6)
    const arrowMaterial = new THREE.MeshStandardMaterial({
      color: 0x00D084,
      transparent: true,
      opacity: 0.8,
      emissive: 0x00D084,
      emissiveIntensity: 0.3,
    })

    const arrows: THREE.Mesh[] = []
    for (let i = 0; i < arrowCount; i++) {
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
      arrow.position.set(
        (Math.random() - 0.5) * 20,
        4 + Math.random() * 6,
        (Math.random() - 0.5) * 15
      )
      arrow.userData = {
        phase: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
      }
      group.add(arrow)
      arrows.push(arrow)
      allMeshes.push(arrow)
    }

    // Bot avatars (dodecahedrons)
    const botCount = 5
    const botGeometry = new THREE.DodecahedronGeometry(0.6)
    const botMaterial = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.9,
      emissive: 0x3A7BFF,
      emissiveIntensity: 0.2,
      roughness: 0.1,
      metalness: 0.9,
    })

    const bots: THREE.Mesh[] = []
    for (let i = 0; i < botCount; i++) {
      const bot = new THREE.Mesh(botGeometry, botMaterial)
      const angle = (i / botCount) * Math.PI * 2
      const radius = 8 + Math.random() * 4
      bot.position.set(
        Math.cos(angle) * radius,
        2 + Math.random() * 4,
        Math.sin(angle) * radius
      )
      bot.userData = {
        angle,
        radius,
        speed: 0.2 + Math.random() * 0.3,
        yOffset: Math.random() * Math.PI * 2,
      }
      group.add(bot)
      bots.push(bot)
      allMeshes.push(bot)
    }

    // Animation
    let animationId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Gentle group rotation
      group.rotation.y = elapsed * 0.1

      // Animate bars (gentle floating)
      bars.forEach((bar) => {
        const data = bar.userData
        bar.position.y = data.originalY + Math.sin(elapsed * data.speed + data.phase) * 0.3
      })

      // Animate arrows (pulsing scale)
      arrows.forEach((arrow) => {
        const data = arrow.userData
        const scale = 1 + Math.sin(elapsed * 2 + data.phase) * 0.15
        arrow.scale.setScalar(scale)
      })

      // Animate bots (orbiting)
      bots.forEach((bot) => {
        const data = bot.userData
        data.angle += data.speed * 0.01
        bot.position.x = Math.cos(data.angle) * data.radius
        bot.position.z = Math.sin(data.angle) * data.radius
        bot.position.y = 3 + Math.sin(elapsed + data.yOffset) * 1.5
        bot.rotation.x = elapsed * 0.5
        bot.rotation.y = elapsed * 0.3
      })

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const handleResize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth
      const h = canvas.parentElement?.clientHeight || 600
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      barGeometry.dispose()
      barMaterialBlue.dispose()
      barMaterialCyan.dispose()
      arrowGeometry.dispose()
      arrowMaterial.dispose()
      botGeometry.dispose()
      botMaterial.dispose()
      allMeshes.forEach((m) => {
        if (m.geometry) m.geometry.dispose()
        if (m.material) {
          if (Array.isArray(m.material)) {
            m.material.forEach((mat) => mat.dispose())
          } else {
            m.material.dispose()
          }
        }
      })
      renderer.dispose()
    }
  }, [inView])

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        height: '80vh',
        minHeight: '600px',
        background: '#05070F',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            opacity: inView ? 1 : 0,
            transition: 'opacity 1.5s ease',
          }}
        />
      </div>

      {/* Text Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '64px',
          left: '64px',
          zIndex: 10,
          maxWidth: '400px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s ease 0.5s',
        }}
      >
        <h2 className="section-title">See the Market Differently</h2>
        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#94A3B8',
            marginTop: '16px',
          }}
        >
          Your strategies, visualized in real-time 3D space. Every bot, every trade, every edge — live.
        </p>
      </div>
    </section>
  )
}
