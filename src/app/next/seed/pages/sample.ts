import type { Media } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

type SamplePageArgs = {
  contentMedia: Media
}

export const samplePage: (args: SamplePageArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contentMedia,
}) => {
  return {
    title: 'Sample',
    layout: [
      {
        richText: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                tag: 'h1',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'A sample page',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'A sample page that comes with the core CMS',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
            ],
            direction: 'ltr',
          },
        },
        blockName: null,
        links: [],
        blockType: 'lowImpactHero',
      },
      {
        media: contentMedia,
        blockName: null,
        blockType: 'mediaBlock',
      },
    ],
    meta: {
      title: null,
      image: null,
      description: null,
    },
    slug: 'sample',
    _status: 'published',
  }
}
