'use client'

import { Button } from '@/components/ui/button'
import type { CodeBlock } from '@/payload-types'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { Highlight, themes } from 'prism-react-renderer'
import { useState } from 'react'

export const Code: React.FC<CodeBlock> = ({ code, language = '' }) => {
  const [text, setText] = useState('Copy')

  const updateCopyStatus = () => {
    if (text === 'Copied!') return

    setText('Copied!')
    setTimeout(() => setText('Copy'), 2000)
  }

  return (
    <Highlight code={code} language={language ?? 'typescript'} theme={themes.vsDark}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="bg-black p-4 border text-xs border-border rounded overflow-x-auto">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: 'table-row', line })}>
              <span className="table-cell select-none text-right text-white/25">{i + 1}</span>
              <span className="table-cell pl-4">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <div className="flex justify-end align-middle">
            <Button
              className="flex gap-1"
              variant={'secondary'}
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(code)
                updateCopyStatus()
              }}
            >
              <p>{text}</p>
              <CopyIcon />
            </Button>
          </div>
        </pre>
      )}
    </Highlight>
  )
}
