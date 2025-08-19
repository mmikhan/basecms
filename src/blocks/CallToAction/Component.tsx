import React from 'react'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { CallToActionBlock as CTABlockProps } from '@/payload-types'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ richText, links }) => {
  return (
    <div className="container mx-auto">
      <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
