import React from 'react'
import type { PaginatedDocs, TypedLocale } from 'payload'
import { getTranslations } from 'next-intl/server'

export const PageRange: React.FC<
  PaginatedDocs & { className?: string; locale: TypedLocale }
> = async ({ className, totalDocs, page, limit, locale }) => {
  const t = await getTranslations({ locale, namespace: 'PostsArchivePage' })

  let indexStart = (page ? page - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (page || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {!totalDocs
        ? t('noResults')
        : t('range', { currentPage: page || 1, totalPages: Math.ceil(totalDocs / (limit || 1)) })}
    </div>
  )
}
