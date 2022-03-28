import { getGlobalContext } from '@zup-it/beagle-backend-core'

export interface GlobalContext {
  message?: string,
}

export const globalContext = getGlobalContext<GlobalContext>()
