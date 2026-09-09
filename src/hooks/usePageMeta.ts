import { useEffect } from 'react'

interface PageMeta {
  title: string
  description: string
  canonical?: string
}

/**
 * Sets per-page document title and meta description.
 * Google reads these when it crawls individual SPA routes (second-wave JS render).
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    // Title
    document.title = title

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    }

    // OG title / description
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)

    const twitterTitle = document.querySelector<HTMLMetaElement>('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)

    const twitterDesc = document.querySelector<HTMLMetaElement>('meta[property="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', description)

    // Canonical
    if (canonical) {
      let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (canonicalEl) canonicalEl.setAttribute('href', canonical)
    }
  }, [title, description, canonical])
}
