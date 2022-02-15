import { DeepExpression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'
import { CreateOrderData } from '../../services/order'
import { baseUrl } from '../constants'

interface OrderApiResponse {
  id: string,
}

interface OrderApiError {
  error: string,
}

type CreateOrderOptions = Omit<SendRequestParams<OrderApiResponse, OrderApiError>, 'url' | 'method' | 'data'>
  & { data: DeepExpression<CreateOrderData> }

export const createOrder = (
  options: CreateOrderOptions,
) => sendRequest({ url: `${baseUrl}/order`, method: 'post', ...options })
