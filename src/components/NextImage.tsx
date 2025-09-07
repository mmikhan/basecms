'use client'

import { Media } from '@/payload-types'
import Image, { ImageProps } from 'next/image'

const cloudinaryLoader = ({
  src,
  width,
  quality,
}: Pick<ImageProps, 'src' | 'width' | 'quality'>) => {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]

  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${params.join(',')}/${src}`
}

export const NextImage = ({
  cloudinaryVersion,
  cloudinaryPublicId,
  alt,
  width,
  height,
}: Pick<Media, 'cloudinaryVersion' | 'cloudinaryPublicId' | 'alt' | 'width' | 'height'>) => {
  return (
    <Image
      loader={cloudinaryLoader}
      src={`v${cloudinaryVersion}/${cloudinaryPublicId}`}
      alt={alt ?? ''}
      width={width ?? 800}
      height={height ?? 600}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    />
  )
}
