import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Pricing from '@/sections/Pricing'

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <div style={{ background: 'var(--color-bg-deep)', minHeight: '100vh', paddingTop: '80px' }}>
        <Pricing />
      </div>
      <Footer />
    </>
  )
}
