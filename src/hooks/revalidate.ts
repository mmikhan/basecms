import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Dashboard, Page, Post } from '@/payload-types'

export const revalidateCacheTag =
  (tag: string) =>
  ({ doc, req: { payload } }: { doc: unknown; req: PayloadRequest }) => {
    payload.logger.info(`Revalidating ${tag}`)

    revalidateTag(tag)

    return doc
  }

/**
 * Constructs the correct path for a document based on its collection slug.
 * @param collectionSlug - The slug of the collection (e.g., 'pages', 'posts').
 * @param docSlug - The slug of the document.
 * @returns The revalidation-ready path (e.g., '/', '/about-us', '/posts/my-post').
 */
export const getPath = (collectionSlug: string, docSlug: string): string => {
  switch (collectionSlug) {
    case 'pages':
      return `/${docSlug === 'home' ? '' : docSlug}`
    case 'dashboard':
      return `/${docSlug === 'dashboard' ? 'dashboard' : `dashboard/${docSlug}`}`
    default:
      return `/${collectionSlug}/${docSlug}`
  }
}

export const revalidatePathAfterChange: CollectionAfterChangeHook<Page | Post | Dashboard> = ({
  doc,
  previousDoc,
  collection,
  req: { payload, context },
}) => {
  if (context.disableRevalidate || !collection) {
    return doc
  }

  const sitemapTag = `${collection.slug}-sitemap`

  // Revalidate the path and sitemap when a document is published or updated
  if (doc._status === 'published' && doc.slug) {
    const path = getPath(collection.slug, doc.slug)

    payload.logger.info(`Revalidating ${collection.slug} at path: ${path}`)

    revalidatePath(path)
    revalidateTag(sitemapTag)
    revalidateTag(collection.slug)
  }

  // Revalidate the old path when a document is unpublished
  if (previousDoc?._status === 'published' && doc._status !== 'published' && previousDoc.slug) {
    const oldPath = getPath(collection.slug, previousDoc.slug)

    payload.logger.info(`Revalidating old ${collection.slug} path: ${oldPath}`)

    revalidatePath(oldPath)
    revalidateTag(sitemapTag)
    revalidateTag(collection.slug)
  }

  return doc
}

export const revalidatePathAfterDelete: CollectionAfterDeleteHook<Page | Post | Dashboard> = ({
  doc,
  collection,
  req: { context },
}) => {
  if (!context.disableRevalidate && collection && doc.slug) {
    const path = getPath(collection.slug, doc.slug)

    revalidatePath(path)
    revalidateTag(`${collection.slug}-sitemap`)
    revalidateTag(collection.slug)
  }

  return doc
}
