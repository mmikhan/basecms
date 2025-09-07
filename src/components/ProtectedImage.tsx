'use client'

import React, { useState, useEffect } from 'react'
import {
  fetchSignedURL,
  requiresSignedURL,
  createPrivateImageComponent,
} from 'payload-storage-cloudinary/client'
import type { CollectionSlug } from 'payload'
import type { Media } from '@/payload-types'
import { NextImage } from './NextImage'
import { ImageMedia } from './Media/Image'

const PrivateImage = createPrivateImageComponent(React)

export function BasicImage({ media }: { media: Media }) {
  if (!media) return <div>no media</div>

  return (
    <div>
      <PrivateImage
        doc={media}
        collection={'media'}
        alt={media.alt || 'Private image'}
        className="w-full max-w-md"
        fallback={<div>Loading...</div>}
      />
    </div>
  )
}

export function PremiumImage({ media }: { media: Media }) {
  if (!media.isPrivate) {
    // Public file - use normal URL
    return (
      <ImageMedia
        src={media.url ?? ''}
        alt={media.alt ?? ''}
        width={media.width ?? 0}
        height={media.height ?? 0}
      />
    )
  }

  if (media.enablePublicPreview && media.previewUrl) {
    // Show watermarked/blurred preview
    return (
      <ImageMedia
        src={media.previewUrl}
        alt={`${media.alt} - Preview`}
        width={media.width ?? 0}
        height={media.height ?? 0}
      />
    )
  }

  // No public preview available
  return <div>This image requires authentication</div>
}

export function ProtectedImage({
  doc,
  collection = 'media',
}: {
  doc: Media
  collection?: CollectionSlug
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadImage() {
      // Check if this image needs a signed URL
      if (!requiresSignedURL(doc)) {
        setImageUrl(doc.url!)
        return
      }

      setLoading(true)
      try {
        const url = await fetchSignedURL(collection, doc.id.toString())
        setImageUrl(url)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    loadImage()
  }, [doc, collection])

  if (loading) return <div>Loading...</div>
  if (error) return <div>You&apos;re not authorized to see this content</div>
  if (!imageUrl) return null

  return (
    <NextImage
      cloudinaryPublicId={doc.cloudinaryPublicId}
      cloudinaryVersion={doc.cloudinaryVersion}
      alt={doc.alt ?? ''}
      width={doc.width}
      height={doc.height}
    />
  )
}
