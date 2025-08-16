import { Fragment } from 'react'
import { MediaProps } from './types'
import { VideoMedia } from './Video'
import { ImageMedia } from './Image'

export const Media: React.FC<MediaProps> = (props) => {
  const { className, htmlElement = 'div', resource } = props
  const Tag = htmlElement || Fragment

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
