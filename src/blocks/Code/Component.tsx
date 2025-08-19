import type { CodeBlock as CodeBlockProps } from '@/payload-types'
import { Code } from './Code'

export const CodeBlock: React.FC<CodeBlockProps & { className?: string }> = ({
  className,
  ...props
}) => {
  return (
    <div className={[className, 'not-prose container mx-auto'].filter(Boolean).join(' ')}>
      <Code {...props} />
    </div>
  )
}
