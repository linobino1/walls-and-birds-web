import type { Page } from '@/payload-types'
import { RichText } from '@/components/RichText'
import React from 'react'
import { RawHTMLBlockComponent } from './RawHTML/Component'
import { GalleryBlockComponent } from './Gallery/Component'

type Block = NonNullable<Page['blocks']>[number]

type BlockProps = React.HTMLAttributes<HTMLDivElement> & {
  block: Block
}

const RenderBlock: React.FC<BlockProps> = ({ block }) => {
  switch (block.blockType) {
    case 'content':
      return <RichText data={block.richText} />

    case 'html':
      return <RawHTMLBlockComponent {...block} />

    case 'gallery':
      return <GalleryBlockComponent {...block} />

    default:
      // @ts-expect-error if all types are implemented, this is not possible...
      return <p>{`unimplemented block type ${block.blockType}`}</p>
  }
}

export interface BlocksProps extends React.HTMLAttributes<HTMLDivElement> {
  blocks: Block[]
}

export const RenderBlocks: React.FC<BlocksProps> = ({ blocks, ...props }) => {
  if (!Array.isArray(blocks)) return null
  return (
    <div {...props}>
      {blocks.map((block, index) => (
        <RenderBlock key={index} block={block} />
      ))}
    </div>
  )
}
