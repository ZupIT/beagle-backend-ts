import { Expression, Operation } from '@zup-it/beagle-backend-core'

export const formatPrice = (price: Expression<number>, currency: string) => (
  new Operation<string>('formatPrice', [price, currency])
)
