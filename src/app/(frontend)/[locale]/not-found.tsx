import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')

  return (
    <main>
      <h1>{t('title')}</h1>

      <Link href={'/'}>{t('goHome')}</Link>
    </main>
  )
}
