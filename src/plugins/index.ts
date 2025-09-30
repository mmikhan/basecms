import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { Plugin } from 'payload'
import redirects from './redirects'
import seo from './seo'
import nestedDocs from './nestedDocs'
import search from './search'
import formBuilder from './formBuilder'
import stripe from './stripe'
import cloudinary from './cloudinary'
import importExport from './importExport'

export const plugins: Plugin[] = [
  payloadCloudPlugin(),
  redirects,
  seo,
  stripe,
  nestedDocs,
  search,
  formBuilder,
  cloudinary,
  importExport,
]
