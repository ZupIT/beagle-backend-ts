import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Container, GridView, ScreenComponent, Template } from '@zup-it/beagle-backend-components'
import { Screen } from '@zup-it/beagle-backend-express'
import { contains, insert, length, sum } from '@zup-it/beagle-backend-core/operations'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { Product } from '../../models/product'
import { listProducts } from '../network/product'
import { ProductItem } from '../components/product-item'
import { formatPrice } from '../operations'
import { globalContext } from '../global-context'
import { Loading } from '../fragments/loading'
import { theme } from '../constants'
import { updateCartIndicator } from '../actions'
import { Product as ProductScreen } from './product'

interface ProductData {
  isLoading: boolean,
  data: Product[],
}

export const Products: Screen = ({ navigator }) => {
  const products = createContext<ProductData>('products', { isLoading: true, data: [] })
  const cart = globalContext.get('cart')
  const onInit = listProducts({
    onSuccess: response => products.get('data').set(response.get('data')),
    onError: response => alert(response.get('message')),
    onFinish: products.get('isLoading').set(false),
  })

  return (
    <ScreenComponent safeArea={true} navigationBar={{ title: 'wfewn' }}>
      <Container context={products} onInit={onInit} style={{ backgroundColor: theme.viewBackground }}>
        <Loading isLoading={products.get('isLoading')}>
          <GridView dataSource={products.get('data')} spanCount={2} key="id" itemAspectRatio={0.6}>
            {item => (
              <Template>
                <ProductItem
                  productId={item.get('id')}
                  image={item.get('image')}
                  price={formatPrice(item.get('price'), 'BRL')}
                  title={item.get('title')}
                  inCart={contains(cart, item)}
                  onPressBuy={[
                    updateCartIndicator({ numberOfElementsInCart: sum(length(cart), 1) }),
                    cart.set(insert(cart, item)),
                  ]}
                  onPressDetails={navigator.pushView(ProductScreen, { navigationContext: { product: item } })}
                />
              </Template>
            )}
          </GridView>
        </Loading>
      </Container>
    </ScreenComponent>
  )
}
