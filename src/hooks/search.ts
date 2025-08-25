import type { Page, Post } from '@/payload-types'
import type { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

type SearchCategory = {
  relationTo: 'categories'
  categoryID: string
  title: string
}

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  // TODO: custom post type
  const { slug, id, categories, title, content, layout, heroImage } = originalDoc as Post & Page

  let descriptionFromContent = ''

  if (collection === 'posts' && content) {
    descriptionFromContent = convertLexicalToPlaintext({ data: content })
  }

  if (collection === 'pages' && layout) {
    const layoutTextPromises = layout.map(async (block) => {
      if (block.blockType === 'content' && block.columns) {
        const columnTextPromises = block.columns.map((col) => {
          if (col.richText) {
            return convertLexicalToPlaintext({ data: col.richText })
          }

          return ''
        })
        const columnTexts = await Promise.all(columnTextPromises)

        return columnTexts.join(' ')
      }

      if (block.blockType === 'highImpactHero' && block.richText) {
        return convertLexicalToPlaintext({ data: block.richText })
      }

      if (block.blockType === 'mediumImpactHero' && block.richText) {
        return convertLexicalToPlaintext({ data: block.richText })
      }

      if (block.blockType === 'lowImpactHero' && block.richText) {
        return convertLexicalToPlaintext({ data: block.richText })
      }

      if (block.blockType === 'cta' && block.richText) {
        return convertLexicalToPlaintext({ data: block.richText })
      }

      if (block.blockType === 'archive' && block.introContent) {
        return convertLexicalToPlaintext({ data: block.introContent })
      }

      if (block.blockType === 'banner' && block.content) {
        return convertLexicalToPlaintext({ data: block.content })
      }

      if (block.blockType === 'code' && block.code) {
        return block.code
      }

      return ''
    })

    const layoutText = (await Promise.all(layoutTextPromises)).join(' ').trim()
    if (layoutText) {
      descriptionFromContent = layoutText
    }
  }

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
          relationTo: 'categories',
          categoryID: String(doc.id),
          title: doc.title,
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
    meta: {
      title,
      image: heroImage,
      description: descriptionFromContent,
    },
    categories: populatedCategories,
  }

  return modifiedDoc
}
