import { Expression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions/index'
import { baseUrl } from './constants'

interface TrackingInfo {
  company: string,
  id: string,
  url: string,
}

interface Address {
  zip: string,
  street: string,
  number: string,
  city: string,
  state: string,
  complement: string,
  neighborhood: string,
}

export interface Order {
  id: string,
  date: string
  status: string,
  tracking: TrackingInfo,
  price: number,
  estimatedDeliveryDate: string,
  address: Address,
}

export const getOrderById = (
  id: Expression<string>,
  options: Omit<SendRequestParams<Order>, 'url' | 'method'>,
) => sendRequest<Order>({ url: `${baseUrl}/order/${id}`, ...options })
