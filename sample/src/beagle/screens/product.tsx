import { Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Product as ProductModel } from '../../models/product'

interface Props extends ScreenRequest {
  navigationContext: {
    product: ProductModel,
  }
}

export const Product: Screen<Props> = ({ navigationContext }) => {
  return <Text>to do</Text>
}
