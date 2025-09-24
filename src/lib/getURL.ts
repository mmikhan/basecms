import type { Dashboard, Page, Post } from '@/payload-types'

export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const getServerSideURL = () => {
  return (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  )
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const { protocol, hostname, port } = window.location

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  return cacheTag ? `${getClientSideURL()}${url}?${cacheTag}` : `${getServerSideURL()}${url}`
}

export type LinkType = {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'dashboard'
    value: Page | Post | Dashboard | string | number
  } | null
  url?: string | null
}

export const getUrl = (link: LinkType | null | undefined): string => {
  if (
    link?.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value.slug
  ) {
    const { relationTo, value } = link.reference

    if (relationTo === 'pages' && value.slug === 'home') {
      return '/'
    }

    if (relationTo === 'dashboard' && value.slug === 'dashboard') {
      return '/dashboard'
    }

    return `${relationTo !== 'pages' ? `/${relationTo}` : ''}/${value.slug}`
  }

  return link?.url || '/'
}
