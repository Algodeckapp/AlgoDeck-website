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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? '64px' : '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          background: scrolled
            ? 'rgba(10, 15, 44, 0.95)'
            : 'rgba(5, 7, 15, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(58, 123, 255, 0.2)' : '1px solid rgba(58, 123, 255, 0.1)',
          boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              padding: '8px 16px 8px 8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <img
              src="/assets/logo-primary.png"
              alt="AlgoDeck"
              style={{
                height: scrolled ? '48px' : '60px',
                width: 'auto',
                transition: 'height 0.3s ease',
                objectFit: 'contain',
              }}
              className="logo-image"
            />
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: '4px',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href
              return link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    position: 'relative',
                    background: isActive ? 'rgba(58, 123, 255, 0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.color = '#FFFFFF'
                    if (!isActive) {
                      el.style.background = 'rgba(58, 123, 255, 0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.color = isActive ? '#FFFFFF' : '#94A3B8'
                    el.style.background = isActive ? 'rgba(58, 123, 255, 0.1)' : 'transparent'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '24px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3A7BFF 0%, #17B7BD 100%)',
                        borderRadius: '2px',
                      }}
                    />
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
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    position: 'relative',
                    background: isActive ? 'rgba(58, 123, 255, 0.1)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.color = '#FFFFFF'
                    if (!isActive) {
                      el.style.background = 'rgba(58, 123, 255, 0.05)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.color = isActive ? '#FFFFFF' : '#94A3B8'
                    el.style.background = isActive ? 'rgba(58, 123, 255, 0.1)' : 'transparent'
                  }}
                >
                  {link.label}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '24px',
                        height: '2px',
                        background: 'linear-gradient(90deg, #3A7BFF 0%, #17B7BD 100%)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop Right side */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: '12px' }}>
            {user ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    background: 'rgba(58, 123, 255, 0.05)',
                    border: '1px solid rgba(58, 123, 255, 0.15)',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#00D084',
                      boxShadow: '0 0 8px rgba(0, 208, 132, 0.5)',
                    }}
                  />
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 500 }}>
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => logout()}
                  className="outline-button"
                  style={{ padding: '10px 20px', fontSize: '12px' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/download"
                className="glow-button"
                style={{
                  padding: '12px 24px',
                  fontSize: '13px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                }}
              >
                Download Now
                <ChevronRight size={16} />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'rgba(58, 123, 255, 0.1)',
              border: '1px solid rgba(58, 123, 255, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#FFFFFF',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(58, 123, 255, 0.15)'
              e.currentTarget.style.borderColor = '#3A7BFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(58, 123, 255, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(58, 123, 255, 0.2)'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          background: 'rgba(5, 7, 15, 0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {/* Mobile menu content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '80px 24px 24px',
            transform: mobileOpen ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: mobileOpen ? '0.1s' : '0s',
          }}
        >
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.href
            const linkProps = {
              key: link.href,
              onClick: (e: React.MouseEvent) => {
                if (link.isRoute) {
                  setMobileOpen(false)
                } else {
                  e.preventDefault()
                  handleNavClick(link.href)
                }
              },
              style: {
                fontSize: '32px',
                fontWeight: 600,
                color: isActive ? '#3A7BFF' : '#FFFFFF',
                textDecoration: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                background: isActive ? 'rgba(58, 123, 255, 0.1)' : 'transparent',
                border: '1px solid transparent',
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center' as const,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: mobileOpen ? `${0.1 + index * 0.05}s` : '0s',
              }
            }
            return link.isRoute ? (
              <Link {...linkProps} to={link.href}>
                {link.label}
              </Link>
            ) : (
              <a {...linkProps} href={link.href}>
                {link.label}
              </a>
            )
          })}

          {/* Mobile auth buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '40px',
              width: '100%',
              maxWidth: '400px',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.3s ease',
              transitionDelay: mobileOpen ? '0.3s' : '0s',
            }}
          >
            {user ? (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: 'rgba(58, 123, 255, 0.05)',
                    border: '1px solid rgba(58, 123, 255, 0.2)',
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#00D084',
                      boxShadow: '0 0 12px rgba(0, 208, 132, 0.6)',
                    }}
                  />
                  <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 500 }}>
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                  }}
                  className="outline-button"
                  style={{ width: '100%', padding: '16px', fontSize: '14px' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/download"
                className="glow-button"
                onClick={() => setMobileOpen(false)}
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: '16px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
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
