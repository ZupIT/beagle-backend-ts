import { Container, Text, Button } from '@zup-it/beagle-backend-components'
import { React, FC } from '@zup-it/beagle-backend-core'
import { Screen } from '@zup-it/beagle-backend-express'
import { app } from '../app'
import { Order } from './order'
import { AppHeaders } from '../types'
import { UserInit } from '../fragments/user-init'

export const Home: FC<Screen<any, AppHeaders>> = ({ request: { headers } }) => {
  const user = app.globalContext.get('user')
  const balance = app.globalContext.get('balance')

  return (
    <UserInit id={headers['user-id']}>
      <Text text={`Hello ${user.get('name')}.`} />
      <Container style={{ marginTop: 10, backgroundColor: '#FF5555', paddingVertical: 5, paddingHorizontal: 10 }}>
        <Text text={`Seu saldo é de ${balance.get('currency')} ${balance.get('total')}`} textColor='#FFFFFF' />
      </Container>
      <Container style={{ flex: 1, alignItems: 'CENTER', justifyContent: 'CENTER' }}>
        <Button
          text="Check Order 001"
          onPress={app.navigator.remote.pushView(Order, { navigationContext: { orderId: '001' }})}
        />
      </Container>
    </UserInit>
  )
}

app.addScreen({ path: '/home', screen: Home })
