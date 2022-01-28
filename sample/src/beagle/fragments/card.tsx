import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Container, colors } from '@zup-it/beagle-backend-components'

const cardStyle = {
  marginVertical: 20,
  marginHorizontal: 10,
  padding: 8,
  borderColor: colors.grey,
  borderWidth: 1,
  borderRadius: 20,
}

export const Card: typeof Container = ({ style, children, ...other }) => (
  <Container style={{ ...cardStyle, ...style }} {...other}>
    {children}
  </Container>
)
