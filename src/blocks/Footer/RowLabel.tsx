'use client'

import { FooterBlock } from '@/payload-types'
import { useRowLabel, type RowLabelProps } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<FooterBlock['links']>[number]>()

  const label = data?.data?.link?.label
    ? `Footer item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
