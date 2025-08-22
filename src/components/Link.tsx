import type { Page, Post } from '@/payload-types'
import { buttonVariants } from './ui/button'
import { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

type CMSLinkType = {
  appearance?: 'inline' | VariantProps<typeof buttonVariants>['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    // TODO: custom post types. i.e. 'posts', 'products', etc.
    relationTo: 'pages' | 'posts'
    // TODO: implement custom post types. i.e. 'posts', 'products', etc.
    value: Page | Post | string | number
  } | null
  size?: VariantProps<typeof buttonVariants>['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
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
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
