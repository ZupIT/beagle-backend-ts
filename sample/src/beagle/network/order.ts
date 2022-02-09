import { sendRequest, SendRequestParams } from '@zup-it/beagle-backend-core/actions'

interface OrderApiResponse {
  id: number,
}

export const createOrder = (
  options: Omit<SendRequestParams<OrderApiResponse>, 'url' | 'method'>,
) => sendRequest<OrderApiResponse>({ url: `http://localhost:3000/order`, method: 'post', ...options })
