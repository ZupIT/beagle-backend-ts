import { Component, ComponentConstructor } from '@zup-it/beagle-backend-core'
import { HasContext, MaybeContext } from '../types'
import { fromSimpleStyle } from './converter'
import { Style } from './original-styles'
import { SimpleStyle } from './simple-styles'

type StyledProps<T> = T & { style?: Style }
type StyledConstructor<Props> = ComponentConstructor<Props> & { style?: SimpleStyle }

export abstract class StyledComponent<Props, AcceptsContext extends HasContext = 'with-context'>
  extends Component<StyledProps<Props>> {
  constructor(args: MaybeContext<StyledConstructor<StyledProps<Props>>, AcceptsContext>) {
    const style = fromSimpleStyle(args.style)
    const allProperties = { style, ...args.properties }
    // as any: the type is correct, I don't understand why TS complains
    super({
      id: args.id,
      properties: allProperties,
      children: args.children,
      context: (args as StyledConstructor<Props>).context,
    } as any)
  }
}
