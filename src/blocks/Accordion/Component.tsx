import RichText from '@/components/RichText'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  paddingBottomClasses,
  paddingTopClasses,
  spacingBottomClasses,
  spacingTopClasses,
} from '@/lib/spacing'
import { cn } from '@/lib/utils'
import type { AccordionBlock as AccordionBlockProps } from '@/payload-types'
import React from 'react'

export const AccordionBlock: React.FC<AccordionBlockProps> = ({
  title,
  items,
  spacingTop,
  spacingBottom,
  paddingTop,
  paddingBottom,
}) => {
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

      <Accordion type="single" defaultValue={items[0]?.id ?? (0).toString()} collapsible>
        {items.map((item, i) => (
          <AccordionItem key={item.id ?? i} value={item.id ?? i.toString()}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <RichText data={item.content} enableGutter={false} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
