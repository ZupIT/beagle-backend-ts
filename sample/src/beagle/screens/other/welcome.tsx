import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { pushView } from '@zup-it/beagle-backend-core/actions'
import { Button, colors, Container, Image, Text } from '@zup-it/beagle-backend-components'
import { Test } from './test'

export const Welcome: Screen = () => (
  <Container
    style={{
      flexDirection: 'COLUMN',
      alignItems: 'CENTER',
      justifyContent: 'CENTER',
      height: 100,
      backgroundColor: colors.white,
    }}
  >
    <Image type="remote" url="https://i.ibb.co/rvRN9kv/logo.png" style={{ width: 242, height: 225 }} />
    <Text style={{ marginTop: 40 }}>Welcome to the Beagle Playground!</Text>
    <Text style={{ marginTop: 5 }}>Use the panel on the left to start coding!</Text>
    <Button style={{ marginTop: 40 }} onPress={pushView('/docs.json')}>Access the fast guide</Button>
    <Button onPress={pushView({
      route: {
        screen: <Text id="arthur">Hello World!</Text>
      }
    })}>Test</Button>
  </Container>
)
