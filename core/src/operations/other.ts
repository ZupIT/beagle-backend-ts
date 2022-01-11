import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

export const isNull = (value: ValidOperationAttribute) => new Operation<boolean>('isNull', [value])
export const isEmpty = (value: ValidOperationAttribute) => new Operation<boolean>('isEmpty', [value])
export const length = (value: ValidOperationAttribute) => new Operation<boolean>('length', [value])
