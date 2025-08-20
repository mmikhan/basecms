import React from 'react'
import type { MediumImpactHero as MediumImpactHeroProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHeroBlock: React.FC<MediumImpactHeroProps> = ({
  links,
  media,
  richText,
}) => {
  return (
    <div className="mx-auto container my-16">
      {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

      {Array.isArray(links) && links.length > 0 && (
        <ul className="flex gap-4">
          {links.map(({ link }, i) => {
            return (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      )}
      {media && typeof media === 'object' && (
        <>
          <Media className="-mx-4 md:-mx-8 2xl:-mx-16" priority resource={media} />
          {media?.caption && (
            <div className="mt-3">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
