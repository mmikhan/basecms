import type { PayloadRequest } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidate =
  (tag: string) =>
  ({ doc, req: { payload } }: { doc: unknown; req: PayloadRequest }) => {
    payload.logger.info(`Revalidating ${tag}`)

    revalidateTag(tag)

    return doc
  }
