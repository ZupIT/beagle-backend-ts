import { ContextNode } from '@zup-it/beagle-backend-core'

export class NavigationContext<T> extends ContextNode<T> {
  constructor() {
    super('navigationContext')
  }
}
