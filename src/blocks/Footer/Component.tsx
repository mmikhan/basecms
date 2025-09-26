import { CMSLink } from '@/components/Link'
import LocaleSwitcher from '@/components/LocaleSwitch/LocaleSwitcher'
import { Media } from '@/components/Media'
import { ModeToggle } from '@/components/mode-toggle'
import { Link } from '@/i18n/navigation'
import { FooterBlock } from '@/payload-types'

export const FooterBlockComponent: React.FC<FooterBlock> = async ({ links, media }) => {
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card">
      <div className="container mx-auto py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center size-10" href="/">
          {media && typeof media === 'object' && <Media priority resource={media} />}
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ModeToggle />
          <LocaleSwitcher />
          <nav className="flex flex-col md:flex-row gap-4">
            {links?.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
