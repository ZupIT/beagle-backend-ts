import { Address, Order, PaymentCard } from '../models/order'
import { Product } from '../models/product'

let nextId = 1
const orders: Record<string, Order> =
{
 '1': {
    id: '1',
    products: [
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      }
    ],
    state: 'PAYMENT_ACCEPTED',
    total: 132.25,
    address: {
      zip: '12345',
      street: 'rua a',
      number: '123',
      city: 'sao paulo',
      state: 'SP',
      complement: 'teste',
      neighborhood: 'teste',
    },
  },
  '2': {
    id: '2',
    products: [
      {
        id: 2,
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      },
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      }
    ],
    state: 'PAYMENT_ACCEPTED',
    total: 132.25,
    address: {
      zip: '12345',
      street: 'rua a',
      number: '123',
      city: 'sao paulo',
      state: 'SP',
      complement: 'teste',
      neighborhood: 'teste',
    },
  }
}

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
