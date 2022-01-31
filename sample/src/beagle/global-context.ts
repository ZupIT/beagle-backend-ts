import { getGlobalContext } from '@zup-it/beagle-backend-express'
import { Product } from '../models/product'

export interface GlobalContext {
  cart: Product[]
}

export const globalContext = getGlobalContext<GlobalContext>()
