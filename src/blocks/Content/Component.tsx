import React from 'react'
import { cn } from '@/lib/utils'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = ({ columns }) => {
  const sizeClasses = {
    full: 'md:col-span-4 lg:col-span-12',
    half: 'md:col-span-2 lg:col-span-6',
    oneThird: 'md:col-span-4 lg:col-span-4',
    twoThirds: 'md:col-span-4 lg:col-span-8',
  }

  return (
    <div className="container mx-auto my-16">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map(({ enableLink, link, richText, size }, index) => {
            return (
              <div className={cn('col-span-4', size ? sizeClasses[size] : '')} key={index}>
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
