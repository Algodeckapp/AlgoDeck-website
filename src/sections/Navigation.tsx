import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { Menu, X, ChevronRight } from 'lucide-react'

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
    { label: 'Docs', href: '/docs', isRoute: true },
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
        className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-center transition-all duration-300 ${
          scrolled ? 'h-16 bg-[#0A0F2C]/95 border-b border-[#3A7BFF]/20 shadow-lg' : 'h-20 bg-[#05070F]/60 border-b border-[#3A7BFF]/10'
        } backdrop-blur-xl`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition-transform hover:scale-105"
          >
            <img
              src="/assets/logo-primary.png"
              alt="AlgoDeck"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
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
                    className={`font-sans text-sm font-medium tracking-tight px-4 py-2 rounded-full transition-all relative ${
                      isActive ? 'text-white bg-[#3A7BFF]/20' : 'text-[#94A3B8] hover:text-white hover:bg-[#3A7BFF]/10'
                    }`}
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
                    className={`font-sans text-sm font-medium tracking-tight px-4 py-2 rounded-full transition-all relative ${
                      isActive ? 'text-white bg-[#3A7BFF]/20' : 'text-[#94A3B8] hover:text-white hover:bg-[#3A7BFF]/10'
                    }`}
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
              <Link
                to="/download"
                className="glow-button !px-6 !py-3 !text-[12px] flex items-center gap-2 font-semibold"
              >
                Download Now
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center bg-[#3A7BFF]/10 border border-[#3A7BFF]/20 rounded-lg text-white transition-all hover:bg-[#3A7BFF]/15 hover:border-[#3A7BFF]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
          className={`flex-1 flex flex-col items-center justify-center gap-2 px-6 pt-20 transition-transform duration-500 ${
            mobileOpen ? 'translate-y-0' : '-translate-y-5'
          }`}
        >
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.href
            const commonClasses = `text-2xl font-semibold px-8 py-4 rounded-xl transition-all w-full max-w-sm text-center ${
              isActive ? 'text-[#3A7BFF] bg-[#3A7BFF]/10' : 'text-white bg-transparent'
            } ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`
            
            const commonStyle = {
              transitionDelay: mobileOpen ? `${0.1 + index * 0.05}s` : '0s'
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
            className={`flex flex-col gap-3 mt-10 w-full max-w-sm transition-all duration-300 ${
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
              <Link
                to="/download"
                className="glow-button !w-full !py-4.5 !text-base flex items-center justify-center gap-2.5 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                Download Now
                <ChevronRight size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
