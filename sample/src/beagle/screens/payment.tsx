import { Button, Container, ScreenComponent } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { openNativeRoute } from '@zup-it/beagle-backend-core/actions'
import { Screen } from '@zup-it/beagle-backend-express'

export const Payment: Screen = () => {
  return (
    <ScreenComponent navigationBar={{ title: 'Payment' }}>
      <Container style={{ flex: 1, alignItems: 'CENTER', justifyContent: 'CENTER' }}>
        <Button onPress={openNativeRoute({ route: 'orders', data: { orderId: '5' } })}>Go to Orders page</Button>
      </Container>
    </ScreenComponent>
  )
}
