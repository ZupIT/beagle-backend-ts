import { coreNamespace } from '..'
import { Action } from '../model/action'
import { ActionConstructor } from '../model/action/types'

export abstract class CoreAction<Params> extends Action<Params> {
  constructor(params: ActionConstructor<Params>) {
    super(params)
    this.namespace ??= coreNamespace
  }

  namespace
}
