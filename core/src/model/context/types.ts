import { RootContext } from './root-context'
import { ContextNode } from './context-node'

type Primitive = string | boolean | number

// any node

export type PrimitiveContextNode<T> = Omit<ContextNode<T>, 'get' | 'at'>

export type MapContextNode<T> = PrimitiveContextNode<T> & {
  get<K extends keyof T>(key: K): AnyContextNode<T[K]>,
}

export type ArrayContextNode<T> = PrimitiveContextNode<T> & {
  at<I extends number>(index: I): T extends any[] ? AnyContextNode<T[I]> : never,
}

export type AnyContextNode<T> = T extends Primitive ? PrimitiveContextNode<T> : (
  T extends any[] ? ArrayContextNode<T> : MapContextNode<T>
)

// root node

type PrimitiveRootContext<T> = Omit<RootContext<T>, 'get' | 'at'>

type MapRootContext<T> = PrimitiveRootContext<T> & {
  get: MapContextNode<T>['get'],
}

type ArrayRootContext<T> = PrimitiveRootContext<T> & {
  at: ArrayContextNode<T>['at'],
}

export type AnyRootContext<T> = T extends Primitive ? PrimitiveRootContext<T> : (
  T extends any[] ? ArrayRootContext<T> : MapRootContext<T>
)
