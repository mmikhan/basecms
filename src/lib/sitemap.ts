import { routing } from '@/i18n/routing'
import { Locale } from 'next-intl'
import { getServerSideURL } from './getURL'

export const generateAlternateRefs = (
  path: string,
  currentLocale: Locale,
): { href: string; hreflang: Locale }[] => {
  return routing.locales
    .filter((locale) => locale !== currentLocale)
    .map((locale) => ({
      href: `${getServerSideURL()}/${locale}${path}`,
      hreflang: locale,
    }))
}
