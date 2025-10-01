'use client'

import { cn } from '@/lib/utils'
import type { Post } from '@/payload-types'
import type { CollectionSlug } from 'payload'
import { Media } from './Media'
import { Fragment } from 'react'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { Route } from 'next'
import { Link } from '@/i18n/navigation'
import useClickableCard from '@/hooks/useClickableCard'

export type CardPostData = Pick<Post, 'title' | 'slug' | 'content' | 'heroImage' | 'categories'>

type CardProps = CardPostData & {
  collectionSlug: CollectionSlug
  className?: string
  showCategories?: boolean
  customTitle?: string
}

export const Card: React.FC<CardProps> = ({
  title: propTitle,
  slug,
  heroImage,
  content,
  categories,
  collectionSlug,
  className,
  showCategories,
  customTitle,
}) => {
  const { card, link } = useClickableCard({})
  const title = customTitle ?? propTitle
  const href = `/${collectionSlug}/${slug}`
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {heroImage && typeof heroImage === 'object' ? (
          <Media resource={heroImage} sizes="33vw" />
        ) : (
          <div className="aspect-video w-full bg-muted" />
        )}
      </div>

      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}

        <div className="prose">
          <h3>
            <Link className="not-prose text-primary" href={href as Route} ref={link.ref}>
              {title}
            </Link>
          </h3>
        </div>

        <div className="mt-2">
          <p>{convertLexicalToPlaintext({ data: content })}</p>
        </div>
      </div>
    </article>
  )
}
