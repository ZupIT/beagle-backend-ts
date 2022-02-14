import { Address, Order, PaymentCard } from '../models/order'
import { Product } from '../models/product'

let nextId = 1
const orders: Record<string, Order> = {}

export interface CreateOrderData {
  products: Product[],
  address: Address,
  payment: PaymentCard,
}

export function createOrder({ products, address, payment }: CreateOrderData): string {
  const id = `${nextId++}`
  const state = payment ? 'PAYMENT_ACCEPTED' : 'AWAITING_PAYMENT'
  const total = products.reduce((sum, product) => sum + product.price, 0)
  const order: Order = { id, products, address, state, total }
  console.log('Created order:', order)
  console.log('-------')
  console.log('Payment:', payment)
  console.log('-------')
  orders[`${id}`] = { ...order, id }
  return id
}

export function getOrderById(id: number): Order | undefined {
  return orders[`${id}`]
}
