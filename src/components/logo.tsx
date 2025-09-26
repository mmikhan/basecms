import { cn } from '@/lib/utils'
import Icon from './icon'
import Link from 'next/link'
import type { Route } from 'next'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  layout?: 'single' | 'double'
  subtitle?: boolean
  className?: string
}

export default function Logo({ layout = 'single', subtitle = true, className }: LogoProps) {
  return (
    <Link href={'/' as Route} className="flex items-center gap-4 no-underline">
      <Icon className={cn('size-5/12', className)} />

      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
          {layout === 'single' ? (
            'AdMarket'
          ) : (
            <>
              Ad
              <br />
              Market
            </>
          )}
        </h1>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
            Marketplace Platform
          </p>
        )}
      </div>
    </Link>
  )
}
