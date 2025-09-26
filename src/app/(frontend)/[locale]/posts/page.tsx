import type { Metadata } from 'next'
import { PostsArchive } from '@/components/PostsArchive'

export default async function PostsArchivePage() {
  return <PostsArchive page={1} />
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Posts',
    description: 'A list of all posts on this site.',
    openGraph: {
      title: 'Posts Archive',
      description: 'A list of all posts on this site.',
      url: '/posts',
      type: 'website',
      siteName: 'AdMarket',
      images: [{ url: '/website-template-OG.webp' }],
    },
  }
}
