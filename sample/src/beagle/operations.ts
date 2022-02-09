import { DynamicExpression, Expression, Operation } from '@zup-it/beagle-backend-core'
import { Product } from '../models/product'

export const formatPrice = (price: Expression<number>, currency: string) => (
  new Operation<string>('formatPrice', [price, currency])
)

export const sumProducts = (products: DynamicExpression<Product[]>) => (
  new Operation<number>('sumProducts', [products])
)
