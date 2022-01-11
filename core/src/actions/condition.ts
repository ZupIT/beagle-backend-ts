import { Actions } from '../model/action'
import { createCoreAction } from './core-action'

interface ConditionParams {
  condition: boolean,
  onTrue?: Actions,
  onFalse?: Actions,
}

export const condition = createCoreAction<ConditionParams>('condition')
