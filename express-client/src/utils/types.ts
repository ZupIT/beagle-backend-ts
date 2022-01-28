type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type PickPropertyType<T, Prop extends keyof T> = T[Prop]

type HasNonNullable = 'HAS_NON_NULLABLE'

type UndefinedOrNever<T> = {
  [P in keyof T]: undefined extends T[P] ? undefined : null extends T[P] ? undefined : HasNonNullable;
}[keyof T]

export type RequirePropertyWhenRequired<T, K extends string> =
  undefined extends PickPropertyType<T & Record<string, unknown>, K>
  ? Optional<T & Record<string, unknown>, K>
  : null extends PickPropertyType<T & Record<string, unknown>, K>
    ? Optional<T & Record<string, unknown>, K> : T

export type RequireWhenAnyPropRequired<T> = HasNonNullable extends UndefinedOrNever<T> ? T : T | undefined


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface Person {
  name: string,
  hometown: string,
  nickname: string,
}

type MakePersonInput = PartialBy<Person, 'nickname'>
