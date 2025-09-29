import { marginFields, paddingFields } from '@/fields/spacing'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const Accordion: Block = {
  slug: 'accordion',
  admin: {
    group: 'Accordion',
  },
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'title',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          localized: true,
          required: true,
          editor: lexicalEditor(),
        },
      ],
    },
    marginFields,
    paddingFields,
  ],
}
