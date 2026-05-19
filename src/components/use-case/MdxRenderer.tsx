import * as runtime from 'react/jsx-runtime'
import { PromptBlock } from './PromptBlock'
import { SealInline } from '@/components/design/Seal'

const sharedComponents = {
  PromptBlock,
  Seal: SealInline,
}

const useMDXComponent = (code: string) => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

interface MdxRendererProps {
  code: string
  components?: Record<string, React.ComponentType<unknown>>
}

/**
 * Renders Velite-compiled MDX with our 副刊 components in scope.
 */
export function MdxRenderer({ code, components }: MdxRendererProps) {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
