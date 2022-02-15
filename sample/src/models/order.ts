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
  id: string,
  state: 'AWAITING_PAYMENT' | 'PAYMENT_ACCEPTED' | 'PREPARING' | 'SENT' | 'COMPLETED' | 'CANCELED',
  products: Pick<Product, 'title' | 'price' | 'image' | 'id' | 'description' | 'category'>[],
  total: number,
  address: Address,
}

export interface PaymentCard {
  number: string,
  expirationDate: string,
  cvc: string,
}
