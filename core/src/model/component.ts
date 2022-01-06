import { lowerFirst } from 'lodash'

export abstract class Component<Params> {
  constructor({ id, ...other }: Params & { id?: string }, children?: Component<any>[]) {
    this.id = id
    this.parameters = other as Params
    this.children = children
    this.name ??= lowerFirst(this.constructor.name)
  }

  abstract namespace: string
  id?: string
  name: string
  children?: Component<any>[]
  parameters: Params
}
