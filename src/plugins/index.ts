import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { Plugin } from 'payload'
import redirects from './redirects'
import seo from './seo'
import nestedDocs from './nestedDocs'

export const plugins: Plugin[] = [payloadCloudPlugin(), redirects, seo, nestedDocs]
