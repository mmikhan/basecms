'use client'

import { useRowLabel, type RowLabelProps } from '@payloadcms/ui'
import { NavBlock as NavProps } from '@/payload-types'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NavProps['links']>[number]>()

  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data?.data?.link?.label}`
    : 'Row'

  return <div>{label}</div>
}
