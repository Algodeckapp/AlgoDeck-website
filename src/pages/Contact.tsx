import { useState, useEffect, useRef} from 'react'
import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import { Mail, Users, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react'
import { trpc } from '@/providers/trpc'
import { toast } from 'sonner'
import * as THREE from 'three'

export default function Contact() {
  const [loaded, setLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
    company: '',
  })
  const [submitted, setSubmitted] = useState(false)
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

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true)
    },
    onError: (err) => {
      console.error('Contact submission error:', err)
      toast.error(err.message || 'Failed to send message. Please try again.')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      company: formData.company,
    })
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Support',
      desc: 'Email our technical desk',
      val: 'support@algodeck.app',
      color: '#3A7BFF'
    },
    {
      icon: Users,
      title: 'Sales',
      desc: 'Enterprise & partnerships',
      val: 'sales@algodeck.app',
      color: '#17B7BD'
    },
    {
      icon: Clock,
      title: 'Status',
      desc: '24/7 Platform monitoring',
      val: 'All systems operational',
      color: '#00D084'
    }
  ]

  return (
    <>
      <Navigation />
      <div className="bg-[#05070F] min-h-screen pt-20 overflow-hidden relative">
        {}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease' }}
          />
        <div className="relative z-10 pt-16 md:pt-28 pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-start">
            
            {/* Left Column: Info */}
            <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="section-eyebrow mb-4 block">GET IN TOUCH</span>
              <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                Let's Build Your <br />
                <span className="gradient-text">Empire Together.</span>
              </h1>
              <p className="text-[#94A3B8] text-lg leading-relaxed mb-12 max-w-xl">
                Have a question about our AI strategies or need enterprise-level deployment? 
                Our team of experts is ready to help you automate your success.
              </p>

              <div className="grid grid-cols-1 gap-6">
                {contactMethods.map((m, i) => (
                  <div key={i} className="glass-panel p-6 border border-white/5 flex gap-6 items-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${m.color}15`, border: `1px solid ${m.color}20` }}>
                      <m.icon size={22} style={{ color: m.color }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-0.5">{m.title}</h4>
                      <p className="text-[#64748B] text-xs mb-1">{m.desc}</p>
                      <p className="text-white font-mono text-sm">{m.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Form */}
            <div className={`transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {submitted ? (
                <div className="glass-panel p-12 md:p-16 border border-[#00D084]/20 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D084]/5 rounded-bl-full" />
                  <div className="w-20 h-20 rounded-full bg-[#00D084]/10 border border-[#00D084]/20 flex items-center justify-center mx-auto mb-8 text-[#00D084]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Message Sent!</h2>
                  <p className="text-[#94A3B8] mb-10 leading-relaxed">
                    Thank you, {formData.name}. Our technical desk has received your inquiry and will respond within 24 hours.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="outline-button !w-full">Send Another Message</button>
                </div>
              ) : (
                <div className="glass-panel p-8 md:p-12 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                  <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                    <ShieldCheck className="text-[#3A7BFF]" size={24} /> Secure Transmission
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full h-14 bg-[#05070F] border border-white/10 rounded-xl px-5 text-white outline-none focus:border-[#3A7BFF]/40 transition-all"
                          placeholder="Tony Chris"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full h-14 bg-[#05070F] border border-white/10 rounded-xl px-5 text-white outline-none focus:border-[#3A7BFF]/40 transition-all"
                          placeholder="tony@algodeck.app"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">Company (Optional)</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full h-14 bg-[#05070F] border border-white/10 rounded-xl px-5 text-white outline-none focus:border-[#3A7BFF]/40 transition-all"
                        placeholder="Prop Firm or Individual"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-14 bg-[#05070F] border border-white/10 rounded-xl px-5 text-white outline-none focus:border-[#3A7BFF]/40 transition-all appearance-none"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Institutional / Sales</option>
                        <option value="technical">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-[#64748B] uppercase tracking-widest ml-1">Detailed Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full min-h-[160px] bg-[#05070F] border border-white/10 rounded-xl p-5 text-white outline-none focus:border-[#3A7BFF]/40 transition-all resize-none"
                        placeholder="Tell us about your trading goals..."
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={submitMutation.isPending}
                      className="glow-button !w-full !h-14 font-bold flex items-center justify-center gap-2"
                    >
                      {submitMutation.isPending ? 'SENDING...' : 'SEND SECURE MESSAGE'} <Send size={18} />
                    </button>
                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
