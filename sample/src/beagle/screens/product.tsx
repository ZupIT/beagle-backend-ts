import { Button, Container, Image, ScreenComponent, ScrollView, Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { condition, contains, insert, length, sum } from '@zup-it/beagle-backend-core/operations'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Product as ProductModel } from '../../models/product'
import { updateCartIndicator } from '../actions'
import { globalContext } from '../global-context'
import { formatPrice } from '../operations'

interface Props extends ScreenRequest {
  navigationContext: {
    product: ProductModel,
  }
}

export const Product: Screen<Props> = ({ navigationContext }) => {
  const product = navigationContext.get('product')
  const cart = globalContext.get('cart')
  return (
    <ScreenComponent navigationBar={{ title: 'Product details' }}>
      <ScrollView>
        <Container style={{ padding: 10, alignItems: 'CENTER' }}>
          <Text styleId='title'>{product.get('title')}</Text>
          <Container style={{ width: 400, height: 454, marginTop: 20, alignItems: 'CENTER' }}>
            <Image type='remote' url={product.get('image').toString()} mode='FIT_CENTER'
              style={{ width: 200, height: 266 }} />
            <Text style={{ marginTop: 25 }} styleId='price'>{formatPrice(product.get('price'), 'BRL')}</Text>
            <Button style={{
              width: 250, marginTop: 25, alignItems: 'CENTER', backgroundColor: "#2596be",
              display: condition(contains(cart, product), 'NONE', 'FLEX')
            }} onPress={[
              updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
              cart.set(insert(cart, product)),
            ]}>Add to cart</Button>
            <Container style={{ flexDirection: 'ROW', marginTop: 25, justifyContent: 'CENTER' }}>
              <Text style={{ display: condition(contains(cart, product), 'FLEX', 'NONE') }} styleId='inCart'>In cart</Text>
              <Image type='remote' url='https://i.ibb.co/NsY3F4v/svg.png' mode='FIT_CENTER'
                style={{
                  width: 20, height: 20, paddingLeft: 6, paddingTop: 2,
                  display: condition(contains(cart, product), 'FLEX', 'NONE')
                }} />
            </Container>
          </Container>
          <Text>{product.get('description')}</Text>
        </Container>
      </ScrollView>
    </ScreenComponent>
  )
}
