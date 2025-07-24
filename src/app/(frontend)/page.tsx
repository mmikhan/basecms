import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Button } from '@/components/ui/button'
import Icon from '@/components/icon'
import Logo from '@/components/logo'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <Logo className="size-10" layout="double" />
        <div className="flex items-center gap-4">
          <Icon className="size-10" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
              AdMarket
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
              Marketplace Platform
            </p>
          </div>
        </div>
        {!user && <h1 className="text-3xl font-bold underline">Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <Button>Get Started</Button>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
