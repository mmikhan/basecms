import type { Page, Post } from '@/payload-types'
import { type Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateMeta = async ({
  doc,
}: {
  // TODO: custom post types. i.e. Partial<Page> | Partial<Post> | null
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const title = doc?.meta?.title ?? doc?.title
  const image = doc?.meta?.image

  const ogImage =
    image && typeof image === 'object'
      ? image.transformedUrl
      : 'https://res.cloudinary.com/dpvyuluiq/image/upload/f_auto/q_auto/cld-sample'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
