import { useState } from 'react'
import { Link } from 'react-router'
import { trpc } from '@/providers/trpc'
import { useAuth } from '@/hooks/useAuth'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features', isRoute: true },
    { label: 'Pricing', href: '/pricing', isRoute: true },
    { label: 'Download', href: '/download', isRoute: true },
  ],
  Resources: [
    { label: 'Documentation', href: '/docs', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Support', href: '/support', isRoute: true },
  ],
  Company: [
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true },
    { label: 'Sign In', href: '/login', isRoute: true },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms', isRoute: true },
    { label: 'Privacy Policy', href: '/privacy', isRoute: true },
  ],
  Connect: [
    { label: 'Twitter/X', href: 'https://x.com/algodeckapp', isRoute: false },
    { label: 'Instagram', href: 'https://www.instagram.com/algodeck.app/', isRoute: false },
    { label: 'TikTok', href: 'https://www.tiktok.com/@algodeckapp?is_from_webapp=1&sender_device=pc', isRoute: false },
    { label: 'Discord', href: 'https://discord.gg/Qfp4SHUxT', isRoute: false },
  ],
}

function SocialIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactElement> = {
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" />
      </svg>
    ),
    discord: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    github: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    ),
    instagram: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    tiktok: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  }

  return icons[type] || null
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { user } = useAuth()

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      setSubscribed(true)
      setEmail('')
    },
  })

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    subscribeMutation.mutate({ email: email.trim(), source: 'footer' })
  }

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.slice(1)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#05070F] border-t border-[#3A7BFF]/15 pt-16 md:pt-24 px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16 pb-16 border-b border-[#3A7BFF]/15">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center p-2 rounded-lg transition-all hover:scale-105 hover:shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
            >
              <img
                src="/assets/logo-primary.png"
                alt="AlgoDeck"
                className="h-9 object-contain logo-image"
              />
            </Link>
            <p className="text-[15px] text-[#94A3B8] mt-4 leading-relaxed">
              Automate Your Trading Empire
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { type: 'twitter', href: 'https://x.com/algodeckapp' },
                { type: 'instagram', href: 'https://www.instagram.com/algodeck.app/' },
                { type: 'tiktok', href: 'https://www.tiktok.com/@algodeckapp?is_from_webapp=1&sender_device=pc' },
                { type: 'github', href: 'https://github.com/Algodeckapp' },
                { type: 'discord', href: 'https://discord.gg/Qfp4SHUxT' },
              ].map((social) => (
                <a
                  key={social.type}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#64748B] transition-colors hover:text-[#3A7BFF] flex items-center"
                >
                  <SocialIcon type={social.type} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-medium tracking-[0.1em] uppercase text-white mb-6">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => {
                  const linkClasses = "text-sm text-[#94A3B8] hover:text-white transition-all inline-block hover:translate-x-1"
                  return (
                    <li key={link.label}>
                      {link.isRoute ? (
                        <Link
                          to={link.href}
                          className={linkClasses}
                          onClick={(e) => {
                            if (link.href.startsWith('#')) {
                              e.preventDefault()
                              handleNavClick(link.href)
                            }
                          }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={linkClasses}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-medium tracking-[0.1em] uppercase text-white mb-6">
              Stay Updated
            </h4>
            {subscribed ? (
              <p className="text-sm text-[#00D084] font-medium animate-fade-in">
                Thanks for subscribing!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 bg-[#0F1629] border border-[#3A7BFF]/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#3A7BFF]/40 transition-colors min-w-0"
                />
                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="bg-[#3A7BFF] hover:brightness-110 text-white text-xs font-medium rounded-lg px-5 py-2.5 transition-all disabled:opacity-50 whitespace-nowrap"
                >
                  {subscribeMutation.isPending ? 'SUBSCRIBING...' : 'Subscribe'}
                </button>
              </form>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className="inline-block mt-4 text-[10px] uppercase tracking-wider font-semibold text-[#3A7BFF] hover:brightness-125 transition-all"
              >
                Admin Dashboard →
              </Link>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center py-8 gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs text-[#64748B]">
              © 2026 AlgoDeck. All rights reserved.
            </span>
          </div>
          <span className="text-xs text-[#64748B] flex items-center gap-1.5">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for traders
          </span>
        </div>
      </div>
    </footer>
  )
}
