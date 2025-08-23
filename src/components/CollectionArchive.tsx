import React from 'react'
import { cn } from '@/lib/utils'
import { Post } from '@/payload-types'
import { CollectionConfig, PaginatedDocs } from 'payload'
import { Card } from './Card'

export const CollectionArchive: React.FC<
  PaginatedDocs<Post> & { collectionSlug: CollectionConfig['slug'] }
> = ({ docs, collectionSlug }) => {
  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {docs?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card
                  className="h-full"
                  {...result}
                  collectionSlug={collectionSlug}
                  showCategories
                />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
