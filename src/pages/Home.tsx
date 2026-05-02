import { useEffect } from 'react'
import Navigation from '@/sections/Navigation'
import Hero from '@/sections/Hero'
import StatsMarquee from '@/sections/StatsMarquee'
import Pipeline from '@/sections/Pipeline'
import Features from '@/sections/Features'
import TradingViz from '@/sections/TradingViz'
import Pricing from '@/sections/Pricing'
import Testimonials from '@/sections/Testimonials'
import CTABanner from '@/sections/CTABanner'
import Footer from '@/sections/Footer'

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        e.preventDefault()
        const id = anchor.getAttribute('href')?.slice(1)
        if (id) {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div style={{ background: '#05070F', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <StatsMarquee />
      <section id="pipeline">
        <Pipeline />
      </section>
      <section id="platform">
        <Features />
      </section>
      <TradingViz />
      <section id="pricing">
        <Pricing />
      </section>
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  )
}
