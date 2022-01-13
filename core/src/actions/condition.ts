import { Actions } from '../model/action'
import { Expression } from '../types'
import { createCoreAction } from './core-action'

interface ConditionParams {
  condition: Expression<boolean>,
  onTrue?: Actions,
  onFalse?: Actions,
}

export const condition = createCoreAction<ConditionParams>('condition')
