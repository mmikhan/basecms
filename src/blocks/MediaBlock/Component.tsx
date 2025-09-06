import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import type { MediaBlock as MediaBlockProps } from '@/payload-types'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = ({
  media,
  captionClassName,
  className,
  enableGutter = true,
  imgClassName,
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
      {media && typeof media === 'object' && (
        <Media
          className={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
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
