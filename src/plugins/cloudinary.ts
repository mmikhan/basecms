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
      },
    },
  },
})
