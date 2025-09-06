import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { HighImpactHero as HighImpactHeroProps } from '@/payload-types'

export const HighImpactHeroBlock: React.FC<HighImpactHeroProps> = ({ richText, media, links }) => {
  return (
    <div className="relative -mt-[10.4rem] flex items-center justify-center text-white min-h-[80vh] my-16">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none -z-10">
        {media && typeof media === 'object' && (
          <Media className="-z-10 object-cover" fill resource={media} />
        )}
      </div>
    </div>
  )
}
