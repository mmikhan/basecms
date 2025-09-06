import { cloudinaryStorage, commonPresets } from 'payload-storage-cloudinary'

export default cloudinaryStorage({
  cloudConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  collections: {
    media: {
      folder: 'admarket',
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
