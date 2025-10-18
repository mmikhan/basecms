'use client'

import { PopupList } from '@payloadcms/ui'
import type React from 'react'
import { SeedButton } from './SeedButton'

export const Menu: React.FC = () => {
  return (
    <PopupList.ButtonGroup>
      <SeedButton />
    </PopupList.ButtonGroup>
  )
}
