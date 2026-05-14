import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Play, MousePointer2, Sparkles, Cpu, Zap } from 'lucide-react'

export default function Commercial() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 4000)

    return () => clearInterval(timer)
  }, [isVisible])

  const steps = [
    {
      title: "From Thought",
      subtitle: "The Vision",
      description: "A focused trader sits at a sleek desk, writing strategy logic on a transparent digital glass panel. Atmospheric, precise, and intelligent.",
      icon: MousePointer2,
      logic: ["Entry Conditions", "Risk Rules", "Take Profit", "Exit Conditions"]
    },
    {
      title: "To Digitization",
      subtitle: "The Transformation",
      description: "Handwritten logic lifts from the glass as glowing structured algorithmic blocks, floating smoothly toward the AlgoDeck app.",
      icon: Sparkles,
      status: "Digitizing Logic..."
    },
    {
      title: "To Assembly",
      subtitle: "The Construction",
      description: "Strategy modules lock into place as a sophisticated autonomous trading bot is constructed in real time inside the AlgoDeck interface.",
      icon: Cpu,
      status: "Building Bot..."
    },
    {
      title: "To Execution",
      subtitle: "The Deployment",
      description: "Validation systems activate. BOT ACTIVE. A clean upward equity curve rises as the system executes autonomously.",
      icon: Zap,
      status: "Live Deployment"
    }
  ]

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 bg-[#05070F] overflow-hidden border-y border-white/5">
      {/* Background Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#3A7BFF]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 md:mb-32">
          <span className="section-eyebrow mb-4 block">THE ALGODECK VISION</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            From Thought to <span className="gradient-text">Execution</span>
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Experience the journey of a trading strategy as it transforms from an idea into a fully autonomous, live-executing trading bot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Visual Side (Simulating the Commercial sequences) */}
          <div className="relative aspect-square md:aspect-video lg:aspect-square bg-[#0A0F2C] rounded-[40px] border border-white/10 overflow-hidden shadow-2xl group">
            {/* Cinematic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-transparent to-transparent z-20" />
            
            {/* Sequence 1: The Glass Panel */}
            <div className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center p-8 md:p-16 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="w-full h-full border border-white/20 rounded-2xl backdrop-blur-sm bg-white/5 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  {steps[0].logic?.map((text, i) => (
                    <div key={i} className="flex items-center gap-4 group/item">
                      <div className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
                      <span className="text-xl md:text-2xl font-mono text-white/80 tracking-wider group-hover/item:text-[#00D084] transition-colors">{text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 flex items-center gap-3 text-[#64748B] text-xs font-mono uppercase tracking-widest">
                  <div className="w-8 h-[1px] bg-white/20" />
                  Writing Strategy...
                </div>
              </div>
            </div>

            {/* Sequence 2: Digitization */}
            <div className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center ${activeStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <div className="relative">
                 {/* Floating Blocks */}
                 {[1, 2, 3, 4].map((i) => (
                   <div 
                    key={i} 
                    className="absolute w-12 h-12 md:w-16 md:h-16 bg-[#3A7BFF]/20 border border-[#3A7BFF]/40 rounded-xl flex items-center justify-center text-[#3A7BFF]"
                    style={{
                      left: `${Math.sin(i) * 100}px`,
                      top: `${Math.cos(i) * 100}px`,
                      animation: `float 3s ease-in-out infinite ${i * 0.5}s`
                    }}
                   >
                     <Sparkles size={24} />
                   </div>
                 ))}
                 <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#3A7BFF]/5 blur-3xl animate-pulse" />
               </div>
               <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#3A7BFF] font-mono text-sm uppercase tracking-widest flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-[#3A7BFF] animate-ping" />
                 Digitizing Logic
               </div>
            </div>

            {/* Sequence 3: Assembly */}
            <div className={`absolute inset-0 transition-all duration-1000 flex items-center justify-center p-12 ${activeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
              <div className="w-64 h-auto glass-panel p-6 border border-white/10 rounded-[30px] flex flex-col gap-4">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-[#00D084] w-2/3 animate-[shimmer_2s_infinite]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[#64748B]">
                      <Cpu size={16} />
                    </div>
                  ))}
                </div>
                <div className="text-center text-[10px] font-mono text-[#00D084] uppercase tracking-tighter">Constructing Bot Core...</div>
              </div>
            </div>

            {/* Sequence 4: Execution */}
            <div className={`absolute inset-0 transition-all duration-1000 flex flex-col items-center justify-center p-8 ${activeStep === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
               <div className="text-[#00D084] font-bold text-4xl md:text-6xl tracking-tighter mb-8 flex items-center gap-4">
                 <div className="w-4 h-4 rounded-full bg-[#00D084] animate-ping" />
                 ACTIVE
               </div>
               <div className="w-full max-w-sm h-48 relative">
                 {/* Simulated Equity Curve */}
                 <svg viewBox="0 0 400 200" className="w-full h-full">
                   <path 
                    d="M0,180 Q100,160 150,120 T300,60 T400,20" 
                    fill="none" 
                    stroke="#00D084" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="animate-[drawPath_3s_ease-out_forwards]"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                   />
                   <path 
                    d="M0,180 Q100,160 150,120 T300,60 T400,20 V200 H0 Z" 
                    fill="url(#gradient)" 
                    className="opacity-20"
                   />
                   <defs>
                     <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#00D084" />
                       <stop offset="100%" stopColor="transparent" />
                     </linearGradient>
                   </defs>
                 </svg>
               </div>
               <div className="mt-8 flex gap-8">
                 <div className="text-center">
                    <div className="text-[#64748B] text-[10px] uppercase font-bold">Profit</div>
                    <div className="text-white font-bold text-xl">+$4,291.50</div>
                 </div>
                 <div className="text-center">
                    <div className="text-[#64748B] text-[10px] uppercase font-bold">Accuracy</div>
                    <div className="text-white font-bold text-xl">84.2%</div>
                 </div>
               </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`flex gap-6 transition-all duration-500 cursor-pointer group ${activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-60'}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${activeStep === index ? 'bg-[#3A7BFF]/10 border-[#3A7BFF]/30 scale-110' : 'bg-white/5 border-white/10'}`}>
                  <step.icon size={24} className={activeStep === index ? 'text-[#3A7BFF]' : 'text-[#64748B]'} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${activeStep === index ? 'text-[#3A7BFF]' : 'text-[#64748B]'}`}>{step.subtitle}</span>
                    {activeStep === index && <div className="h-[1px] w-8 bg-[#3A7BFF]" />}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-8 border-t border-white/5 mt-4">
              <button className="glow-button !px-10 flex items-center gap-3 group">
                <Play size={16} className="fill-white" />
                WATCH FULL COMMERCIAL
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes drawPath {
          to { strokeDashoffset: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </section>
  )
}
