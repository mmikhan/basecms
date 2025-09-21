import React from 'react'
import { cn } from '@/lib/utils'
import type { CollectionSlug } from 'payload'
import { Card, CardPostData } from './Card'

type CollectionArchiveProps = {
  data?: CardPostData[]
  collectionSlug: CollectionSlug
}

export const CollectionArchive: React.FC<CollectionArchiveProps> = ({ data, collectionSlug }) => {
  return (
    <div className={cn('container')}>
      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
        {data?.map((result, index) => (
          <div className="col-span-4" key={index}>
            <Card className="h-full" {...result} collectionSlug={collectionSlug} showCategories />
          </div>
        ))}
      </div>
    </div>
  )
}
