import type { CheckboxField, TextField } from 'payload'
import { slugify } from 'transliteration'

type Overrides = {
  slugOverrides?: Partial<TextField>
  checkboxOverrides?: Partial<CheckboxField>
}

type Slug = (fieldToUse?: string, overrides?: Overrides) => [TextField, CheckboxField]

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  const { slugOverrides, checkboxOverrides } = overrides

  const checkBoxField: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...checkboxOverrides,
  }

  // @ts-expect-error - ts mismatch Partial<TextField> with TextField
  const slugField: TextField = {
    name: 'slug',
    type: 'text',
    localized: true,
    index: true,
    label: 'Slug',
    ...(slugOverrides || {}),
    hooks: {
      beforeValidate: [
        ({ data, operation, originalDoc, value }) => {
          if (typeof value === 'string') {
            return slugify(value, { trim: true })
          }

          if (operation === 'create' || !data?.slug) {
            const fallbackData = data?.[fieldToUse] || originalDoc?.[fieldToUse]

            if (fallbackData && typeof fallbackData === 'string') {
              return slugify(fallbackData, { trim: true })
            }
          }

          return value
        },
      ],
    },
    admin: {
      position: 'sidebar',
      ...(slugOverrides?.admin || {}),
      components: {
        Field: {
          path: '@/fields/slug/Component#Slug',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
          },
        },
      },
    },
  }

  return [slugField, checkBoxField]
}
