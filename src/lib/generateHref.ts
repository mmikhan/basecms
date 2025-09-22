import type { Dashboard, Page, Post } from '@/payload-types'

export type LinkType = {
  type?: 'custom' | 'reference' | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'dashboard'
    value: Page | Post | Dashboard | string | number
  } | null
  url?: string | null
}

export const generateHref = (link: LinkType | null | undefined): string => {
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
