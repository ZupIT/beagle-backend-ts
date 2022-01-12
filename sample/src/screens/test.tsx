import { Container, Text } from '@zup-it/beagle-backend-components'
import { React, FC } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { app } from '../app'

export const Test: FC<Screen> = () => (
  <Container>
    <Text text="Hello World!" />
  </Container>
)

app.addScreen({ path: '/test', screen: Test })
