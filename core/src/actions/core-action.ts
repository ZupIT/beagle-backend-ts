import { coreNamespace } from '../constants'
import { Action, ActionInterface } from '../model/action'

export class CoreAction<Props> extends Action<Props> {
  constructor(args: Omit<ActionInterface, 'namespace'>) {
    super({ ...args, namespace: coreNamespace })
  }
}
