import { RootContext } from './root-context'
import { ContextNode } from './context-node'

type Primitive = string | boolean | number

// any node

/**
 * An instance of ContextNode<T> where T is a string, number or boolean.
 */
export type PrimitiveContextNode<T> = Omit<ContextNode<T>, 'get' | 'at'>

/**
 * An instance of ContextNode<T> where T is a map. Its fields can be accessed via the method "get".
 */
export type MapContextNode<T> = PrimitiveContextNode<T> & {
  /**
   * Gets a reference to the value of the property `key` in this MapContextNode.
   *
   * @param key the key of the property to get a reference to
   * @returns the ContextNode that refers to the value at the given key
   */
  get<K extends keyof T>(key: K): AnyContextNode<T[K]>,
}

/**
 * An instance of ContextNode<T> where T is an array. Its positions can be accessed via the method "at".
 */
export type ArrayContextNode<T> = PrimitiveContextNode<T> & {
  /**
   * Gets a reference to the value of this ArrayContextNode at the given position.
   *
   * @param index the position in the array
   * @returns the ContextNode that refers to the position at index
   */
  at<I extends number>(index: I): T extends any[] ? AnyContextNode<T[I]> : never,
}

/**
 * This type helper correctly identifies the type of ContextNode<T> and returns the appropriate type of
 * {@link ContextNode}.
 */
// The brackets in the line below are important to prevent TS from applying a distributive operation.
export type AnyContextNode<T> = [T] extends [Primitive] ? PrimitiveContextNode<T> : (
  T extends any[] ? ArrayContextNode<T> : MapContextNode<T>
)

// root node

/**
 * An instance of RootContext<T> where T is a string, number or boolean.
 */
type PrimitiveRootContext<T> = Omit<RootContext<T>, 'get' | 'at'>

/**
 * An instance of RootContext<T> where T is a map. Its fields can be accessed via the method "get".
 */
type MapRootContext<T> = PrimitiveRootContext<T> & {
  get: MapContextNode<T>['get'],
}

/**
 * An instance of RootContext<T> where T is an array. Its positions can be accessed via the method "at".
 */
type ArrayRootContext<T> = PrimitiveRootContext<T> & {
  at: ArrayContextNode<T>['at'],
}

/**
 * This type helper correctly identifies the type of RootContext<T> and returns the appropriate type of
 * {@link RootContext}.
 */
export type AnyRootContext<T> = T extends Primitive ? PrimitiveRootContext<T> : (
  T extends any[] ? ArrayRootContext<T> : MapRootContext<T>
)
