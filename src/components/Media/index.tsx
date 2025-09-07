import { VideoMedia } from './Video'
import { ImageMedia } from './Image'
import { SvgMedia } from './Svg'
import { Media as MediaType } from '@/payload-types'
import type { ImageProps } from 'next/image'
import { getMediaUrl } from '@/lib/getURL'
import { BasicImage, PremiumImage, ProtectedImage } from '../ProtectedImage'

type MediaProps = {
  resource: MediaType
  className?: string
  fill?: ImageProps['fill']
  priority?: ImageProps['priority']
  sizes?: ImageProps['sizes']
}

export const Media: React.FC<MediaProps> = ({ resource, className, fill, priority, sizes }) => {
  return (
    <>
      {resource.mimeType?.includes('video') ? (
        <VideoMedia
          src={getMediaUrl(resource.transformedUrl, resource.updatedAt)}
          className="h-full w-full object-cover"
        />
      ) : resource.mimeType?.includes('svg') ? (
        <SvgMedia
          src={getMediaUrl(resource.transformedUrl, resource.updatedAt)}
          alt={resource.alt ?? ''}
          className={className}
        />
      ) : resource.enablePublicPreview && resource.previewUrl ? (
        <PremiumImage media={resource} />
      ) : resource.requiresSignedURL ? (
        <ProtectedImage doc={resource} />
      ) : resource.isPrivate ? (
        <BasicImage media={resource} />
      ) : (
        <ImageMedia
          className={className}
          src={getMediaUrl(resource.transformedUrl, resource.updatedAt)}
          alt={resource.alt ?? ''}
          fill={fill}
          width={resource.width ?? undefined}
          height={resource.height ?? undefined}
          priority={priority}
          sizes={sizes ?? undefined}
        />
      )}
    </>
  )
}
