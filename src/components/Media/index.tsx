import { VideoMedia } from './Video'
import { ImageMedia } from './Image'
import { SvgMedia } from './Svg'
import { Media as MediaType } from '@/payload-types'
import type { ImageProps } from 'next/image'
import { getMediaUrl } from '@/lib/getURL'

type MediaProps = {
  resource: MediaType
  className?: string
  fill?: ImageProps['fill']
  priority?: ImageProps['priority']
  sizes?: ImageProps['sizes']
}

export const Media: React.FC<MediaProps> = ({
  resource: { alt, transformedUrl, mimeType, updatedAt, width, height },
  className,
  fill,
  priority,
  sizes,
}) => {
  return (
    <>
      {mimeType?.includes('video') ? (
        <VideoMedia
          src={getMediaUrl(transformedUrl, updatedAt)}
          className="h-full w-full object-cover"
        />
      ) : mimeType?.includes('svg') ? (
        <SvgMedia
          src={getMediaUrl(transformedUrl, updatedAt)}
          alt={alt ?? ''}
          className={className}
        />
      ) : (
        <ImageMedia
          className={className}
          src={getMediaUrl(transformedUrl, updatedAt)}
          alt={alt ?? ''}
          fill={fill}
          width={width ?? undefined}
          height={height ?? undefined}
          priority={priority}
          sizes={sizes ?? undefined}
        />
      )}
    </>
  )
}
