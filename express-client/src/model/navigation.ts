import { ScreenRequest } from '..'
import { Merge, TypeHasNonNullableProps } from '../utils/types'

export type NavigationProperties<T extends ScreenRequest, N> =
  TypeHasNonNullableProps<T> extends true ? [Merge<T, N>] : [Merge<T, N>?]
