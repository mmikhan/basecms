import { useLocale, useTranslations } from 'next-intl'
import { routing } from '@/i18n/routing'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'
import { Suspense } from 'react'
import { SelectItem } from '@/components/ui/select'

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher')
  const locale = useLocale()

  return (
    <Suspense fallback="loading...">
      <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
        {routing.locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {t('locale', { locale: cur })}
          </SelectItem>
        ))}
      </LocaleSwitcherSelect>
    </Suspense>
  )
}
