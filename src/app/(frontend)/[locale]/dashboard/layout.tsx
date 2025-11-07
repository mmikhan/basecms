import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type DashboardLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return children
}
