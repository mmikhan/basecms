import { cn } from '@/lib/utils'
import type { Post } from '@/payload-types'
import { CollectionConfig } from 'payload'
import { Media } from './Media'
import { Fragment } from 'react'
import Link from 'next/link'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const Card: React.FC<
  Post & { collectionSlug: CollectionConfig['slug'] } & {
    className?: string
    showCategories?: boolean
    customTitle?: string
  }
> = ({
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
  const title = customTitle ?? propTitle
  const href = `/${collectionSlug}/${slug}`
  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  return (
    <article className={cn('border border-border rounded-lg overflow-hidden bg-card', className)}>
      <div className="relative w-full">
        {heroImage ? (
          <Media resource={heroImage} size="33vw" />
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
            <Link className="not-prose text-primary" href={href}>
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
