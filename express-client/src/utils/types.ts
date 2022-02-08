export type IsRequired<T extends object, K extends keyof T> = T extends Record<K, T[K]> ? true : false

export type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N

export type IsAny<T> = IfAny<T, true, never>

export type HasRequiredProperty<T extends object> =
  { [K in keyof T]: IsRequired<T, K> } extends Record<string, false>
    ? false
    : (IsAny<T> extends true ? false : true)
