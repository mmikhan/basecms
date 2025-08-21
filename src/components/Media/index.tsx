import { Fragment } from 'react'
import { MediaProps } from './types'
import { VideoMedia } from './Video'
import { ImageMedia } from './Image'
import { cn } from '@/lib/utils'
import { SvgMedia } from './Svg'

export const Media: React.FC<MediaProps> = (props) => {
  const { className, htmlElement = 'div', resource } = props
  const Tag = htmlElement || Fragment

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const isSvg = typeof resource === 'object' && resource?.mimeType?.includes('svg')

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className: cn('relative h-full w-full', className),
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia {...props} />
      ) : isSvg ? (
        <SvgMedia {...props} />
      ) : (
        <ImageMedia {...props} />
      )}
    </Tag>
  )
}
