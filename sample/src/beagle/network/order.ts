import { Expression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'
import { Order, PaymentCard } from '../../models/order'
import { baseUrl } from '../constants'

interface OrderApiResponse {
  id: number,
}

export const createOrder = (
  order: Expression<Order>,
  payment: Expression<PaymentCard>,
  options: Omit<SendRequestParams<OrderApiResponse>, 'url' | 'method' | 'data'>,
) => sendRequest<OrderApiResponse>({ url: `${baseUrl}/order`, method: 'post', data: { order, payment }, ...options })
