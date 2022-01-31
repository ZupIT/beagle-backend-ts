import { Request, Response } from 'express'
import { Order } from '../models/order'
import { createOrder, getOrderById } from '../services/order'

export function createOrderController(request: Request<unknown, unknown, Order>, response: Response) {
  const id = createOrder(request.body)
  response.status(201).send({ id })
}

export function getOrderController(request: Request<{ id: number }>, response: Response) {
  const order = getOrderById(request.params.id)
  if (!order) {
    response.status(404).send()
    return
  }
  response.status(200).send(order)
}
