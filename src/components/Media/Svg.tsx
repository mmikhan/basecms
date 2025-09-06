import { cn } from '@/lib/utils'
import type { ImageProps } from 'next/image'

export const SvgMedia: React.FC<ImageProps & { className?: string }> = ({
  src,
  alt,
  className,
  priority,
}) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src.toString()}
      alt={alt ?? ''}
      className={cn(className)}
      decoding="async"
      fetchPriority={!priority ? 'auto' : undefined}
    />
  )
}
