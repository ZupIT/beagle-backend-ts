import { Expression } from '..'
import { ArrayContext } from '../model/context/types'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

export const insert = (array: ArrayContext<any>, element: ValidOperationAttribute, index: Expression<number> = 0) => (
  new Operation('insert', [array, element, index])
)

export const remove = (array: ArrayContext<any>, element: ValidOperationAttribute) => (
  new Operation('remove', [array, element])
)

export const removeIndex = (array: ArrayContext<any>, index: Expression<number> = 0) => (
  new Operation('removeIndex', [array, index])
)

export const contains = (array: ArrayContext<any>, element: ValidOperationAttribute) => (
  new Operation('contains', [array, element])
)

export const union = (...arrays: ArrayContext<any>[]) => new Operation('union', arrays)
