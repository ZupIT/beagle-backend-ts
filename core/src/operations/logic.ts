import { Expression } from '../types'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

/**
 * If the first parameter resolves to true, the second parameter is returned. Otherwise, the third parameter is
 * returned.
 *
 * @param premise the condition to verify
 * @param ifTrue the value to return if the premise resolves to true
 * @param otherwise the value to return if the premise resolves to false
 * @returns an instance of Operation<typeof ifTrue | typeof otherwise>, i.e. an operation that results in ifTrue or
 * ifFalse when run by the frontend.
 */
export const condition = <WhenTrue extends ValidOperationAttribute, WhenFalse extends ValidOperationAttribute>(
  premise: Expression<boolean>,
  ifTrue: WhenTrue,
  otherwise: WhenFalse,
) => new Operation<WhenTrue | WhenFalse>('condition', [premise, ifTrue, otherwise])

/**
 * Negates a boolean expression.
 *
 * @param value the boolean expression to negate
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const not = (value: Expression<boolean>) => new Operation<boolean>('not', [value])

/**
 * Applies the logic operator "and" between every argument passed.
 *
 * Example: `and(a, b, c, d)` results in `a and b and c and d`.
 *
 * @param values the boolean values to join.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const and = (...values: Expression<boolean>[]) => new Operation<boolean>('and', values)

/**
 * Applies the logic operator "or" between every argument passed.
 *
 * Example: `or(a, b, c, d)` results in `a or b or c or d`.
 *
 * @param values the boolean values to disjoin.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const or = (...values: Expression<boolean>[]) => new Operation<boolean>('or', values)
