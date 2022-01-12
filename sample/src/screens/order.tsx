import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { React, FC, createContext } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { alert } from '@zup-it/beagle-backend-core/actions/index'
import { condition, isNull } from '@zup-it/beagle-backend-core/operations/index'
import { app } from '../app'
import { getOrderById, Order as OrderType } from '../network/order'
import { Card } from '../fragments/card'
import { AppHeaders } from '../types'
import { UserInit } from '../fragments/user-init'

interface NavigationContextType {
  orderId: string,
}

export const Order: FC<Screen<any, AppHeaders, any, any, NavigationContextType>> = (
  { request: { headers }, navigationContext },
) => {
  const order = createContext<OrderType>('order')
  const onInit = getOrderById(navigationContext.get('orderId'), {
    onSuccess: success => order.set(success.get('data')),
    onError: error => alert(error.get('message')),
  })

  const itemStyle = { marginVertical: 3 }

  return (
    <UserInit id={headers['user-id']}>
      <Text text="loading..." style={{ display: condition(isNull(order), 'FLEX', 'NONE')}} />
      <Card onInit={onInit} style={{ display: condition(isNull(order), 'NONE', 'FLEX')}}>
        <Text style={itemStyle} text={`Order id: ${order.get('id')}`} />
        <Text style={itemStyle} text={`Date: ${order.get('date')}`} />
        <Text style={itemStyle} text={`Status: ${order.get('status')}`} />
        <Text style={itemStyle} text={`Price: \$${order.get('price')}`} />
        <Text
          style={itemStyle}
          text={`Tracking: ${order.get('tracking').get('company')} ${order.get('tracking').get('id')}`}
        />
        <Text style={itemStyle} text={`Estimated delivery date: ${order.get('estimatedDeliveryDate')}`} />
        <Text
          style={itemStyle}
          text={`Delivery address: ${order.get('address').get('street')}, ${order.get('address').get('number')}`}
        />
      </Card>
      <Container style={{ flex: 1, alignContent: 'CENTER', justifyContent: 'CENTER' }}>
        <Button text='Home' onPress={app.navigator.remote.popView()} />
      </Container>
    </UserInit>
  )
}

app.addScreen({ path: '/order', screen: Order })
