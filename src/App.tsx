import { Routes, Route } from 'react-router'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import FeaturesPage from './pages/Features'
import PricingPage from './pages/Pricing'
import Download from './pages/Download'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Docs from './pages/Docs'
import Support from './pages/Support'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <div className="bg-[#3A7BFF] text-white text-[10px] py-1 text-center font-bold uppercase tracking-[0.2em] relative z-[9999]">
        AlgoDeck Production Build v1.0.7 - Live Deployment Confirmed
      </div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/download" element={<Download />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
