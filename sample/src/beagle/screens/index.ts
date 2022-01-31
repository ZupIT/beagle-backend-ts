import { RouteMap } from '@zup-it/beagle-backend-express'
import { Test } from './other/test'
import { Welcome } from './other/welcome'
import { Products } from './products'
import { Product } from './product'
import { Order } from './order'
import { Cart } from './cart'
import { Address } from './address'
import { Payment } from './payment'

export const routes: RouteMap = {
  '/products': Products,
  '/product': Product,
  '/cart': Cart,
  '/address': Address,
  '/payment': Payment,
  '/order/:id': Order,
  '/test': Test,
  '/welcome': Welcome,
}
