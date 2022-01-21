import { Expression } from '..'
import { Operation } from '../model/operation'

/**
 * Sums all the arguments passed.
 *
 * Example: `sum(a, b, c, d)` results in `a + b + c + d`.
 *
 * @param values the numerical values to sum.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const sum = (...numbers: Expression<number>[]) => new Operation<number>('sum', numbers)

/**
 * Subtracts all the arguments passed.
 *
 * Example: `subtract(a, b, c, d)` results in `a - b - c - d`.
 *
 * @param values the numerical values to subtract.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const subtract = (...numbers: Expression<number>[]) => new Operation<number>('subtract', numbers)

/**
 * Multiplies all the arguments passed.
 *
 * Example: `multiply(a, b, c, d)` results in `a * b * c * d`.
 *
 * @param values the numerical values to multiply.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const multiply = (...numbers: Expression<number>[]) => new Operation<number>('multiply', numbers)

/**
 * Divides all the arguments passed.
 *
 * Example: `divide(a, b, c, d)` results in `a / b / c / d`.
 *
 * @param values the numerical values to divide.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const divide = (...numbers: Expression<number>[]) => new Operation<number>('divide', numbers)

/**
 * Checks if the first argument is greater than the second.
 *
 * Example: `gt(a, b)` results in `a > b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const gt = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('gt', [left, right])

/**
 * Checks if the first argument is greater than or equal to the second.
 *
 * Example: `gte(a, b)` results in `a >= b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const gte = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('gte', [left, right])

/**
 * Checks if the first argument is less than the second.
 *
 * Example: `lt(a, b)` results in `a < b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const lt = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('lt', [left, right])

/**
 * Checks if the first argument is less than or equal to the second.
 *
 * Example: `lte(a, b)` results in `a <= b`.
 *
 * @param left the numerical value at the left side of the operation.
 * @param right the numerical value at the right side of the operation.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const lte = (left: Expression<number>, right: Expression<number>) => new Operation<boolean>('lte', [left, right])
