type Primitive = string | boolean | number

export type AnyContext<T> = T extends Primitive ? PrimitiveContext<T> : (
  T extends any[] ? ArrayContext<T> : MapContext<T>
)

export interface PrimitiveContext<T> {
  toString(): string,
  set(value: T): void,
}

export interface MapContext<T> extends PrimitiveContext<T> {
  get<K extends keyof T>(key: K): AnyContext<T[K]>,
}

export interface ArrayContext<T> extends PrimitiveContext<T> {
  at<I extends number>(index: I): T extends any[] ? AnyContext<T[I]> : never,
}
