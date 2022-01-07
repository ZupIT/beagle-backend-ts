import { ContextNode } from '../context/context-node'
import { ValidOperationAttribute } from './types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Operation<ReturnType = void> {
  constructor(name: string, args: ValidOperationAttribute[]) {
    this.args = args
    this.name = name
  }

  readonly name: string
  readonly args: ValidOperationAttribute[]

  asString(includeDelimiters: boolean): string {
    const argumentsAsStrings = this.args.map(item => {
      if (item instanceof Operation) return item.asString(false)
      if (item instanceof ContextNode) return item.path
      return item ? item.toString() : 'null'
    })
    const expression = `${this.name}(${argumentsAsStrings.join(', ')})`
    return includeDelimiters ? `@{${expression}}` : expression
  }

  toString() {
    return this.asString(true)
  }
}
