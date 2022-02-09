import { Button, Container, ScreenComponent, Style, TextInput } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { condition, openNativeRoute } from '@zup-it/beagle-backend-core/actions'
import { isEmpty } from '@zup-it/beagle-backend-core/operations'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { createOrder } from '../network/order'
import {
  Address as AddressModel,
  PaymentCard as PaymentCardModel,
  Order as OrderModel,
 } from '../../models/order'
import { globalContext } from '../global-context'
import { sumProducts } from '../operations'

interface Props extends ScreenRequest {
  navigationContext: {
    address: AddressModel,
  }
}

export const Payment: Screen<Props> = ({ navigationContext }) => {
  const order = createContext<OrderModel>('order')
  const card = createContext<PaymentCardModel>('card')
  const cart = globalContext.get('cart')
  const address = navigationContext.get('address')
  const inputContainersMargin: Style = { marginVertical: 5, marginHorizontal: 5 }
  const onInit = [
    order.get('address').set(address),
    order.get('products').set(cart),
    order.get('total').set(sumProducts(cart)),
  ]
  const makeOrder = [
    condition({ condition: isEmpty(card.get('cvc')), onTrue: order.get('state').set('AWAITING_PAYMENT'), onFalse: order.get('state').set('PAYMENT_ACCEPTED')}),
    createOrder({
      data: order,
      onSuccess: (response) => openNativeRoute({ route: 'orders', data: { orderId: response.get('data').get('id').toString() } })
    })
  ]
  return (
    <ScreenComponent navigationBar={{ title: 'Payment' }} context={order}>
      <Container
        style={{ flex: 1, justifyContent: 'SPACE_BETWEEN', flexDirection: 'COLUMN', marginHorizontal: 10 }}
        context={card}
        onInit={onInit}
      >
        <Container>
          <Container style={{ flexDirection: 'COLUMN', ...inputContainersMargin }}>
            <TextInput
              value={card.get('number')}
              placeholder='Card number'
              onChange={(value) => card.get('number').set(value)}
            />
          </Container>
          <Container style={{ flexDirection: 'ROW' }}>
            <Container style={{ flex: 1, flexDirection: 'COLUMN', ...inputContainersMargin }}>
              <TextInput
                value={card.get('expirationDate')}
                placeholder='MM/YY'
                onChange={(value) => card.get('expirationDate').set(value)}
              />
            </Container>
            <Container style={{ flex: 1, flexDirection: 'COLUMN', ...inputContainersMargin }}>
              <TextInput
                value={card.get('cvc')}
                placeholder='CVC'
                onChange={(value) => card.get('cvc').set(value)}
              />
            </Container>
          </Container>
        </Container>
        <Container style={{ flexDirection: 'ROW', justifyContent: 'FLEX_END', ...inputContainersMargin  }}>
          <Button onPress={makeOrder}>Buy</Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
