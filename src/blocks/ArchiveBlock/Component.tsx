import type { ArchiveBlock as ArchiveBlockProps, Post } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@/payload.config'
import RichText from '@/components/RichText'
import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<ArchiveBlockProps> = async ({
  id,
  categories,
  introContent,
  limit,
  populateBy,
  selectedDocs,
}) => {
  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: limit ?? 3,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else if (selectedDocs?.length) {
    posts = selectedDocs
      .map(({ value }) => (typeof value === 'object' ? value : null))
      .filter((doc): doc is Post => doc !== null)
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive data={posts} collectionSlug="posts" />
    </div>
  )
}
