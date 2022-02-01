import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { colors, Container, GridView, ScreenComponent, Template } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { insert } from '@zup-it/beagle-backend-core/operations'
import { Product } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { formatPrice } from '../operations'
import { globalContext } from '../global-context'
import { Loading } from '../fragments/loading'
import { theme } from '../constants'

interface ProductData {
  isLoading: boolean,
  data: Product[],
}

export const Products: Screen = () => {
  const products = createContext<ProductData>('products', { isLoading: true, data: [] })
  const cart = globalContext.get('cart')
  const onInit = listProducts({
    onSuccess: response => products.get('data').set(response.get('data')),
    onError: response => alert(response.get('message')),
    onFinish: products.get('isLoading').set(false),
  })

  return (
    <ScreenComponent safeArea={true} navigationBar={{ title: 'Products' }}>
      <Container context={products} onInit={onInit} style={{ backgroundColor: theme.viewBackground }}>
        <Loading isLoading={products.get('isLoading')}>
          <GridView dataSource={products.get('data')} spanCount={2} key="id">
            {item => (
              <Template>
                <ProductItem
                  productId={item.get('id')}
                  image={item.get('image')}
                  price={formatPrice(item.get('price'), 'BRL')}
                  title={item.get('title')}
                  onPressBuy={cart.set(insert(cart, item))}
                  onPressDetails={alert('To do')}
                />
              </Template>
            )}
          </GridView>
        </Loading>
      </Container>
    </ScreenComponent>
  )
}
