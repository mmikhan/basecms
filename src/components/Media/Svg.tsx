'use client'

import { useEffect, useState } from 'react'
import type { MediaProps } from './types'
import { getMediaUrl } from '@/lib/getURL'
import { cn } from '@/lib/utils'

export const SvgMedia: React.FC<MediaProps> = ({ alt, src, resource, imgClassName, priority }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [imageAlt, setImageAlt] = useState<typeof alt | null>(alt)

  useEffect(() => {
    if (typeof src === 'string') {
      setImageSrc(src)
    }

    if (resource && typeof resource === 'object') {
      const { alt: altFromResource, url, updatedAt } = resource
      setImageAlt(altFromResource)
      setImageSrc(getMediaUrl(url, updatedAt))
    }
  }, [src, resource])

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
