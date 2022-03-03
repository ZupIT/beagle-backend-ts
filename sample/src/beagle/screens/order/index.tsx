import { Container, ListView, ScreenComponent, Template } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { alert } from '@zup-it/beagle-backend-core/actions'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { Order as OrderModel } from '../../../models/order'
import { Loading } from '../../fragments/loading'
import { getOrderById } from '../../network/order'
import { formatPrice } from '../../operations'
import { DefinitionItem, Section } from './fragments'
import { style } from './style'

interface Props extends ScreenRequest {
  routeParams: {
    id: string,
  }
}

interface OrderContext {
  isLoading: boolean,
  data?: OrderModel,
}

export const Order: Screen<Props> = ({ request: { params } }) => {
  const orderContext = createContext<OrderContext>('order', { isLoading: true })
  const order = orderContext.get('data')
  const address = order.get('address')
  const loadOrder = getOrderById({
    id: params.id,
    onSuccess: response => order.set(response.get('data')),
    onError: response => alert(`${response.get('status')}: ${response.get('message')}`),
    onFinish: orderContext.get('isLoading').set(false),
  })

  return (
    <ScreenComponent navigationBar={{ title: 'Order' }}>
      <Container context={orderContext} onInit={loadOrder} style={style.page}>
        <Loading isLoading={orderContext.get('isLoading')}>
          <Section>
            <DefinitionItem title="Id:" definition={order.get('id')} />
            <DefinitionItem title="Status:" definition={order.get('state')} />
          </Section>

          <Section title="Products">
            <ListView dataSource={order.get('products')} key="id">
              {item => (
                <Template>
                  <DefinitionItem
                    title={item.get('title')}
                    definition={formatPrice(item.get('price'), 'BRL')}
                    style={style.productTitle}
                  />
                </Template>
              )}
            </ListView>
          </Section>

          <Section title="Shipment">
            <DefinitionItem title="Zip code:" definition={address.get('zip')} />
            <DefinitionItem title="City:" definition={address.get('city')} />
            <DefinitionItem title="State:" definition={address.get('state')} />
            <DefinitionItem title="Street:" definition={address.get('street')} />
            <DefinitionItem title="Number:" definition={address.get('number')} />
          </Section>
        </Loading>
      </Container>
    </ScreenComponent>
  )
}
