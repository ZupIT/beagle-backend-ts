import { Actions } from '../model/action'
import { DynamicExpression } from '../types'
import { createCoreAction } from './core-action'

export interface ConditionalActionParams {
  /**
   * The condition to verify.
   */
  condition: DynamicExpression<boolean>,
  /**
   * The actions to run if the condition turns out to be true.
   */
  onTrue?: Actions,
  /**
   * The actions to run if the condition turns out to be false.
   */
  onFalse?: Actions,
}

/**
 * Runs a set of actions depending on the value of "condition", which is a value based on a Context or an Operation.
 *
 * @category Actions
 * @param params the action parameters: condition, onTrue and onFalse. See {@link ConditionalActionParams}.
 * @returns an instance of Action
 */
export const conditionalAction = createCoreAction<ConditionalActionParams>('condition')
