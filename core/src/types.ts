import { AnyContextNode } from './model/context/types'
import { Operation } from './model/operation'

export type DynamicExpression<T> = AnyContextNode<T> | Operation<T>

export type Expression<T> = T | DynamicExpression<T>

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch'
