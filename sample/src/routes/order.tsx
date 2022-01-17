import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { BeagleJSX, createContext } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { alert } from '@zup-it/beagle-backend-core/actions/index'
import { condition, isNull } from '@zup-it/beagle-backend-core/operations/index'
import { getOrderById, Order as OrderType } from '../network/order'
import { Card } from '../fragments/card'
import { UserInit } from '../fragments/user-init'
import { AppRequest } from './types'

interface OrderRequest extends AppRequest {
  navigationContext: {
    orderId: string,
  }
}

export const Order: Screen<OrderRequest> = (
  { request: { headers }, navigationContext, navigator },
) => {
  const order = createContext<OrderType>('order')
  const onInit = getOrderById(navigationContext.get('orderId'), {
    onSuccess: success => order.set(success.get('data')),
    onError: error => alert(error.get('message')),
  })

  const itemStyle = { marginVertical: 3 }

  return (
    <UserInit userId={headers['user-id']}>
      <Text style={{ display: condition(isNull(order), 'FLEX', 'NONE')}}>loading...</Text>
      <Card onInit={onInit} style={{ display: condition(isNull(order), 'NONE', 'FLEX')}}>
        <Text style={itemStyle}>{`Order id: ${order.get('id')}`}</Text>
        <Text style={itemStyle}>{`Date: ${order.get('date')}`}</Text>
        <Text style={itemStyle}>{`Status: ${order.get('status')}`}</Text>
        <Text style={itemStyle}>{`Price: \$${order.get('price')}`}</Text>
        <Text style={itemStyle}>
          {`Tracking: ${order.get('tracking').get('company')} ${order.get('tracking').get('id')}`}
        </Text>
        <Text style={itemStyle}>{`Estimated delivery date: ${order.get('estimatedDeliveryDate')}`}</Text>
        <Text style={itemStyle}>
          {`Delivery address: ${order.get('address').get('street')}, ${order.get('address').get('number')}`}
        </Text>
      </Card>
      <Container style={{ flex: 1, alignContent: 'CENTER', justifyContent: 'CENTER' }}>
        <Button onPress={navigator.popView()}>Home</Button>
      </Container>
    </UserInit>
  )
}
