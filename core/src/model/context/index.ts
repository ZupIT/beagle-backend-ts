import { AnyRootContext } from './types'
import { RootContext } from './root-context'

export function createContext<T>(id: string, value?: T): AnyRootContext<T> {
  return new RootContext<T>(id, value) as any
}
