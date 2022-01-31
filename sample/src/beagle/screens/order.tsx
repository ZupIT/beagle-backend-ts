import { Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'

interface Props extends ScreenRequest {
  routeParams: {
    orderId: string,
  }
}

export const Order: Screen<Props> = ({ request: { params } }) => {
  return <Text>to do</Text>
}
