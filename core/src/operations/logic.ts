import { Expression } from '..'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

export const condition = (
  premise: Expression<boolean>,
  ifTrue: ValidOperationAttribute,
  otherwise: ValidOperationAttribute,
) => new Operation('condition', [premise, ifTrue, otherwise])

export const not = (value: Expression<boolean>) => new Operation('not', [value])
export const and = (...values: Expression<boolean>[]) => new Operation('and', values)
export const or = (...values: Expression<boolean>[]) => new Operation('or', values)
