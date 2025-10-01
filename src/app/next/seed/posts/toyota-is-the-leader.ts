import type { Category, Media, User } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'
import { faker } from '@faker-js/faker'

type toyotaIsTheLeaderPostArgs = {
  heroImage: Media
  author: User
  categories?: Category[]
}

export const toyotaIsTheLeaderPost: (
  args: toyotaIsTheLeaderPostArgs,
) => RequiredDataFromCollectionSlug<'posts'> = ({ heroImage, author, categories }) => {
  return {
    title: 'Toyota is the Leader',
    heroImage,
    content: {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                mode: 'normal',
                text: faker.lorem.paragraph(),
                type: 'text',
                style: '',
                detail: 0,
                format: 0,
                version: 1,
              },
            ],
            direction: null,
            textStyle: '',
            textFormat: 0,
          },
        ],
        direction: null,
      },
    },
    relatedPosts: [],
    categories,
    meta: {
      title: null,
      image: null,
      description: null,
    },
    authors: [author],
    populatedAuthors: [
      {
        id: String(author.id),
        name: author.name,
      },
    ],
    slug: 'toyota-is-the-leader',
    _status: 'published',
  }
}
