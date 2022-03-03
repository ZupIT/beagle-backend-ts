import { DeepExpression, Expression } from '@zup-it/beagle-backend-core'
import { request } from '@zup-it/beagle-backend-core/actions'
import { Order } from '../../models/order'
import { CreateOrderData } from '../../services/order'
import { baseUrl } from '../constants'

interface CreateOrderResponse {
  id: string,
}

interface CreateOrderError {
  error: string,
}

interface CreateOptions {
  data: DeepExpression<CreateOrderData>
}

interface GetByIdOptions {
  id: Expression<string>,
}

export const createOrder = request<CreateOrderResponse, CreateOrderError>()
  .compose(({ data }: CreateOptions) => ({ url: `${baseUrl}/order`, method: 'post', data }))

export const getOrderById = request<Order>()
  .compose(({ id }: GetByIdOptions) => ({ url: `${baseUrl}/order/${id}` }))
