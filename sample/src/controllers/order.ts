import { Request, Response } from 'express'
import { createOrder, CreateOrderData, getOrderById } from '../services/order'

export async function createOrderController(
  request: Request<unknown, unknown, CreateOrderData>,
  response: Response,
) {
  try {
    const payload = request.body
    if (!payload?.address || !payload?.payment || !payload?.products) {
      throw Error(
        `You need to send address, products and payment in the payload. Found: ${payload ? Object.keys(payload) : 'nothing'}.`
      )
    }
    const id = createOrder(request.body || {})
    response.status(201).send({ id })
  } catch (err) {
    response.status(500).send({ error: `${err}` })
  }
}

export async function getOrderController(request: Request<{ id: number }>, response: Response) {
  await new Promise(resolve => setTimeout(resolve, 500))
  const order = getOrderById(request.params.id)
  if (!order) {
    response.status(404).send()
    return
  }
  response.status(200).send(order)
}
