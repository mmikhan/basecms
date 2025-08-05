import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { CallToActionBlock as CTABlockProps } from '@/payload-types'
import Link from 'next/link'
import React from 'react'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ richText, link, buttonText }) => {
  return (
    <div className="call-to-action-block">
      {richText && (
        <div className="rich-text-content">
          <RichText data={richText} enableGutter={false} />
        </div>
      )}

      {link && typeof link === 'object' && (
        <Button asChild>
          <Link href={`https://example.com/${link.slug}`} className="cta-button">
            {buttonText || 'Click Here'}
          </Link>
        </Button>
      )}
    </div>
  )
}
