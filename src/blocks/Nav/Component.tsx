import { CMSLink } from '@/components/Link'
// import { getCachedGlobal } from '@/lib/getGlobals'
// import type { Header } from '@/payload-types'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { NavBlock as NavBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

export const NavBlock: React.FC<NavBlockProps> = async ({ media, links }) => {
  //   const { layout } = (await getCachedGlobal('header', 1)()) as Header

  return (
    <header className="container mx-auto relative z-20 ">
      <div className="py-8 flex justify-between">
        <Link href="/">
          {/* <Logo className="invert dark:invert-0" /> */}
          <Media priority resource={media} className="size-10" />
        </Link>
        <nav className="flex gap-3 items-center">
          {/* {layout.flatMap(({ links }) =>
            links?.map(({ link }, i) => <CMSLink key={i} {...link} />),
          )} */}
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
