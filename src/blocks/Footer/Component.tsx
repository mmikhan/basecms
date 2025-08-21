import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ModeToggle } from '@/components/mode-toggle'
import { FooterBlock } from '@/payload-types'
import Link from 'next/link'

export const FooterBlockComponent: React.FC<FooterBlock> = async ({ links, media }) => {
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card">
      <div className="container mx-auto py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Media priority resource={media} className="size-10" />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ModeToggle />
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
