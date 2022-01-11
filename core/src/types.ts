import { Actions } from './model/action'
import { AnyContextNode } from './model/context/types'
import { Operation } from './model/operation'

export type DynamicExpression<T> = AnyContextNode<T> | Operation<T>

export type Expression<T> = T | DynamicExpression<T>

export type ToExpressions<T> = {
  [K in keyof T]: T[K] extends (DynamicExpression<T[K]> | Actions) ? T[K] : Expression<T[K]>
}

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch'
