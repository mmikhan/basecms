import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  admin: {
    group: 'General',
  },
  labels: {
    singular: 'Code Block',
    plural: 'Code Blocks',
  },
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'C++', value: 'cpp' },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
