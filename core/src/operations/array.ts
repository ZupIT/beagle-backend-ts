import { Operation } from '../model/operation'
import { DynamicExpression, Expression } from '../types'

type Element<T> = T extends (number | string | boolean) ? Expression<T> : DynamicExpression<T>

/**
 * Creates the Operation "insert", which adds an element to the array at the given index.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the new element to add
 * @param index the index to insert the element at. 0 if not provided.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const insert = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
  index?: Expression<number>,
) => new Operation<ArrayType>('insert', [array, element, index])

/**
 * Removes an element from the array.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the element to remove
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const remove = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
) => new Operation<ArrayType>('remove', [array, element])

/**
 * Removes the element of the array at the given index.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param index the position to remove
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const removeIndex = <ArrayType extends any[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  index?: Expression<number>,
) => new Operation<ArrayType>('removeIndex', [array, index])

/**
 * Checks if the array contains the given element.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the element to look for
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const contains = <Type, ArrayType extends Type[], ExpressionType extends DynamicExpression<ArrayType>>(
  array: ExpressionType,
  element: Element<Type>,
) => new Operation<boolean>('contains', [array, element])

/* The following function will always return any[] despite the type of the arrays passed as parameters. This is not
ideal, but I'm not sure if it's possible to correctly type it. The difficult lies in the fact that it can receive
any number of arrays to unite. */
/**
 * Concatenates a series of arrays in a single array.
 *
 * Example:
 * ```
 * const myArrays = createContext('myArrays', {
 *   array1: [1, 2, 3],
 *   array2: [4, 5, 6],
 *   array3: [7, 8, 9],
 * })
 *
 * const MyScreen = () => (
 *   <Text>
 *     {union(myArrays.get('array1'), myArrays.get('array2'), myArrays.get('array3'))}
 *   </Text>
 * )
 * ```
 *
 * The screen created in the code above would print "[1, 2, 3, 4, 5, 6, 7, 8, 9]".
 *
 * @param arrays the ContextNodes or Operations referring to the arrays.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const union = (...arrays: DynamicExpression<any[]>[]) => new Operation<any[]>('union', arrays)
