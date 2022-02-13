import { Button, Container, ScreenComponent, Style, Text, TextInput } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert, openNativeRoute } from '@zup-it/beagle-backend-core/actions'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { createOrder } from '../network/order'
import { Address, PaymentCard } from '../../models/order'
import { globalContext } from '../global-context'
import { updateCartIndicator } from '../actions'
import { localNavigator } from '../local-navigator'

interface Props extends ScreenRequest {
  navigationContext: {
    address: Address,
  }
}

export const Payment: Screen<Props> = ({ navigationContext }) => {
  const cart = globalContext.get('cart')
  const card = createContext<PaymentCard>('card')
  const formItem: Style = { margin: 8 }
  const makeOrder = createOrder(
    {
      data: {
        products: cart,
        address: navigationContext.get('address'),
        payment: card,
      },
      onSuccess: response => [
        cart.set([]),
        updateCartIndicator({ numberOfElementsInCart: 0 }),
        localNavigator.goToOrderDetails(response.get('data').get('id')),
      ],
      onError: response => alert(response.get('data').get('error'))
    },
  )

  const createInput = (placeholder: string, name: keyof PaymentCard, shouldExpand: boolean = true) => (
    <TextInput
      value={card.get(name)}
      placeholder={placeholder}
      onChange={value => card.get(name).set(value)}
      style={{ flex: shouldExpand ? 1 : undefined, ...formItem }}
    />
  )

  return (
    <ScreenComponent navigationBar={{ title: 'Payment' }} context={card}>
      <Container style={{ flex: 1, justifyContent: 'SPACE_BETWEEN', marginHorizontal: 10, marginTop: 10 }}>
        <Container>
          {createInput('Card number', 'number', false)}
          <Container style={{ flexDirection: 'ROW' }}>
            {createInput('MM/YY', 'expirationDate')}
            {createInput('CVC', 'cvc')}
          </Container>
        </Container>
        <Container style={{ flexDirection: 'ROW', justifyContent: 'FLEX_END', ...formItem  }}>
          <Button onPress={makeOrder}>Buy</Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
