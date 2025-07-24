import { Icon } from './icon'

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  layout?: 'single' | 'double'
  subtitle?: boolean
}

export const Logo = ({ layout = 'double', subtitle = false }: LogoProps) => {
  return (
    <div className="flex items-center gap-4">
      <Icon />

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
    </div>
  )
}
