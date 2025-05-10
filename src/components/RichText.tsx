import {
  DefaultNodeTypes,
  type DefaultTypedEditorState,
  type SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as ConvertRichText,
  HeadingJSXConverter,
} from '@payloadcms/richtext-lexical/react'
import { cn } from '@/util/cn'
import { Gutter } from './Gutter'
import { QuoteBlockComponent } from '@/blocks/Quote/Component'
import type { ArticleBlock, QuoteBlock } from '@/payload-types'
import { ArticleBlockComponent } from '@/blocks/Article/Component'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<QuoteBlock | ArticleBlock>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ node, nodesToJSX, ...args }) => (
    <Gutter size="sm">
      <p>{nodesToJSX({ ...args, nodes: node.children })}</p>
    </Gutter>
  ),
  heading: (args) => (
    <Gutter className="font-cooper">
      {(HeadingJSXConverter.heading as CallableFunction)(args)}
    </Gutter>
  ),
  blocks: {
    quote: ({ node }) => <QuoteBlockComponent {...node.fields} />,
    article: ({ node }) => <ArticleBlockComponent {...node.fields} />,
  },
})

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState
}

export const RichText = ({ className, ...props }: Props) => {
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        {
          'prose prose-neutral prose-invert max-w-none': true,
        },
        className,
      )}
      {...props}
    />
  )
}
