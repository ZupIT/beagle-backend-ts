import { Order } from '../models/order'

let nextId = 1
const orders: Record<string, Order> = {}

export function createOrder(order: Omit<Order, 'id'>): number {
  const id = nextId++
  orders[`${id}`] = { ...order, id }
  return id
}

export function getOrderById(id: number): Order | undefined {
  return orders[`${id}`]
}
