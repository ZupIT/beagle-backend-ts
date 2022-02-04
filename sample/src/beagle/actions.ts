import { createAction, Expression } from '@zup-it/beagle-backend-core'

interface UpdateCartIndicatorParams {
  numberOfElementsInCart: Expression<number>,
}

export const updateCartIndicator = createAction<UpdateCartIndicatorParams>('updateCartIndicator')
