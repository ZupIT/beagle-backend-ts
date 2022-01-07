import { Expression } from '..'
import { Operation } from '../model/operation'

export const sum = (...numbers: Expression<number>[]) => new Operation<number>('sum', numbers)
export const subtract = (...numbers: Expression<number>[]) => new Operation<number>('subtract', numbers)
export const multiply = (...numbers: Expression<number>[]) => new Operation<number>('multiply', numbers)
export const divide = (...numbers: Expression<number>[]) => new Operation<number>('divide', numbers)
export const gt = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('gt', [left, right])
export const gte = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('gte', [left, right])
export const lt = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('lt', [left, right])
export const lte = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('lte', [left, right])
