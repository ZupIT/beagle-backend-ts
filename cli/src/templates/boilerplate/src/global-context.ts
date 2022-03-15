import { getGlobalContext } from '@zup-it/beagle-backend-express'

export interface GlobalContext {
  message?: string,
}

export const globalContext = getGlobalContext<GlobalContext>()
