import { AnyContext } from './types'
import { Context } from './context'

export function createContext<T>(path: string, value?: T): AnyContext<T> {
  return new Context<T>(path, value) as any
}
