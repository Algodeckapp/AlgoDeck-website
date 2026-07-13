import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    // Update canonical link dynamically
    let link: HTMLLinkElement | null = document.querySelector("link[rel='canonical']")
    const canonicalUrl = `https://algodeck.app${pathname === '/' ? '' : pathname}`
    if (link) {
      link.setAttribute('href', canonicalUrl)
    } else {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      link.setAttribute('href', canonicalUrl)
      document.head.appendChild(link)
    }
  }, [pathname])

  return null
}
