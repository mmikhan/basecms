import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { Plugin } from 'payload'
import redirects from './redirects'

export const plugins: Plugin[] = [payloadCloudPlugin(), redirects]
