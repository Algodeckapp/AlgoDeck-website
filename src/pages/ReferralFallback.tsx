import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Sparkles } from 'lucide-react'

export default function ReferralFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  // ─── Three.js Particle Background ───
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
    <div className="min-h-screen bg-[#05070F] flex flex-col">
      <Navigation />
      
      <main className="flex-grow flex items-center justify-center px-4 pt-32 pb-20 relative overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
        />
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-[#3A7BFF]/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#17B7BD]/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg">
          <div className="bg-[#0A0F2C]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]" />
            
            <div className="w-16 h-16 bg-[#3A7BFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#3A7BFF]/20">
              <Sparkles className="text-[#3A7BFF] w-8 h-8" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              You've been invited to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD]">AlgoDeck!</span>
            </h1>
            
            <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
              Our mobile app is launching soon. Get ready to automate your trading empire directly from your phone.
            </p>

            <div className="flex flex-col items-center gap-6">
              {/* Coming Soon Badge */}
              <div className="bg-[#05070F]/90 backdrop-blur-md border border-[#3A7BFF]/50 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_10px_40px_rgba(58,123,255,0.3)] z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3A7BFF] animate-pulse" />
                <span className="text-sm font-bold text-white tracking-widest uppercase">Coming Soon</span>
              </div>

              {/* Disabled Store Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-30 grayscale pointer-events-none select-none">
                <div className="w-[180px] h-[52px] bg-black rounded-xl border border-white/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-full object-cover py-1"
                  />
                </div>
                <div className="w-[180px] h-[52px] bg-black rounded-xl border border-white/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                    alt="Download on the App Store" 
                    className="h-full object-cover py-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
