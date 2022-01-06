import { AnyContext } from './model/context/types'

export type Expression<T> = T | AnyContext<T>

export type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'patch'
