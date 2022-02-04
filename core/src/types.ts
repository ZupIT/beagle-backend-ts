import { AnyContextNode } from './model/context/types'
import { Operation } from './model/operation'

/**
 * A ContextNode or Operation that results in a value of the given generic.
 */
export type DynamicExpression<T> = AnyContextNode<T> | Operation<T>

/**
 * A ContextNode or Operation that results in a value of the given generic. It can also be the value itself.
 */
export type Expression<T> = T | DynamicExpression<T>

/**
 * Same as Expression, but instead of applying it only to the root node of a map, it applies it to the whole map,
 * recursively.
 *
 * Example: if `Name` is `{ first: string, last: string }` and `User` is `{ id: number, name: Name }`,
 * `Expression<User>` is `User | AnyContextNode<User> | Operation<User>`, while `DeepExpression<User>` is
 * `Expression<User> | { id: Expression<number>, name: Expression<Name> | { first: Expression<string>,
 * last: Expression<string> } }`
 */
export type DeepExpression<T> = T extends (number | boolean | string | any[])
  ? Expression<T>
  : (Expression<T> | { [K in keyof T]: DeepExpression<T[K]> })

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch'
