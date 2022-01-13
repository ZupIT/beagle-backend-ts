import { React } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { pushView } from '@zup-it/beagle-backend-core/actions/index'
import { Button, colors, Container, Image, Text } from '@zup-it/beagle-backend-components'

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
    <Image type="remote" path={{ url: 'https://i.ibb.co/rvRN9kv/logo.png' }} style={{ width: 242, height: 225 }} />
    <Text text="Welcome to the Beagle Playground!" style={{ marginTop: 40 }} />
    <Text text="Use the panel on the left to start coding!" style={{ marginTop: 5 }} />
    <Button text="Access the fast guide" style={{ marginTop: 40 }} onPress={pushView('/docs.json')} />
  </Container>
)
