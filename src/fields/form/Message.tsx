import React from 'react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Width } from './Width'
import RichText from '@/components/RichText'

export const Message: React.FC<{ message: SerializedEditorState }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  )
}
