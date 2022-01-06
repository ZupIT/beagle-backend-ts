import { Expression } from '..'
import { Operation } from '../model/operation'

export const sum = (...numbers: Expression<number>[]) => new Operation('sum', numbers)
export const subtract = (...numbers: Expression<number>[]) => new Operation('subtract', numbers)
export const multiply = (...numbers: Expression<number>[]) => new Operation('multiply', numbers)
export const divide = (...numbers: Expression<number>[]) => new Operation('divide', numbers)
export const gt = (left: Expression<number>, right: Expression<number>) => new Operation('gt', [left, right])
export const gte = (left: Expression<number>, right: Expression<number>) => new Operation('gte', [left, right])
export const lt = (left: Expression<number>, right: Expression<number>) => new Operation('lt', [left, right])
export const lte = (left: Expression<number>, right: Expression<number>) => new Operation('lte', [left, right])
