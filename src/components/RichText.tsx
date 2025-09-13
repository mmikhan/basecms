import {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import {
  MediaBlock as MediaBlockProps,
  CodeBlock as CodeBlockProps,
  BannerBlock as BannerBlockProps,
} from '@/payload-types'
import { cn } from '@/lib/utils'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'

// Extend the default node types with your custom blocks for full type safety
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | CodeBlockProps | BannerBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  switch (relationTo) {
    case 'posts':
      return `/posts/${slug}`
    case 'categories':
      return `/category/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
      <MediaBlock {...node.fields} />
    ),
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock {...node.fields} />
    ),
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
      <BannerBlock {...node.fields} />
    ),
  },
})

type RichTextProps = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText({
  className,
  enableGutter = true,
  enableProse = true,
  ...rest
}: RichTextProps) {
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
