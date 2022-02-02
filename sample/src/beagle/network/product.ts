import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'
import { Product } from '../../models/product'
import { baseUrl } from '../constants'

export const listProducts = (options: Omit<SendRequestParams<Product[]>, 'url' | 'method'>) => (
  sendRequest<Product[]>({ url: `${baseUrl}/products`, ...options })
)
