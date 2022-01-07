export interface Accessibility {
  accessibility?: {
    accessible?: boolean,
    accessibilityLabel?: string,
    isHeader?: boolean,
  },
}

export interface Theme {
  styleId?: string,
}

type Contextless<T> = Omit<T, 'context'>

export type HasContext = 'with-context' | 'without-context'

export type MaybeContext<T, AcceptsContext extends HasContext> = AcceptsContext extends 'with-context'
  ? T
  : Contextless<T>
