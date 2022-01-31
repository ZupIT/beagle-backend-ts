type HasNonNullableProp = 'has_non_nullable_prop'
type CheckTypeHasNonNullableProps<T> = {
  [K in keyof T]: undefined extends T[K]
  ? undefined
  : null extends T[K]
    ? undefined
    : unknown extends T[K]
      ? undefined
      : HasNonNullableProp
}[keyof T]

export type TypeHasNonNullableProps<T> = (
  CheckTypeHasNonNullableProps<T> extends undefined
  ? (CheckTypeHasNonNullableProps<T> extends HasNonNullableProp ? true : false)
  : true
)

export type KeysOfType<O, T> = { [K in keyof O]: T extends O[K] ? K : never}[keyof O]

export type OptionalKeys<T> = Partial<Pick<T, KeysOfType<T, undefined>>>

export type RequiredKeys<T> = Omit<T, KeysOfType<T, undefined>>

export type UndefinedOptional<T> = OptionalKeys<T> & RequiredKeys<T>

export type Merge<T, N> = UndefinedOptional<{
  [K in (keyof T | keyof N)]: K extends keyof T ? T[K] : K extends keyof N ? N[K] : never
}>
