import { Expression } from '..'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

export const condition = (
  premise: Expression<boolean>,
  ifTrue: ValidOperationAttribute,
  otherwise: ValidOperationAttribute,
) => new Operation<boolean>('condition', [premise, ifTrue, otherwise])

export const not = (value: Expression<boolean>) => new Operation<boolean>('not', [value])
export const and = (...values: Expression<boolean>[]) => new Operation<boolean>('and', values)
export const or = (...values: Expression<boolean>[]) => new Operation<boolean>('or', values)
