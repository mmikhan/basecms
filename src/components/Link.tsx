import { getUrl, type LinkType } from '@/lib/getURL'
import { buttonVariants } from './ui/button'
import { VariantProps } from 'class-variance-authority'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import type { Route } from 'next'

type CMSLinkType = LinkType & {
  appearance?: 'inline' | VariantProps<typeof buttonVariants>['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  size?: VariantProps<typeof buttonVariants>['size'] | null
}

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  appearance = 'inline',
  children,
  className,
  label,
  newTab,
  reference,
  size,
  url,
}) => {
  const href = getUrl({ type, reference, url })

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href as Route} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href as Route} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
