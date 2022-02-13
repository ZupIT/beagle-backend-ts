import { Expression } from '@zup-it/beagle-backend-core'
import { openNativeRoute } from '@zup-it/beagle-backend-core/actions'

export const localNavigator = {
  goToOrderDetails: (orderId: Expression<string>) => openNativeRoute({ route: 'orders', data: { orderId } }),
}
