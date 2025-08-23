import type { MediaProps } from './types'
import { getMediaUrl } from '@/lib/getURL'
import { cn } from '@/lib/utils'

export const SvgMedia: React.FC<MediaProps> = ({
  alt: altFromProps,
  src: srcFromProps,
  resource,
  imgClassName,
  priority,
}) => {
  let imageAlt: string | null | undefined = altFromProps
  let imageSrc: string | null = typeof srcFromProps === 'string' ? srcFromProps : null

  if (resource && typeof resource === 'object') {
    const { alt: altFromResource, url, updatedAt } = resource
    imageAlt = altFromResource
    imageSrc = getMediaUrl(url, updatedAt)
  }

  if (!imageSrc) {
    return null
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={imageAlt ?? ''}
      src={imageSrc}
      className={cn(imgClassName)}
      decoding="async"
      fetchPriority={!priority ? 'auto' : undefined}
    />
  )
}
