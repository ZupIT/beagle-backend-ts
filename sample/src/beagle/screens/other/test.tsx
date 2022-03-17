import { BeagleJSX, createContextNode } from '@zup-it/beagle-backend-core'
import { Text } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { insert } from '@zup-it/beagle-backend-core/operations'

const arrayContext = createContextNode<string[]>('ctx')
export const Test: Screen = () => (
  <Text>Hello World! {insert(arrayContext, 'test')}</Text>
)
