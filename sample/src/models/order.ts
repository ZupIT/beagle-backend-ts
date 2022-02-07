import { Product } from './product'

export interface Address {
  zip: string,
  street: string,
  number: string,
  city: string,
  state: string,
  complement: string,
  neighborhood: string,
}

export interface Order {
  id: number,
  state: 'AWAITING_PAYMENT' | 'PAYMENT_ACCEPTED' | 'PREPARING' | 'SENT' | 'COMPLETED' | 'CANCELED',
  products: Pick<Product, 'title' | 'price'>[],
  total: number,
  address: Address,
}
