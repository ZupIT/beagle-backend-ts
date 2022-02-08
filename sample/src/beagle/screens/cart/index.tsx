import {
  Button, colors, Container, Image, ListView, ScreenComponent, Template, Text,
} from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { condition, isEmpty, not } from '@zup-it/beagle-backend-core/operations'
import { Screen } from '@zup-it/beagle-backend-express'
import { globalContext } from '../../global-context'
import { formatPrice, sumProducts } from '../../operations'
import { Address } from '../address'
import { style } from './style'

export const Cart: Screen = ({ navigator }) => {
  const cart = globalContext.get('cart')
  return (
    <ScreenComponent safeArea={true} navigationBar={{ title: 'Cart', showBackButton: true }}>
      <Container style={style.page}>
        <Container style={{ display: condition(isEmpty(cart), 'FLEX', 'NONE'), ...style.emptyCart }}>
          <Text alignment="CENTER">Your cart is empty. Go to the products page and add some products.</Text>
        </Container>

        <Container style={{ display: condition(isEmpty(cart), 'NONE', 'FLEX'), ...style.list }}>
          <ListView dataSource={cart} key="id">
            {(item) => (
              <Template>
                <Container style={style.item}>
                  <Image type="remote" path={{ url: item.get('image') }} style={style.image} mode="FIT_CENTER" />
                  <Text style={style.title}>{item.get('title')}</Text>
                  <Text>{formatPrice(item.get('price'), 'BRL')}</Text>
                </Container>
              </Template>
            )}
          </ListView>
        </Container>

        <Container style={style.summaryBox}>
          <Container style={style.total}>
            <Text>Total</Text>
            <Text textColor={colors.green}>{formatPrice(sumProducts(cart), 'BRL')}</Text>
          </Container>
          <Button enabled={not(isEmpty(cart))} onPress={navigator.pushView(Address)}>Buy</Button>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
