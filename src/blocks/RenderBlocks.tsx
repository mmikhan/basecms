import { Page } from '@/payload-types'
import { CallToActionBlock } from './CallToAction/Component'

const blockComponents = {
  cta: CallToActionBlock,
}

export const RenderBlocks: React.FC<{ blocks: Page['layout'][number][] }> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            return <Block key={index} {...block} />
          }

          return null
        })}
      </>
    )
  }

  return null
}
