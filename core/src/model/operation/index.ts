import { ValidOperationAttribute } from './types'

export class Operation {
  constructor(name: string, args: ValidOperationAttribute[]) {
    this.args = args
    this.name = name
  }

  readonly name: string
  readonly args: ValidOperationAttribute[]
}
