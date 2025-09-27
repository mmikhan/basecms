import type React from 'react'
import type { Page } from '@/payload-types'
import { notFound } from 'next/navigation'
import { getCachedRedirects } from '@/lib/getRedirects'
import { getCachedDocument } from '@/lib/getDocument'
import { Locale } from 'next-intl'
import { redirect } from '@/i18n/navigation'

interface Props {
  disableNotFound?: boolean
  url: string
  locale: Locale
}

/* This component helps us with SSR based dynamic redirects */
export const Redirects: React.FC<Props> = async ({ disableNotFound, url, locale }) => {
  const redirects = await getCachedRedirects()()

  const redirectItem = redirects.find((redirect) => redirect.from === url)

  if (redirectItem) {
    if (redirectItem.to?.url) {
      redirect({ href: redirectItem.to.url, locale })
    }

    let redirectUrl: string

    if (typeof redirectItem.to?.reference?.value === 'string') {
      const collection = redirectItem.to?.reference?.relationTo
      const id = redirectItem.to?.reference?.value

      const document = (await getCachedDocument({ collection, slug: id })()) as Page
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        document?.slug
      }`
    } else {
      redirectUrl = `${redirectItem.to?.reference?.relationTo !== 'pages' ? `/${redirectItem.to?.reference?.relationTo}` : ''}/${
        typeof redirectItem.to?.reference?.value === 'object'
          ? redirectItem.to?.reference?.value?.slug
          : ''
      }`
    }

    if (redirectUrl) redirect({ href: redirectUrl, locale })
  }

  if (disableNotFound) return null

  return notFound()
}
