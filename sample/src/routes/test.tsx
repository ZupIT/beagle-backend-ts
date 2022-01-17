import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { alert } from '@zup-it/beagle-backend-core/actions/index'

export const Test: Screen = () => (
  <Container>
    <Text>
      Hello World!
      Hi
      Again
    </Text>
    <Button onPress={alert("hi")}>Click me</Button>
  </Container>
)
