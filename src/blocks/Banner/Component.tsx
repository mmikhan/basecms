import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import { BannerBlock as BannerBlockProps } from '@/payload-types'

export const BannerBlock: React.FC<BannerBlockProps & { className?: string }> = ({
  className,
  content,
  style,
}) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info',
          'border-error bg-chart-5/30': style === 'error',
          'border-success bg-chart-2/30': style === 'success',
          'border-warning bg-destructive/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </div>
  )
}
