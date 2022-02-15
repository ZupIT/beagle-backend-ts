export type IsRequired<T extends object, K extends keyof T> = T extends Record<K, T[K]> ? true : false

export type HasRequiredProperty<T extends object> =
  { [K in keyof T]: IsRequired<T, K> } extends Record<string, false>
    ? false
    : true
