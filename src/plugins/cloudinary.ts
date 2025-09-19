import type { Media } from '@/payload-types'
import type { PayloadRequest } from 'payload'
import { cloudinaryStorage, commonPresets } from 'payload-storage-cloudinary'

export default cloudinaryStorage({
  cloudConfig: {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  collections: {
    media: {
      folder: {
        path: 'admarket',
        enableDynamic: true,
        fieldName: 'cloudinaryFolder',
        skipFieldCreation: true,
      },
      transformations: {
        default: {
          quality: 'auto',
          fetch_format: 'auto',
        },
        presets: commonPresets,
        preserveOriginal: true,
        enablePresetSelection: true,
        publicTransformation: {
          enabled: true,
          fieldName: 'enablePublicPreview',
          typeFieldName: 'transformationType',
          watermark: {
            textFieldName: 'watermarkText',
            defaultText: 'PREVIEW',
            style: {
              fontFamily: 'Verdana',
              fontSize: 50,
              fontWeight: 'bold',
              letterSpacing: 15,
              color: 'rgb:808080',
              opacity: 50,
              angle: -45,
              position: 'center',
            },
          },
          blur: {
            effect: 'blur:2000',
            quality: 30,
            width: 600,
            height: 600,
          },
        },
      },
      uploadQueue: {
        enabled: true,
        maxConcurrentUploads: 3,
        enableChunkedUploads: true,
        largeFileThreshold: 100,
        chunkSize: 20,
      },
      privateFiles: {
        enabled: true,
        expiresIn: 7200,
        authTypes: ['upload', 'authenticated'],
        includeTransformations: true,
        customAuthCheck: (req: PayloadRequest, doc: Media) => {
          return !!req.user || !doc.isPrivate
        },
      },
    },
  },
})
