'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselProps,
} from '@/components/ui/carousel'
import { CarouselBlock as CarouselBlockProps, type Media as MediaType } from '@/payload-types'
import React from 'react'
import AutoScrollPlugin from 'embla-carousel-auto-scroll'
import AutoplayPlugin from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'
import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from '@/lib/spacing'
import RichText from '@/components/RichText'
import { Link } from '@/i18n/navigation'
import { Media } from '@/components/Media'
import { getUrl } from '@/lib/getURL'

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  title,
  type,
  slides,
  autoplay,
  spacingTop,
  spacingBottom,
  paddingTop,
  paddingBottom,
}) => {
  const plugins = {
    logo: [AutoScrollPlugin({ speed: 3 })],
    default: [...(autoplay && autoplay > 0 ? [AutoplayPlugin({ delay: autoplay })] : [])],
  }
  const options: Record<string, Partial<CarouselProps['opts']>> = {
    logo: {
      loop: true,
      watchDrag: false,
    },
    default: {
      loop: true,
    },
  }

  return (
    <section
      className={cn(
        'container mx-auto',
        spacingTopClasses[spacingTop ?? 'medium'],
        spacingBottomClasses[spacingBottom ?? 'medium'],
        paddingTopClasses[paddingTop ?? 'medium'],
        paddingBottomClasses[paddingBottom ?? 'medium'],
      )}
    >
      {title && <RichText className="mb-6" data={title} enableGutter={false} />}

      <Carousel opts={options[type]} plugins={plugins[type]}>
        <CarouselContent>
          {slides?.map((slide) => (
            <CarouselItem
              key={slide.id}
              className={cn('basis-full md:basis-[50%] lg:basis-[33.33%] 2xl:basis-[25%]')}
            >
              {slide.enableLink && slide.link ? (
                <Link
                  href={getUrl(slide.link)}
                  target={slide.link.newTab ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <Media resource={slide.image as MediaType} />
                </Link>
              ) : (
                <Media resource={slide.image as MediaType} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
