import React from 'react'
import type { CollectionConfig, PaginatedDocs } from 'payload'

export const PageRange: React.FC<
  Partial<CollectionConfig['labels']> & PaginatedDocs & { className?: string }
> = ({ className, plural = 'Docs', singular = 'Doc', totalDocs, page, limit }) => {
  let indexStart = (page ? page - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (page || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  return (
    <div className={[className, 'font-semibold'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${totalDocs} ${
          totalDocs > 1 ? plural : singular
        }`}
    </div>
  )
}
