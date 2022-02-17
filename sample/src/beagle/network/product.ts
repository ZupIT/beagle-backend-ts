import { request } from '@zup-it/beagle-backend-core/actions'
import { Product } from '../../models/product'
import { baseUrl } from '../constants'

export const listProducts = request<Product[]>()
  .compose(() => ({ url: `${baseUrl}/products` }))
