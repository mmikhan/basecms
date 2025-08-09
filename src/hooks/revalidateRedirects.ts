import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, PayloadRequest } from 'payload'
import { revalidateTag } from 'next/cache'
import { Redirect } from '@/payload-types'

// A generic revalidation function that can be used for different hooks
const revalidate =
  (tag: string) =>
  ({ doc, req: { payload } }: { doc: Redirect; req: PayloadRequest }) => {
    payload.logger.info(`Revalidating ${tag}`)

    revalidateTag(tag)

    return doc
  }

export const revalidateRedirects: CollectionAfterChangeHook<Redirect> = revalidate('redirects')
export const revalidateDelete: CollectionAfterDeleteHook<Redirect> = revalidate('redirects')
