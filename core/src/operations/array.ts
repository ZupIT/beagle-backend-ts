import { Operation } from '../model/operation'
import { DynamicExpression, Expression } from '../types'

type Element<T> = T extends (number | string | boolean) ? Expression<T> : DynamicExpression<T>

/**
 * Creates the Operation "insert", which adds an element to the array at the given index.
 *
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the new element to add
 * @param index the index to insert the element at. If not provided, the element is added to the end of the array.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const insert = <T>(array: DynamicExpression<T[]>, element: Element<T>, index?: Expression<number>) => (
  new Operation<T[]>('insert', index == undefined ? [array, element] : [array, element, index])
)

/**
 * Removes an element from the array.
 *
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the element to remove
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const remove = <T>(array: DynamicExpression<T[]>, element: Element<T>) => (
  new Operation<T[]>('remove', [array, element])
)

/**
 * Removes the element of the array at the given index.
 *
 * The comparisons are done like this:
 *
 * 1. Check if the type is the same;
 * 2. If it's a primitive, just return a == b;
 * 3. If it's a map (object), compare every (key, value) pair, their order doesn't matter.
 * 4. If it's an array, compare all values (the order matters).
 *
 * This performs a deep comparison.
 *
 * The array passed in the parameter is not changed, instead a new array is returned.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param index the position to remove. If not provided, the last element is removed.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const removeIndex = <T>(array: DynamicExpression<T[]>, index?: Expression<number>) => (
  new Operation<T[]>('removeIndex', index == undefined ? [array] : [array, index])
)

/**
 * Checks if the array contains the given element.
 *
 * The comparisons are done like this:
 *
 * 1. Check if the type is the same;
 * 2. If it's a primitive, just return a == b;
 * 3. If it's a map (object), compare every (key, value) pair, their order doesn't matter.
 * 4. If it's an array, compare all values (the order matters).
 *
 * This performs a deep comparison.
 *
 * @param array the ContextNode or Operation referring to the array
 * @param element the element to look for
 * @returns an instance of Operation<boolean>, i.e. an operation that results in a boolean when run by the frontend.
 */
export const contains = <T>(array: DynamicExpression<T[]>, element: Element<T>) => (
  new Operation<boolean>('contains', [array, element])
)

/* The following function will always return any[] despite the type of the arrays passed as parameters. This is not
ideal, but I'm not sure if it's possible to correctly type it. The difficult lies in the fact that it can receive
any number of arrays to unite. */
/**
 * Concatenates a series of arrays in a single array.
 *
 * Example:
 * ```tsx
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
 * The arrays passed in the parameters are not changed, instead a new array is returned.
 *
 * @param arrays the ContextNodes or Operations referring to the arrays.
 * @returns an instance of Operation<Array>, i.e. an operation that results in an Array when run by the frontend.
 */
export const union = (...arrays: DynamicExpression<any[]>[]) => new Operation<any[]>('union', arrays)
