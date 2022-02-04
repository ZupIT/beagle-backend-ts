import { DynamicExpression, Expression } from '..'
import { Operation } from '../model/operation'
import { ValidOperationAttribute } from '../model/operation/types'

type StringOrArray = DynamicExpression<any[]> | Expression<string> | Expression<null> | Expression<undefined>
type StringArrayOrMap = StringOrArray | DynamicExpression<Record<string, any>>

/**
 * Checks if the argument is null. In web platforms it also checks for undefined.
 *
 * @param value the value to check.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const isNull = (value: ValidOperationAttribute) => new Operation<boolean>('isNull', [value])

/**
 * Checks if the argument is empty.
 *
 * A map is empty if it has no keys.
 * A list is empty if it has no elements.
 * A string is empty if it has no characters.
 * Null is always empty. In web platforms, undefined is also empty.
 *
 * @param value the value to check.
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const isEmpty = (value: StringArrayOrMap) => new Operation<boolean>('isEmpty', [value])

/**
 * Gets the length of the array or string.
 *
 * @param value the value to get length from.
 * @returns an instance of Operation<number>, i.e. an operation that results in a number when run by the frontend.
 */
export const length = (value: StringOrArray) => new Operation<number>('length', [value])
