import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-static'

export default async function PostsArchivePage() {
  const posts = await getCachedPosts()

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <code>{post.id}</code>
          <h2>Title: {post.title}</h2>
          <p>Slug: {post.slug}</p>
        </div>
      ))}
    </div>
  )
}

const getCachedPosts = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
    return result.docs
  },
  ['posts'],
  { tags: ['posts'] },
)
