import { Expression } from '..'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

export const condition = <WhenTrue extends ValidOperationAttribute, WhenFalse extends ValidOperationAttribute>(
  premise: Expression<boolean>,
  ifTrue: WhenTrue,
  otherwise: WhenFalse,
) => new Operation<WhenTrue | WhenFalse>('condition', [premise, ifTrue, otherwise])

export const not = (value: Expression<boolean>) => new Operation<boolean>('not', [value])
export const and = (...values: Expression<boolean>[]) => new Operation<boolean>('and', values)
export const or = (...values: Expression<boolean>[]) => new Operation<boolean>('or', values)
