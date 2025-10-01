import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-6 dark:bg-black">
      <h1 className="text-2xl font-bold">{t('title')}</h1>

      <Link className="text-blue-500 hover:underline" href={'/'}>
        {t('goHome')}
      </Link>
    </main>
  )
}
