import { Container, Image, ListView, ScreenComponent, ScrollView, Template, Text } from '@zup-it/beagle-backend-components'
import { BeagleJSX } from '@zup-it/beagle-backend-core'
import { Screen, ScreenRequest } from '@zup-it/beagle-backend-express'
import { getOrderById } from '../../../services/order'
import { theme } from '../../constants'
import { formatPrice } from '../../operations'
import { style } from './style'

interface Props extends ScreenRequest {
  routeParams: {
    id: string,
  }
}

export const Order: Screen<Props> = ({ request: { params } }) => {
  const order = params.id === null ? getOrderById(Number(params.id)) : getOrderById(1)
  return (
    <ScreenComponent navigationBar={{ title: 'Order' }}>
      <Container style={{ padding: 10 }}>
        <Container style={style.container}>
          <Text styleId={theme.text.price}>purchase status:</Text>
          <Text styleId={theme.text.paymentStatus}>{order!.state}</Text>
        </Container>
        <Text styleId={theme.text.price} style={{ marginTop: 10 }}>Products:</Text>
        <ListView dataSource={order!.products} key="id">
          {item => (
            <Template>
              <Container style={style.item}>
                <Image type="remote" url={item.get('image')} mode="FIT_CENTER" style={style.image} />
                <Text style={style.title}>{item.get('title')}</Text>
                <Text>{formatPrice(item.get('price'), 'BRL')}</Text>
              </Container>
            </Template>
          )}
        </ListView>
        <Container style={style.Address}>
          <Text styleId={theme.text.price}>Address:</Text>
          <Container style={{ flexDirection: 'ROW', margin: 10 }}>
            <Text style={style.title}>ZIP: {order!.address.zip}</Text>
            <Text style={style.title}>City: {order!.address.city}</Text>
          </Container>
          <Container style={{ flexDirection: 'ROW', margin: 10 }}>
            <Text style={style.title}>State: {order!.address.state}</Text>
            <Text style={style.title}>Street: {order!.address.street}</Text>
            <Text style={style.title}>Number: {order!.address.number}</Text>
          </Container>
        </Container>
        <Container style={style.container}>
          <Text styleId={theme.text.price}>Total:</Text>
          <Text styleId={theme.text.price}>{formatPrice(order!.total, 'BRL')}</Text>
        </Container>
      </Container>
    </ScreenComponent>
  )
}
