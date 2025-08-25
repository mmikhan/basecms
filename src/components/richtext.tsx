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
  CallToActionBlock as CTABlockProps,
  HighImpactHero as HighImpactHeroBlockProps,
  MediumImpactHero as MediumImpactHeroBlockProps,
  LowImpactHero as LowImpactHeroBlockProps,
  ContentBlock as ContentBlockProps,
  MediaBlock as MediaBlockProps,
  CodeBlock as CodeBlockProps,
  BannerBlock as BannerBlockProps,
  NavBlock as NavBlockProps,
  FooterBlock as FooterBlockProps,
  ArchiveBlock as ArchiveBlockProps,
} from '@/payload-types'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/lib/utils'
import { HighImpactHeroBlock } from '@/blocks/heros/HighImpact/Component'
import { MediumImpactHeroBlock } from '@/blocks/heros/MediumImpact/Component'
import { LowImpactHeroBlock } from '@/blocks/heros/LowImpact/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { NavBlock } from '@/blocks/Nav/Component'
import { FooterBlockComponent } from '@/blocks/Footer/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'

// Extend the default node types with your custom blocks for full type safety
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CTABlockProps>

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
    cta: ({ node }: { node: SerializedBlockNode<CTABlockProps> }) => (
      <CallToActionBlock {...node.fields} />
    ),
    highImpactHero: ({ node }: { node: SerializedBlockNode<HighImpactHeroBlockProps> }) => (
      <HighImpactHeroBlock {...node.fields} />
    ),
    mediumImpactHero: ({ node }: { node: SerializedBlockNode<MediumImpactHeroBlockProps> }) => (
      <MediumImpactHeroBlock {...node.fields} />
    ),
    lowImpactHero: ({ node }: { node: SerializedBlockNode<LowImpactHeroBlockProps> }) => (
      <LowImpactHeroBlock {...node.fields} />
    ),
    content: ({ node }: { node: SerializedBlockNode<ContentBlockProps> }) => (
      <ContentBlock {...node.fields} />
    ),
    mediaBlock: ({ node }: { node: SerializedBlockNode<MediaBlockProps> }) => (
      <MediaBlock {...node.fields} />
    ),
    code: ({ node }: { node: SerializedBlockNode<CodeBlockProps> }) => (
      <CodeBlock {...node.fields} />
    ),
    banner: ({ node }: { node: SerializedBlockNode<BannerBlockProps> }) => (
      <BannerBlock {...node.fields} />
    ),
    nav: ({ node }: { node: SerializedBlockNode<NavBlockProps> }) => <NavBlock {...node.fields} />,
    footerBlock: ({ node }: { node: SerializedBlockNode<FooterBlockProps> }) => (
      <FooterBlockComponent {...node.fields} />
    ),
    archiveBlock: ({ node }: { node: SerializedBlockNode<ArchiveBlockProps> }) => (
      <ArchiveBlock {...node.fields} />
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
