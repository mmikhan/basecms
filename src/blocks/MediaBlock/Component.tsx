import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'
import type { StaticImageData } from 'next/image'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = ({
  captionClassName,
  className,
  enableGutter = true,
  imgClassName,
  media,
  staticImage,
  disableInnerContainer,
}) => {
  const caption = typeof media === 'object' ? media.caption : undefined

  return (
    <div
      className={cn(
        'mx-auto',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
