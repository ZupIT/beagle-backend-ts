import { ContextNode } from './context-node'

export class RootContext<T> extends ContextNode<T> {
  constructor(id: string, value?: T) {
    super(id)
    this.value = value
  }

  readonly value?: T
}
