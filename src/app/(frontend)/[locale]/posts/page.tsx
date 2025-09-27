import type { Metadata } from 'next'
import { PostsArchive } from '@/components/PostsArchive'
import type { Locale } from 'next-intl'
import type { TypedLocale } from 'payload'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: Locale }>
}

export default async function PostsArchivePage({ params }: Props) {
  const { locale } = await params

  return <PostsArchive page={1} locale={locale as TypedLocale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'PostsArchivePage' })

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `/${locale}/posts`,
      type: 'website',
      siteName: 'AdMarket',
      images: [{ url: '/website-template-OG.webp' }],
    },
  }
}
