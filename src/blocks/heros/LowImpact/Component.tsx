import React from 'react'
import RichText from '@/components/RichText'
import { LowImpactHero as LowImpactHeroProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const LowImpactHeroBlock: React.FC<LowImpactHeroProps> = ({ links, richText }) => {
  return (
    <div className="container mx-auto my-16">
      <div className="max-w-[48rem]">
        {richText && <RichText data={richText} enableGutter={false} />}
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4 mt-8">
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
  )
}
