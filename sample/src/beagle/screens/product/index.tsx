import {
  Button, Container, Else, If, Image, ScreenComponent, ScrollView, Text, Then,
} from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { contains, insert, length, sum } from '@zup-it/beagle-backend-core/operations'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Product as ProductModel } from '../../../models/product'
import { updateCartIndicator } from '../../actions'
import { theme } from '../../constants'
import { globalContext } from '../../global-context'
import { formatPrice } from '../../operations'
import { style } from './style'

interface Props extends ScreenRequest {
  navigationContext: {
    product: ProductModel,
  }
}

export const Product: Screen<Props> = ({ navigationContext }) => {
  const product = navigationContext.get('product')
  const cart = globalContext.get('cart')
  const addToCart = [
    updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
    cart.set(insert(cart, product)),
  ]

  return (
    <ScreenComponent navigationBar={{ title: 'Product details' }}>
      <ScrollView>
        <Container style={style.page}>
          <Text styleId={theme.text.title} alignment="CENTER">{product.get('title')}</Text>
          <Container style={style.contentBox}>
            <Image type="remote" url={product.get('image')} mode="FIT_CENTER" style={style.productImage} />
            <Text style={style.price} styleId={theme.text.h4}>{formatPrice(product.get('price'), 'BRL')}</Text>
            <If condition={contains(cart, product)}>
              <Then>
                <Container style={style.inCart}>
                  <Text styleId="inCart">In cart</Text>
                  <Image type="local" mobileId={theme.image.check} mode="FIT_CENTER" style={style.checkImage} />
                </Container>
              </Then>
              <Else><Button onPress={addToCart}>Add to cart</Button></Else>
            </If>
          </Container>
          <Text>{product.get('description')}</Text>
        </Container>
      </ScrollView>
    </ScreenComponent>
  )
}
