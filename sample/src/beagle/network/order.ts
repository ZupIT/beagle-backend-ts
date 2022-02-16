import { DeepExpression, Expression } from '@zup-it/beagle-backend-core'
import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'
import { Order } from '../../models/order'
import { CreateOrderData } from '../../services/order'
import { baseUrl } from '../constants'

interface CreateOrderResponse {
  id: string,
}

interface CreateOrderError {
  error: string,
}

type CreateOrderOptions = Omit<SendRequestParams<CreateOrderResponse, CreateOrderError>, 'url' | 'method' | 'data'>
  & { data: DeepExpression<CreateOrderData> }

type GetOrderOptions = Omit<SendRequestParams<Order>, 'url' | 'method'>
  & { id: Expression<string> }

export const createOrder = (
  options: CreateOrderOptions,
) => sendRequest({ url: `${baseUrl}/order`, method: 'post', ...options })

export const getOrderById = (
  { id, ...options }: GetOrderOptions,
) => sendRequest({ url: `${baseUrl}/order/${id}`, ...options })
