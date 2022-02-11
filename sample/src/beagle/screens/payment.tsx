import { Button, Container, ScreenComponent, Style, TextInput } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext, Expression } from '@zup-it/beagle-backend-core'
import { condition, openNativeRoute } from '@zup-it/beagle-backend-core/actions'
import { isEmpty } from '@zup-it/beagle-backend-core/operations'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { createOrder } from '../network/order'
import {
  Address,
  PaymentCard as PaymentCardModel,
  Order as OrderModel,
 } from '../../models/order'
import { globalContext } from '../global-context'
import { sumProducts } from '../operations'
import { Action } from '@zup-it/beagle-backend-core/model/action'
import { PrimitiveContextNode } from '@zup-it/beagle-backend-core/model/context/types'

interface Props extends ScreenRequest {
  navigationContext: {
    address: Address,
  }
}

export const Payment: Screen<Props> = ({ navigationContext }) => {
  const order = createContext<OrderModel>('order')
  const card = createContext<PaymentCardModel>('card')
  const cart = globalContext.get('cart')
  const address = navigationContext.get('address')
  const inputContainersMargin: Style = { margin: 5 }
  const onInit = [
    order.get('address').set(address),
    order.get('products').set(cart),
    order.get('total').set(sumProducts(cart)),
  ]
  const makeOrder = [
    condition({ condition: isEmpty(card.get('cvc')), onTrue: order.get('state').set('AWAITING_PAYMENT'), onFalse: order.get('state').set('PAYMENT_ACCEPTED')}),
    createOrder(order, card, {
      onSuccess: (response) => openNativeRoute({ route: 'orders', data: { orderId: response.get('data').get('id').toString() } })
    })
  ]

  const renderInput = (
    placeholder: Expression<string>,
    value: Expression<string>,
    onChange: (value: PrimitiveContextNode<string>)=> Action,
    style?: Style,
  ) => (
    <Container style={style}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Container>
  )

  return (
    <ScreenComponent navigationBar={{ title: 'Payment' }} context={order}>
      <Container
        style={{ flex: 1, justifyContent: 'SPACE_BETWEEN', marginHorizontal: 10 }}
        context={card}
        onInit={onInit}
      >
        <Container>
          {renderInput(
            'Card number',
            card.get('number'),
            (value) => card.get('number').set(value),
            {...inputContainersMargin}
          )}
          <Container style={{ flexDirection: 'ROW' }}>
            {renderInput(
              'MM/YY',
              card.get('expirationDate'),
              (value) => card.get('expirationDate').set(value),
              {flex: 1, ...inputContainersMargin}
            )}
            {renderInput(
              'CVC', card.get('cvc'),
              (value) => card.get('cvc').set(value),
              { flex: 1, ...inputContainersMargin }
            )}
          </Container>
        </Container>
        <Container style={{ flexDirection: 'ROW', justifyContent: 'FLEX_END', ...inputContainersMargin  }}>
          <Button onPress={makeOrder}>Buy</Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
