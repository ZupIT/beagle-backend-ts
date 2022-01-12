import { React, FC } from '@zup-it/beagle-backend-core'
import { colors, Container, Image } from '@zup-it/beagle-backend-components'
import { app } from '../app'

export const Welcome: FC = () => (
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
  </Container>
)

app.addScreen({ path: '/welcome', screen: Welcome })
