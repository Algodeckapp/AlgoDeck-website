import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Home', href: '/', isRoute: true },
    { label: 'Features', href: '/features', isRoute: true },
    { label: 'Pricing', href: '/pricing', isRoute: true },
    { label: 'Download', href: '/download', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true },
  ]

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const id = href.slice(1)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[9999] flex items-center transition-colors duration-300 ${
          scrolled 
            ? 'h-16 bg-[#0A0F2C] shadow-lg' 
            : 'h-16 md:h-20 bg-[#05070F]'
        }`}
      >
        <div className="w-full h-full max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-5 lg:px-6 relative">
          <Link
            to="/"
            className="flex items-center transition-transform hover:scale-105 shrink-0"
          >
            <img
              src="/assets/logo-primary.png"
              alt="AlgoDeck"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12 md:h-16' : 'h-14 md:h-20'}`}
              style={{ maxWidth: '200px' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-2 rounded-[30px] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href
                return link.isRoute ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-sans text-sm font-medium tracking-tight px-4 py-2 transition-all relative ${
                      isActive ? 'text-white bg-[#3A7BFF]/20' : 'text-[#94A3B8] hover:text-white hover:bg-[#3A7BFF]/10'
                    }`}
                    style={{ borderRadius: '30px' }}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] rounded-full" />
                    )}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`font-sans text-sm font-medium tracking-tight px-4 py-2 transition-all relative ${
                      isActive ? 'text-white bg-[#3A7BFF]/20' : 'text-[#94A3B8] hover:text-white hover:bg-[#3A7BFF]/10'
                    }`}
                    style={{ borderRadius: '30px' }}
                  >
                    {link.label}
                    {isActive && (
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-[#3A7BFF] to-[#17B7BD] rounded-full" />
                    )}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#3A7BFF]/5 border border-[#3A7BFF]/15">
                  <div className="w-2 h-2 rounded-full bg-[#00D084] shadow-[0_0_8px_rgba(0,208,132,0.5)]" />
                  <span className="text-white text-sm font-medium">
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="outline-button !px-5 !py-2.5 !text-[11px]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/download"
                  className="relative group flex items-center transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute -top-2 -right-1 z-10 scale-75 origin-top-right">
                    <span className="badge badge-warning text-[8px] px-1.5 py-0 shadow-lg">SOON</span>
                  </div>
                  <div className="opacity-40 grayscale">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      alt="Get it on Google Play" 
                      className="h-9 w-auto"
                    />
                  </div>
                </Link>
                <Link
                  to="/download"
                  className="relative group flex items-center transition-transform hover:scale-105 active:scale-95"
                >
                  <div className="absolute -top-2 -right-1 z-10 scale-75 origin-top-right">
                    <span className="badge badge-warning text-[8px] px-1.5 py-0 shadow-lg">SOON</span>
                  </div>
                  <div className="opacity-40 grayscale">
                    <img 
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                      alt="Download on the App Store" 
                      className="h-8 w-auto"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden w-11 h-11 items-center justify-center bg-[#0A0F2C] border border-[#3A7BFF]/30 text-white transition-all shadow-lg shadow-blue-500/10 active:scale-90 shrink-0 z-[100]"
            style={{ borderRadius: '25px' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-[#05070F]/98 backdrop-blur-2xl flex flex-col transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile menu content */}
        <div
          className={`flex-1 flex flex-col items-center justify-start gap-2 px-6 pt-24 pb-8 overflow-y-auto w-full transition-transform duration-500 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-5'
          }`}
        >
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.href
            const commonClasses = `text-2xl font-semibold px-8 py-4 transition-all w-full max-w-sm text-center ${
              isActive ? 'text-[#3A7BFF] bg-[#3A7BFF]/10' : 'text-white bg-transparent'
            } ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`
            
            const commonStyle = {
              transitionDelay: mobileOpen ? `${0.1 + index * 0.05}s` : '0s',
              borderRadius: '30px'
            }

            return link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={commonClasses}
                style={commonStyle}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={commonClasses}
                style={commonStyle}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
              >
                {link.label}
              </a>
            )
          })}

          {/* Mobile auth buttons */}
          <div
            className={`flex flex-col gap-6 mt-10 w-full max-w-xs transition-all duration-300 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: mobileOpen ? '0.3s' : '0s' }}
          >
            {user ? (
              <>
                <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-[#3A7BFF]/5 border border-[#3A7BFF]/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00D084] shadow-[0_0_12px_rgba(0,208,132,0.6)]" />
                  <span className="text-white text-lg font-medium">
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="outline-button !w-full !py-4 !text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-6 items-center">
                <Link
                  to="/download"
                  className="relative group transition-transform hover:scale-105 active:scale-95"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute -top-3 -right-2 z-10 scale-75">
                    <span className="badge badge-warning text-[10px] px-2 py-0.5 shadow-lg">SOON</span>
                  </div>
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-16 w-auto"
                  />
                </Link>
                <Link
                  to="/download"
                  className="relative group transition-transform hover:scale-105 active:scale-95"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="absolute -top-3 -right-2 z-10 scale-75">
                    <span className="badge badge-warning text-[10px] px-2 py-0.5 shadow-lg">SOON</span>
                  </div>
                  <div className="opacity-40 grayscale">
                    <img 
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                      alt="Download on the App Store" 
                      className="h-14 w-auto"
                    />
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}