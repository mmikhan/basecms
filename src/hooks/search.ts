import type { Post } from '@/payload-types'
import type { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

type SearchCategory = {
  id: string
  title: string
  relation: 'categories'
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  // TODO: custom post type
  const { slug, id, categories, content, heroImage } = originalDoc as Post

  const populatedCategories: SearchCategory[] = []

  if (categories && Array.isArray(categories) && categories.length > 0) {
    for (const category of categories) {
      if (!category) continue

      const categoryId = typeof category === 'object' ? category.id : category

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: categoryId,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc) {
        populatedCategories.push({
          id: String(doc.id),
          title: doc.title,
          relation: 'categories',
        })
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }
  }

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    content: convertLexicalToPlaintext({ data: content }),
    heroImage,
    type: collection,
    categories: populatedCategories,
  }

  return modifiedDoc
}
