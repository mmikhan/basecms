import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import { NavBlock as NavBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { Link } from '@/i18n/navigation'

export const NavBlock: React.FC<NavBlockProps> = async ({ media, links }) => {
  return (
    <header className="container mx-auto relative z-20 ">
      <div className="py-8 flex justify-between">
        <Link href="/" className="size-10">
          {media && typeof media === 'object' && <Media priority resource={media} />}
        </Link>
        <nav className="flex gap-3 items-center">
          {links?.map(({ link }, i) => (
            <CMSLink key={i} {...link} />
          ))}
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
