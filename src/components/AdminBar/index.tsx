'use client'

import React, { useCallback, useState } from 'react'
import {
  PayloadAdminBar,
  type PayloadAdminBarProps,
  type PayloadMeUser,
} from '@payloadcms/admin-bar'
import { cn } from '@/lib/utils'
import { getClientSideURL } from '@/lib/getURL'
import { useRouter, useSelectedLayoutSegments } from 'next/navigation'
import './index.scss'

// TODO: custom post types. i.e. posts, projects
const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{ adminBarProps?: PayloadAdminBarProps }> = ({ adminBarProps }) => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const segments = useSelectedLayoutSegments()
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels

  const onAuthChange = useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <div
      className={cn('admin-bar', 'py-2 bg-black text-white z-10', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container mx-auto">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          collectionSlug={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
