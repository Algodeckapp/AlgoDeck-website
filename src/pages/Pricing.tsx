import Navigation from '@/sections/Navigation'
import Footer from '@/sections/Footer'
import Pricing from '@/sections/Pricing'

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <div className="bg-[#05070F] min-h-screen pt-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#3A7BFF]/10 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[30%] -right-[10%] w-[500px] h-[500px] bg-[#17B7BD]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10">
          <Pricing />
        </div>
      </div>
      <Footer />
    </>
  )
}
