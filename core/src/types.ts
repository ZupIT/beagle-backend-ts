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

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch'
