import { getGlobalContext } from '@zup-it/beagle-backend-core'
import { Product } from '../models/product'

export interface GlobalContext {
  cart: Product[]
}

export const globalContext = getGlobalContext<GlobalContext>()
