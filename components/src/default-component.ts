import { Component, coreNamespace, ComponentConstructor } from '@zup-it/beagle-backend-core'
import { StyledComponent } from './style/styled'
import { HasContext, MaybeContext } from './types'

export abstract class DefaultComponent<Props, AcceptsContext extends HasContext = 'with-context'>
  extends Component<Props> {
  constructor(args: MaybeContext<ComponentConstructor<Props>, AcceptsContext>) {
    // as any: the type is correct, I don't understand why TS complains
    super(args as any)
  }

  override namespace = coreNamespace
}

export abstract class DefaultStyledComponent<Props> extends StyledComponent<Props> {
  override namespace = coreNamespace
}
