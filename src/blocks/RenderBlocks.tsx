import { Page } from '@/payload-types'
import { CallToActionBlock } from './CallToAction/Component'
import { HighImpactHeroBlock } from './heros/HighImpact/Component'

type LayoutBlock = Page['layout'][number]
type BlockType = LayoutBlock['blockType']

// Map each blockType to its component with the correctly narrowed props
type BlockComponentMap = {
  [K in BlockType]?: React.ComponentType<Extract<LayoutBlock, { blockType: K }>>
}

const blockComponents: BlockComponentMap = {
  cta: CallToActionBlock,
  highImpactHero: HighImpactHeroBlock,
}

// Generic helper preserves the specific block subtype
function getBlockComponent<B extends LayoutBlock>(block: B) {
  return blockComponents[block.blockType] as React.ComponentType<B> | undefined
}

export const RenderBlocks: React.FC<{ blocks: LayoutBlock[] }> = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Block = getBlockComponent(block)
        if (!Block) return null

        return <Block key={index} {...block} />
      })}
    </>
  )
}
