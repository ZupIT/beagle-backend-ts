import { ContextNode } from '@zup-it/beagle-backend-core'

export class GlobalContext<T> extends ContextNode<T> {
  constructor() {
    super('globalContext')
  }
}
