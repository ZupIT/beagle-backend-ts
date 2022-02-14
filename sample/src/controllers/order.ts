import { Request, Response } from 'express'
import { Order, PaymentCard } from '../models/order'
import { createOrder, getOrderById } from '../services/order'

export function createOrderController(request: Request<unknown, unknown, { order: Order, payment: PaymentCard }>, response: Response) {
  const id = createOrder(request.body?.order || {})
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
